'use client';

import { FormEvent, useState } from 'react';
import { CheckCircle, Loader2, Send } from 'lucide-react';

interface Props {
  slug: string;
  services: string[];
  phone: string;
  /** Rendered on a dark background by default. */
  light?: boolean;
}

export default function BookingForm({ slug, services, phone, light }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus('sending');
    setError('');

    try {
      const response = await fetch('/api/preview/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, slug }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(result.message ?? 'Something went wrong.');
        setStatus('error');
        return;
      }

      setStatus('sent');
      form.reset();
    } catch {
      setError('Network error. Please call us instead.');
      setStatus('error');
    }
  };

  const fieldClass = light
    ? 'w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--preview-accent)] transition'
    : 'w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[color:var(--preview-accent)] transition';

  const labelClass = light
    ? 'block text-sm font-medium text-slate-700 mb-1.5'
    : 'block text-sm font-medium text-white/80 mb-1.5';

  if (status === 'sent') {
    return (
      <div
        className={`rounded-2xl p-8 text-center ${
          light ? 'preview-glass-light' : 'preview-glass'
        }`}
      >
        <CheckCircle className="w-10 h-10 mx-auto mb-4 preview-accent-text" />
        <h3
          className={`text-xl font-semibold mb-2 ${
            light ? 'text-slate-900' : 'text-white'
          }`}
        >
          Booking request received
        </h3>
        <p className={light ? 'text-slate-600' : 'text-white/70'}>
          We&apos;ll confirm your appointment shortly. Need it sooner? Call{' '}
          <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="underline">
            {phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl p-6 md:p-8 ${
        light ? 'preview-glass-light' : 'preview-glass'
      }`}
    >
      {/* Hidden from people, irresistible to bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute w-px h-px -m-px overflow-hidden opacity-0 pointer-events-none"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="bf-name" className={labelClass}>
            Name <span className="preview-accent-text">*</span>
          </label>
          <input
            id="bf-name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="bf-phone" className={labelClass}>
            Phone <span className="preview-accent-text">*</span>
          </label>
          <input
            id="bf-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="(555) 123-4567"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="bf-email" className={labelClass}>
            Email
          </label>
          <input
            id="bf-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="bf-vehicle" className={labelClass}>
            Vehicle
          </label>
          <input
            id="bf-vehicle"
            name="vehicle"
            placeholder="2021 Ford F-150"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="bf-service" className={labelClass}>
            Service
          </label>
          <select id="bf-service" name="service" className={fieldClass}>
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="bf-preferred" className={labelClass}>
            Preferred day
          </label>
          <input
            id="bf-preferred"
            name="preferred"
            placeholder="Saturday morning"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="bf-message" className={labelClass}>
          Anything we should know?
        </label>
        <textarea
          id="bf-message"
          name="message"
          rows={3}
          placeholder="Address for mobile service, condition of the vehicle, pet hair, etc."
          className={fieldClass}
        />
      </div>

      {error && (
        <p className="text-sm text-red-400 mt-4" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="preview-btn preview-btn-solid w-full mt-6 py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Request My Appointment
          </>
        )}
      </button>

      <p
        className={`text-xs text-center mt-4 ${
          light ? 'text-slate-500' : 'text-white/50'
        }`}
      >
        No obligation. We&apos;ll confirm by phone before anything is booked.
      </p>
    </form>
  );
}
