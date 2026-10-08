'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save } from 'lucide-react';

export default function NewLeadForm() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());

    if (!String(data.business_name ?? '').trim()) {
      setError('A company name is required.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      // Portal endpoint: the admin one is blocked for sales users.
      const response = await fetch('/api/portal/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leads: [{ ...data, source: 'portal' }] }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.added) {
        setError(result.message ?? 'Could not save this company.');
        return;
      }

      router.push('/portal/leads');
      router.refresh();
    } catch {
      setError('Network error.');
    } finally {
      setSaving(false);
    }
  };

  const labelClass = 'block text-xs uppercase tracking-wider text-gray-500 mb-1.5';

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-dark-500/50 border border-white/10 rounded-xl p-6 space-y-4"
    >
      <div>
        <label className={labelClass} htmlFor="n-name">
          Company name <span className="text-rose-gold">*</span>
        </label>
        <input id="n-name" name="business_name" required className="input-field text-sm" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="n-contact">Contact name</label>
          <input id="n-contact" name="contact_name" className="input-field text-sm" />
        </div>
        <div>
          <label className={labelClass} htmlFor="n-phone">Phone</label>
          <input id="n-phone" name="phone" type="tel" className="input-field text-sm" />
        </div>
        <div>
          <label className={labelClass} htmlFor="n-email">Email</label>
          <input id="n-email" name="email" type="email" className="input-field text-sm" />
        </div>
        <div>
          <label className={labelClass} htmlFor="n-website">Website</label>
          <input id="n-website" name="website" placeholder="None yet" className="input-field text-sm" />
        </div>
        <div>
          <label className={labelClass} htmlFor="n-industry">Industry</label>
          <input id="n-industry" name="category" className="input-field text-sm" />
        </div>
        <div>
          <label className={labelClass} htmlFor="n-city">City</label>
          <input id="n-city" name="city" className="input-field text-sm" />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="n-address">Address</label>
        <input id="n-address" name="address" className="input-field text-sm" />
      </div>

      <div>
        <label className={labelClass} htmlFor="n-notes">Opening note</label>
        <textarea id="n-notes" name="notes" rows={3} className="input-field text-sm"
          placeholder="Where did this lead come from?" />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-50">
        {saving ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Saving
          </>
        ) : (
          <>
            <Save className="w-4 h-4 mr-2" />
            Save company
          </>
        )}
      </button>
    </form>
  );
}
