'use client';

import { useEffect, useState } from 'react';

/**
 * Small hh:mm:ss ticker in the top corner showing how long the free preview
 * has left. Hours are not wrapped at 24 — a two-day window reads as 47:59:59.
 *
 * When it reaches zero the page reloads so the server re-evaluates access,
 * rather than the client pretending to lock itself.
 */
export default function PreviewCountdown({ expiresAt }: { expiresAt: number }) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const left = expiresAt - Date.now();
      if (left <= 0) {
        setRemaining(0);
        // Let the server decide what an expired visitor sees.
        window.location.reload();
        return;
      }
      setRemaining(left);
    };

    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [expiresAt]);

  // Rendered only once the client knows the time, so server and client markup
  // cannot disagree during hydration.
  if (remaining === null) return null;

  const totalSeconds = Math.max(0, Math.floor(remaining / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div
      className="fixed top-1.5 right-3 z-[60] pointer-events-none select-none"
      role="timer"
      aria-label="Time remaining on this free preview"
    >
      <span className="flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur-sm border border-white/10 px-2.5 py-1 text-[10px] leading-none text-white/55">
        <span className="uppercase tracking-wider">Preview ends in</span>
        <span className="font-mono tabular-nums text-white/85">
          {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </span>
      </span>
    </div>
  );
}
