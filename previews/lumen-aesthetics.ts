import type { PreviewContent } from '@/lib/previews/types';

/** Showcase build, used to demonstrate design range. */
const preview: PreviewContent = {
  slug: 'lumen-aesthetics',
  template: 'premium',
  businessName: 'Lumen Aesthetics',
  tagline: 'Medical aesthetics · Frisco',
  intro:
    'Injectables, lasers and skin therapy delivered by medical staff, in a room that does not feel like a clinic. Every plan starts with a consultation and a realistic picture of results.',
  phone: '(469) 555-0145',
  email: 'hello@lumenaesthetics.com',
  address: '6175 Main Street, Suite 240, Frisco, TX 75034',
  serviceArea: 'Frisco, Plano & Prosper',
  hours: ['Tue–Fri 10am–7pm', 'Sat 9am–3pm'],
  mapQuery: 'Frisco, Texas',
  accent: '#a16a8a',
  stats: [
    { value: '9', label: 'years open' },
    { value: '4.9★', label: 'patient rating' },
    { value: 'RN', label: 'led injectables' },
    { value: '0', label: 'pressure to rebook' },
  ],
  services: [
    { title: 'Injectables', price: 'from $12/unit', description: 'Neuromodulators and dermal filler placed by a registered nurse injector, mapped to your face rather than a template.' },
    { title: 'Laser Resurfacing', price: 'from $450', description: 'Fractional treatment for texture, scarring and pigment, with a downtime plan you can actually schedule around.' },
    { title: 'Medical Facials', price: 'from $160', description: 'Clinical-grade peels and hydrafacials, prescribed after a skin analysis rather than picked off a menu.' },
    { title: 'Skin Consultations', price: 'complimentary', description: 'A proper assessment and a written plan, with no obligation to book anything on the day.' },
  ],
  about:
    'Lumen is physician-supervised and nurse-led. We decline more treatments than we sell, because the fastest way to lose a patient is to give them a result they did not ask for.',
  testimonials: [
    { quote: 'First place that told me I did not need filler yet. I have been going back for four years.', author: 'Patient, Frisco' },
    { quote: 'Natural results. Nobody can tell, which is exactly the point.', author: 'Patient, Plano' },
  ],
  ctaLabel: 'Book a Consultation',
};

export default preview;
