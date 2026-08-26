# Admin area

Private lead-generation tooling at `/admin`. Two parts:

- **Find prospects** — searches OpenStreetMap for businesses with no website
- **Leads** — a small CRM holding what you save, with status and notes

Nothing on the public site links here, the routes are excluded from the
sitemap, and every admin response carries `X-Robots-Tag: noindex, nofollow`.

## One-time setup

### 1. Attach a Postgres database

In the Vercel dashboard: **Storage → Create Database → Postgres**, then connect
it to this project. Vercel injects `POSTGRES_URL` automatically. Tables are
created on first use — there is no migration step to run.

### 2. Set the admin secrets

In **Project → Settings → Environment Variables**, add:

| Variable | Value |
| --- | --- |
| `ADMIN_PASSWORD` | The password you will type to sign in |
| `ADMIN_SESSION_SECRET` | Output of `openssl rand -base64 48` |

Set both for **Production** (and Preview if you want admin access there).
Redeploy for them to take effect.

### 3. Sign in

Visit `https://trueviewmediallc.com/admin`. You will be sent to the login page.

## How the security works

- Password is compared in constant time, after hashing both sides so the
  comparison never leaks length.
- A successful login issues an **HMAC-SHA256 signed** session cookie that is
  `httpOnly`, `secure`, `SameSite=Lax`, and expires after 8 hours.
- Failed logins are throttled to **5 per 15 minutes per IP**, counted in the
  database so the limit survives across serverless invocations.
- Every admin page and API route verifies the session **server-side**.
  Middleware also checks, but is deliberately not the only gate: Next.js
  middleware has been bypassable via header spoofing in the past
  (CVE-2025-29927), so it is treated as a convenience redirect.
- Mutating endpoints additionally verify the request `Origin` matches the host.

If `ADMIN_PASSWORD` or `ADMIN_SESSION_SECRET` is missing, the admin fails
closed — it will not let anyone in.

## About the prospect data

Results come from the **Overpass API** over OpenStreetMap data, which is free
and needs no key. Two things worth knowing:

1. **A missing website tag is not proof of no website.** OSM is
   community-maintained and often simply lacks the field. National chains are
   filtered out (anything carrying `brand`, `brand:wikidata`, or `operator`
   tags), which removes most obvious false positives, but some slip through.
2. **Most entries have no phone number.** The search hides those by default,
   since they are not directly actionable. Untick the filter to see everything.

In practice, expect to verify a prospect before calling. If the false-positive
rate becomes a problem, the Google Places API returns an authoritative
`websiteUri` field; `src/lib/admin/overpass.ts` is isolated enough that a
second provider can be added alongside it.

Both Nominatim and Overpass are volunteer-run. Requests identify this app via a
`User-Agent`, geocoding results are cached for a day, and result counts are
capped — please keep searches reasonable.

## Layout

```
src/
  app/
    admin/                 login page, leads dashboard, prospect finder
    api/admin/             login, logout, prospects, leads CRUD
  components/admin/        admin-only UI
  lib/admin/
    auth.ts                session signing and password check (Web Crypto)
    guard.ts               server-side authorization used by every route
    db.ts                  schema and lead queries
    overpass.ts            OpenStreetMap search
    rateLimit.ts           login throttling
  middleware.ts            first-pass gate + noindex headers
```
