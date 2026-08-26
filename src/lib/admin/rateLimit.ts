import { sql } from '@vercel/postgres';
import { ensureSchema } from './db';

const MAX_ATTEMPTS = 5;
const WINDOW_MINUTES = 15;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterMinutes: number;
}

/**
 * Login throttling has to survive across serverless invocations, so attempts
 * are counted in the database rather than in process memory.
 */
export async function checkLoginRateLimit(ip: string): Promise<RateLimitResult> {
  await ensureSchema();

  const { rows } = await sql<{ count: string }>`
    SELECT COUNT(*) AS count FROM admin_login_attempts
    WHERE ip = ${ip}
      AND succeeded = FALSE
      AND attempted_at > NOW() - (${WINDOW_MINUTES} * INTERVAL '1 minute');
  `;

  const failures = Number(rows[0]?.count ?? 0);
  return {
    allowed: failures < MAX_ATTEMPTS,
    remaining: Math.max(0, MAX_ATTEMPTS - failures),
    retryAfterMinutes: WINDOW_MINUTES,
  };
}

export async function recordLoginAttempt(
  ip: string,
  succeeded: boolean
): Promise<void> {
  await ensureSchema();
  await sql`
    INSERT INTO admin_login_attempts (ip, succeeded) VALUES (${ip}, ${succeeded});
  `;
  // A successful login clears the slate for that address.
  if (succeeded) {
    await sql`
      DELETE FROM admin_login_attempts
      WHERE ip = ${ip} AND succeeded = FALSE;
    `;
  }
  // Keep the table from growing without bound.
  await sql`
    DELETE FROM admin_login_attempts WHERE attempted_at < NOW() - INTERVAL '7 days';
  `;
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}
