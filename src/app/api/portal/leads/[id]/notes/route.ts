import { NextRequest, NextResponse } from 'next/server';
import { getSession, isSameOrigin } from '@/lib/admin/guard';
import { addNote, listNotes } from '@/lib/admin/db';

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
    return NextResponse.json({ notes: await listNotes(id) });
  } catch {
    return NextResponse.json({ message: 'Could not load notes.' }, { status: 503 });
  }
}

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

  let body: { body?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  const text = typeof body.body === 'string' ? body.body.trim().slice(0, 4000) : '';
  if (!text) {
    return NextResponse.json({ message: 'Write something first.' }, { status: 400 });
  }

  try {
    // Author comes from the session, never the request body.
    const note = await addNote(id, session.email || session.role, text);
    return NextResponse.json({ note });
  } catch (error) {
    console.error('Note insert failed:', error);
    return NextResponse.json({ message: 'Could not save note.' }, { status: 503 });
  }
}
