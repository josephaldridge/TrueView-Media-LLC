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
  | 'premium'
  | 'showcase';

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
  /** Describe the actual work shown — this is real SEO and accessibility. */
  alt: string;
  /** Optional caption shown under the image in gallery layouts. */
  caption?: string;
}

export interface PreviewFaq {
  question: string;
  answer: string;
}

/** A single hero-billed offering, e.g. starlight headliners. */
export interface PreviewFeature {
  title: string;
  description: string;
  image?: PreviewImage;
  bullets?: string[];
}

export interface PreviewRating {
  /** e.g. '5.0' */
  value: string;
  count: number;
  /** Where the rating comes from, e.g. 'Google'. */
  source?: string;
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
  /** One offering given its own section — the thing they are known for. */
  feature?: PreviewFeature;
  /** Questions real customers ask. Also feeds FAQ structured data. */
  faqs?: PreviewFaq[];
  /** Towns and cities served, listed for local SEO. */
  serviceAreas?: string[];
  /** Real aggregate rating. Never invent one. */
  rating?: PreviewRating;
  /** Options offered in the booking form's service dropdown. */
  bookingServices?: string[];
  /**
   * Capture box shown when the visitor moves to leave the page. Omit it and
   * no popup is rendered at all.
   */
  exitOffer?: {
    headline: string;
    subhead: string;
  };

  // --- SEO ---
  /** Overrides the browser/search title. Aim for under 60 characters. */
  metaTitle?: string;
  /** Overrides the search snippet. Aim for 150-158 characters. */
  metaDescription?: string;

  // --- Look ---
  /** Hex accent colour. Drives buttons, glows and highlights throughout. */
  accent?: string;
  /** Path under /public, or an absolute https URL. */
  heroImage?: string;
  /** Logo image, shown in the header in place of the business name. */
  logo?: string;
  /**
   * Fuller logo variant for the footer, where there is room for a banner-style
   * mark that would be illegible at nav size.
   */
  logoFull?: string;
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

  /**
   * When the free preview closes, as an ISO 8601 string with an offset,
   * e.g. '2026-09-18T10:30:00-05:00'. After this the public URL shows an
   * expiry notice; the keyed owner URL keeps working.
   */
  expiresAt?: string;

  /** Optional CRM lead id this preview was built for. */
  leadId?: number;
  /**
   * Customer number from the CRM, e.g. '0004'. Ties this preview back to the
   * right company when work, invoices and files are filed under that number.
   */
  customerId?: string;
}
