/**
 * Session handling for the admin area.
 *
 * Everything here uses Web Crypto only, so the same helpers run in the Edge
 * middleware and in Node route handlers. Tokens are HMAC-SHA256 signed and
 * carry their own expiry.
 */

export const SESSION_COOKIE = 'tvm_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

const encoder = new TextEncoder();

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(value: string): Uint8Array {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(padded.padEnd(Math.ceil(padded.length / 4) * 4, '='));
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

/** Comparison whose duration does not depend on where the values differ. */
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function sha256(value: string): Promise<Uint8Array> {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(value));
  return new Uint8Array(digest);
}

async function sign(payload: string, secret: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return new Uint8Array(signature);
}

/**
 * Compares a submitted password against the configured one. Both sides are
 * hashed first so the comparison length never leaks the real password length.
 */
export async function verifyPassword(
  submitted: string,
  expected: string
): Promise<boolean> {
  if (!expected) return false;
  const [a, b] = await Promise.all([sha256(submitted), sha256(expected)]);
  return timingSafeEqual(a, b);
}

export async function createSessionToken(secret: string): Promise<string> {
  const payload = base64UrlEncode(
    encoder.encode(
      JSON.stringify({
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
      })
    )
  );
  const signature = base64UrlEncode(await sign(payload, secret));
  return `${payload}.${signature}`;
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string
): Promise<boolean> {
  if (!token || !secret) return false;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  let expected: Uint8Array;
  let provided: Uint8Array;
  try {
    expected = await sign(payload, secret);
    provided = base64UrlDecode(signature);
  } catch {
    return false;
  }

  if (!timingSafeEqual(expected, provided)) return false;

  // Signature is valid, so the payload can be trusted enough to read.
  try {
    const decoded = JSON.parse(new TextDecoder().decode(base64UrlDecode(payload)));
    return typeof decoded.exp === 'number' && decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

export function sessionCookieOptions(maxAge: number = SESSION_TTL_SECONDS) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
  };
}

export function getSessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? '';
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? '';
}

/** True only when both secrets are configured, so we fail closed if not. */
export function isAdminConfigured(): boolean {
  return Boolean(getSessionSecret() && getAdminPassword());
}
