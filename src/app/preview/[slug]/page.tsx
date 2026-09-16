import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HospitalityTemplate from '@/components/previews/HospitalityTemplate';
import PreviewBadge from '@/components/previews/PreviewBadge';
import ExitIntentOffer from '@/components/previews/ExitIntentOffer';
import PremiumTemplate from '@/components/previews/PremiumTemplate';
import ShowcaseTemplate from '@/components/previews/ShowcaseTemplate';
import StructuredData from '@/components/previews/StructuredData';
import ProfessionalTemplate from '@/components/previews/ProfessionalTemplate';
import TradesTemplate from '@/components/previews/TradesTemplate';
import { accentOf } from '@/components/previews/shared';
import { allPreviews, getPreview } from '@/lib/previews/registry';

interface Props {
  params: { slug: string };
}

/** Renders every registered preview at build time. */
export function generateStaticParams() {
  return allPreviews().map((preview) => ({ slug: preview.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const preview = getPreview(params.slug);
  if (!preview) return { title: 'Preview not found' };

  const title = preview.metaTitle ?? preview.businessName;
  const description = preview.metaDescription ?? preview.intro.slice(0, 158);

  return {
    // `absolute` stops the root layout appending "| TrueView Media LLC" — the
    // prospect's browser tab should show their business, not ours.
    title: { absolute: title },
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      siteName: preview.businessName,
      images: preview.heroImage ? [preview.heroImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    // A prospect's preview must never compete with their real site in search,
    // and must not be indexed under our domain.
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false },
    },
  };
}

const TEMPLATES = {
  trades: TradesTemplate,
  hospitality: HospitalityTemplate,
  professional: ProfessionalTemplate,
  premium: PremiumTemplate,
  showcase: ShowcaseTemplate,
} as const;

export default function PreviewPage({ params }: Props) {
  const content = getPreview(params.slug);
  if (!content) notFound();

  const Template = TEMPLATES[content.template];
  const url = `https://trueviewmediallc.com/preview/${content.slug}`;

  return (
    // The accent drives every button, glow and highlight in the templates, so
    // one layout can produce genuinely different-looking client sites.
    <div
      className="preview-root"
      style={
        { '--preview-accent': accentOf(content) } as React.CSSProperties
      }
    >
      <StructuredData content={content} url={url} />
      <Template content={content} />

      {content.exitOffer && (
        <ExitIntentOffer
          slug={content.slug}
          businessName={content.businessName}
          phone={content.phone}
          headline={content.exitOffer.headline}
          subhead={content.exitOffer.subhead}
        />
      )}

      <PreviewBadge />
    </div>
  );
}
