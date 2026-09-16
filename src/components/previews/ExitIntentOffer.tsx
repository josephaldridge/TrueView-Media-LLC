'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { CheckCircle, Loader2, Phone, X } from 'lucide-react';

interface Props {
  slug: string;
  businessName: string;
  phone: string;
  headline: string;
  subhead: string;
}

const DISMISSED_KEY = 'preview-exit-offer-dismissed';

/** Time on page before an exit gesture is allowed to open the offer. */
const GRACE_PERIOD_MS = 6000;

/**
 * Capture box triggered when the visitor moves to leave — cursor heading for
 * the browser chrome on desktop, or a fast upward scroll / tab-hide on touch
 * devices where there is no cursor to track.
 */
export default function ExitIntentOffer({
  slug,
  businessName,
  phone,
  headline,
  subhead,
}: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      window.sessionStorage.setItem(DISMISSED_KEY, '1');
    } catch {
      // Private mode can block storage; the popup simply may show again.
    }
  }, []);

  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = window.sessionStorage.getItem(DISMISSED_KEY) === '1';
    } catch {
      alreadyShown = false;
    }
    if (alreadyShown) return;

    const arrivedAt = Date.now();
    let fired = false;

    /**
     * Never fire in the first few seconds — that reads as a pop-up rather than
     * an exit offer. Checked against elapsed time rather than a flag so no
     * single event can arm it early, which a visibilitychange used to do when
     * the page was opened in a background tab.
     */
    const canFire = () => !fired && Date.now() - arrivedAt > GRACE_PERIOD_MS;

    const trigger = () => {
      if (!canFire()) return;
      fired = true;
      setOpen(true);
    };

    // Desktop: cursor leaving through the top of the viewport.
    const handleMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget) return;
      if (event.clientY > 12) return;
      trigger();
    };

    // Touch: a decisive flick back to the top, the usual precursor to leaving.
    let lastY = window.scrollY;
    let lastTime = Date.now();
    const handleScroll = () => {
      const now = Date.now();
      const y = window.scrollY;
      const elapsed = now - lastTime || 1;
      const velocity = (y - lastY) / elapsed;
      if (velocity < -1.5 && y < 400) trigger();
      lastY = y;
      lastTime = now;
    };

    // Switching away is itself an exit signal, but it still has to clear the
    // grace period.
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') trigger();
    };

    document.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, dismiss]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus('sending');
    setError('');

    try {
      const response = await fetch('/api/preview/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          slug,
          message: `Exit-intent offer claimed on the ${businessName} preview.`,
        }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(result.message ?? 'Something went wrong.');
        setStatus('idle');
        return;
      }
      setStatus('sent');
    } catch {
      setError('Network error. Please call instead.');
      setStatus('idle');
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-offer-heading"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={dismiss}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
      />

      <div className="preview-glass relative w-full max-w-md rounded-2xl p-7 text-white animate-in fade-in zoom-in duration-200">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close offer"
          className="absolute top-3 right-3 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {status === 'sent' ? (
          <div className="text-center py-4">
            <CheckCircle className="w-10 h-10 mx-auto mb-4 preview-accent-text" />
            <h2 id="exit-offer-heading" className="text-xl font-semibold mb-2">
              You&apos;re on the list
            </h2>
            <p className="text-white/70 text-sm">
              We&apos;ll be in touch shortly to get you scheduled.
            </p>
            <button
              type="button"
              onClick={dismiss}
              className="preview-btn preview-btn-glass mt-6 px-6 py-2.5 text-sm"
            >
              Back to the site
            </button>
          </div>
        ) : (
          <>
            <h2
              id="exit-offer-heading"
              className="text-2xl font-semibold mb-2 pr-6"
            >
              {headline}
            </h2>
            <p className="text-white/70 text-sm mb-6">{subhead}</p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute w-px h-px -m-px overflow-hidden opacity-0 pointer-events-none"
              />
              <input
                name="name"
                required
                autoComplete="name"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[color:var(--preview-accent)]"
              />
              <input
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="Phone number"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[color:var(--preview-accent)]"
              />

              {error && (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="preview-btn preview-btn-solid w-full py-3.5 disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  'Claim It'
                )}
              </button>
            </form>

            <a
              href={`tel:${phone.replace(/[^\d+]/g, '')}`}
              className="flex items-center justify-center gap-2 text-sm text-white/60 hover:text-white mt-4 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Or call {phone}
            </a>
          </>
        )}
      </div>
    </div>
  );
}
