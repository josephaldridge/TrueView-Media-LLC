import type { NewLead } from './db';

/**
 * Normalises inbound lead payloads.
 *
 * Shared by the admin and portal endpoints so both apply identical validation
 * and length limits — two copies of this logic would drift.
 */

export function sanitize(value: unknown, max = 500): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim().slice(0, max);
  return trimmed.length ? trimmed : null;
}

export function prepareLeads(input: unknown): NewLead[] {
  const incoming = Array.isArray(input) ? input : [input];
  const prepared: NewLead[] = [];

  for (const raw of incoming) {
    if (!raw || typeof raw !== 'object') continue;
    const item = raw as Record<string, unknown>;
    const name = sanitize(item.business_name ?? item.name, 200);
    if (!name) continue;

    prepared.push({
      business_name: name,
      contact_name: sanitize(item.contact_name, 120),
      website: sanitize(item.website, 300),
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

  return prepared;
}
