import type { PreviewContent } from './types';

/**
 * Every preview, keyed by slug.
 *
 * To add one: create previews/<slug>.ts exporting a PreviewContent object,
 * then import and list it here. Explicit imports keep the build static and
 * type-checked — a malformed preview fails the build rather than 404ing in
 * front of a prospect.
 */
import joesPlumbing from '@previews/joes-plumbing';
import sampleCafe from '@previews/sample-cafe';
import sampleDental from '@previews/sample-dental';
import sampleStudio from '@previews/sample-studio';

const previews: PreviewContent[] = [
  joesPlumbing,
  sampleCafe,
  sampleDental,
  sampleStudio,
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
