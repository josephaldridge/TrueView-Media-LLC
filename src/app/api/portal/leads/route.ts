import { NextRequest, NextResponse } from 'next/server';
import { getSession, isSameOrigin } from '@/lib/admin/guard';
import {
  countLeadsByStatus,
  insertLead,
  isDatabaseConfigured,
  listLeads,
} from '@/lib/admin/db';
import { prepareLeads } from '@/lib/admin/leadIntake';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Lead intake for the portal, open to both roles.
 *
 * The equivalent /api/admin/leads endpoint is blocked for sales users by
 * middleware, which is correct for the admin tools but would stop a
 * salesperson adding a company — hence this one.
 */

export async function GET(request: NextRequest) {
  if (!(await getSession())) {
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
    return NextResponse.json({ message: 'Could not load leads.' }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session || !isSameOrigin()) {
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

  const prepared = prepareLeads(body.leads);
  if (!prepared.length) {
    return NextResponse.json(
      { message: 'Nothing to save — a company name is required.' },
      { status: 400 }
    );
  }

  // allSettled so one bad row never discards the rest of an import.
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
      skipped += 1;
    }
  });

  if (failed === prepared.length) {
    return NextResponse.json(
      { message: 'Could not save. The database rejected the request.' },
      { status: 503 }
    );
  }

  return NextResponse.json({ added, skipped, failed });
}
