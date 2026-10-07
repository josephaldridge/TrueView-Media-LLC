import { cookies, headers } from 'next/headers';
import {
  SESSION_COOKIE,
  getSessionSecret,
  readSession,
  type Role,
  type Session,
} from './auth';

/**
 * The real authorization check. Middleware can be bypassed by header spoofing
 * in some Next.js versions, so every admin page and API route calls this
 * directly and fails closed.
 */
export async function getSession(): Promise<Session | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return readSession(token, getSessionSecret());
}

/** Any signed-in user. */
export async function isAuthenticated(): Promise<boolean> {
  return (await getSession()) !== null;
}

/** Signed in AND holding one of the given roles. */
export async function hasRole(...roles: Role[]): Promise<boolean> {
  const session = await getSession();
  return session !== null && roles.includes(session.role);
}

/** The admin tools stay admin-only; the portal is open to both roles. */
export async function isAdmin(): Promise<boolean> {
  return hasRole('admin');
}

/**
 * Blocks cross-site form posts. The session cookie is SameSite=Lax, which
 * already stops most of this; comparing Origin to Host closes the gap.
 */
export function isSameOrigin(): boolean {
  const headerList = headers();
  const origin = headerList.get('origin');
  if (!origin) return true; // same-origin navigations may omit it
  const host = headerList.get('host');
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
