import { redirect } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';
import LeadTable from '@/components/admin/LeadTable';
import SetupNotice from '@/components/admin/SetupNotice';
import { isAdminConfigured } from '@/lib/admin/auth';
import { isAuthenticated } from '@/lib/admin/guard';
import {
  customerNumberingError,
  isDatabaseConfigured,
  listLeads,
  type Lead,
} from '@/lib/admin/db';

export const dynamic = 'force-dynamic';

function missingEnvVars(): string[] {
  const missing: string[] = [];
  if (!process.env.ADMIN_PASSWORD) missing.push('ADMIN_PASSWORD');
  if (!process.env.ADMIN_SESSION_SECRET) missing.push('ADMIN_SESSION_SECRET');
  if (!isDatabaseConfigured()) missing.push('POSTGRES_URL (a postgres:// connection string)');
  return missing;
}

export default async function AdminDashboard() {
  // Enforced here as well as in middleware, which must not be the only gate.
  if (!isAdminConfigured() || !(await isAuthenticated())) {
    redirect('/admin/login');
  }

  const missing = missingEnvVars();
  if (missing.length) {
    return (
      <>
        <AdminNav />
        <SetupNotice missing={missing} />
      </>
    );
  }

  let leads: Lead[] = [];
  let loadError = '';
  try {
    leads = await listLeads('all');
  } catch {
    loadError =
      'Could not reach the database. Check that the Postgres store is attached to this project.';
  }

  return (
    <>
      <AdminNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-light tracking-wide text-white mb-1">
          Leads
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Everything you have saved, newest activity first.
        </p>

        {customerNumberingError && (
          <p className="text-amber-400 text-sm mb-6">
            Customer numbering could not be applied, so IDs may be blank. Leads
            are otherwise unaffected. ({customerNumberingError})
          </p>
        )}

        {loadError ? (
          <p className="text-red-400 text-sm">{loadError}</p>
        ) : (
          <LeadTable initialLeads={leads} />
        )}
      </main>
    </>
  );
}
