import { cookies, headers } from 'next/headers';
import {
  SESSION_COOKIE,
  getSessionSecret,
  verifySessionToken,
} from './auth';

/**
 * The real authorization check. Middleware can be bypassed by header spoofing
 * in some Next.js versions, so every admin page and API route calls this
 * directly and fails closed.
 */
export async function isAuthenticated(): Promise<boolean> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifySessionToken(token, getSessionSecret());
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
