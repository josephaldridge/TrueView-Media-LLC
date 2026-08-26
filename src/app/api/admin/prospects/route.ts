import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin/guard';
import {
  PROSPECT_CATEGORIES,
  ProspectCategory,
  findProspects,
} from '@/lib/admin/overpass';
import { existingSourceRefs, isDatabaseConfigured } from '@/lib/admin/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Overpass queries over a whole city can take a while.
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  let body: {
    area?: string;
    category?: string;
    requirePhone?: boolean;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  const area = (body.area ?? '').trim();
  if (!area) {
    return NextResponse.json(
      { message: 'Enter a city or area to search.' },
      { status: 400 }
    );
  }

  const category = (
    body.category && body.category in PROSPECT_CATEGORIES
      ? body.category
      : 'all'
  ) as ProspectCategory;

  try {
    const { area: resolved, prospects, totalFound } = await findProspects(area, {
      category,
      requirePhone: body.requirePhone !== false,
    });

    // Mark anything already in the CRM so it is not imported twice.
    let saved = new Set<string>();
    if (isDatabaseConfigured() && prospects.length) {
      try {
        saved = await existingSourceRefs(prospects.map((p) => p.sourceRef));
      } catch {
        // A CRM lookup failure should not sink the search results.
      }
    }

    return NextResponse.json({
      area: resolved.displayName,
      totalFound,
      prospects: prospects.map((p) => ({
        ...p,
        alreadySaved: saved.has(p.sourceRef),
      })),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Search failed. Try again.';
    return NextResponse.json({ message }, { status: 502 });
  }
}
