import { NextRequest, NextResponse } from 'next/server';
import { getSession, isSameOrigin } from '@/lib/admin/guard';
import { LEAD_STATUSES, updateLeadProfile } from '@/lib/admin/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function text(value: unknown, max: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim().slice(0, max);
  return trimmed.length ? trimmed : undefined;
}

export async function PATCH(
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

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  const status = text(body.status, 40);
  if (status && !(LEAD_STATUSES as string[]).includes(status)) {
    return NextResponse.json({ message: 'Unknown status' }, { status: 400 });
  }

  const rawValue = body.deal_value;
  const dealValue =
    rawValue === '' || rawValue === null || rawValue === undefined
      ? undefined
      : Number(rawValue);
  if (dealValue !== undefined && !Number.isFinite(dealValue)) {
    return NextResponse.json({ message: 'Invalid value' }, { status: 400 });
  }

  try {
    const lead = await updateLeadProfile(id, {
      business_name: text(body.business_name, 200),
      contact_name: text(body.contact_name, 120),
      phone: text(body.phone, 50),
      email: text(body.email, 200),
      website: text(body.website, 300),
      address: text(body.address, 300),
      city: text(body.city, 120),
      category: text(body.category, 100),
      status,
      assigned_to: text(body.assigned_to, 120),
      deal_value: dealValue === undefined ? undefined : Math.round(dealValue),
      next_action: text(body.next_action, 300),
      next_action_at: text(body.next_action_at, 40),
    });

    if (!lead) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ lead });
  } catch (error) {
    console.error('Lead update failed:', error);
    return NextResponse.json({ message: 'Update failed.' }, { status: 503 });
  }
}
