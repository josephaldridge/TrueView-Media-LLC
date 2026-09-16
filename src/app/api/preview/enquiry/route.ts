import { NextRequest, NextResponse } from 'next/server';
import {
  canSubmitPreviewForm,
  insertLead,
  isDatabaseConfigured,
  recordPreviewSubmission,
} from '@/lib/admin/db';
import { clientIp } from '@/lib/admin/rateLimit';
import { getPreview } from '@/lib/previews/registry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

/**
 * Public endpoint behind every preview's booking and capture forms.
 *
 * Submissions land in the CRM as leads tagged with the preview they came
 * from, so a business owner trying out their own preview surfaces as a hot
 * lead rather than vanishing into a fake success message.
 */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  // Bots fill every field, including the one hidden from people.
  if (clean(body.company, 100)) {
    return NextResponse.json({ success: true });
  }

  const slug = clean(body.slug, 80);
  const preview = getPreview(slug);
  if (!preview) {
    return NextResponse.json({ message: 'Unknown preview' }, { status: 404 });
  }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 200);
  const vehicle = clean(body.vehicle, 160);
  const service = clean(body.service, 120);
  const preferred = clean(body.preferred, 120);
  const message = clean(body.message, 1200);

  if (!name || (!phone && !email)) {
    return NextResponse.json(
      { message: 'Please include your name and a phone number or email.' },
      { status: 400 }
    );
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { message: 'This form is not connected yet. Please call instead.' },
      { status: 503 }
    );
  }

  const ip = clientIp(request);

  try {
    if (!(await canSubmitPreviewForm(ip))) {
      return NextResponse.json(
        { message: 'Too many submissions. Please call us instead.' },
        { status: 429 }
      );
    }

    const notes = [
      `Enquiry from the ${preview.businessName} preview.`,
      vehicle && `Vehicle: ${vehicle}`,
      service && `Service: ${service}`,
      preferred && `Preferred timing: ${preferred}`,
      message && `Message: ${message}`,
    ]
      .filter(Boolean)
      .join('\n');

    await insertLead({
      business_name: name,
      category: 'preview enquiry',
      phone: phone || null,
      email: email || null,
      city: preview.businessName,
      source: `preview:${preview.slug}`,
      notes,
    });

    await recordPreviewSubmission(ip, preview.slug);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Preview enquiry failed:', error);
    return NextResponse.json(
      { message: 'Something went wrong. Please call us instead.' },
      { status: 503 }
    );
  }
}
