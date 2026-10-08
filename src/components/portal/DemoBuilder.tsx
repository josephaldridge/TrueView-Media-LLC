'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  Check,
  Clock,
  Copy,
  ExternalLink,
  Loader2,
  Monitor,
  Plus,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import type { TemplateOption } from '@/lib/portal/demoBuilder';
import type { PreviewTemplate } from '@/lib/previews/types';

interface PreviewRow {
  slug: string;
  expires_at: string;
  created_by: string | null;
  created_at: string;
}

interface Props {
  leadId: number;
  hasPhone: boolean;
  templates: TemplateOption[];
  initialPreview: PreviewRow | null;
  origin: string;
  demoHours: number;
}

/** hh:mm:ss remaining, hours not wrapped at 24. */
function remainingLabel(expiresAt: string): { text: string; expired: boolean } {
  const left = new Date(expiresAt).getTime() - Date.now();
  if (left <= 0) return { text: 'Expired', expired: true };
  const total = Math.floor(left / 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    text: `${pad(Math.floor(total / 3600))}:${pad(Math.floor((total % 3600) / 60))}:${pad(total % 60)}`,
    expired: false,
  };
}

export default function DemoBuilder({
  leadId,
  hasPhone,
  templates,
  initialPreview,
  origin,
  demoHours,
}: Props) {
  const [preview, setPreview] = useState(initialPreview);
  const [open, setOpen] = useState(!initialPreview);
  const [template, setTemplate] = useState<PreviewTemplate>(
    templates[0]?.id ?? 'trades'
  );
  const [accent, setAccent] = useState(templates[0]?.accent ?? '#c2410c');
  const [tagline, setTagline] = useState('');
  const [intro, setIntro] = useState('');
  const [hours, setHours] = useState('');
  const [services, setServices] = useState(
    templates[0]?.defaultServices.join('\n') ?? ''
  );
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState<{ text: string; expired: boolean } | null>(null);

  // Live ticker on the demo window.
  useEffect(() => {
    if (!preview) {
      setCountdown(null);
      return;
    }
    const tick = () => setCountdown(remainingLabel(preview.expires_at));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [preview]);

  const onTemplateChange = (id: string) => {
    setTemplate(id as PreviewTemplate);
    const option = templates.find((t) => t.id === id);
    if (option) {
      setAccent(option.accent);
      // Only replace the services text if it is still a default.
      const isDefault = templates.some(
        (t) => t.defaultServices.join('\n') === services
      );
      if (isDefault) setServices(option.defaultServices.join('\n'));
    }
  };

  const build = async (event: FormEvent) => {
    event.preventDefault();
    setBusy('build');
    setError('');
    try {
      const response = await fetch(`/api/portal/leads/${leadId}/preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template, accent, tagline, intro, services, hours }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.message ?? 'Could not build the demo.');
        return;
      }
      setPreview(data.preview);
      setOpen(false);
    } catch {
      setError('Network error.');
    } finally {
      setBusy('');
    }
  };

  const extend = async () => {
    setBusy('extend');
    setError('');
    try {
      const response = await fetch(`/api/portal/leads/${leadId}/preview`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hours: demoHours }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) setPreview(data.preview);
      else setError(data.message ?? 'Could not extend.');
    } catch {
      setError('Network error.');
    } finally {
      setBusy('');
    }
  };

  const remove = async () => {
    if (!window.confirm('Take this demo offline? The link will stop working.')) {
      return;
    }
    setBusy('delete');
    try {
      await fetch(`/api/portal/leads/${leadId}/preview`, { method: 'DELETE' });
      setPreview(null);
      setOpen(true);
    } catch {
      setError('Network error.');
    } finally {
      setBusy('');
    }
  };

  const url = preview ? `${origin}/preview/${preview.slug}` : '';

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the link is on screen to copy by hand.
    }
  };

  const inputClass = 'input-field text-sm';
  const labelClass = 'block text-xs uppercase tracking-wider text-gray-500 mb-1.5';

  return (
    <section className="bg-dark-500/50 border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between gap-3 mb-1">
        <h2 className="text-white font-light tracking-wide flex items-center gap-2">
          <Monitor className="w-4 h-4 text-rose-gold" />
          Demo site
        </h2>
        {preview && !open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-xs text-gray-500 hover:text-white"
          >
            Rebuild
          </button>
        )}
      </div>
      <p className="text-xs text-gray-500 mb-5">
        Builds a live site for this company. Stays up for {demoHours} hours.
      </p>

      {!hasPhone && (
        <p className="text-amber-400 text-sm mb-4">
          Add a phone number above and save before building — the demo is built
          around it.
        </p>
      )}

      {/* Live demo */}
      {preview && (
        <div className="mb-5 rounded-lg border border-white/10 bg-dark-600/60 p-4">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span
              className={`inline-flex items-center gap-1.5 text-sm font-mono ${
                countdown?.expired ? 'text-red-400' : 'text-rose-gold'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              {countdown?.text ?? '—'}
            </span>
            <span className="text-xs text-gray-600">
              {countdown?.expired ? 'No longer public' : 'Live now'}
            </span>
          </div>

          <p className="text-xs text-gray-500 break-all mb-3">{url}</p>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copyLink}
              className="btn-primary text-xs px-3 py-2"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1.5" />
                  Copy link
                </>
              )}
            </button>
            <a
              href={`/preview/${preview.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon-glass inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-gray-300"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open
            </a>
            <button
              type="button"
              onClick={extend}
              disabled={busy === 'extend'}
              className="btn-icon-glass inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-gray-300 disabled:opacity-50"
            >
              {busy === 'extend' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5" />
              )}
              +{demoHours}h
            </button>
            <button
              type="button"
              onClick={remove}
              disabled={busy === 'delete'}
              aria-label="Take demo offline"
              className="btn-icon-glass px-3 py-2 rounded-lg text-xs text-gray-500 hover:text-red-400 disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Builder form */}
      {open && (
        <form onSubmit={build} className="space-y-4">
          <div>
            <label className={labelClass} htmlFor="d-template">Template</label>
            <select
              id="d-template"
              value={template}
              onChange={(e) => onTemplateChange(e.target.value)}
              className={inputClass}
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id} className="bg-dark-600">
                  {t.name} — {t.suits}
                </option>
              ))}
            </select>
            {templates.find((t) => t.id === template) && (
              <a
                href={`/preview/${templates.find((t) => t.id === template)!.example}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-rose-gold hover:text-rose-light mt-1.5"
              >
                See this template
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-3 items-end">
            <div>
              <label className={labelClass} htmlFor="d-accent">Colour</label>
              <input
                id="d-accent"
                type="color"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                className="h-10 w-16 rounded border border-white/15 bg-transparent cursor-pointer"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="d-tagline">Tagline</label>
              <input
                id="d-tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Left blank: industry and city"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="d-intro">Opening paragraph</label>
            <textarea
              id="d-intro"
              rows={3}
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              placeholder="Left blank: a sensible default is written for you"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="d-services">
              Services — one per line, &ldquo;Title — description&rdquo;
            </label>
            <textarea
              id="d-services"
              rows={6}
              value={services}
              onChange={(e) => setServices(e.target.value)}
              className={`${inputClass} font-mono text-xs`}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="d-hours">Hours — one per line</label>
            <textarea
              id="d-hours"
              rows={2}
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Mon–Fri 8am–6pm"
              className={inputClass}
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={busy === 'build' || !hasPhone}
            className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {busy === 'build' ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Building
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                {preview ? 'Rebuild demo' : 'Build demo site'}
              </>
            )}
          </button>

          <p className="text-xs text-gray-600 leading-relaxed">
            No reviews, ratings or licence numbers are generated — those are
            claims about a real business and get added by hand only when true.
          </p>
        </form>
      )}
    </section>
  );
}
