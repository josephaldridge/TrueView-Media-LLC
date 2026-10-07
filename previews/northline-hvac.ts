import type { PreviewContent } from '@/lib/previews/types';

/** Showcase build, used to demonstrate design range. */
const preview: PreviewContent = {
  slug: 'northline-hvac',
  template: 'showcase',
  businessName: 'Northline Heating & Air',
  tagline: '24/7 emergency HVAC · North Texas',
  intro:
    'When the air goes out in August, you do not want a callback window. You want someone at the door. We run emergency trucks around the clock and quote before we touch anything.',
  phone: '(972) 555-0119',
  email: 'dispatch@northlinehvac.com',
  address: '3400 Industrial Blvd, Plano, TX 75074',
  serviceArea: 'Plano, Richardson, Allen & Garland',
  hours: ['Open 24/7 for emergencies', 'Office Mon–Fri 7am–6pm'],
  mapQuery: 'Plano, Texas',
  accent: '#0369a1',
  rating: { value: '4.9', count: 312, source: 'Google' },
  stats: [
    { value: '24/7', label: 'emergency service' },
    { value: '312', label: 'five-star reviews' },
    { value: '90min', label: 'average response' },
    { value: '$0', label: 'diagnostic with repair' },
  ],
  services: [
    { title: 'Emergency AC Repair', price: 'from $129', description: 'Round-the-clock trucks stocked for the failures that actually happen: capacitors, compressors, blowers.' },
    { title: 'System Replacement', price: 'quoted', description: 'Load-calculated sizing so you are not cooling a house twice your square footage.' },
    { title: 'Heating & Furnace', price: 'from $119', description: 'Ignition, heat exchanger and thermostat work, with a safety inspection on every call.' },
    { title: 'Maintenance Plans', price: 'from $19/mo', description: 'Two tune-ups a year, priority dispatch and no overtime rates when something breaks at midnight.' },
    { title: 'Indoor Air Quality', price: 'quoted', description: 'Filtration, UV and humidity control for households with allergies or asthma.' },
    { title: 'Ductwork', price: 'quoted', description: 'Leak testing and sealing — most homes lose a quarter of their conditioned air before it reaches a vent.' },
  ],
  bookingServices: ['Emergency AC Repair', 'System Replacement', 'Heating & Furnace', 'Maintenance Plan', 'Indoor Air Quality', 'Ductwork', 'Not sure yet'],
  feature: {
    title: 'Same-Day Emergency Dispatch',
    description: 'Three trucks stay loaded and on call. Most emergency calls are on site within ninety minutes, and we tell you the price before the work starts.',
    bullets: ['Live dispatcher, not an answering service', 'Stocked trucks — most repairs done on the first visit', 'Flat-rate pricing quoted before work begins', 'No overtime surcharge for plan members'],
  },
  about:
    'Northline has run out of the same Plano shop since 2009. Every technician is NATE-certified and background-checked, and we do not pay commission on parts — so nobody here has a reason to sell you a system you do not need.',
  testimonials: [
    { quote: 'Out at 11pm on a Saturday, fixed in an hour, charged exactly what they quoted.', author: 'Daniel R.', source: 'Google review' },
    { quote: 'They talked me out of a full replacement and repaired it for $200.', author: 'Monica S.', source: 'Google review' },
    { quote: 'The maintenance plan has paid for itself twice over.', author: 'Alan P.', source: 'Google review' },
  ],
  serviceAreas: ['Plano', 'Richardson', 'Allen', 'Garland', 'Murphy', 'Wylie', 'Sachse', 'Parker'],
  faqs: [
    { question: 'Do you charge for a diagnostic?', answer: 'There is a diagnostic fee, and we waive it entirely if you go ahead with the repair.' },
    { question: 'How fast can you get here?', answer: 'Emergency calls average ninety minutes. Plan members go to the front of the queue.' },
  ],
  ctaLabel: 'Book a Technician',
  exitOffer: { headline: 'Before you go — free system check', subhead: 'Leave your number and we will book a no-charge inspection at a time that suits you.' },
};

export default preview;
