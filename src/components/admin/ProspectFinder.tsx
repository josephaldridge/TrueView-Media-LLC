'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, Loader2, MapPin, Phone, Search } from 'lucide-react';

interface Prospect {
  sourceRef: string;
  name: string;
  category: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  lat: number | null;
  lon: number | null;
  alreadySaved?: boolean;
}

const CATEGORIES = [
  ['all', 'All business types'],
  ['food', 'Restaurants, cafes & bars'],
  ['shop', 'Retail & shops'],
  ['trades', 'Trades & craft businesses'],
  ['services', 'Professional services'],
  ['health', 'Health & wellness'],
] as const;

export default function ProspectFinder() {
  const router = useRouter();
  const [area, setArea] = useState('');
  const [category, setCategory] = useState('all');
  const [requirePhone, setRequirePhone] = useState(true);

  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<Prospect[] | null>(null);
  const [resolvedArea, setResolvedArea] = useState('');
  const [totalFound, setTotalFound] = useState(0);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const search = async (event: FormEvent) => {
    event.preventDefault();
    setSearching(true);
    setError('');
    setResults(null);
    setSaveMessage('');
    setSelected(new Set());

    try {
      const response = await fetch('/api/admin/prospects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ area, category, requirePhone }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.message ?? 'Search failed.');
        return;
      }

      setResults(data.prospects ?? []);
      setResolvedArea(data.area ?? '');
      setTotalFound(data.totalFound ?? 0);
    } catch {
      setError('Network error. Try again.');
    } finally {
      setSearching(false);
    }
  };

  const toggle = (ref: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(ref)) next.delete(ref);
      else next.add(ref);
      return next;
    });
  };

  const selectAll = () => {
    if (!results) return;
    const selectable = results.filter((p) => !p.alreadySaved);
    setSelected(
      selected.size === selectable.length
        ? new Set()
        : new Set(selectable.map((p) => p.sourceRef))
    );
  };

  const saveSelected = async () => {
    if (!results || !selected.size) return;
    setSaving(true);
    setSaveMessage('');
    setError('');

    const payload = results
      .filter((p) => selected.has(p.sourceRef))
      .map((p) => ({
        business_name: p.name,
        category: p.category,
        phone: p.phone,
        email: p.email,
        address: p.address,
        city: resolvedArea.split(',')[0] ?? null,
        lat: p.lat,
        lon: p.lon,
        source: 'overpass',
        source_ref: p.sourceRef,
      }));

    try {
      const response = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leads: payload }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.message ?? 'Could not save.');
        return;
      }

      const parts = [];
      if (data.added) {
        parts.push(`Saved ${data.added} lead${data.added === 1 ? '' : 's'}.`);
      }
      if (data.skipped) {
        parts.push(
          `${data.skipped} ${data.skipped === 1 ? 'was' : 'were'} already in your CRM.`
        );
      }
      if (data.failed) {
        parts.push(`${data.failed} could not be saved.`);
      }
      setSaveMessage(parts.join(' ') || 'Nothing new to save.');

      // The Leads page is a cached RSC payload on the client; without this it
      // can render the pre-save state when you navigate back to it.
      router.refresh();
      setResults((prev) =>
        prev
          ? prev.map((p) =>
              selected.has(p.sourceRef) ? { ...p, alreadySaved: true } : p
            )
          : prev
      );
      setSelected(new Set());
    } catch {
      setError('Network error while saving.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={search}
        className="bg-dark-500/50 border border-white/10 rounded-xl p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="area" className="label">
              City or area
            </label>
            <input
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Plano, Texas"
              className="input-field"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="label">
              Business type
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
            >
              {CATEGORIES.map(([value, label]) => (
                <option key={value} value={value} className="bg-dark-600">
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="flex items-center gap-2 mt-4 text-sm text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={requirePhone}
            onChange={(e) => setRequirePhone(e.target.checked)}
            className="w-4 h-4 accent-rose-gold"
          />
          Only show businesses with a phone number
        </label>

        <button
          type="submit"
          disabled={searching || !area.trim()}
          className="btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {searching ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Searching OpenStreetMap
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Find businesses
            </>
          )}
        </button>
      </form>

      {error && (
        <p className="text-sm text-red-400 mb-4" role="alert">
          {error}
        </p>
      )}
      {saveMessage && (
        <p className="text-sm text-green-400 mb-4">
          {saveMessage}{' '}
          <Link href="/admin" className="underline hover:text-green-300">
            View leads
          </Link>
        </p>
      )}

      {results && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <p className="text-white">
                {results.length} result{results.length === 1 ? '' : 's'}
                {resolvedArea && (
                  <span className="text-gray-500"> in {resolvedArea}</span>
                )}
              </p>
              {requirePhone && totalFound > results.length && (
                <p className="text-gray-500 text-xs mt-0.5">
                  {totalFound - results.length} more had no phone number and were
                  hidden.
                </p>
              )}
            </div>

            {results.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={selectAll}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Select all
                </button>
                <button
                  type="button"
                  onClick={saveSelected}
                  disabled={!selected.size || saving}
                  className="btn-primary text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving
                    </>
                  ) : (
                    `Add ${selected.size || ''} to CRM`
                  )}
                </button>
              </div>
            )}
          </div>

          {results.length === 0 ? (
            <p className="text-gray-500 text-sm py-8 text-center">
              Nothing matched. Try a wider business type, a nearby town, or
              untick the phone number filter.
            </p>
          ) : (
            <ul className="space-y-2">
              {results.map((p) => (
                <li
                  key={p.sourceRef}
                  className={`border rounded-lg p-4 transition-colors ${
                    p.alreadySaved
                      ? 'border-white/5 bg-white/[0.01] opacity-60'
                      : selected.has(p.sourceRef)
                        ? 'border-rose-gold/40 bg-rose-gold/5'
                        : 'border-white/10 hover:bg-white/[0.02]'
                  }`}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selected.has(p.sourceRef)}
                      disabled={p.alreadySaved}
                      onChange={() => toggle(p.sourceRef)}
                      className="w-4 h-4 mt-1 accent-rose-gold flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white">{p.name}</span>
                        {p.category && (
                          <span className="text-xs text-gray-500">
                            {p.category.replace(/_/g, ' ')}
                          </span>
                        )}
                        {p.alreadySaved && (
                          <span className="text-xs text-green-400 inline-flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            In CRM
                          </span>
                        )}
                      </div>
                      {p.address && (
                        <p className="text-gray-500 text-xs mt-1 flex items-start gap-1">
                          <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          {p.address}
                        </p>
                      )}
                      {p.phone && (
                        <p className="text-rose-gold text-xs mt-1 inline-flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {p.phone}
                        </p>
                      )}
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
