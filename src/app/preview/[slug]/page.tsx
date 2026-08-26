import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HospitalityTemplate from '@/components/previews/HospitalityTemplate';
import PreviewBadge from '@/components/previews/PreviewBadge';
import ProfessionalTemplate from '@/components/previews/ProfessionalTemplate';
import TradesTemplate from '@/components/previews/TradesTemplate';
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

  return {
    // `absolute` stops the root layout appending "| TrueView Media LLC" — the
    // prospect's browser tab should show their business, not ours.
    title: { absolute: preview.businessName },
    description: preview.intro.slice(0, 160),
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
} as const;

export default function PreviewPage({ params }: Props) {
  const content = getPreview(params.slug);
  if (!content) notFound();

  const Template = TEMPLATES[content.template];

  return (
    <div className="preview-root">
      <Template content={content} />
      <PreviewBadge />
    </div>
  );
}
