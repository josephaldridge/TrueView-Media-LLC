import type { PreviewContent } from '@/lib/previews/types';

/** Example of the hospitality template. Fictional business. */
const preview: PreviewContent = {
  slug: 'sample-cafe',
  template: 'hospitality',

  businessName: 'The Copper Kettle',
  tagline: 'Breakfast & lunch · Downtown Plano',
  intro:
    'Slow mornings, proper coffee and a kitchen that starts baking at four. Everything on the board is made here, most of it before you are awake.',

  phone: '(972) 555-0198',
  email: 'hello@coppperkettleplano.com',
  address: '1015 E 15th Street, Plano, TX 75074',
  hours: ['Mon–Fri 7am–3pm', 'Sat–Sun 8am–4pm', 'Kitchen closes 30 min early'],

  services: [
    {
      title: 'Morning Menu',
      description:
        'Sourdough from our own starter, eggs from a farm forty minutes away, and pastries that sell out by ten most days.',
    },
    {
      title: 'Coffee',
      description:
        'Single origin on filter, a house espresso blend roasted for milk, and staff who will happily talk you through either.',
    },
    {
      title: 'Lunch',
      description:
        'A short board that changes with what the kitchen finds that week. Always a sandwich, a grain bowl and a soup.',
    },
    {
      title: 'Private Hire',
      description:
        'The back room seats twenty for meetings, showers and small parties, with a set menu we build with you.',
    },
  ],

  about:
    'We opened in a narrow storefront in 2016 with one espresso machine and a borrowed oven. The oven is still here. So are most of the regulars from that first winter.',

  testimonials: [
    {
      quote: 'The best flat white in the county, and it is not close.',
      author: 'Sam O., regular since 2017',
    },
  ],

  accent: '#a16207',
  ctaLabel: 'Book a Table',
};

export default preview;
