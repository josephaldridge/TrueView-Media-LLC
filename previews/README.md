# Client previews

Each file here is one prospect's preview site, rendered at `/preview/<slug>`.
The goal is that a business owner opens the link and sees *their* business —
their name, their phone, their services — not a generic mockup.

Previews stay up until you delete them, are excluded from the sitemap, and are
served `noindex` so they never compete with the client's real site. Anyone
with the link can view one, so the link is the only gate.

## Sending work to Claude

For each business, paste this and you get a finished preview:

```
Business name:
Phone:
Address:
What they do (a sentence or two):
Services (3-6, with rough prices if you know them):
Hours:
Years in business / established:
License number (trades):
Anything they're known for locally:
Template: trades | hospitality | professional | premium
Accent colour (or "pick one"):
```

Minimum viable is **name, phone, and what they do** — the rest can be inferred
or left out. Everything you add makes it land harder.

### Where to get the details

- **Find prospects** in the admin already returns name, category, address and
  phone from OpenStreetMap — that is most of the form filled in.
- Their Google Business listing usually has hours, photos and review wording.
- A Facebook page often has services and the owner's own description.

## Templates

| Template | Suits | Character |
| --- | --- | --- |
| `trades` | Plumbers, HVAC, electricians, auto, landscaping | Bold and high contrast. Phone number is the loudest element, stat strip for credibility, prices on service cards |
| `hospitality` | Restaurants, cafes, bars, salons | Warm and editorial. Serif display type, hours and location lead |
| `professional` | Consultants, clinics, agencies, offices | Restrained and credibility-first. Contact card in the hero, glass panels |
| `premium` | Design studios, custom builders, high-end services | Dark and glassmorphic. Mesh accent glow, frosted cards, gradient stat figures, reveals throughout |

All four use scroll reveals, glass surfaces and hover lift, and all four are
driven by `accent` — so two clients on the same template do not look alike.

## Fields

**Required:** `slug`, `template`, `businessName`, `tagline`, `intro`, `phone`,
`services`.

**Contact:** `email`, `address`, `hours`, `serviceArea`, `license`,
`established`, `mapQuery` (free-text place for the OpenStreetMap embed — no
API key needed).

**Content:** `about`, `testimonials` (each with `quote`, `author`, optional
`source`), `stats` (three or four `{ value, label }` proof points),
`gallery` (`{ src, alt }`), and `price` on any service.

**Look:** `accent` (hex — drives buttons, glows, highlights), `heroImage`,
`logo`.

**Links:** `ctaLabel`, `socials`, `leadId` to tie the preview to a CRM lead.

## Doing it yourself

```bash
cp previews/joes-plumbing.ts previews/acme-dental.ts
```

Edit the fields, then register it in `src/lib/previews/registry.ts`:

```ts
import acmeDental from '@previews/acme-dental';

const previews: PreviewContent[] = [joesPlumbing, acmeDental];
```

The import is deliberate rather than automatic: a malformed preview fails the
build instead of 404ing in front of a prospect. Check it at
`http://localhost:3000/preview/acme-dental`, then push.

Every preview and its link is listed under **Admin → Previews**.

## Images

Drop files in `public/previews/<slug>/` and reference them as
`/previews/<slug>/hero.jpg`. Absolute `https://` URLs also work.

Only use photos you have the right to use — the business's own pictures from
their Facebook or Google listing are usually safe to show back to them in a
pitch, but do not put another company's photography on a preview.

## Honesty

The preview is a sales tool, and it works because it looks real. That cuts
both ways:

- **Do not invent testimonials attributed to named people.** Either use real
  review wording (with `source: 'Google review'`) or leave testimonials out.
  Fabricated reviews under real names are the one thing here that could
  actually get you into legal trouble.
- **Do not invent licence numbers, certifications, or years in business.** Get
  them right or omit the field.
- Approximate service descriptions and placeholder prices are fine — that is
  clearly a draft for them to correct.

The example files (`joes-plumbing`, `sample-cafe`, `sample-dental`,
`sample-studio`) are fictional businesses for demonstrating the templates.
