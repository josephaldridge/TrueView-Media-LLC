import Link from 'next/link';
import { Plus } from 'lucide-react';
import { isDatabaseConfigured, listLeads, type Lead } from '@/lib/admin/db';

export const dynamic = 'force-dynamic';

const STATUSES = ['all', 'new', 'contacted', 'interested', 'won', 'lost'];

export default async function PortalLeadsPage({
  searchParams,
}: {
  searchParams: { status?: string; q?: string };
}) {
  const status = STATUSES.includes(searchParams.status ?? '')
    ? (searchParams.status as string)
    : 'all';
  const query = (searchParams.q ?? '').trim().toLowerCase();

  let leads: Lead[] = [];
  let error = '';

  if (!isDatabaseConfigured()) {
    error = 'The database is not configured on this deployment.';
  } else {
    try {
      leads = await listLeads(status);
    } catch {
      error = 'Could not reach the database.';
    }
  }

  const visible = query
    ? leads.filter(
        (l) =>
          l.business_name.toLowerCase().includes(query) ||
          (l.customer_id ?? '').includes(query) ||
          (l.phone ?? '').includes(query) ||
          (l.contact_name ?? '').toLowerCase().includes(query)
      )
    : leads;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-light tracking-wide text-white">
            Companies
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {visible.length} showing
          </p>
        </div>
        <Link href="/portal/leads/new" className="btn-primary text-sm px-4 py-2.5">
          <Plus className="w-4 h-4 mr-1.5" />
          New company
        </Link>
      </div>

      {/* Filters are links so the state survives a refresh and can be shared */}
      <form method="get" className="mb-6 flex flex-wrap gap-3 items-center">
        <input
          type="search"
          name="q"
          defaultValue={searchParams.q ?? ''}
          placeholder="Search name, customer ID, phone or contact"
          className="input-field max-w-sm"
        />
        <input type="hidden" name="status" value={status} />
        <button type="submit" className="btn-outline text-sm px-4 py-2.5">
          Search
        </button>
      </form>

      <div className="flex flex-wrap gap-2 mb-6">
        {STATUSES.map((value) => (
          <Link
            key={value}
            href={`/portal/leads?status=${value}${query ? `&q=${encodeURIComponent(query)}` : ''}`}
            className={`px-3 py-1.5 rounded-lg text-sm border capitalize transition-colors ${
              status === value
                ? 'bg-white/10 text-white border-white/20'
                : 'text-gray-400 border-white/10 hover:text-white hover:bg-white/5'
            }`}
          >
            {value}
          </Link>
        ))}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {!error && visible.length === 0 ? (
        <p className="text-gray-500 text-sm py-12 text-center">
          Nothing here yet.{' '}
          <Link href="/portal/leads/new" className="text-rose-gold">
            Add a company
          </Link>
          .
        </p>
      ) : (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-white/10">
                <th className="py-3 px-4 font-medium w-24">ID</th>
                <th className="py-3 px-4 font-medium">Company</th>
                <th className="py-3 px-4 font-medium">Contact</th>
                <th className="py-3 px-4 font-medium">Next action</th>
                <th className="py-3 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-white/5 hover:bg-white/[0.02]"
                >
                  <td className="py-3 px-4 align-top">
                    <span className="font-mono text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-rose-gold">
                      {lead.customer_id ?? '—'}
                    </span>
                  </td>
                  <td className="py-3 px-4 align-top">
                    <Link
                      href={`/portal/leads/${lead.id}`}
                      className="text-white hover:text-rose-gold transition-colors"
                    >
                      {lead.business_name}
                    </Link>
                    {lead.city && (
                      <p className="text-xs text-gray-500 mt-0.5">{lead.city}</p>
                    )}
                  </td>
                  <td className="py-3 px-4 align-top text-gray-400">
                    {lead.contact_name && <p>{lead.contact_name}</p>}
                    {lead.phone ? (
                      <a
                        href={`tel:${lead.phone.replace(/[^\d+]/g, '')}`}
                        className="text-rose-gold hover:text-rose-light"
                      >
                        {lead.phone}
                      </a>
                    ) : (
                      <span className="text-gray-600">No phone</span>
                    )}
                  </td>
                  <td className="py-3 px-4 align-top text-gray-400">
                    {lead.next_action ?? <span className="text-gray-600">—</span>}
                  </td>
                  <td className="py-3 px-4 align-top capitalize text-gray-300">
                    {lead.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
