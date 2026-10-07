'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ShowcaseEntry } from '@/lib/previews/showcase';

/**
 * Horizontally scrolling strip of demo builds.
 *
 * Uses native scroll with snap points so touch and trackpad gestures work
 * without any JS, and the arrows simply drive scrollBy. Auto-advance pauses
 * on hover, on focus, and for anyone who prefers reduced motion.
 */
export default function WorkCarousel({ items }: { items: ShowcaseEntry[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [paused, setPaused] = useState(false);

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft < 8);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateEdges();
    track.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);
    return () => {
      track.removeEventListener('scroll', updateEdges);
      window.removeEventListener('resize', updateEdges);
    };
  }, [updateEdges]);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('li');
    const step = card ? card.clientWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const end =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      if (end) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollByCard(1);
      }
    }, 4200);

    return () => window.clearInterval(timer);
  }, [paused, scrollByCard]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <ul
        ref={trackRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {items.map((item) => (
          <li
            key={item.slug}
            className="snap-start shrink-0 w-[85vw] sm:w-[420px]"
          >
            <a
              href={`/preview/${item.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl overflow-hidden border border-white/10 bg-dark-500/40 hover:border-rose-gold/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[8/5] overflow-hidden bg-dark-600">
                <Image
                  src={item.thumbnail}
                  alt={`${item.industry} website design for ${item.businessName}`}
                  fill
                  sizes="(max-width: 640px) 85vw, 420px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 px-3 py-1 text-[11px] uppercase tracking-wider text-white/90">
                  {item.industry}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-white font-medium">{item.businessName}</p>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-rose-gold transition-colors flex-shrink-0 mt-1" />
                </div>
                <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">
                  {item.note}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between gap-4 mt-6">
        <p className="text-xs text-gray-600">
          Click any build to open the full, live site
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label="Previous builds"
            className="btn-icon-glass p-2.5 rounded-lg text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label="More builds"
            className="btn-icon-glass p-2.5 rounded-lg text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
