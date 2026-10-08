import {
  getClientPreview,
  isDatabaseConfigured,
  type ClientPreviewRow,
} from '@/lib/admin/db';
import { getPreview as getFilePreview } from './registry';
import type { PreviewContent } from './types';

/**
 * Resolves a slug to preview content.
 *
 * Two sources, deliberately in this order:
 *   1. client_previews — demos the sales portal created, which carry a
 *      48-hour expiry stamped at creation
 *   2. the file registry — the portfolio builds on the marketing site, which
 *      never expire because the work carousel links to them
 *
 * Database first means a salesperson can create or replace a demo without a
 * deploy, while the portfolio stays fixed in code.
 */
export async function loadPreview(
  slug: string
): Promise<PreviewContent | null> {
  if (isDatabaseConfigured()) {
    let row: ClientPreviewRow | null = null;
    try {
      row = await getClientPreview(slug);
    } catch {
      // A database hiccup must not take the portfolio demos down with it.
      row = null;
    }

    if (row) {
      return {
        ...(row.content as unknown as PreviewContent),
        slug: row.slug,
        // The stored column is the source of truth for expiry, not the JSON,
        // so extending a demo never requires rewriting its content.
        expiresAt: new Date(row.expires_at).toISOString(),
      };
    }
  }

  return getFilePreview(slug) ?? null;
}
