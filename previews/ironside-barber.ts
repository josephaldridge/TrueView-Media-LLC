import type { PreviewContent } from '@/lib/previews/types';

/** Demo build — fictional business, used to show design range. */
const preview: PreviewContent = {
  slug: 'ironside-barber',
  template: 'hospitality',
  businessName: 'Ironside Barber Co.',
  tagline: 'Traditional barbering · Downtown Sherman',
  intro:
    'Hot towels, straight razors and a chair that is yours for the full half hour. Walk in if we have a gap, book ahead if you would rather not wait.',
  phone: '(903) 555-0187',
  email: 'shop@ironsidebarber.com',
  address: '118 West Lamar Street, Sherman, TX 75090',
  serviceArea: 'Sherman & Denison',
  hours: ['Tue–Fri 9am–7pm', 'Sat 8am–4pm', 'Closed Sun & Mon'],
  mapQuery: 'Sherman, Texas',
  accent: '#92400e',
  stats: [
    { value: '30min', label: 'every appointment' },
    { value: '4', label: 'barbers' },
    { value: '2016', label: 'on this corner since' },
  ],
  services: [
    { title: 'Cut & Style', price: '$35', description: 'A proper consultation, a half-hour chair, and a finish that still looks right on day ten.' },
    { title: 'Hot Towel Shave', price: '$45', description: 'Straight razor, hot lather and two towels. The service most shops stopped offering.' },
    { title: 'Beard Shaping', price: '$25', description: 'Line-up, trim and conditioning, shaped to your jaw rather than a stencil.' },
    { title: 'Father & Son', price: '$55', description: 'Two chairs side by side. First haircuts come with a photo and the certificate.' },
  ],
  about:
    'Ironside has been on the corner of Lamar and Travis since 2016. Four barbers, no franchise, and the same chairs we rescued from a shop that closed in Denison.',
  testimonials: [
    { quote: 'Best shave in Grayson County and it is not close.', author: 'Regular since 2017' },
  ],
  ctaLabel: 'Book a Chair',
};

export default preview;
