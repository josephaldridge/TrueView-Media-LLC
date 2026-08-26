import { createPool, type VercelPool } from '@vercel/postgres';

/**
 * Connection string, taken from whichever variable the storage provider set.
 * Different Vercel integrations use different names.
 */
function connectionString(): string | undefined {
  return (
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_URL ||
    undefined
  );
}

/**
 * Prisma Postgres hands out a `prisma+postgres://` Accelerate proxy URL, which
 * speaks Prisma's HTTP protocol rather than the PostgreSQL wire protocol this
 * driver needs. Detecting it lets us say so instead of failing obscurely.
 */
export function unsupportedConnectionScheme(): string | null {
  const url = connectionString();
  if (!url) return null;
  const scheme = url.split(':')[0].toLowerCase();
  if (scheme === 'postgres' || scheme === 'postgresql') return null;
  return scheme;
}

let pool: VercelPool | null = null;

function getPool(): VercelPool {
  if (!pool) {
    const url = connectionString();
    if (!url) throw new Error('No database connection string is configured.');

    const scheme = unsupportedConnectionScheme();
    if (scheme) {
      throw new Error(
        `This database uses a "${scheme}://" URL, which needs a different client. ` +
          'A standard postgres:// connection string is required.'
      );
    }

    pool = createPool({ connectionString: url });
  }
  return pool;
}

/** Tagged-template proxy so query call sites stay unchanged. */
const sql: VercelPool['sql'] = (strings, ...values) =>
  getPool().sql(strings, ...values);

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
  /** Zero-padded sequential customer number, e.g. '0001'. */
  customer_id: string | null;
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
  return Boolean(connectionString());
}

/**
 * Set when customer numbering could not be applied, so the UI can say so
 * rather than silently showing blank ids.
 */
export let customerNumberingError: string | null = null;

/**
 * Adds sequential customer numbers and backfills existing leads.
 *
 * Deliberately non-fatal: this runs inside schema setup, which login depends
 * on, so a failure here must degrade to "leads without numbers" rather than
 * locking the admin out entirely.
 */
async function applyCustomerNumbering(): Promise<void> {
  try {
      // --- Customer numbers -------------------------------------------------
      // Every lead carries a sequential, zero-padded customer id ('0001') so
      // work can be tagged back to the right company. Each step is idempotent,
      // so this is safe to run on every cold start.

      await sql`CREATE SEQUENCE IF NOT EXISTS leads_customer_id_seq;`;

      await sql`
        ALTER TABLE leads ADD COLUMN IF NOT EXISTS customer_id TEXT;
      `;

      // Backfill anything without a number, oldest lead first, continuing on
      // from the highest number already issued.
      await sql`
        WITH base AS (
          SELECT COALESCE(MAX(customer_id::bigint), 0) AS started_at
          FROM leads
          WHERE customer_id ~ '^[0-9]+$'
        ),
        numbered AS (
          SELECT id, ROW_NUMBER() OVER (ORDER BY created_at, id) AS position
          FROM leads
          WHERE customer_id IS NULL
        )
        UPDATE leads AS l
        SET customer_id = to_char(base.started_at + numbered.position, 'FM0000')
        FROM numbered, base
        WHERE l.id = numbered.id;
      `;

      // Point the sequence past whatever has been issued. Including the
      // sequence's own last_value keeps this monotonic: a later cold start can
      // never drag it backwards over numbers already handed out.
      //
      // The third argument is is_called — false means the next value returned
      // is this one, which is what makes an empty table start at 0001 rather
      // than 0002.
      await sql`
        SELECT setval(
          'leads_customer_id_seq',
          GREATEST(
            (
              SELECT COALESCE(MAX(customer_id::bigint), 0)
              FROM leads WHERE customer_id ~ '^[0-9]+$'
            ),
            (SELECT last_value FROM leads_customer_id_seq),
            1
          ),
          (
            (
              SELECT COALESCE(MAX(customer_id::bigint), 0)
              FROM leads WHERE customer_id ~ '^[0-9]+$'
            ) > 0
            OR (SELECT is_called FROM leads_customer_id_seq)
          )
        );
      `;

      // Applied after the backfill so new inserts cannot collide with it.
      // FM0000 pads to four digits and keeps growing past 9999 rather than
      // truncating, which LPAD would do.
      await sql`
        ALTER TABLE leads
        ALTER COLUMN customer_id
        SET DEFAULT to_char(nextval('leads_customer_id_seq'), 'FM0000');
      `;

      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS leads_customer_id_idx
        ON leads (customer_id);
      `;
    customerNumberingError = null;
  } catch (error) {
    customerNumberingError =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Customer numbering migration failed:', error);
  }
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

      await applyCustomerNumbering();
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
