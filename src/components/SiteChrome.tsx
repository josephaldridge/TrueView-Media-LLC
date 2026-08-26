'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * Wraps pages in the public site's header, footer and overlays — except under
 * /admin, which is a private surface and deliberately shows none of the
 * marketing chrome.
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

  if (pathname?.startsWith('/admin')) {
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
