import { NextRequest, NextResponse } from 'next/server';
import { getSession, isSameOrigin } from '@/lib/admin/guard';
import {
  addNote,
  clientPreviewSlugTaken,
  deleteClientPreview,
  extendClientPreview,
  getClientPreviewForLead,
  getLead,
  upsertClientPreview,
} from '@/lib/admin/db';
import {
  DEMO_HOURS,
  buildDemoContent,
  slugify,
  templateOption,
} from '@/lib/portal/demoBuilder';
import { getPreview as getFilePreview } from '@/lib/previews/registry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function leadIdFrom(params: { id: string }): number | null {
  const id = Number(params.id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

/** Short random suffix, so two companies with the same name never collide. */
function suffix(): string {
  return Math.random().toString(36).slice(2, 7);
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await getSession())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const leadId = leadIdFrom(params);
  if (!leadId) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }
  try {
    return NextResponse.json({ preview: await getClientPreviewForLead(leadId) });
  } catch {
    return NextResponse.json({ message: 'Could not load.' }, { status: 503 });
  }
}

/** Creates or replaces this company's demo. Always a fresh 48-hour window. */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session || !isSameOrigin()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const leadId = leadIdFrom(params);
  if (!leadId) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  const template = String(body.template ?? '');
  if (!templateOption(template)) {
    return NextResponse.json({ message: 'Pick a template.' }, { status: 400 });
  }

  try {
    const lead = await getLead(leadId);
    if (!lead) {
      return NextResponse.json({ message: 'Company not found' }, { status: 404 });
    }
    if (!lead.phone) {
      return NextResponse.json(
        { message: 'Add a phone number to the company first — the demo is built around it.' },
        { status: 400 }
      );
    }

    // Keep the existing slug when replacing, so a link already sent to a
    // prospect keeps working.
    const existing = await getClientPreviewForLead(leadId);
    let slug = existing?.slug ?? '';
    if (!slug) {
      for (let attempt = 0; attempt < 5; attempt++) {
        const candidate = slugify(lead.business_name, suffix());
        // Must not shadow a portfolio build either.
        if (!getFilePreview(candidate) && !(await clientPreviewSlugTaken(candidate))) {
          slug = candidate;
          break;
        }
      }
    }
    if (!slug) {
      return NextResponse.json(
        { message: 'Could not allocate a URL. Try again.' },
        { status: 503 }
      );
    }

    const content = buildDemoContent(
      lead,
      {
        template,
        accent: typeof body.accent === 'string' ? body.accent : undefined,
        tagline: typeof body.tagline === 'string' ? body.tagline : undefined,
        intro: typeof body.intro === 'string' ? body.intro : undefined,
        services: typeof body.services === 'string' ? body.services : undefined,
        hours: typeof body.hours === 'string' ? body.hours : undefined,
      },
      slug
    );

    const expiresAt = new Date(
      Date.now() + DEMO_HOURS * 60 * 60 * 1000
    ).toISOString();

    const row = await upsertClientPreview(
      slug,
      leadId,
      content as unknown as Record<string, unknown>,
      session.email || session.role,
      expiresAt
    );

    await addNote(
      leadId,
      session.email || session.role,
      `${existing ? 'Rebuilt' : 'Created'} demo site at /preview/${slug}. Live for ${DEMO_HOURS} hours.`
    );

    return NextResponse.json({ preview: row });
  } catch (error) {
    console.error('Demo build failed:', error);
    return NextResponse.json(
      { message: 'Could not build the demo.' },
      { status: 503 }
    );
  }
}

/** Extends the window — used when a prospect asks for more time. */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session || !isSameOrigin()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const leadId = leadIdFrom(params);
  if (!leadId) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  let hours = DEMO_HOURS;
  try {
    const body = await request.json();
    const given = Number(body?.hours);
    if (Number.isFinite(given) && given > 0 && given <= 24 * 30) hours = given;
  } catch {
    // Fall back to the default window.
  }

  try {
    const row = await extendClientPreview(leadId, hours);
    if (!row) {
      return NextResponse.json({ message: 'No demo to extend' }, { status: 404 });
    }
    await addNote(
      leadId,
      session.email || session.role,
      `Extended the demo window by ${hours} hours.`
    );
    return NextResponse.json({ preview: row });
  } catch {
    return NextResponse.json({ message: 'Could not extend.' }, { status: 503 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session || !isSameOrigin()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const leadId = leadIdFrom(params);
  if (!leadId) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }
  try {
    const removed = await deleteClientPreview(leadId);
    if (removed) {
      await addNote(leadId, 'system', 'Demo site taken down.');
    }
    return NextResponse.json({ success: removed });
  } catch {
    return NextResponse.json({ message: 'Could not delete.' }, { status: 503 });
  }
}
