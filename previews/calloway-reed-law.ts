import type { PreviewContent } from '@/lib/previews/types';

/** Showcase build, used to demonstrate design range. */
const preview: PreviewContent = {
  slug: 'calloway-reed-law',
  template: 'sidebar',
  businessName: 'Calloway & Reed',
  tagline: 'Family and estate law · Collin County',
  intro:
    'Two attorneys, no associates, no handoffs. You work with the lawyer who takes your case from the first meeting to the last filing, and you get a straight answer on cost before you retain us.',
  phone: '(469) 555-0164',
  email: 'intake@callowayreed.com',
  address: '201 North Tennessee Street, Suite 300, McKinney, TX 75069',
  serviceArea: 'Collin & Denton County',
  hours: ['Mon–Thu 8:30am–5:30pm', 'Fri 8:30am–3pm'],
  mapQuery: 'McKinney, Texas',
  accent: '#1e40af',
  stats: [
    { value: '22', label: 'years practicing' },
    { value: '900+', label: 'matters resolved' },
    { value: '2', label: 'attorneys, no handoffs' },
    { value: 'Free', label: 'initial consultation' },
  ],
  services: [
    { title: 'Family Law', description: 'Divorce, custody and modification, handled with the goal of keeping you out of a courtroom where that is possible.' },
    { title: 'Wills & Estate Planning', description: 'Wills, trusts, powers of attorney and directives, drafted so your family is not guessing later.' },
    { title: 'Probate', description: 'Administration and contested probate, including the paperwork most families do not know is required until it is late.' },
    { title: 'Mediation', description: 'Certified mediation for parties who would rather settle than litigate, at a fraction of trial cost.' },
  ],
  about:
    'Jim Calloway and Dana Reed opened the firm in 2004 after a decade each at larger practices. They kept it deliberately small: two attorneys, one paralegal, and a policy that calls are returned the same business day.',
  testimonials: [
    { quote: 'She explained what my case was realistically worth instead of what I wanted to hear. That saved me a year.', author: 'Former client' },
    { quote: 'The estate plan took two meetings and cost less than the quote from the firm downtown.', author: 'Former client' },
  ],
  ctaLabel: 'Book a Consultation',
};

export default preview;
