/**
 * Shape of a client preview. One content file per prospect lives in
 * /previews, and the template named here decides how it is rendered.
 */

export type PreviewTemplate = 'trades' | 'hospitality' | 'professional';

export interface PreviewService {
  title: string;
  description: string;
}

export interface PreviewTestimonial {
  quote: string;
  author: string;
}

export interface PreviewContent {
  /** URL segment: /preview/<slug>. Lowercase, hyphenated. */
  slug: string;
  template: PreviewTemplate;

  businessName: string;
  /** Short line under the business name. */
  tagline: string;
  /** One or two sentences introducing the business. */
  intro: string;

  phone: string;
  email?: string;
  address?: string;
  /** e.g. ['Mon-Fri 8am-6pm', 'Sat 9am-2pm'] */
  hours?: string[];
  serviceArea?: string;

  services: PreviewService[];
  about?: string;
  testimonials?: PreviewTestimonial[];

  /** Hex accent colour. Defaults to the template's own. */
  accent?: string;
  /** Path under /public, or an absolute https URL. */
  heroImage?: string;

  /** Button text. Defaults to 'Get a Free Quote'. */
  ctaLabel?: string;

  /** Optional CRM lead id this preview was built for. */
  leadId?: number;
}
