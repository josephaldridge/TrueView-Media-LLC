import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://trueviewmediallc.com';

  // Public pages only. /admin and /preview are deliberately never listed:
  // client previews should not be indexed under our domain.
  const staticPages = [
    '',
    '/services',
    '/process',
    '/about',
    '/contact',
  ];

  return staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
