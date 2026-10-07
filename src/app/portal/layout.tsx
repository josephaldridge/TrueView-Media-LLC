import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import PortalNav from '@/components/portal/PortalNav';
import { getSession } from '@/lib/admin/guard';

export const metadata: Metadata = {
  title: 'Sales Portal',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export const dynamic = 'force-dynamic';

export default async function PortalLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Checked here as well as in middleware, which must never be the only gate.
  const session = await getSession();
  if (!session) redirect('/admin/login');

  return (
    <div className="min-h-screen bg-dark-700">
      <PortalNav email={session.email} role={session.role} />
      {children}
    </div>
  );
}
