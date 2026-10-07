'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ShowcaseEntry } from '@/lib/previews/showcase';

/**
 * Scrolling strip of demo builds, each framed as a browser window.
 *
 * Native scroll with snap points does the heavy lifting, so touch and trackpad
 * gestures work with no JS at all. On top of that, a scroll handler scales and
 * dims cards by their distance from the centre of the track, which is what
 * gives the strip its depth. Cards default to full size and opacity, so if the
 * handler never runs the carousel simply looks flat rather than broken.
 */
export default function WorkCarousel({ items }: { items: ShowcaseEntry[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const frameRef = useRef(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  /** Scale and fade each card by how far it sits from the track's centre. */
  const focusCards = useCallback(() => {
    frameRef.current = 0;
    const track = trackRef.current;
    if (!track) return;

    // Measured in viewport coordinates rather than offsetLeft: the cards'
    // offsetParent is not the track, so offsetLeft and scrollLeft live in
    // different coordinate spaces and every card reads as far from centre.
    const trackRect = track.getBoundingClientRect();
    const trackCentre = trackRect.left + trackRect.width / 2;
    let nearest = 0;
    let nearestDistance = Infinity;

    Array.from(track.children).forEach((node, index) => {
      const card = node as HTMLElement;
      const cardRect = card.getBoundingClientRect();
      const cardCentre = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCentre - trackCentre);
      const ratio = Math.min(1, distance / (trackRect.width * 0.62));

      card.style.setProperty('--card-scale', String(1 - ratio * 0.1));
      card.style.setProperty('--card-opacity', String(1 - ratio * 0.55));

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    });

    setActive(nearest);
    setAtStart(track.scrollLeft < 8);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 8);
  }, []);

  const schedule = useCallback(() => {
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(focusCards);
  }, [focusCards]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Depth effects are motion; leave the strip flat for anyone opting out.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 8);
      return;
    }

    focusCards();
    track.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      track.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [focusCards, schedule]);

  const scrollToCard = useCallback((index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;

    // Same reasoning as focusCards: derive the offset from rects so this does
    // not depend on which ancestor happens to be positioned.
    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const delta =
      cardRect.left - trackRect.left - (trackRect.width - cardRect.width) / 2;

    track.scrollTo({ left: track.scrollLeft + delta, behavior: 'smooth' });
  }, []);

  const step = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const next = Math.min(
        items.length - 1,
        Math.max(0, active + direction)
      );
      scrollToCard(next);
    },
    [active, items.length, scrollToCard]
  );

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      if (end) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        step(1);
      }
    }, 3800);

    return () => window.clearInterval(timer);
  }, [paused, step]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <ul
        ref={trackRef}
        className="carousel-mask flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-6 -mx-4 px-4 sm:mx-0 sm:px-12"
      >
        {items.map((item) => (
          <li
            key={item.slug}
            className="carousel-card snap-center shrink-0 w-[85vw] sm:w-[440px]"
          >
            <a
              href={`/preview/${item.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl overflow-hidden carousel-glow border border-white/10 bg-dark-500/40 transition-transform duration-500 hover:-translate-y-2"
            >
              {/* Browser chrome — reads instantly as a website, not a photo */}
              <div className="flex items-center gap-2 px-4 h-9 bg-dark-700/90 border-b border-white/10">
                <span className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                </span>
                <span className="flex-1 mx-2 h-5 rounded bg-white/5 border border-white/5 flex items-center px-2.5">
                  <span className="text-[10px] text-gray-500 truncate font-mono">
                    {item.slug}.com
                  </span>
                </span>
              </div>

              <div className="relative aspect-[8/5] overflow-hidden bg-dark-600 carousel-sheen">
                <Image
                  src={item.thumbnail}
                  alt={`${item.industry} website design for ${item.businessName}`}
                  fill
                  sizes="(max-width: 640px) 85vw, 440px"
                  className="object-cover object-top transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07]"
                />
                <span className="absolute top-3 left-3 z-[3] rounded-full bg-black/70 backdrop-blur-sm border border-white/10 px-3 py-1 text-[11px] uppercase tracking-wider text-white/90">
                  {item.industry}
                </span>
                <span className="absolute inset-x-0 bottom-0 z-[3] h-20 bg-gradient-to-t from-dark-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute bottom-4 left-4 z-[4] inline-flex items-center gap-1.5 text-sm font-medium text-white translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  Open the live site
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-white font-medium">{item.businessName}</p>
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-rose-gold transition-colors flex-shrink-0 mt-1" />
                </div>
                <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">
                  {item.note}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between gap-6 mt-4">
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Builds">
          {items.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show ${item.businessName}`}
              onClick={() => scrollToCard(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === active
                  ? 'w-8 bg-rose-gold'
                  : 'w-2.5 bg-white/15 hover:bg-white/30'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={atStart}
            aria-label="Previous build"
            className="btn-icon-glass p-2.5 rounded-lg text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={atEnd}
            aria-label="Next build"
            className="btn-icon-glass p-2.5 rounded-lg text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
