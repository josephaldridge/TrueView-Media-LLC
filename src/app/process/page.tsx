import type { Metadata } from 'next';
import { Section, SectionHeader, ProcessCard } from '@/components';
import CTABand from '@/components/CTA';
import {
  CheckCircle,
  FileText,
  MessageSquare,
  Calendar,
  AlertCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Process',
  description:
    'Our straightforward process for building professional websites. Discovery, build, review, launch, handoff.',
  openGraph: {
    title: 'Our Process | TrueView Media LLC',
    description:
      'A straightforward process for building professional websites. Discovery, build, review, launch, handoff.',
  },
};

const processSteps = [
  {
    step: 1,
    title: 'Discovery',
    description:
      'We start with a conversation. We learn about your business, your customers, your goals, and what you need from your website. This typically takes 30-60 minutes via phone or video call.',
    details: [
      'Business overview and goals',
      'Target customer discussion',
      'Competitor review',
      'Content and asset collection',
      'Timeline and budget alignment',
    ],
  },
  {
    step: 2,
    title: 'Proposal & Deposit',
    description:
      'Based on our discovery conversation, we provide a clear proposal with scope, timeline, and pricing. Once approved, a 50% deposit starts the project.',
    details: [
      'Detailed scope document',
      'Fixed project price',
      'Timeline estimate',
      'Payment terms',
      'Contract signing',
    ],
  },
  {
    step: 3,
    title: 'Design & Build',
    description:
      "We design and develop your website. You'll see progress throughout and have opportunities to provide feedback. We don't disappear for weeks—we keep you in the loop.",
    details: [
      'Homepage design first',
      'Regular progress updates',
      'Mobile-first development',
      'Content integration',
      'Functionality testing',
    ],
  },
  {
    step: 4,
    title: 'Review & Revisions',
    description:
      "You review the complete site and provide feedback. We make revisions until you're satisfied. We include up to two rounds of revisions in every project.",
    details: [
      'Full site walkthrough',
      'Feedback collection',
      'Two revision rounds included',
      'Mobile device testing',
      'Final approval',
    ],
  },
  {
    step: 5,
    title: 'Launch',
    description:
      "Once approved, we launch your site. We handle the technical details—DNS, SSL, performance optimization—so you don't have to worry about it.",
    details: [
      'Domain configuration',
      'SSL certificate setup',
      'Performance optimization',
      'Analytics installation',
      'Final balance due',
    ],
  },
  {
    step: 6,
    title: 'Handoff',
    description:
      'Your site is yours. We provide documentation and access credentials. You own everything—domain, hosting, code. No vendor lock-in.',
    details: [
      'Admin access credentials',
      'Documentation package',
      'Hosting account access',
      'Training walkthrough',
      'Support during transition',
    ],
  },
];

export default function ProcessPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-slate-900 mb-6">Our Process</h1>
            <p className="text-xl text-slate-600">
              A straightforward approach designed to get your site live quickly, without surprises, and with you in control throughout.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <Section background="white">
        <div className="max-w-4xl mx-auto space-y-12">
          {processSteps.map((step, index) => (
            <div key={step.step} className="relative">
              {index < processSteps.length - 1 && (
                <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-slate-200 hidden md:block" />
              )}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-brand-600 text-white text-sm font-semibold rounded-full relative z-10">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-slate-900 mb-3">
                    {step.title}
                  </h2>
                  <p className="text-slate-600 mb-4">{step.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {step.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <CheckCircle className="w-4 h-4 text-brand-600 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>


      {/* What to Expect */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="What to expect from us"
            subtitle="Our commitments to you throughout the project."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-brand-50 text-brand-600 rounded-lg flex-shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  Clear Communication
                </h3>
                <p className="text-sm text-slate-600">
                  Regular updates, quick responses, and no jargon. We keep you informed without overwhelming you.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-brand-50 text-brand-600 rounded-lg flex-shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  On-Time Delivery
                </h3>
                <p className="text-sm text-slate-600">
                  We hit our deadlines. If something affects the timeline, we tell you immediately and adjust.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-brand-50 text-brand-600 rounded-lg flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  No Surprises
                </h3>
                <p className="text-sm text-slate-600">
                  Fixed pricing for defined scope. Any changes are discussed and agreed upon before work begins.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-brand-50 text-brand-600 rounded-lg flex-shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  Quality Work
                </h3>
                <p className="text-sm text-slate-600">
                  Modern, fast, accessible websites built with care. We don&apos;t cut corners or use outdated methods.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* What We Need */}
      <Section background="gray">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="What we need from you"
            subtitle="Your involvement makes the project successful."
          />
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-slate-900">Content & Assets</span>
                  <p className="text-sm text-slate-600 mt-1">
                    Text for pages, photos, logos, and any other materials. We can help with structure, but you know your business best.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-slate-900">Timely Feedback</span>
                  <p className="text-sm text-slate-600 mt-1">
                    Quick responses keep the project moving. Delays in feedback affect the launch date.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-slate-900">Account Access</span>
                  <p className="text-sm text-slate-600 mt-1">
                    Domain registrar, hosting, and any other accounts we need to access for setup.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-slate-900">Decision Making</span>
                  <p className="text-sm text-slate-600 mt-1">
                    One person who can make decisions. Design by committee slows everything down.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <CTABand
        title="Ready to start?"
        subtitle="Let's talk about your project and timeline."
      />
    </>
  );
}
