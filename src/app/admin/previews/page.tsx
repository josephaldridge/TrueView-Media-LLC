import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';
import PreviewList from '@/components/admin/PreviewList';
import { isAdminConfigured } from '@/lib/admin/auth';
import { isAuthenticated } from '@/lib/admin/guard';
import { allPreviews } from '@/lib/previews/registry';

export const dynamic = 'force-dynamic';

export default async function AdminPreviewsPage() {
  if (!isAdminConfigured() || !(await isAuthenticated())) {
    redirect('/admin/login');
  }

  const headerList = headers();
  const host = headerList.get('host') ?? 'trueviewmediallc.com';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';

  const previews = allPreviews().map((preview) => ({
    slug: preview.slug,
    businessName: preview.businessName,
    template: preview.template,
    tagline: preview.tagline,
    customerId: preview.customerId,
  }));

  return (
    <>
      <AdminNav />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-light tracking-wide text-white mb-1">
          Client previews
        </h1>
        <p className="text-gray-500 text-sm mb-8 max-w-2xl">
          Live preview sites you can send to a prospect. Links work for anyone
          who has them and stay up until you remove the preview, but they are
          kept out of search engines.
        </p>
        <PreviewList previews={previews} origin={`${protocol}://${host}`} />
      </main>
    </>
  );
}
