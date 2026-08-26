import type { PreviewContent } from '@/lib/previews/types';

/** Default accent per template, overridable per client. */
export const TEMPLATE_ACCENTS: Record<PreviewContent['template'], string> = {
  trades: '#c2410c',
  hospitality: '#9a3412',
  professional: '#1e40af',
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
    </div>
  );
}
