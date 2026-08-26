import type { PreviewContent } from '@/lib/previews/types';

/**
 * Example preview. Copy this file, rename it to your prospect's slug, edit the
 * fields, then register it in src/lib/previews/registry.ts.
 */
const preview: PreviewContent = {
  slug: 'joes-plumbing',
  template: 'trades',

  businessName: "Joe's Plumbing & Drain",
  tagline: 'Licensed plumbers serving Plano since 2009',
  intro:
    'Burst pipe at midnight or a slow drain that finally gave up — we answer the phone and we show up when we say we will. No call-out fee, no surprises on the invoice.',

  phone: '(972) 555-0142',
  email: 'service@joesplumbingplano.com',
  address: '1420 K Avenue, Plano, TX 75074',
  serviceArea: 'Plano, Allen, Richardson & McKinney',
  hours: ['Mon–Fri 7am–7pm', 'Sat 8am–4pm', 'Emergency service 24/7'],

  services: [
    {
      title: 'Emergency Repairs',
      description:
        'Burst pipes, blocked mains, no hot water. We take emergency calls around the clock and most jobs are fixed on the first visit.',
    },
    {
      title: 'Drain Cleaning',
      description:
        'Camera inspection to find the real problem, then hydro-jetting that clears it properly instead of pushing it further down the line.',
    },
    {
      title: 'Water Heaters',
      description:
        'Repair, replacement and tankless installs. We size the unit to your household so you are not paying to heat water you never use.',
    },
    {
      title: 'Bathroom & Kitchen',
      description:
        'Fixture replacement, re-pipes and remodel rough-ins, finished clean and inspected.',
    },
  ],

  about:
    'Joe started this company after fifteen years working for someone else, tired of watching customers get upsold on work they did not need. Every plumber here is licensed and insured, and we quote the job before we start it.',

  testimonials: [
    {
      quote:
        'Called at 9pm with water coming through the kitchen ceiling. Someone was here in under an hour and stayed until it was dry.',
      author: 'Marcus R., Plano',
    },
    {
      quote:
        'Quoted me half what the big outfit wanted and explained exactly why the other guys were wrong.',
      author: 'Dana W., Allen',
    },
  ],

  ctaLabel: 'Request a Free Quote',
};

export default preview;
