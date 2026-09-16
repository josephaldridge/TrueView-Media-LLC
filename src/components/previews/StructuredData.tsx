import type { PreviewContent } from '@/lib/previews/types';

/**
 * JSON-LD for the business. This is the part search engines read to build a
 * rich result: name, address, phone, hours, rating and services.
 *
 * It ships with the preview so the SEO groundwork is already done when the
 * site moves to the client's own domain. While hosted under /preview the page
 * is noindex, so none of it is indexed under ours.
 */
export default function StructuredData({
  content,
  url,
}: {
  content: PreviewContent;
  url: string;
}) {
  const [street, city, stateZip] = (content.address ?? '')
    .split(',')
    .map((part) => part.trim());
  const [region, postalCode] = (stateZip ?? '').split(' ').filter(Boolean);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'AutoDetailing',
    name: content.businessName,
    description: content.intro,
    telephone: content.phone,
    url,
  };

  if (content.email) schema.email = content.email;
  if (content.logo) schema.logo = content.logo;
  if (content.heroImage) schema.image = content.heroImage;

  if (street) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: street,
      addressLocality: city,
      addressRegion: region,
      postalCode,
      addressCountry: 'US',
    };
  }

  if (content.serviceAreas?.length) {
    schema.areaServed = content.serviceAreas.map((area) => ({
      '@type': 'City',
      name: area,
    }));
  }

  if (content.hours?.length) {
    schema.openingHours = content.hours;
  }

  // Only ever emitted from a real rating supplied in the content file.
  if (content.rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: content.rating.value,
      reviewCount: content.rating.count,
    };
  }

  if (content.testimonials?.length) {
    schema.review = content.testimonials.map((t) => ({
      '@type': 'Review',
      reviewBody: t.quote,
      author: { '@type': 'Person', name: t.author },
    }));
  }

  if (content.services.length) {
    schema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: content.services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
        },
      })),
    };
  }

  const graph: Record<string, unknown>[] = [schema];

  if (content.faqs?.length) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: content.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  return (
    <>
      {graph.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}
