import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Globe, Mail, Phone } from 'lucide-react';
import { headers } from 'next/headers';
import DemoBuilder from '@/components/portal/DemoBuilder';
import LeadWorkspace from '@/components/portal/LeadWorkspace';
import {
  getClientPreviewForLead,
  getLead,
  listNotes,
  listTasks,
} from '@/lib/admin/db';
import { DEMO_HOURS, TEMPLATE_OPTIONS } from '@/lib/portal/demoBuilder';
import { WORKFLOWS } from '@/lib/portal/workflows';

export const dynamic = 'force-dynamic';

export default async function LeadPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) notFound();

  const lead = await getLead(id);
  if (!lead) notFound();

  const [notes, tasks, demo] = await Promise.all([
    listNotes(id),
    listTasks(id),
    getClientPreviewForLead(id).catch(() => null),
  ]);

  const headerList = headers();
  const host = headerList.get('host') ?? 'trueviewmediallc.com';
  const origin = `${host.startsWith('localhost') ? 'http' : 'https'}://${host}`;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Link
        href="/portal/leads"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        All companies
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div className="min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-rose-gold">
              {lead.customer_id ?? '—'}
            </span>
            <span className="text-xs uppercase tracking-widest text-gray-500 capitalize">
              {lead.status}
            </span>
          </div>
          <h1 className="text-2xl font-light tracking-wide text-white">
            {lead.business_name}
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          {lead.phone && (
            <a
              href={`tel:${lead.phone.replace(/[^\d+]/g, '')}`}
              className="btn-primary text-sm px-4 py-2.5"
            >
              <Phone className="w-4 h-4 mr-1.5" />
              {lead.phone}
            </a>
          )}
          {lead.email && (
            <a
              href={`mailto:${lead.email}`}
              className="btn-outline text-sm px-4 py-2.5"
            >
              <Mail className="w-4 h-4 mr-1.5" />
              Email
            </a>
          )}
          {lead.website && (
            <a
              href={
                lead.website.startsWith('http')
                  ? lead.website
                  : `https://${lead.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-sm px-4 py-2.5"
            >
              <Globe className="w-4 h-4 mr-1.5" />
              Site
            </a>
          )}
        </div>
      </div>

      <div className="mb-8">
        <DemoBuilder
          leadId={lead.id}
          hasPhone={Boolean(lead.phone)}
          templates={TEMPLATE_OPTIONS}
          initialPreview={
            demo
              ? {
                  slug: demo.slug,
                  expires_at: demo.expires_at,
                  created_by: demo.created_by,
                  created_at: demo.created_at,
                }
              : null
          }
          origin={origin}
          demoHours={DEMO_HOURS}
        />
      </div>

      <LeadWorkspace
        lead={lead}
        initialNotes={notes}
        initialTasks={tasks}
        workflows={WORKFLOWS}
      />
    </main>
  );
}
