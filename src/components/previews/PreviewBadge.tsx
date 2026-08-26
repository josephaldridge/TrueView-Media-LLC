import Link from 'next/link';

/**
 * Small marker identifying the page as a preview built by TrueView. Kept
 * unobtrusive so the prospect judges their own site, not ours, but present
 * so the work is always attributed.
 */
export default function PreviewBadge() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 print:hidden">
      <Link
        href="/contact"
        className="flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs bg-black/80 text-white backdrop-blur-sm border border-white/15 hover:border-white/30 transition-colors shadow-lg"
      >
        <span className="opacity-70">Preview by</span>
        <span className="font-medium">TrueView Media</span>
      </Link>
    </div>
  );
}
