import type { PreviewContent } from '@/lib/previews/types';

/** Example of the premium template. Fictional business. */
const preview: PreviewContent = {
  slug: 'sample-studio',
  template: 'premium',

  businessName: 'Halverson Interiors',
  tagline: 'Residential interior design · Dallas',
  intro:
    'We design rooms people actually live in. Considered, durable and specific to how your household moves through a space — not a showroom set you are afraid to sit in.',

  phone: '(214) 555-0133',
  email: 'studio@halversoninteriors.com',
  address: '2200 Cedar Springs Road, Dallas, TX 75201',
  serviceArea: 'Dallas, Highland Park & Southlake',
  established: '2014',
  hours: ['Mon–Fri 9am–6pm', 'Saturday by appointment'],
  mapQuery: 'Dallas, Texas',

  stats: [
    { value: '120+', label: 'homes completed' },
    { value: '11', label: 'years designing' },
    { value: '6wk', label: 'typical concept phase' },
    { value: '100%', label: 'in-house drafting' },
  ],

  services: [
    {
      title: 'Full-Home Design',
      price: 'from $12k',
      description:
        'Concept through installation: space planning, finishes, furniture, lighting and styling, coordinated with your builder so nothing arrives twice.',
    },
    {
      title: 'Single Room',
      price: 'from $3.5k',
      description:
        'One room done properly. Ideal for a living room or primary bedroom that has never quite worked despite repeated attempts.',
    },
    {
      title: 'Renovation Consulting',
      price: 'hourly',
      description:
        'Drawings, finish schedules and trade coordination for a remodel you are already committed to, so the details do not get decided on site.',
    },
    {
      title: 'Styling & Handover',
      price: 'from $1.8k',
      description:
        'Final layer — art, textiles, objects — placed and photographed, with a document showing where everything belongs.',
    },
  ],

  about:
    'Halverson began as a one-person operation working out of a spare bedroom and now runs a four-person studio with its own drafting and procurement. We take a limited number of projects each year so the principal stays on every one.',

  testimonials: [
    {
      quote:
        'They caught three things our architect had missed and fixed them before anything was built. Paid for themselves twice over.',
      author: 'Elena & Rob T.',
      source: 'Highland Park',
    },
    {
      quote:
        'The only firm that asked how we actually use the kitchen before drawing anything.',
      author: 'Wes A.',
      source: 'Dallas',
    },
  ],

  accent: '#7c6a46',
  ctaLabel: 'Book a Consultation',
};

export default preview;
