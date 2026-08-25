'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/** Ignore sub-pixel and rubber-band scroll noise near the ends of the page. */
const EDGE_THRESHOLD = 24;

/**
 * Translucent double chevrons that hint there is more page in that direction.
 * Purely decorative: they never take pointer or keyboard input, so they cannot
 * intercept a tap meant for the content they float over.
 */
export default function ScrollChevrons() {
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const maxScroll = useRef(0);

  useEffect(() => {
    // Measured only on resize, so the scroll handler never forces a layout.
    const measure = () => {
      maxScroll.current =
        document.documentElement.scrollHeight - window.innerHeight;
    };

    const update = () => {
      const y = window.scrollY;
      const max = maxScroll.current;

      setCanScrollUp(y > EDGE_THRESHOLD);
      setCanScrollDown(max > EDGE_THRESHOLD && y < max - EDGE_THRESHOLD);
    };

    const remeasure = () => {
      measure();
      update();
    };

    remeasure();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', remeasure);

    // Page height changes as fonts load and reveals settle, which can turn
    // a short page into a scrollable one after first paint.
    const observer = new ResizeObserver(remeasure);
    observer.observe(document.body);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', remeasure);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className={`scroll-chevron scroll-chevron-up scroll-chevron-top ${
          canScrollUp ? 'is-shown' : ''
        }`}
      >
        <ChevronUp className="scroll-chevron-icon" />
        <ChevronUp className="scroll-chevron-icon scroll-chevron-icon-trailing" />
      </div>

      <div
        aria-hidden="true"
        className={`scroll-chevron scroll-chevron-down scroll-chevron-bottom ${
          canScrollDown ? 'is-shown' : ''
        }`}
      >
        <ChevronDown className="scroll-chevron-icon" />
        <ChevronDown className="scroll-chevron-icon scroll-chevron-icon-trailing" />
      </div>
    </>
  );
}
