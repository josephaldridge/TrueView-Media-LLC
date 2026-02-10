'use client';

import { useState, useEffect, FormEvent } from 'react';
import { X, Send, CheckCircle, AlertCircle, Loader2, Phone, Clock, ArrowRight } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  help: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  help: '',
};

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check if popup was already shown this session
    const popupShown = sessionStorage.getItem('exitPopupShown');
    if (popupShown) {
      setHasTriggered(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from the top of the viewport
      if (e.clientY <= 0 && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasTriggered]);

  // Handle Escape key to close popup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        body: JSON.stringify({
          ...formData,
          businessName: 'Exit Intent Lead',
          industry: 'other',
          budget: 'website-build-basic',
          timeline: 'flexible',
        }),
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

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div className="relative w-full max-w-lg bg-dark-600 rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header accent */}
        <div className="h-1 bg-gradient-to-r from-rose-gold via-rose-light to-rose-gold" />

        <div className="p-6 md:p-8">
          {status === 'success' ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-green-500/20 text-green-400 rounded-full">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-light tracking-wide text-white mb-2">
                Got it! We&apos;re on it.
              </h3>
              <div className="bg-dark-700/50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center gap-2 text-rose-gold mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium text-sm">What happens next:</span>
                </div>
                <p className="text-gray-400 text-sm">
                  You&apos;ll hear from us within <strong className="text-white">15 minutes</strong> during business hours.
                </p>
              </div>
              <p className="text-gray-500 text-sm mb-4">
                Can&apos;t wait?
              </p>
              <a
                href="tel:972-339-0754"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-rose-gold text-white rounded-lg hover:bg-rose-dark transition-colors text-sm"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call: 972-339-0754
              </a>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-display font-light tracking-wide text-white mb-2">
                  Want a <span className="text-rose-gold">Free Preview</span>?
                </h2>
                <p className="text-gray-400">
                  No obligation, no pressure. We&apos;ll email you a live link that&apos;s active for 48 hours so you can see for yourself.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === 'error' && (
                  <div className="flex items-start gap-3 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-300">{errorMessage}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="popup-name" className="label">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="popup-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label htmlFor="popup-phone" className="label">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="popup-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="popup-email" className="label">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="popup-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="popup-help" className="label">
                    What does your business do?
                  </label>
                  <textarea
                    id="popup-help"
                    name="help"
                    value={formData.help}
                    onChange={handleChange}
                    rows={2}
                    className="input-field resize-none"
                    placeholder="e.g., growing my online presence"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
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

                <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3 text-rose-gold" />
                  We respond within 15 minutes
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
