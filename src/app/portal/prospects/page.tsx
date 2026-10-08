import ProspectFinder from '@/components/admin/ProspectFinder';

export const dynamic = 'force-dynamic';

export default function PortalProspectsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-light tracking-wide text-white mb-1">
        Find prospects
      </h1>
      <p className="text-gray-500 text-sm mb-8 max-w-2xl">
        Searches OpenStreetMap for businesses in an area with no website on
        record. Tick the ones worth calling and they land in your company list
        with a customer ID. Coverage is community-maintained, so check Google
        before you dial — a missing website tag is a strong hint, not proof.
      </p>
      <ProspectFinder />
    </main>
  );
}
