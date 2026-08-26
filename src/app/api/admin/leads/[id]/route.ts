import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated, isSameOrigin } from '@/lib/admin/guard';
import { LEAD_STATUSES, deleteLead, updateLead } from '@/lib/admin/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await isAuthenticated()) || !isSameOrigin()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  let body: { status?: unknown; notes?: unknown; email?: unknown; phone?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  const status =
    typeof body.status === 'string' &&
    (LEAD_STATUSES as string[]).includes(body.status)
      ? body.status
      : undefined;

  if (body.status !== undefined && status === undefined) {
    return NextResponse.json({ message: 'Unknown status' }, { status: 400 });
  }

  try {
    const lead = await updateLead(id, {
      status,
      notes: typeof body.notes === 'string' ? body.notes.slice(0, 2000) : undefined,
      email: typeof body.email === 'string' ? body.email.slice(0, 200) : undefined,
      phone: typeof body.phone === 'string' ? body.phone.slice(0, 50) : undefined,
    });
    if (!lead) {
      return NextResponse.json({ message: 'Lead not found' }, { status: 404 });
    }
    return NextResponse.json({ lead });
  } catch {
    return NextResponse.json({ message: 'Update failed.' }, { status: 503 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await isAuthenticated()) || !isSameOrigin()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  try {
    const deleted = await deleteLead(id);
    if (!deleted) {
      return NextResponse.json({ message: 'Lead not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: 'Delete failed.' }, { status: 503 });
  }
}
