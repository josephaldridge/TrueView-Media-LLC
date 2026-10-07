# Sales portal

Private workspace at `/portal` for entering leads, keeping company profiles,
writing notes and running sales workflows. Shares the same lead database as
the admin CRM, so a prospect found in **Admin → Find prospects** appears in the
portal immediately.

## Accounts

Two roles, both signing in at `/admin/login` with an email and password:

| Role | Sees | Signs in with |
| --- | --- | --- |
| `admin` | Everything: the portal, plus prospect finder, previews and the lead CRM | `ADMIN_EMAIL` + `ADMIN_PASSWORD` |
| `sales` | The portal only | `SALES_EMAIL` + `SALES_PASSWORD` |

A sales user who tries to reach `/admin` is redirected to `/portal`, and
`/api/admin/*` returns 403. The role is carried inside the signed session
cookie, so it cannot be edited client-side — a tampered token fails the
signature check and is rejected.

## Setup

Add these in **Vercel → Project → Settings → Environment Variables**, then
redeploy. **Never put them in the repository** — it is public.

| Variable | Value |
| --- | --- |
| `SALES_EMAIL` | `sales@trueviewmediallc.com` |
| `SALES_PASSWORD` | the salesperson's password |
| `ADMIN_EMAIL` | your own email (optional — the admin password alone still works) |

`ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` and `POSTGRES_URL` are already set.

To revoke access, change `SALES_PASSWORD` and redeploy. To sign out every
session everywhere at once, rotate `ADMIN_SESSION_SECRET`.

## What it does

**Dashboard** — pipeline counts by stage, every open task across all companies
sorted by due date with overdue ones flagged, and recent activity.

**Companies** — searchable, filterable list. Search matches company name,
customer ID, phone or contact name.

**Company profile** — editable details (contact, phone, email, website,
industry, address, status, deal value, assigned to, next action), a notes
timeline, and the task list.

**Notes** — timestamped and attributed to whoever wrote them. The author comes
from the session, never the browser, so it cannot be faked.

**Workflows** — a named sequence of steps. Running one creates a dated task per
step and records a note on the timeline, so the history explains itself later.

Four are built in, defined in `src/lib/portal/workflows.ts`:

| Workflow | Steps | For |
| --- | --- | --- |
| Cold Outreach | 5 | First contact through to a booked call |
| Preview Sent | 4 | After a live preview has gone out |
| Close & Onboard | 5 | Verbal yes through to a buildable project |
| Post-Launch Follow-Up | 4 | Reviews, referrals and edit work |

Editing that file changes the workflows — each step is a label and a number of
days until it is due.

## Data

Everything lives in the existing Postgres database:

- `leads` — one row per company, with the customer ID
- `lead_notes` — timeline entries, linked to a lead
- `lead_tasks` — workflow steps and one-off tasks

Notes and tasks cascade on delete: removing a company removes its history too.

## Adding more salespeople

The current setup holds one sales account in environment variables, which suits
a single hire. For a team, this needs a `portal_users` table with hashed
passwords and a user-management screen — roughly a day's work, and worth doing
before the second or third hire rather than after.
