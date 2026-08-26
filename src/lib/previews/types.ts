/**
 * Shape of a client preview. One content file per prospect lives in
 * /previews, and the template named here decides how it is rendered.
 *
 * The more of the optional fields you fill in with the business's real
 * details, the more the preview reads as their site rather than a mockup.
 */

export type PreviewTemplate =
  | 'trades'
  | 'hospitality'
  | 'professional'
  | 'premium';

export interface PreviewService {
  title: string;
  description: string;
  /** Optional price or range, e.g. 'from $89'. */
  price?: string;
}

export interface PreviewTestimonial {
  quote: string;
  author: string;
  /** e.g. 'Google review' — only use if it is genuinely from there. */
  source?: string;
}

export interface PreviewStat {
  /** e.g. '15+' */
  value: string;
  /** e.g. 'years in business' */
  label: string;
}

export interface PreviewImage {
  /** Path under /public, or an absolute https URL. */
  src: string;
  alt: string;
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

  // --- Contact: use the business's real details ---
  phone: string;
  email?: string;
  address?: string;
  /** e.g. ['Mon-Fri 8am-6pm', 'Sat 9am-2pm'] */
  hours?: string[];
  serviceArea?: string;
  /** Shown as a credibility line, e.g. 'TX Lic. #M-12345'. */
  license?: string;
  /** Founding year, used for 'serving X since YYYY' style lines. */
  established?: string;

  // --- Content ---
  services: PreviewService[];
  about?: string;
  testimonials?: PreviewTestimonial[];
  /** Short proof points shown as a strip. Three or four works best. */
  stats?: PreviewStat[];
  /** Photos of real work, if the business has any worth showing. */
  gallery?: PreviewImage[];

  // --- Look ---
  /** Hex accent colour. Drives buttons, glows and highlights throughout. */
  accent?: string;
  /** Path under /public, or an absolute https URL. */
  heroImage?: string;
  /** Logo image, shown in the header in place of the business name. */
  logo?: string;
  /** Set true for templates that support a light and dark treatment. */
  light?: boolean;

  // --- Links ---
  /** Button text. Defaults to 'Get a Free Quote'. */
  ctaLabel?: string;
  socials?: {
    facebook?: string;
    instagram?: string;
    google?: string;
  };
  /**
   * Free-text location for the embedded map, e.g. 'Plano, Texas'.
   * Uses OpenStreetMap, so no API key is needed.
   */
  mapQuery?: string;

  /** Optional CRM lead id this preview was built for. */
  leadId?: number;
}
