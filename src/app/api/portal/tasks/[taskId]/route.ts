import { NextRequest, NextResponse } from 'next/server';
import { getSession, isSameOrigin } from '@/lib/admin/guard';
import { deleteTask, setTaskDone } from '@/lib/admin/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  const session = await getSession();
  if (!session || !isSameOrigin()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = Number(params.taskId);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  let body: { done?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  try {
    const task = await setTaskDone(id, body.done === true);
    if (!task) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ task });
  } catch {
    return NextResponse.json({ message: 'Update failed.' }, { status: 503 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  const session = await getSession();
  if (!session || !isSameOrigin()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const id = Number(params.taskId);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }
  try {
    const ok = await deleteTask(id);
    return ok
      ? NextResponse.json({ success: true })
      : NextResponse.json({ message: 'Not found' }, { status: 404 });
  } catch {
    return NextResponse.json({ message: 'Delete failed.' }, { status: 503 });
  }
}
