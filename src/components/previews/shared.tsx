import type { PreviewContent, PreviewTemplate } from '@/lib/previews/types';

/** Default accent per template, overridable per client. */
export const TEMPLATE_ACCENTS: Record<PreviewTemplate, string> = {
  trades: '#c2410c',
  hospitality: '#a16207',
  professional: '#0f766e',
  premium: '#6366f1',
};

export function accentOf(content: PreviewContent): string {
  return content.accent ?? TEMPLATE_ACCENTS[content.template];
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export function ctaLabel(content: PreviewContent): string {
  return content.ctaLabel ?? 'Get a Free Quote';
}

/** OpenStreetMap embed — no API key, no tracking, works anywhere. */
export function MapEmbed({
  query,
  className = '',
}: {
  query: string;
  className?: string;
}) {
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=&layer=mapnik&marker=&query=${encodeURIComponent(
    query
  )}`;

  return (
    <iframe
      title={`Map of ${query}`}
      src={src}
      loading="lazy"
      className={className}
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}

/** Renders the contact block shared by every template. */
export function ContactLines({
  content,
  className = '',
}: {
  content: PreviewContent;
  className?: string;
}) {
  return (
    <div className={className}>
      <p>
        <a href={telHref(content.phone)} className="hover:underline">
          {content.phone}
        </a>
      </p>
      {content.email && (
        <p>
          <a href={`mailto:${content.email}`} className="hover:underline">
            {content.email}
          </a>
        </p>
      )}
      {content.address && <p>{content.address}</p>}
      {content.serviceArea && <p>Serving {content.serviceArea}</p>}
      {content.hours?.map((line) => (
        <p key={line}>{line}</p>
      ))}
      {content.license && <p className="opacity-70">{content.license}</p>}
    </div>
  );
}

/** Proof-point strip. */
export function StatStrip({
  content,
  className = '',
  valueClassName = '',
  labelClassName = '',
}: {
  content: PreviewContent;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}) {
  if (!content.stats?.length) return null;

  return (
    <div className={className}>
      {content.stats.map((stat) => (
        <div key={stat.label}>
          <p className={valueClassName}>{stat.value}</p>
          <p className={labelClassName}>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
