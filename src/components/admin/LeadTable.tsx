'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Loader2, MapPin, Phone, RefreshCw, Trash2 } from 'lucide-react';
import type { Lead, LeadStatus } from '@/lib/admin/db';

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: 'bg-blue-500/15 text-blue-300 border-blue-400/30',
  contacted: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
  interested: 'bg-purple-500/15 text-purple-300 border-purple-400/30',
  won: 'bg-green-500/15 text-green-300 border-green-400/30',
  lost: 'bg-gray-500/15 text-gray-400 border-gray-400/30',
};

const STATUSES: LeadStatus[] = [
  'new',
  'contacted',
  'interested',
  'won',
  'lost',
];

interface Props {
  initialLeads: Lead[];
}

export default function LeadTable({ initialLeads }: Props) {
  const [leads, setLeads] = useState(initialLeads);
  const [filter, setFilter] = useState<'all' | LeadStatus>('all');
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [openNotes, setOpenNotes] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const reload = useCallback(async (showSpinner = true) => {
    if (showSpinner) setRefreshing(true);
    try {
      const response = await fetch('/api/admin/leads?status=all', {
        cache: 'no-store',
      });
      if (!response.ok) return;
      const data = await response.json();
      if (Array.isArray(data.leads)) setLeads(data.leads);
    } catch {
      // Keep whatever is already on screen.
    } finally {
      if (showSpinner) setRefreshing(false);
    }
  }, []);

  // The server render can arrive from Next's client-side route cache, so pull
  // the current list once on mount. This is what guarantees a lead saved on
  // the prospects page is visible the moment you land here.
  useEffect(() => {
    reload(false);
  }, [reload]);

  const visible = useMemo(
    () => (filter === 'all' ? leads : leads.filter((l) => l.status === filter)),
    [leads, filter]
  );

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: leads.length };
    leads.forEach((l) => {
      base[l.status] = (base[l.status] ?? 0) + 1;
    });
    return base;
  }, [leads]);

  const patchLead = async (id: number, body: Record<string, unknown>) => {
    setBusyId(id);
    setError('');
    try {
      const response = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.message ?? 'Update failed.');
        return;
      }
      setLeads((prev) => prev.map((l) => (l.id === id ? data.lead : l)));
    } catch {
      setError('Network error.');
    } finally {
      setBusyId(null);
    }
  };

  const removeLead = async (id: number, name: string) => {
    if (!window.confirm(`Delete "${name}" from your leads? This cannot be undone.`)) {
      return;
    }
    setBusyId(id);
    setError('');
    try {
      const response = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.message ?? 'Delete failed.');
        return;
      }
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch {
      setError('Network error.');
    } finally {
      setBusyId(null);
    }
  };

  if (!leads.length) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 mb-2">No leads yet.</p>
        <p className="text-gray-500 text-sm mb-6">
          Use <span className="text-rose-gold">Find prospects</span> to pull in
          businesses with no website.
        </p>
        <button
          type="button"
          onClick={() => reload()}
          disabled={refreshing}
          className="btn-outline text-sm px-4 py-2"
        >
          {refreshing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Checking
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {(['all', ...STATUSES] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
              filter === value
                ? 'bg-white/10 text-white border-white/20'
                : 'text-gray-400 border-white/10 hover:text-white hover:bg-white/5'
            }`}
          >
            {value === 'all' ? 'All' : value}
            <span className="ml-2 text-xs text-gray-500">
              {counts[value] ?? 0}
            </span>
          </button>
        ))}
        <button
          type="button"
          onClick={() => reload()}
          disabled={refreshing}
          aria-label="Refresh leads"
          className="ml-auto text-gray-500 hover:text-white transition-colors p-2"
        >
          <RefreshCw
            className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
          />
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-400 mb-4" role="alert">
          {error}
        </p>
      )}

      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-white/10">
              <th className="py-3 px-4 font-medium">Business</th>
              <th className="py-3 px-4 font-medium">Contact</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium w-10" />
            </tr>
          </thead>
          <tbody>
            {visible.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-white/5 hover:bg-white/[0.02]"
              >
                <td className="py-3 px-4 align-top">
                  <p className="text-white">{lead.business_name}</p>
                  {lead.category && (
                    <p className="text-gray-500 text-xs mt-0.5">
                      {lead.category.replace(/_/g, ' ')}
                    </p>
                  )}
                  {lead.address && (
                    <p className="text-gray-500 text-xs mt-1 flex items-start gap-1">
                      <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      {lead.address}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setOpenNotes(openNotes === lead.id ? null : lead.id)
                    }
                    className="text-xs text-rose-gold mt-1 hover:text-rose-light"
                  >
                    {openNotes === lead.id ? 'Hide notes' : lead.notes ? 'Notes' : 'Add note'}
                  </button>
                  {openNotes === lead.id && (
                    <textarea
                      defaultValue={lead.notes ?? ''}
                      rows={3}
                      placeholder="Call notes, follow-up dates…"
                      onBlur={(e) => {
                        if (e.target.value !== (lead.notes ?? '')) {
                          patchLead(lead.id, { notes: e.target.value });
                        }
                      }}
                      className="input-field mt-2 text-xs"
                    />
                  )}
                </td>

                <td className="py-3 px-4 align-top">
                  {lead.phone ? (
                    <a
                      href={`tel:${lead.phone}`}
                      className="text-rose-gold hover:text-rose-light inline-flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      {lead.phone}
                    </a>
                  ) : (
                    <span className="text-gray-600">No phone</span>
                  )}
                  {lead.email && (
                    <p className="text-gray-400 text-xs mt-1 break-all">
                      {lead.email}
                    </p>
                  )}
                </td>

                <td className="py-3 px-4 align-top">
                  <select
                    value={lead.status}
                    disabled={busyId === lead.id}
                    onChange={(e) => patchLead(lead.id, { status: e.target.value })}
                    className={`px-2 py-1 rounded-lg border text-xs capitalize bg-dark-600 ${
                      STATUS_STYLES[lead.status]
                    }`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s} className="bg-dark-600 text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="py-3 px-4 align-top text-right">
                  {busyId === lead.id ? (
                    <Loader2 className="w-4 h-4 animate-spin text-gray-500 inline" />
                  ) : (
                    <button
                      type="button"
                      onClick={() => removeLead(lead.id, lead.business_name)}
                      aria-label={`Delete ${lead.business_name}`}
                      className="text-gray-600 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
