import type { PreviewContent } from '@/lib/previews/types';

/** Example of the professional template. Fictional business. */
const preview: PreviewContent = {
  slug: 'sample-dental',
  template: 'professional',

  businessName: 'Northgate Family Dental',
  tagline: 'General & cosmetic dentistry',
  intro:
    'A small practice where you see the same dentist each visit. We explain what we find, what it costs, and what happens if you wait — then let you decide.',

  phone: '(972) 555-0176',
  email: 'reception@northgatefamilydental.com',
  address: '3300 Preston Road, Suite 210, Plano, TX 75093',
  serviceArea: 'Plano & North Dallas',
  hours: ['Mon–Thu 8am–5pm', 'Fri 8am–1pm'],

  services: [
    {
      title: 'Preventive Care',
      description:
        'Cleanings, exams and digital X-rays, with a written plan for anything we spot so there are no surprises later.',
    },
    {
      title: 'Restorative Work',
      description:
        'Fillings, crowns and bridges, colour-matched and fitted in as few visits as the work safely allows.',
    },
    {
      title: 'Cosmetic Dentistry',
      description:
        'Whitening, bonding and veneers, with a preview of the result before we begin anything irreversible.',
    },
    {
      title: 'Emergency Appointments',
      description:
        'Same-day slots held every morning for pain, breaks and lost restorations.',
    },
  ],

  about:
    'Northgate has been in the same building since 2004. Two dentists, four hygienists, and a front desk that will tell you what your insurance actually covers before you commit to treatment.',

  testimonials: [
    {
      quote:
        'First dentist who showed me the X-ray and explained why the work could wait six months. Saved me a fortune.',
      author: 'Priya N.',
    },
    {
      quote: 'They got my son in the same morning he chipped a tooth.',
      author: 'Tom B.',
    },
  ],

  accent: '#0f766e',
  ctaLabel: 'Book a Consultation',
};

export default preview;
