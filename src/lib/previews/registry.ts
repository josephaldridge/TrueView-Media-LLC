import type { PreviewContent } from './types';

/**
 * Every preview, keyed by slug.
 *
 * To add one: create previews/<slug>.ts exporting a PreviewContent object,
 * then import and list it here. Explicit imports keep the build static and
 * type-checked — a malformed preview fails the build rather than 404ing in
 * front of a prospect.
 */
import callowayReedLaw from '@previews/calloway-reed-law';
import forgeStrength from '@previews/forge-strength';
import ironsideBarber from '@previews/ironside-barber';
import joesPlumbing from '@previews/joes-plumbing';
import lumenAesthetics from '@previews/lumen-aesthetics';
import northlineHvac from '@previews/northline-hvac';
import majorLeagueDetailing from '@previews/major-league-detailing';
import sampleCafe from '@previews/sample-cafe';
import sampleDental from '@previews/sample-dental';
import sampleStudio from '@previews/sample-studio';
import verdantLandscape from '@previews/verdant-landscape';

const previews: PreviewContent[] = [
  majorLeagueDetailing,
  joesPlumbing,
  sampleCafe,
  sampleDental,
  sampleStudio,
  verdantLandscape,
  northlineHvac,
  callowayReedLaw,
  lumenAesthetics,
  forgeStrength,
  ironsideBarber,
];

export const previewRegistry = new Map<string, PreviewContent>(
  previews.map((preview) => [preview.slug, preview])
);

export function getPreview(slug: string): PreviewContent | undefined {
  return previewRegistry.get(slug);
}

export function allPreviews(): PreviewContent[] {
  return Array.from(previewRegistry.values()).sort((a, b) =>
    a.businessName.localeCompare(b.businessName)
  );
}
