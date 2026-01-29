import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components';
import CTABand from '@/components/CTA';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Professional website design for small businesses. Flat fee of $1,299. No hidden fees, no surprises.',
  openGraph: {
    title: 'Services | TrueView Media LLC',
    description:
      'Professional website design for small businesses. Flat fee of $1,299.',
  },
};

const includedFeatures = [
  'Custom design tailored to your brand',
  '5–10 pages (Home, Services, About, Contact, etc.)',
  'Mobile-responsive layout',
  'Contact form with email notifications',
  'Basic on-page SEO setup',
  'Google Analytics integration',
  'Speed optimization',
  'SSL certificate setup',
  'Domain and hosting configuration',
  'Training documentation',
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-slate-900 mb-6">Services</h1>
            <p className="text-xl text-slate-600">
              Professional websites for small businesses. One flat fee, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Flat Fee Pricing */}
      <Section background="white" id="pricing">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-slate-900 mb-4">Simple, flat-fee pricing</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Most professionally built websites cost $2,500–$5,000 or more. We believe small businesses should have access to a fast, professional website without paying agency prices.
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-8 md:p-12 border border-slate-200">
            <div className="text-center mb-8">
              <p className="text-sm text-slate-500 uppercase tracking-wide mb-2">
                Flat build fee
              </p>
              <p className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">$1,299</p>
              <p className="text-slate-600 text-lg">
                Everything you need to launch a professional website.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-slate-900 mb-4 text-center">
                What&apos;s included:
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {includedFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              <Link href="/contact" className="btn-primary text-lg px-8 py-3">
                Get Started
              </Link>
              <p className="mt-4 text-sm text-slate-500">
                Ask about our military discount.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Have a larger project in mind?{' '}
              <Link href="/contact" className="text-brand-600 hover:text-brand-700 font-medium">
                Let&apos;s talk
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <CTABand
        title="Ready to get started?"
        subtitle="Get a professional website that earns trust and drives calls."
      />
    </>
  );
}
