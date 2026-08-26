import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated, isSameOrigin } from '@/lib/admin/guard';
import {
  NewLead,
  countLeadsByStatus,
  insertLead,
  isDatabaseConfigured,
  listLeads,
} from '@/lib/admin/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function sanitize(value: unknown, max = 500): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim().slice(0, max);
  return trimmed.length ? trimmed : null;
}

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { message: 'Database is not configured.' },
      { status: 503 }
    );
  }

  const status = request.nextUrl.searchParams.get('status') ?? 'all';
  try {
    const [leads, counts] = await Promise.all([
      listLeads(status),
      countLeadsByStatus(),
    ]);
    return NextResponse.json({ leads, counts });
  } catch {
    return NextResponse.json(
      { message: 'Could not load leads.' },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated()) || !isSameOrigin()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { message: 'Database is not configured.' },
      { status: 503 }
    );
  }

  let body: { leads?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  const incoming = Array.isArray(body.leads) ? body.leads : [body.leads];
  const prepared: NewLead[] = [];

  for (const raw of incoming) {
    if (!raw || typeof raw !== 'object') continue;
    const item = raw as Record<string, unknown>;
    const name = sanitize(item.business_name ?? item.name, 200);
    if (!name) continue;

    prepared.push({
      business_name: name,
      category: sanitize(item.category, 100),
      phone: sanitize(item.phone, 50),
      email: sanitize(item.email, 200),
      address: sanitize(item.address, 300),
      city: sanitize(item.city, 120),
      lat: typeof item.lat === 'number' ? item.lat : null,
      lon: typeof item.lon === 'number' ? item.lon : null,
      source: sanitize(item.source, 40) ?? 'manual',
      source_ref: sanitize(item.source_ref ?? item.sourceRef, 60),
      notes: sanitize(item.notes, 2000),
    });
  }

  if (!prepared.length) {
    return NextResponse.json(
      { message: 'Nothing to save — a business name is required.' },
      { status: 400 }
    );
  }

  // allSettled rather than all: one bad row must not discard the rest of the
  // batch, and the response should say what actually happened.
  const results = await Promise.allSettled(
    prepared.map((lead) => insertLead(lead))
  );

  let added = 0;
  let skipped = 0;
  let failed = 0;

  results.forEach((result) => {
    if (result.status === 'rejected') {
      failed += 1;
      console.error('Lead insert failed:', result.reason);
    } else if (result.value) {
      added += 1;
    } else {
      // ON CONFLICT DO NOTHING returned no row: already imported.
      skipped += 1;
    }
  });

  if (failed === prepared.length) {
    return NextResponse.json(
      { message: 'Could not save leads. The database rejected the request.' },
      { status: 503 }
    );
  }

  return NextResponse.json({ added, skipped, failed });
}
