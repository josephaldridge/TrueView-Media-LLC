import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Admin',
  // Belt and braces alongside the X-Robots-Tag header set in middleware.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-dark-700">{children}</div>;
}
