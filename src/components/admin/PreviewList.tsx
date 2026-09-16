'use client';

import { useState } from 'react';
import { Check, Copy, ExternalLink, KeyRound } from 'lucide-react';

interface PreviewSummary {
  slug: string;
  businessName: string;
  template: string;
  tagline: string;
  customerId?: string;
  expiresAt?: number | null;
  expired?: boolean;
  unlockKey?: string | null;
}

export default function PreviewList({
  previews,
  origin,
}: {
  previews: PreviewSummary[];
  origin: string;
}) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard can be blocked; the link is visible to copy by hand.
    }
  };

  const publicLink = (slug: string) => `${origin}/preview/${slug}`;
  const ownerLink = (p: PreviewSummary) =>
    `${origin}/preview/${p.slug}?key=${p.unlockKey}`;

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
            {preview.expiresAt && (
              <p className="text-xs mt-1">
                {preview.expired ? (
                  <span className="text-amber-400">
                    Expired — public link now shows the end screen
                  </span>
                ) : (
                  <span className="text-gray-500">
                    Ends{' '}
                    {new Date(preview.expiresAt).toLocaleString('en-US', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                )}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => copyText(preview.slug, publicLink(preview.slug))}
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
                  Client link
                </>
              )}
            </button>

            {preview.unlockKey && (
              <button
                type="button"
                onClick={() =>
                  copyText(`${preview.slug}-owner`, ownerLink(preview))
                }
                title="Private link that works even after the preview expires"
                className="btn-icon-glass inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-rose-gold"
              >
                {copied === `${preview.slug}-owner` ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    My link
                  </>
                )}
              </button>
            )}

            <a
              href={
                preview.unlockKey
                  ? `/preview/${preview.slug}?key=${preview.unlockKey}`
                  : `/preview/${preview.slug}`
              }
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
