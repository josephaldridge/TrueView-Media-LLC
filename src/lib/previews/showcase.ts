/**
 * Builds featured on the homepage carousel.
 *
 * Curated by hand rather than derived from the registry, so a live client
 * preview (which may expire) can never end up linked from the marketing site.
 */

export interface ShowcaseEntry {
  slug: string;
  businessName: string;
  industry: string;
  /** One line on what the build is doing for that kind of business. */
  note: string;
  thumbnail: string;
}

export const SHOWCASE: ShowcaseEntry[] = [
  {
    slug: 'northline-hvac',
    businessName: 'Northline Heating & Air',
    industry: 'HVAC',
    note: 'Emergency dispatch front and centre, booking form on every screen',
    thumbnail: '/work/northline-hvac.jpg',
  },
  {
    slug: 'verdant-landscape',
    businessName: 'Verdant Lawn & Landscape',
    industry: 'Landscaping',
    note: 'Route-density messaging and per-service pricing',
    thumbnail: '/work/verdant-landscape.jpg',
  },
  {
    slug: 'lumen-aesthetics',
    businessName: 'Lumen Aesthetics',
    industry: 'Med Spa',
    note: 'Premium feel without losing the consultation CTA',
    thumbnail: '/work/lumen-aesthetics.jpg',
  },
  {
    slug: 'forge-strength',
    businessName: 'Forge Strength Co.',
    industry: 'Fitness',
    note: 'Free-session offer wired to an exit-intent capture',
    thumbnail: '/work/forge-strength.jpg',
  },
  {
    slug: 'calloway-reed-law',
    businessName: 'Calloway & Reed',
    industry: 'Law Firm',
    note: 'Credibility-first layout with the contact card above the fold',
    thumbnail: '/work/calloway-reed-law.jpg',
  },
  {
    slug: 'joes-plumbing',
    businessName: "Joe's Plumbing & Drain",
    industry: 'Plumbing',
    note: 'Phone number as the loudest element on the page',
    thumbnail: '/work/joes-plumbing.jpg',
  },
  {
    slug: 'ironside-barber',
    businessName: 'Ironside Barber Co.',
    industry: 'Barbershop',
    note: 'Editorial styling for a walk-in trade',
    thumbnail: '/work/ironside-barber.jpg',
  },
  {
    slug: 'sample-dental',
    businessName: 'Northgate Family Dental',
    industry: 'Dentistry',
    note: 'Insurance and booking answered before the scroll',
    thumbnail: '/work/sample-dental.jpg',
  },
  {
    slug: 'sample-studio',
    businessName: 'Halverson Interiors',
    industry: 'Interior Design',
    note: 'Glassmorphism and scroll reveals on a dark canvas',
    thumbnail: '/work/sample-studio.jpg',
  },
  {
    slug: 'sample-cafe',
    businessName: 'The Copper Kettle',
    industry: 'Cafe',
    note: 'Hours and location lead, because that is what people search',
    thumbnail: '/work/sample-cafe.jpg',
  },
];
