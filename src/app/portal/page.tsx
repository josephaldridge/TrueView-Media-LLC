import Link from 'next/link';
import { AlertCircle, ArrowRight, CheckSquare } from 'lucide-react';
import {
  countLeadsByStatus,
  isDatabaseConfigured,
  listLeads,
  openTasks,
  type Lead,
  type PortalTask,
} from '@/lib/admin/db';

export const dynamic = 'force-dynamic';

const PIPELINE: { status: string; label: string; tone: string }[] = [
  { status: 'new', label: 'New', tone: 'text-blue-300' },
  { status: 'contacted', label: 'Contacted', tone: 'text-amber-300' },
  { status: 'interested', label: 'Interested', tone: 'text-purple-300' },
  { status: 'won', label: 'Won', tone: 'text-green-300' },
  { status: 'lost', label: 'Lost', tone: 'text-gray-500' },
];

function dueLabel(due: string | null): { text: string; overdue: boolean } {
  if (!due) return { text: 'No date', overdue: false };
  const date = new Date(due);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((date.getTime() - today.getTime()) / 86400000);
  if (days < 0) return { text: `${Math.abs(days)}d overdue`, overdue: true };
  if (days === 0) return { text: 'Today', overdue: false };
  if (days === 1) return { text: 'Tomorrow', overdue: false };
  return { text: `In ${days}d`, overdue: false };
}

export default async function PortalDashboard() {
  if (!isDatabaseConfigured()) {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <p className="text-amber-400 text-sm">
          The database is not configured on this deployment, so the portal has
          nothing to read. Check POSTGRES_URL in the Vercel project settings.
        </p>
      </main>
    );
  }

  let counts: Record<string, number> = {};
  let tasks: PortalTask[] = [];
  let recent: Lead[] = [];
  let error = '';

  try {
    [counts, tasks, recent] = await Promise.all([
      countLeadsByStatus(),
      openTasks(12),
      listLeads('all'),
    ]);
  } catch {
    error = 'Could not reach the database. Try again in a moment.';
  }

  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-light tracking-wide text-white mb-1">
        Dashboard
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        {total} {total === 1 ? 'company' : 'companies'} in the pipeline.
      </p>

      {error && <p className="text-red-400 text-sm mb-6">{error}</p>}

      {/* Pipeline */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
        {PIPELINE.map((stage) => (
          <Link
            key={stage.status}
            href={`/portal/leads?status=${stage.status}`}
            className="bg-dark-500/50 border border-white/10 rounded-xl p-5 hover:border-rose-gold/30 transition-colors"
          >
            <p className={`text-3xl font-light ${stage.tone}`}>
              {counts[stage.status] ?? 0}
            </p>
            <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">
              {stage.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tasks */}
        <section>
          <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
            What needs doing
          </h2>
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-sm py-8">
              Nothing outstanding. Open a company and run a workflow to create
              next actions.
            </p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task) => {
                const due = dueLabel(task.due_at);
                return (
                  <li key={task.id}>
                    <Link
                      href={`/portal/leads/${task.lead_id}`}
                      className="flex items-start gap-3 bg-dark-500/40 border border-white/10 rounded-lg p-4 hover:border-rose-gold/30 transition-colors"
                    >
                      <CheckSquare className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm text-white">
                          {task.label}
                        </span>
                        <span className="block text-xs text-gray-500 mt-1">
                          {task.customer_id && (
                            <span className="font-mono text-rose-gold mr-2">
                              {task.customer_id}
                            </span>
                          )}
                          {task.business_name}
                        </span>
                      </span>
                      <span
                        className={`text-xs whitespace-nowrap flex items-center gap-1 ${
                          due.overdue ? 'text-red-400' : 'text-gray-500'
                        }`}
                      >
                        {due.overdue && <AlertCircle className="w-3 h-3" />}
                        {due.text}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Recent activity */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm uppercase tracking-widest text-gray-500">
              Recently active
            </h2>
            <Link
              href="/portal/leads"
              className="text-xs text-rose-gold hover:text-rose-light inline-flex items-center gap-1"
            >
              All companies
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-gray-500 text-sm py-8">
              No companies yet.{' '}
              <Link href="/portal/leads/new" className="text-rose-gold">
                Add the first one
              </Link>
              .
            </p>
          ) : (
            <ul className="space-y-2">
              {recent.slice(0, 8).map((lead) => (
                <li key={lead.id}>
                  <Link
                    href={`/portal/leads/${lead.id}`}
                    className="flex items-center gap-3 bg-dark-500/40 border border-white/10 rounded-lg p-4 hover:border-rose-gold/30 transition-colors"
                  >
                    <span className="font-mono text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-rose-gold flex-shrink-0">
                      {lead.customer_id ?? '—'}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-white truncate">
                        {lead.business_name}
                      </span>
                      {lead.phone && (
                        <span className="block text-xs text-gray-500">
                          {lead.phone}
                        </span>
                      )}
                    </span>
                    <span className="text-xs capitalize text-gray-500">
                      {lead.status}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
