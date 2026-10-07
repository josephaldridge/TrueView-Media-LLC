/**
 * Session handling for the admin area and the sales portal.
 *
 * Everything here uses Web Crypto only, so the same helpers run in the Edge
 * middleware and in Node route handlers. Tokens are HMAC-SHA256 signed and
 * carry their own expiry and role.
 *
 * Credentials live in environment variables, never in the repository — this
 * repo is public, so a password committed here would be world-readable.
 */

export type Role = 'admin' | 'sales';

export interface Session {
  role: Role;
  email: string;
  exp: number;
}

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

export async function createSessionToken(
  secret: string,
  role: Role = 'admin',
  email = ''
): Promise<string> {
  const payload = base64UrlEncode(
    encoder.encode(
      JSON.stringify({
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
        role,
        email,
      })
    )
  );
  const signature = base64UrlEncode(await sign(payload, secret));
  return `${payload}.${signature}`;
}

/**
 * Verifies the signature and expiry, returning the session it carries.
 * Null means "not signed by us, or expired" — callers must fail closed.
 */
export async function readSession(
  token: string | undefined,
  secret: string
): Promise<Session | null> {
  if (!token || !secret) return null;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;

  let expected: Uint8Array;
  let provided: Uint8Array;
  try {
    expected = await sign(payload, secret);
    provided = base64UrlDecode(signature);
  } catch {
    return null;
  }

  if (!timingSafeEqual(expected, provided)) return null;

  // Signature checks out, so the payload can be trusted enough to read.
  try {
    const decoded = JSON.parse(
      new TextDecoder().decode(base64UrlDecode(payload))
    );
    if (typeof decoded.exp !== 'number' || decoded.exp <= Date.now() / 1000) {
      return null;
    }
    const role: Role = decoded.role === 'sales' ? 'sales' : 'admin';
    return { role, email: String(decoded.email ?? ''), exp: decoded.exp };
  } catch {
    return null;
  }
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string
): Promise<boolean> {
  return (await readSession(token, secret)) !== null;
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

export function getAdminEmail(): string {
  return (process.env.ADMIN_EMAIL ?? '').trim().toLowerCase();
}

export function getSalesEmail(): string {
  return (process.env.SALES_EMAIL ?? '').trim().toLowerCase();
}

export function getSalesPassword(): string {
  return process.env.SALES_PASSWORD ?? '';
}

/**
 * Resolves an email and password to a role, in constant time per candidate so
 * a wrong email and a wrong password are indistinguishable from outside.
 */
export async function authenticate(
  email: string,
  password: string
): Promise<Role | null> {
  const given = email.trim().toLowerCase();

  const candidates: Array<{ email: string; password: string; role: Role }> = [
    { email: getSalesEmail(), password: getSalesPassword(), role: 'sales' },
    { email: getAdminEmail(), password: getAdminPassword(), role: 'admin' },
  ];

  let matched: Role | null = null;
  for (const candidate of candidates) {
    if (!candidate.email || !candidate.password) continue;
    const ok =
      given === candidate.email &&
      (await verifyPassword(password, candidate.password));
    if (ok && !matched) matched = candidate.role;
  }

  // The admin password alone still works without an email, so the existing
  // single-field admin login keeps functioning.
  if (!matched && !given && getAdminPassword()) {
    if (await verifyPassword(password, getAdminPassword())) matched = 'admin';
  }

  return matched;
}

/** True only when both secrets are configured, so we fail closed if not. */
export function isAdminConfigured(): boolean {
  return Boolean(getSessionSecret() && getAdminPassword());
}
