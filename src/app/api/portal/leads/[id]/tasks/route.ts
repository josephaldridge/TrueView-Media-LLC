import { NextRequest, NextResponse } from 'next/server';
import { getSession, isSameOrigin } from '@/lib/admin/guard';
import { addTask, listTasks } from '@/lib/admin/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await getSession())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }
  try {
    return NextResponse.json({ tasks: await listTasks(id) });
  } catch {
    return NextResponse.json({ message: 'Could not load tasks.' }, { status: 503 });
  }
}

/** One-off task, outside any workflow. */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session || !isSameOrigin()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  let body: { label?: unknown; due_at?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  const label =
    typeof body.label === 'string' ? body.label.trim().slice(0, 300) : '';
  if (!label) {
    return NextResponse.json({ message: 'Describe the task.' }, { status: 400 });
  }

  const dueAt =
    typeof body.due_at === 'string' && body.due_at.trim()
      ? new Date(body.due_at).toISOString()
      : null;

  try {
    const task = await addTask(id, 'manual', label, 99, dueAt);
    return NextResponse.json({ task });
  } catch (error) {
    console.error('Task insert failed:', error);
    return NextResponse.json({ message: 'Could not add task.' }, { status: 503 });
  }
}
