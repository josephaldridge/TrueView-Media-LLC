'use client';

import { useState } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';

interface PreviewSummary {
  slug: string;
  businessName: string;
  template: string;
  tagline: string;
  customerId?: string;
}

export default function PreviewList({
  previews,
  origin,
}: {
  previews: PreviewSummary[];
  origin: string;
}) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyLink = async (slug: string) => {
    const url = `${origin}/preview/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(slug);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard can be blocked; the link is visible to copy by hand.
    }
  };

  if (!previews.length) {
    return (
      <p className="text-gray-500 text-sm py-8">
        No previews yet. Add one in the <code className="text-rose-gold">previews/</code>{' '}
        folder — see previews/README.md.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {previews.map((preview) => (
        <li
          key={preview.slug}
          className="border border-white/10 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {preview.customerId && (
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-rose-gold">
                  {preview.customerId}
                </span>
              )}
              <p className="text-white">{preview.businessName}</p>
            </div>
            <p className="text-gray-500 text-xs mt-0.5">
              {preview.template} · /preview/{preview.slug}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => copyLink(preview.slug)}
              className="btn-icon-glass inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300"
            >
              {copied === preview.slug ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy link
                </>
              )}
            </button>
            <a
              href={`/preview/${preview.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon-glass inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300"
            >
              <ExternalLink className="w-4 h-4" />
              Open
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
