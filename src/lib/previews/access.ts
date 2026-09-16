import { getSessionSecret } from '@/lib/admin/auth';
import type { PreviewContent } from './types';

/**
 * Access control for time-limited previews.
 *
 * A preview goes dark at its expiry for the public, but stays reachable to the
 * owner of the site through a keyed URL. The key is derived from the admin
 * session secret rather than stored anywhere, so there is nothing extra to
 * configure and each preview gets its own.
 */

const encoder = new TextEncoder();

export function isExpired(
  content: PreviewContent,
  now: number = Date.now()
): boolean {
  if (!content.expiresAt) return false;
  const expiry = Date.parse(content.expiresAt);
  if (Number.isNaN(expiry)) return false;
  return now >= expiry;
}

export function expiryTime(content: PreviewContent): number | null {
  if (!content.expiresAt) return null;
  const expiry = Date.parse(content.expiresAt);
  return Number.isNaN(expiry) ? null : expiry;
}

/**
 * Per-preview unlock key. Changing ADMIN_SESSION_SECRET rotates every key at
 * once, which is the desired behaviour if a link ever leaks.
 */
export async function previewUnlockKey(slug: string): Promise<string> {
  const secret = getSessionSecret();
  if (!secret) return '';

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(`preview-unlock:${slug}`)
  );

  return Array.from(new Uint8Array(signature))
    .slice(0, 10)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Comparison that does not leak where two keys diverge. */
export function keysMatch(a: string, b: string): boolean {
  if (!a || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
