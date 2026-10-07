import { NextRequest, NextResponse } from 'next/server';
import {
  SESSION_COOKIE,
  authenticate,
  createSessionToken,
  getSessionSecret,
  isAdminConfigured,
  sessionCookieOptions,
} from '@/lib/admin/auth';
import {
  isDatabaseConfigured,
  unsupportedConnectionScheme,
} from '@/lib/admin/db';
import {
  checkLoginRateLimit,
  clientIp,
  recordLoginAttempt,
} from '@/lib/admin/rateLimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { message: 'Admin access is not configured on this deployment.' },
      { status: 503 }
    );
  }

  // Reject cross-site posts outright.
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.get('host')) {
        return NextResponse.json({ message: 'Bad request' }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ message: 'Bad request' }, { status: 400 });
    }
  }

  const ip = clientIp(request);

  // Throttling needs the database; without it we refuse rather than allow
  // unlimited guesses.
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { message: 'Admin storage is not configured on this deployment.' },
      { status: 503 }
    );
  }

  // A non-postgres:// URL cannot work with this driver, so say so plainly
  // rather than reporting a generic connection failure.
  const badScheme = unsupportedConnectionScheme();
  if (badScheme) {
    return NextResponse.json(
      {
        message: `The configured database uses a "${badScheme}://" URL, which this app cannot connect to. It needs a standard postgres:// connection string.`,
      },
      { status: 503 }
    );
  }

  let limit;
  try {
    limit = await checkLoginRateLimit(ip);
  } catch {
    return NextResponse.json(
      { message: 'Could not reach the database. Try again shortly.' },
      { status: 503 }
    );
  }

  if (!limit.allowed) {
    return NextResponse.json(
      {
        message: `Too many attempts. Try again in ${limit.retryAfterMinutes} minutes.`,
      },
      { status: 429 }
    );
  }

  let password = '';
  let email = '';
  try {
    const body = await request.json();
    password = typeof body?.password === 'string' ? body.password : '';
    email = typeof body?.email === 'string' ? body.email : '';
  } catch {
    password = '';
  }

  const role = await authenticate(email, password);
  await recordLoginAttempt(ip, role !== null);

  if (!role) {
    // Deliberately identical whether the email or the password was wrong.
    return NextResponse.json(
      {
        message: 'Incorrect email or password.',
        remaining: Math.max(0, limit.remaining - 1),
      },
      { status: 401 }
    );
  }

  const token = await createSessionToken(getSessionSecret(), role, email);
  const response = NextResponse.json({
    success: true,
    role,
    redirect: role === 'sales' ? '/portal' : '/admin',
  });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
  return response;
}
