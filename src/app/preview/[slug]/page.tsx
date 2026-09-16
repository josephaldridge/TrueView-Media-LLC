import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HospitalityTemplate from '@/components/previews/HospitalityTemplate';
import PreviewBadge from '@/components/previews/PreviewBadge';
import ExitIntentOffer from '@/components/previews/ExitIntentOffer';
import PreviewCountdown from '@/components/previews/PreviewCountdown';
import PreviewExpired from '@/components/previews/PreviewExpired';
import PremiumTemplate from '@/components/previews/PremiumTemplate';
import ShowcaseTemplate from '@/components/previews/ShowcaseTemplate';
import StructuredData from '@/components/previews/StructuredData';
import ProfessionalTemplate from '@/components/previews/ProfessionalTemplate';
import TradesTemplate from '@/components/previews/TradesTemplate';
import { accentOf } from '@/components/previews/shared';
import { isAuthenticated } from '@/lib/admin/guard';
import {
  expiryTime,
  isExpired,
  keysMatch,
  previewUnlockKey,
} from '@/lib/previews/access';
import { getPreview } from '@/lib/previews/registry';

interface Props {
  params: { slug: string };
  searchParams: { key?: string };
}

// Access depends on the current time and the request's unlock key, so these
// pages cannot be served from a build-time snapshot.
export const dynamic = 'force-dynamic';

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

export default async function PreviewPage({ params, searchParams }: Props) {
  const content = getPreview(params.slug);
  if (!content) notFound();

  // The owner keeps access after expiry, either signed in to the admin or
  // holding the keyed link.
  const expectedKey = await previewUnlockKey(content.slug);
  const hasKey = keysMatch(searchParams.key ?? '', expectedKey);
  const isOwner = hasKey || (await isAuthenticated());

  const expired = isExpired(content);
  if (expired && !isOwner) {
    return (
      // Once the window closes this is our page, not the client's, so it
      // carries TrueView's accent rather than their brand colour.
      <div
        className="preview-root"
        style={{ '--preview-accent': '#b87c5c' } as React.CSSProperties}
      >
        <PreviewExpired content={content} />
      </div>
    );
  }

  const endsAt = expiryTime(content);

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

      {endsAt !== null && !expired && <PreviewCountdown expiresAt={endsAt} />}

      {expired && isOwner && (
        <div className="fixed top-0 inset-x-0 z-[70] bg-amber-500 text-black text-center text-xs font-semibold py-1.5">
          This preview has expired — only you can see it at this link.
        </div>
      )}

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
