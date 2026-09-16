import type { PreviewContent } from '@/lib/previews/types';

/**
 * Major League Detailing & Customs — Van Alstyne, TX.
 *
 * Details, hours, phone, rating and review wording all come from the
 * business's own Google Business Profile. Nothing here is invented: no prices
 * are quoted, because theirs are not published, and no reviews are attributed
 * to anyone who did not write one.
 */
const IMAGES = '/previews/major-league-detailing';

const preview: PreviewContent = {
  slug: 'major-league-detailing',
  template: 'showcase',

  businessName: 'Major League Detailing & Customs',
  tagline: 'Welcome to the show',
  intro:
    "North Texas' trusted choice for premium mobile auto detailing and vehicle customization. We bring professional-grade service to your driveway or workplace and treat every vehicle like it's our own.",

  // --- Real details from their Google listing ---
  phone: '(469) 544-4638',
  address: '1660 Jameson Rd, Van Alstyne, TX 75495',
  serviceArea: 'Van Alstyne & the North DFW area',
  hours: ['Open 7 days · 8 AM – 6 PM'],
  mapQuery: 'Van Alstyne, Texas',

  rating: { value: '5.0', count: 20, source: 'Google' },

  stats: [
    { value: '5.0★', label: 'Google rating' },
    { value: '20', label: 'five-star reviews' },
    { value: '7 days', label: 'a week, 8–6' },
    { value: '100%', label: 'mobile — we come to you' },
  ],

  logo: `${IMAGES}/logo.png`,
  logoFull: `${IMAGES}/logo-full.png`,
  heroImage: `${IMAGES}/starlight-headliner.jpg`,
  accent: '#c8102e',

  metaTitle: 'Mobile Auto Detailing in Van Alstyne, TX | Major League Detailing',
  metaDescription:
    'Premium mobile auto detailing, ceramic coatings, window tint and custom starlight headliners across Van Alstyne, Sherman, McKinney, Prosper, Celina and Frisco. Rated 5.0 on Google.',

  services: [
    {
      title: 'Interior Detailing',
      description:
        'Deep clean and condition of every surface — carpets, upholstery, leather, vents and trim. Pet hair, spills and years of daily use all handled.',
    },
    {
      title: 'Exterior Detailing',
      description:
        'Hand wash, decontamination and protection that leaves paint slick and genuinely clean, not just wet-looking for a week.',
    },
    {
      title: 'Paint Decontamination',
      description:
        'Iron removal and clay treatment that pulls embedded contaminants out of the clear coat, so protection actually bonds to the paint.',
    },
    {
      title: 'Ceramic Coatings',
      description:
        'Long-term protection that makes washing easier, resists fading and keeps that just-detailed gloss for years rather than weeks.',
    },
    {
      title: 'Window Tint',
      description:
        'Professional film installation for heat rejection, glare reduction and privacy, cut and fitted to your vehicle.',
    },
    {
      title: 'Starlight Headliners',
      description:
        'Custom fibre-optic headliners installed to order. The showpiece that turns an ordinary interior into something nobody else on the road has.',
    },
  ],

  bookingServices: [
    'Interior Detailing',
    'Exterior Detailing',
    'Full Interior + Exterior',
    'Paint Decontamination',
    'Ceramic Coating',
    'Window Tint',
    'Starlight Headliner',
    'Membership — tell me more',
    'Not sure yet',
  ],

  feature: {
    title: 'Custom Starlight Headliners',
    description:
      'Hand-installed fibre-optic headliners that turn a plain roof into a night sky. It is the work people pull their phone out for, and almost nobody in North Texas does it properly.',
    bullets: [
      'Fibre-optic strands set individually by hand',
      'Colour and twinkle controlled from your phone',
      'Fitted to your exact headliner, no visible wiring',
      'Works in daily drivers, luxury cars and builds alike',
    ],
    image: {
      src: `${IMAGES}/starlight-headliner.jpg`,
      alt: 'Custom fibre-optic starlight headliner installed in a vehicle roof, glowing blue and white',
    },
  },

  gallery: [
    {
      src: `${IMAGES}/interior-sedan-driver.jpg`,
      alt: 'Freshly detailed light tan sedan interior showing spotless dashboard, steering wheel and driver seat',
      caption: 'Full interior detail — every surface cleaned and conditioned',
    },
    {
      src: `${IMAGES}/interior-sedan-passenger.jpg`,
      alt: 'Detailed cream leather passenger seat and door panel with clean carpets and trim',
      caption: 'Light interiors brought back without staining or streaks',
    },
    {
      src: `${IMAGES}/interior-suv-rear.jpg`,
      alt: 'Quilted brown leather rear seats of an SUV after a full interior detail',
      caption: 'Leather cleaned, conditioned and protected',
    },
    {
      src: `${IMAGES}/mobile-setup.jpg`,
      alt: 'Major League Detailing mobile setup with professional products and equipment laid out in a truck bed',
      caption: 'The full mobile setup arrives at your driveway',
    },
  ],

  about:
    'Major League Detailing & Customs is a mobile operation serving Van Alstyne and the wider North DFW area. Everything travels to you — water, power, products and equipment — so your vehicle never leaves your driveway. Whether it is a daily commuter, a work truck, a luxury car or a classic, the standard is the same: exceptional craftsmanship, honest service and results that last.',

  // Wording taken from their actual Google reviews.
  testimonials: [
    {
      quote: 'Amazing work and attention to detail, highly recommend!',
      author: 'Trent Allen',
      source: 'Google review',
    },
    {
      quote: 'Very sweet a down to earth people.',
      author: 'Haley Thayer',
      source: 'Google review',
    },
    {
      quote: 'The price was also good.',
      author: 'Stan Caldwell',
      source: 'Google review',
    },
  ],

  serviceAreas: [
    'Van Alstyne',
    'Denison',
    'Sherman',
    'McKinney',
    'Prosper',
    'Celina',
    'Frisco',
    'Anna',
    'Melissa',
    'Howe',
    'Gunter',
    'North DFW',
  ],

  faqs: [
    {
      question: 'Do you come to me?',
      answer:
        'Yes — we are fully mobile. We bring everything needed to your home or workplace, so you carry on with your day while the work gets done.',
    },
    {
      question: 'How long does a detail take?',
      answer:
        'It depends on the vehicle and its condition. A standard interior or exterior detail is usually a few hours; ceramic coatings and starlight headliners take longer. We give you a realistic time when you book.',
    },
    {
      question: 'What do you charge?',
      answer:
        'Pricing depends on the size and condition of the vehicle and the service you want. Call or send a booking request and you get a straight quote before any work starts.',
    },
    {
      question: 'Do you offer memberships?',
      answer:
        'We do. Regular maintenance keeps a vehicle looking its best for far less than repeated deep cleans. Ask about memberships when you get in touch.',
    },
    {
      question: 'What areas do you cover?',
      answer:
        'Van Alstyne, Denison, Sherman, McKinney, Prosper, Celina, Frisco and the surrounding North DFW area. If you are nearby but not listed, call and ask.',
    },
  ],

  ctaLabel: 'Book Your Detail',

  // Sent 16 Sep 2026 at 10:30 AM Central; the free preview runs 48 hours.
  // Central Daylight Time is UTC-5 in September.
  expiresAt: '2026-09-18T10:30:00-05:00',

  exitOffer: {
    headline: 'Before you go — get your free quote',
    subhead:
      'Leave your name and number and we will text you a straight price for your vehicle. No obligation, no pressure.',
  },
};

export default preview;
