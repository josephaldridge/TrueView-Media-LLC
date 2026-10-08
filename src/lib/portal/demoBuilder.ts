import type { Lead } from '@/lib/admin/db';
import type { PreviewContent, PreviewTemplate } from '@/lib/previews/types';

/** How long a portal-created demo stays live. */
export const DEMO_HOURS = 48;

export interface TemplateOption {
  id: PreviewTemplate;
  name: string;
  suits: string;
  /** The portfolio build a salesperson can point at. */
  example: string;
  accent: string;
  /** Prefilled into the services box so a demo is one click from decent. */
  defaultServices: string[];
}

export const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: 'trades',
    name: 'Trades',
    suits: 'Plumbing, electrical, roofing, handyman',
    example: 'joes-plumbing',
    accent: '#c2410c',
    defaultServices: [
      'Emergency Repairs — Round-the-clock calls, most jobs fixed on the first visit.',
      'Installations — Supplied, fitted and tested, quoted before work starts.',
      'Maintenance — Scheduled servicing that catches problems early.',
      'Inspections — A written report on what needs doing and what can wait.',
    ],
  },
  {
    id: 'showcase',
    name: 'Showcase',
    suits: 'HVAC, detailing, fitness — anything sold on photos',
    example: 'forge-strength',
    accent: '#c8102e',
    defaultServices: [
      'Core Service — The thing most customers call about.',
      'Premium Option — The upgrade worth paying more for.',
      'Maintenance Plan — Regular visits at a better rate.',
      'Emergency Callout — Same-day response when something fails.',
    ],
  },
  {
    id: 'split',
    name: 'Split Screen',
    suits: 'HVAC, emergency services, anything urgent',
    example: 'northline-hvac',
    accent: '#0369a1',
    defaultServices: [
      'Emergency Service — Available around the clock.',
      'Repairs — Diagnosed and fixed, priced before we start.',
      'Replacement — Sized properly for the property.',
      'Service Plans — Priority response and no overtime rates.',
    ],
  },
  {
    id: 'bold',
    name: 'Bold Colour',
    suits: 'Landscaping, cleaning, moving — loud and confident',
    example: 'verdant-landscape',
    accent: '#15803d',
    defaultServices: [
      'Weekly Service — A fixed schedule and the same crew each time.',
      'One-Off Jobs — Quoted on sight, done properly.',
      'Seasonal Work — Timed to the weather, booked ahead.',
      'Commercial — Contracts for offices and property managers.',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    suits: 'Dental, medical, accounting, consulting',
    example: 'sample-dental',
    accent: '#0f766e',
    defaultServices: [
      'Consultations — A proper assessment and a written plan.',
      'Routine Care — Scheduled appointments that run on time.',
      'Specialist Work — Handled in-house wherever possible.',
      'Emergency Appointments — Slots held every day.',
    ],
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    suits: 'Law firms, agencies, advisory practices',
    example: 'calloway-reed-law',
    accent: '#1e40af',
    defaultServices: [
      'Consultation — An honest read on where you stand.',
      'Representation — Handled by the person you first spoke to.',
      'Documentation — Drafted so nothing is left to interpretation.',
      'Ongoing Advice — Available when something changes.',
    ],
  },
  {
    id: 'editorial',
    name: 'Editorial',
    suits: 'Med spa, salon, boutique, wellness',
    example: 'lumen-aesthetics',
    accent: '#a16a8a',
    defaultServices: [
      'Signature Treatment — What most clients book first.',
      'Consultations — Complimentary, with no obligation.',
      'Packages — Several sessions at a better rate.',
      'Memberships — Regular care for people who come back.',
    ],
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    suits: 'Restaurants, cafes, bars, barbershops',
    example: 'ironside-barber',
    accent: '#92400e',
    defaultServices: [
      'The Main Offering — What people come in for.',
      'Something Seasonal — Changes with what is good right now.',
      'Private Hire — The room, booked out, with a set menu.',
      'Takeaway — Order ahead and collect.',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Dark',
    suits: 'Design studios, custom builders, high-end services',
    example: 'sample-studio',
    accent: '#7c6a46',
    defaultServices: [
      'Full Service — Concept through to completion.',
      'Single Project — One room, one job, done properly.',
      'Consulting — Drawings and direction for work already underway.',
      'Finishing — The final layer, placed and photographed.',
    ],
  },
];

export function templateOption(id: string): TemplateOption | undefined {
  return TEMPLATE_OPTIONS.find((t) => t.id === id);
}

/** URL-safe slug from a business name, with a short suffix for uniqueness. */
export function slugify(name: string, suffix: string): string {
  const base = name
    .toLowerCase()
    .replace(/&/g, 'and')
    // Drop apostrophes rather than turning them into separators, so
    // "Joe's Plumbing" reads joes-plumbing and not joe-s-plumbing.
    .replace(/['’`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  return `${base || 'demo'}-${suffix}`;
}

/** Parses "Title — description" lines into services. */
export function parseServices(raw: string) {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 8)
    .map((line) => {
      const [title, ...rest] = line.split(/\s+[—–-]\s+/);
      return {
        title: title.trim().slice(0, 80),
        description:
          rest.join(' — ').trim().slice(0, 400) ||
          'Ask us about this when you call.',
      };
    });
}

export interface DemoInput {
  template: string;
  accent?: string;
  tagline?: string;
  intro?: string;
  services?: string;
  hours?: string;
}

/**
 * Builds preview content from a company profile plus the few things a
 * salesperson types. Everything that can be inferred from the profile is,
 * so the form stays short enough to fill in from a parked car.
 */
export function buildDemoContent(
  lead: Lead,
  input: DemoInput,
  slug: string
): PreviewContent {
  const option = templateOption(input.template) ?? TEMPLATE_OPTIONS[0];
  const city = lead.city?.trim() || '';
  const industry = lead.category?.replace(/_/g, ' ').trim() || 'Local business';

  const services = parseServices(input.services ?? '');

  return {
    slug,
    template: option.id,
    businessName: lead.business_name,
    tagline:
      input.tagline?.trim() ||
      [industry, city].filter(Boolean).join(' · ') ||
      industry,
    intro:
      input.intro?.trim() ||
      `${lead.business_name} serves ${city || 'the local area'}. Call for a straight answer and a fair price — we answer our own phone and we turn up when we say we will.`,
    phone: lead.phone ?? '',
    email: lead.email ?? undefined,
    address: lead.address ?? undefined,
    serviceArea: city || undefined,
    hours: input.hours?.trim()
      ? input.hours.split('\n').map((h) => h.trim()).filter(Boolean).slice(0, 4)
      : undefined,
    mapQuery: city || lead.address || undefined,
    accent: input.accent?.trim() || option.accent,
    services: services.length
      ? services
      : parseServices(option.defaultServices.join('\n')),
    ctaLabel: 'Get a Free Quote',
    customerId: lead.customer_id ?? undefined,
    leadId: lead.id,
    // Deliberately omitted: testimonials, ratings, licence numbers and years in
    // business. Those are claims about a real company and must never be
    // generated — they are added by hand only when they are true.
  };
}
