'use client';

import { useState, FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  industry: string;
  help: string;
  budget: string;
  timeline: string;
}

const initialFormData: FormData = {
  name: '',
  businessName: '',
  email: '',
  phone: '',
  industry: '',
  help: '',
  budget: '',
  timeline: '',
};

const serviceOptions = [
  { value: '', label: 'Select service' },
  { value: 'website-build-basic', label: 'Website Build - Basic $1,299' },
  { value: 'larger-project', label: 'I have a larger project, let\'s discuss' },
];

const timelineOptions = [
  { value: '', label: 'Select timeline' },
  { value: 'asap', label: 'As soon as possible' },
  { value: '2-weeks', label: 'Within 2 weeks' },
  { value: '1-month', label: 'Within 1 month' },
  { value: '2-3-months', label: '2–3 months' },
  { value: 'flexible', label: 'Flexible / Not urgent' },
];

const industryOptions = [
  { value: '', label: 'Select your industry' },
  { value: 'hvac', label: 'HVAC' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'roofing', label: 'Roofing' },
  { value: 'general-contractor', label: 'General Contractor' },
  { value: 'landscaping', label: 'Landscaping' },
  { value: 'cleaning', label: 'Cleaning Services' },
  { value: 'accounting', label: 'Accounting / Financial' },
  { value: 'legal', label: 'Legal Services' },
  { value: 'medical', label: 'Medical / Healthcare' },
  { value: 'other', label: 'Other' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setFormData(initialFormData);
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="card-elevated text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-rose-gold/20 text-rose-gold rounded-full">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-light tracking-wide text-white mb-2">
          Thank you for reaching out!
        </h3>
        <p className="text-gray-400 mb-6">
          We&apos;ve received your message and will get back to you within 1 business day.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-secondary"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === 'error' && (
        <div className="flex items-start gap-3 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-300">{errorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="label">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="John Smith"
          />
        </div>

        {/* Business Name */}
        <div>
          <label htmlFor="businessName" className="label">
            Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="Smith Plumbing Co."
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="label">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="john@smithplumbing.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="label">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="(555) 123-4567"
          />
        </div>

        {/* Industry */}
        <div>
          <label htmlFor="industry" className="label">
            Industry <span className="text-red-500">*</span>
          </label>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
            className="input-field"
          >
            {industryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Service Requested */}
        <div>
          <label htmlFor="budget" className="label">
            Service Requested <span className="text-red-500">*</span>
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            className="input-field"
          >
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Timeline */}
        <div className="md:col-span-2">
          <label htmlFor="timeline" className="label">
            Timeline <span className="text-red-500">*</span>
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            required
            className="input-field"
          >
            {timelineOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Help Needed */}
        <div className="md:col-span-2">
          <label htmlFor="help" className="label">
            What do you need help with? <span className="text-red-500">*</span>
          </label>
          <textarea
            id="help"
            name="help"
            value={formData.help}
            onChange={handleChange}
            required
            rows={4}
            className="input-field resize-none"
            placeholder="Tell us about your project. Do you need a new website, a redesign, or something else?"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
