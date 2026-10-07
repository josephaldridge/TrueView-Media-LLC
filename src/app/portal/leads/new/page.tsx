import NewLeadForm from '@/components/portal/NewLeadForm';

export const dynamic = 'force-dynamic';

export default function NewLeadPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-light tracking-wide text-white mb-1">
        New company
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        A customer ID is assigned automatically when you save.
      </p>
      <NewLeadForm />
    </main>
  );
}
