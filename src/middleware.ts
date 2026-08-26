import { NextRequest, NextResponse } from 'next/server';
import {
  SESSION_COOKIE,
  getSessionSecret,
  verifySessionToken,
} from '@/lib/admin/auth';

/**
 * First line of defence for the admin area. Every admin page and API route
 * ALSO checks the session server-side: middleware alone has historically been
 * bypassable (CVE-2025-29927), so it is treated as a convenience redirect
 * rather than the security boundary.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Client previews are public by design — anyone with the link can view —
  // but must never be indexed.
  if (pathname.startsWith('/preview')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return response;
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const authenticated = await verifySessionToken(token, getSessionSecret());

  // Keep the whole admin surface out of search results.
  const withNoIndex = (response: NextResponse) => {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return response;
  };

  if (pathname === '/admin/login') {
    if (authenticated) {
      return withNoIndex(
        NextResponse.redirect(new URL('/admin', request.url))
      );
    }
    return withNoIndex(NextResponse.next());
  }

  if (!authenticated) {
    if (pathname.startsWith('/api/admin')) {
      return withNoIndex(
        NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
      );
    }
    return withNoIndex(
      NextResponse.redirect(new URL('/admin/login', request.url))
    );
  }

  return withNoIndex(NextResponse.next());
}

export const config = {
  // The login and logout endpoints handle their own access rules.
  matcher: [
    '/admin/:path*',
    '/api/admin/((?!login|logout).*)',
    '/preview/:path*',
  ],
};
