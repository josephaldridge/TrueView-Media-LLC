import { redirect } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';
import ProspectFinder from '@/components/admin/ProspectFinder';
import { isAdminConfigured } from '@/lib/admin/auth';
import { isAuthenticated } from '@/lib/admin/guard';

export const dynamic = 'force-dynamic';

export default async function ProspectsPage() {
  if (!isAdminConfigured() || !(await isAuthenticated())) {
    redirect('/admin/login');
  }

  return (
    <>
      <AdminNav />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-light tracking-wide text-white mb-1">
          Find prospects
        </h1>
        <p className="text-gray-500 text-sm mb-8 max-w-2xl">
          Searches OpenStreetMap for businesses with no website on record.
          Coverage is community-maintained, so treat results as a starting list
          worth verifying rather than a confirmed one.
        </p>
        <ProspectFinder />
      </main>
    </>
  );
}
