'use client';

import { ElementType, ReactNode, useEffect, useRef, useState } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';

interface RevealProps {
  children?: ReactNode;
  /** Element to render. Defaults to a div. */
  as?: ElementType;
  className?: string;
  /** Direction the content travels in from. */
  direction?: Direction;
  /** Delay in milliseconds before the element animates in. */
  delay?: number;
  /** Animate every time it enters the viewport instead of only once. */
  repeat?: boolean;
  id?: string;
}

export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  direction = 'up',
  delay = 0,
  repeat = false,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect reduced motion and browsers without IntersectionObserver.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const isInView = () => {
      const rect = node.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.95 && rect.bottom > 0;
    };

    // Covers first paint, a restored scroll position, and #hash landings —
    // anything already on screen animates in without waiting for a callback.
    if (isInView()) setVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (!repeat) observer.unobserve(entry.target);
          } else if (repeat) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);

    // Background tabs get few frames, so intersections can be missed entirely.
    // Re-check once the page is on screen again.
    const handleVisibilityChange = () => {
      if (!document.hidden && isInView()) setVisible(true);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [repeat]);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal reveal-${direction} ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
