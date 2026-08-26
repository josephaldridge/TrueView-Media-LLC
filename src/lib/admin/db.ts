import { sql } from '@vercel/postgres';

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'interested'
  | 'won'
  | 'lost';

export const LEAD_STATUSES: LeadStatus[] = [
  'new',
  'contacted',
  'interested',
  'won',
  'lost',
];

export interface Lead {
  id: number;
  business_name: string;
  category: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  lat: number | null;
  lon: number | null;
  source: string;
  source_ref: string | null;
  status: LeadStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(
    process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING
  );
}

let schemaReady: Promise<void> | null = null;

/**
 * Creates the tables on first use. Cached per process so the round trip only
 * happens once per cold start rather than on every query.
 */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS leads (
          id SERIAL PRIMARY KEY,
          business_name TEXT NOT NULL,
          category TEXT,
          phone TEXT,
          email TEXT,
          address TEXT,
          city TEXT,
          lat DOUBLE PRECISION,
          lon DOUBLE PRECISION,
          source TEXT NOT NULL DEFAULT 'manual',
          source_ref TEXT,
          status TEXT NOT NULL DEFAULT 'new',
          notes TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;
      // Prevents the same OSM element being imported twice.
      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS leads_source_ref_idx
        ON leads (source, source_ref)
        WHERE source_ref IS NOT NULL;
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS admin_login_attempts (
          id SERIAL PRIMARY KEY,
          ip TEXT NOT NULL,
          attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          succeeded BOOLEAN NOT NULL DEFAULT FALSE
        );
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS admin_login_attempts_ip_idx
        ON admin_login_attempts (ip, attempted_at DESC);
      `;
    })().catch((error) => {
      // Let the next request retry rather than caching a failed migration.
      schemaReady = null;
      throw error;
    });
  }
  return schemaReady;
}

export async function listLeads(status?: string): Promise<Lead[]> {
  await ensureSchema();
  const { rows } =
    status && status !== 'all'
      ? await sql<Lead>`
          SELECT * FROM leads WHERE status = ${status}
          ORDER BY updated_at DESC LIMIT 500;
        `
      : await sql<Lead>`
          SELECT * FROM leads ORDER BY updated_at DESC LIMIT 500;
        `;
  return rows;
}

export async function countLeadsByStatus(): Promise<Record<string, number>> {
  await ensureSchema();
  const { rows } = await sql<{ status: string; count: string }>`
    SELECT status, COUNT(*) AS count FROM leads GROUP BY status;
  `;
  return rows.reduce<Record<string, number>>((acc, row) => {
    acc[row.status] = Number(row.count);
    return acc;
  }, {});
}

export interface NewLead {
  business_name: string;
  category?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  lat?: number | null;
  lon?: number | null;
  source?: string;
  source_ref?: string | null;
  notes?: string | null;
}

/** Inserts a lead, silently skipping anything already imported. */
export async function insertLead(lead: NewLead): Promise<Lead | null> {
  await ensureSchema();
  const { rows } = await sql<Lead>`
    INSERT INTO leads (
      business_name, category, phone, email, address, city,
      lat, lon, source, source_ref, notes
    ) VALUES (
      ${lead.business_name}, ${lead.category ?? null}, ${lead.phone ?? null},
      ${lead.email ?? null}, ${lead.address ?? null}, ${lead.city ?? null},
      ${lead.lat ?? null}, ${lead.lon ?? null},
      ${lead.source ?? 'manual'}, ${lead.source_ref ?? null}, ${lead.notes ?? null}
    )
    ON CONFLICT DO NOTHING
    RETURNING *;
  `;
  return rows[0] ?? null;
}

export async function updateLead(
  id: number,
  fields: { status?: string; notes?: string | null; email?: string | null; phone?: string | null }
): Promise<Lead | null> {
  await ensureSchema();
  const { rows } = await sql<Lead>`
    UPDATE leads SET
      status = COALESCE(${fields.status ?? null}, status),
      notes = COALESCE(${fields.notes ?? null}, notes),
      email = COALESCE(${fields.email ?? null}, email),
      phone = COALESCE(${fields.phone ?? null}, phone),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *;
  `;
  return rows[0] ?? null;
}

export async function deleteLead(id: number): Promise<boolean> {
  await ensureSchema();
  const { rowCount } = await sql`DELETE FROM leads WHERE id = ${id};`;
  return (rowCount ?? 0) > 0;
}

/**
 * Source refs already in the CRM, so search results can be marked as saved.
 * Fetches the imported refs and intersects in JS rather than passing an array
 * parameter, which keeps the query trivially correct across driver versions.
 */
export async function existingSourceRefs(refs: string[]): Promise<Set<string>> {
  await ensureSchema();
  if (refs.length === 0) return new Set();

  const { rows } = await sql<{ source_ref: string }>`
    SELECT source_ref FROM leads WHERE source_ref IS NOT NULL;
  `;

  const imported = new Set(rows.map((r) => r.source_ref));
  return new Set(refs.filter((ref) => imported.has(ref)));
}
