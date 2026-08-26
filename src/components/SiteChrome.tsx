'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * Wraps pages in the public site's header, footer and overlays — except under
 * /admin, which is private, and /preview, where the page has to read as the
 * client's own site rather than ours.
 */
export default function SiteChrome({
  header,
  footer,
  overlays,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  overlays: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();

  const isBareSurface =
    pathname?.startsWith('/admin') || pathname?.startsWith('/preview');

  if (isBareSurface) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      {header}
      <main className="flex-1">{children}</main>
      {footer}
      {overlays}
    </>
  );
}
