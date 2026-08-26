# Client previews

Each file here is one prospect's preview site. They render at
`/preview/<slug>` and are meant to be sent to a business as a live example of
what you would build for them.

Previews stay up until you delete them. They are excluded from the sitemap and
served with `X-Robots-Tag: noindex`, so they never compete with the client's
real site in search or get indexed under our domain. Anyone with the link can
view one, so treat the link as the only gate.

## Creating a preview

**1. Copy the example**

```bash
cp previews/joes-plumbing.ts previews/acme-dental.ts
```

**2. Edit the fields.** `slug` must match the filename and becomes the URL.
Pick the `template` that fits the business:

| Template | Suits | Character |
| --- | --- | --- |
| `trades` | Plumbers, electricians, HVAC, auto, landscaping | Bold, high contrast, phone number is the loudest thing on the page |
| `hospitality` | Restaurants, cafes, bars, salons | Warm and image-led, hours and location lead |
| `professional` | Consultants, clinics, agencies, offices | Restrained and credibility-first, contact card in the hero |

**3. Register it** in `src/lib/previews/registry.ts`:

```ts
import acmeDental from '@previews/acme-dental';

const previews: PreviewContent[] = [joesPlumbing, acmeDental];
```

The import is deliberate rather than automatic: a malformed preview then fails
the build instead of 404ing in front of a prospect.

**4. Check it locally** at `http://localhost:3000/preview/acme-dental`, then
commit and push. Once deployed, the link is live.

You can see every preview and copy its link from **Admin → Previews**.

## Fields

Required: `slug`, `template`, `businessName`, `tagline`, `intro`, `phone`,
`services`.

Optional: `email`, `address`, `hours`, `serviceArea`, `about`, `testimonials`,
`accent` (hex, overrides the template default), `heroImage` (a path under
`/public` or an absolute https URL), `ctaLabel`, `leadId` (the CRM lead this
was built for).

## Removing a preview

Delete the file, remove it from the registry, and push. The URL 404s
immediately after the deploy.

## A note on content

Preview copy is a sales tool, so write it as your best guess at what the
business does — but do not invent facts a prospect would recognise as false,
and do not fabricate testimonials attributed to real people. The example file
uses clearly illustrative quotes; replace or delete them rather than shipping
invented reviews under real customer names.
