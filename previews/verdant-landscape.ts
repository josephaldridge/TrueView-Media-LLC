import type { PreviewContent } from '@/lib/previews/types';

/** Demo build — fictional business, used to show design range. */
const preview: PreviewContent = {
  slug: 'verdant-landscape',
  template: 'trades',
  businessName: 'Verdant Lawn & Landscape',
  tagline: 'Full-service grounds care since 2011',
  intro:
    'Weekly maintenance, seasonal cleanups and full landscape builds. The same crew every visit, so nobody has to be told twice where the sprinkler heads are.',
  phone: '(214) 555-0178',
  email: 'office@verdantlawntx.com',
  address: '812 Oak Grove Road, McKinney, TX 75071',
  serviceArea: 'McKinney, Allen, Frisco & Prosper',
  hours: ['Mon–Fri 7am–6pm', 'Sat 8am–2pm'],
  mapQuery: 'McKinney, Texas',
  accent: '#15803d',
  stats: [
    { value: '14', label: 'years in business' },
    { value: '600+', label: 'properties maintained' },
    { value: '4.9★', label: 'average rating' },
    { value: '48hr', label: 'quote turnaround' },
  ],
  services: [
    { title: 'Weekly Maintenance', price: 'from $45', description: 'Mow, edge, blow and bag on a fixed schedule, with the same crew each week.' },
    { title: 'Landscape Design', price: 'quoted', description: 'Beds, borders, lighting and planting plans drawn before a shovel touches the ground.' },
    { title: 'Irrigation Repair', price: 'from $95', description: 'Zone diagnostics, head replacement and controller programming that actually matches your watering days.' },
    { title: 'Seasonal Cleanup', price: 'from $220', description: 'Leaf removal, bed refresh, mulch and pruning before the weather turns.' },
  ],
  about:
    'Verdant started with one truck and a push mower in 2011. Fourteen years later we run four crews and still answer our own phone.',
  testimonials: [
    { quote: 'Third company we tried and the first one that showed up the same day every week.', author: 'Karen M.', source: 'Allen' },
    { quote: 'They redid the whole front bed for less than the quote I got from a designer.', author: 'Rick T.', source: 'Frisco' },
  ],
  ctaLabel: 'Get a Free Quote',
};

export default preview;
