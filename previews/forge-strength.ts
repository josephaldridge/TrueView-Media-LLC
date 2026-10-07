import type { PreviewContent } from '@/lib/previews/types';

/** Demo build — fictional business, used to show design range. */
const preview: PreviewContent = {
  slug: 'forge-strength',
  template: 'showcase',
  businessName: 'Forge Strength Co.',
  tagline: 'Strength coaching · Denton',
  intro:
    'Small-group barbell training for people who want to get genuinely strong. Every member gets a written program, and a coach who knows their name and their numbers.',
  phone: '(940) 555-0133',
  email: 'train@forgestrength.co',
  address: '1120 Fort Worth Drive, Denton, TX 76201',
  serviceArea: 'Denton & Argyle',
  hours: ['Mon–Fri 5am–8pm', 'Sat 8am–12pm'],
  mapQuery: 'Denton, Texas',
  accent: '#ea580c',
  rating: { value: '5.0', count: 87, source: 'Google' },
  stats: [
    { value: '6:1', label: 'member to coach' },
    { value: '87', label: 'five-star reviews' },
    { value: '12wk', label: 'starting program' },
    { value: '0', label: 'contracts' },
  ],
  services: [
    { title: 'Small-Group Strength', price: '$179/mo', description: 'Six people to a coach, programmed in twelve-week blocks with your lifts tracked every session.' },
    { title: 'One-to-One Coaching', price: '$95/session', description: 'Private sessions for competition prep, returning from injury, or learning the lifts properly from scratch.' },
    { title: 'Beginner On-Ramp', price: '$149', description: 'Four sessions covering squat, press, deadlift and bench before you join a group. Nobody gets thrown in.' },
    { title: 'Remote Programming', price: '$89/mo', description: 'Written programming and weekly video review for members who travel or train at another gym.' },
  ],
  bookingServices: ['Small-Group Strength', 'One-to-One Coaching', 'Beginner On-Ramp', 'Remote Programming', 'Free trial session'],
  feature: {
    title: 'Everyone Starts On-Ramp',
    description: 'Four coached sessions before you touch a group class. It is the reason our members stay: they learn the movements correctly once, instead of spending a year undoing habits.',
    bullets: ['Four private sessions with a coach', 'Video review of every main lift', 'Your starting numbers tested, not guessed', 'Rolls straight into your first programme block'],
  },
  about:
    'Forge opened in 2018 in a 4,000 square foot warehouse with eight platforms and no mirrors. We coach barbell strength, we do not run bootcamps, and we would rather lose a prospective member than sell them the wrong thing.',
  testimonials: [
    { quote: 'Added 90lb to my squat in a year at 46 years old. Never trained before this.', author: 'Greg H.', source: 'Google review' },
    { quote: 'The only gym where a coach actually watched every set I did.', author: 'Priya M.', source: 'Google review' },
    { quote: 'No contract, no hard sell, no mirrors. Perfect.', author: 'Caleb W.', source: 'Google review' },
  ],
  serviceAreas: ['Denton', 'Argyle', 'Corinth', 'Sanger', 'Krum', 'Lake Dallas'],
  faqs: [
    { question: 'I have never lifted before. Is this for me?', answer: 'Yes — most members start that way. The on-ramp exists precisely so beginners learn properly before joining a group.' },
    { question: 'Is there a contract?', answer: 'No. Membership is month to month and you can cancel whenever you like.' },
  ],
  ctaLabel: 'Book a Free Session',
  exitOffer: { headline: 'Try a session on us', subhead: 'Leave your number and we will book you a free coached session — no contract, no sales pitch.' },
};

export default preview;
