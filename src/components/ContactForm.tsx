'use client';

import { useState, FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, Phone, Clock, ArrowRight } from 'lucide-react';

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
  { value: 'website-build-basic', label: 'Website Build - $499 one-time' },
  { value: 'post-launch-edits', label: 'Post-Launch Edits - $49 per request' },
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
  { value: 'professional-services', label: 'Professional Services' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'ecommerce', label: 'E-commerce / Retail' },
  { value: 'health-wellness', label: 'Health & Wellness' },
  { value: 'creative', label: 'Creative / Design' },
  { value: 'technology', label: 'Technology / SaaS' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'food-hospitality', label: 'Food & Hospitality' },
  { value: 'home-services', label: 'Home Services' },
  { value: 'coaching', label: 'Coaching / Training' },
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
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-green-500/20 text-green-400 rounded-full">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-light tracking-wide text-white mb-3">
          Got it! We&apos;re on it.
        </h3>
        <p className="text-gray-300 mb-2 text-lg">
          Your request is now at the top of our list.
        </p>
        <div className="bg-dark-600/50 rounded-lg p-4 mb-6 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 text-rose-gold mb-2">
            <Clock className="w-5 h-5" />
            <span className="font-medium">What happens next:</span>
          </div>
          <p className="text-gray-400 text-sm">
            You&apos;ll hear from us within <strong className="text-white">15 minutes</strong> during business hours (Mon-Fri, 9am-6pm CT). If it&apos;s after hours, expect a call first thing in the morning.
          </p>
        </div>
        <p className="text-gray-500 text-sm mb-6">
          Can&apos;t wait? Call us directly:
        </p>
        <a
          href="tel:972-339-0754"
          className="btn-primary"
        >
          <Phone className="w-4 h-4 mr-2" />
          972-339-0754
        </a>
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
            placeholder="Your Business Name"
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
            placeholder="john@yourbusiness.com"
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

      <div className="flex flex-col md:flex-row md:items-center gap-4">
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
              Get My Free Preview
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </button>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <Clock className="w-4 h-4 text-rose-gold" />
          We respond within 15 minutes
        </p>
      </div>
    </form>
  );
}
