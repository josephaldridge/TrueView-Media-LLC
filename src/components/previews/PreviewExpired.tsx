import Link from 'next/link';
import { Clock, Phone } from 'lucide-react';
import type { PreviewContent } from '@/lib/previews/types';

/**
 * Shown on the public URL once a preview's window closes. Deliberately a dead
 * end for the visitor and an easy route back to us if they want it live again.
 */
export default function PreviewExpired({
  content,
}: {
  content: PreviewContent;
}) {
  return (
    <div className="min-h-screen bg-[#0a0d14] flex items-center justify-center px-4 py-16">
      <div className="preview-glass rounded-2xl max-w-lg w-full p-8 md:p-10 text-center">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 mb-6">
          <Clock className="w-6 h-6 text-white/60" />
        </span>

        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-3">
          This preview has ended
        </h1>

        <p className="text-slate-400 leading-relaxed mb-8">
          The free preview of the {content.businessName} website is no longer
          available. If you&apos;d like it back online — or want to make it
          yours permanently — just get in touch and we&apos;ll switch it back on.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/contact"
            className="preview-btn preview-btn-solid px-7 py-3.5"
          >
            Get it back online
          </Link>
          <a
            href="tel:9723390754"
            className="preview-btn preview-btn-glass px-7 py-3.5"
          >
            <Phone className="w-4 h-4" />
            972-339-0754
          </a>
        </div>

        <p className="text-xs text-slate-600 mt-8">
          Built by TrueView Media
        </p>
      </div>
    </div>
  );
}
