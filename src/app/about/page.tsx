import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, SectionHeader } from '@/components';
import CTABand from '@/components/CTA';
import {
  CheckCircle,
  Target,
  Users,
  Zap,
  Shield,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description:
    'TrueView Media LLC is a small web design studio focused on building professional websites for local service businesses. Personal attention, execution-focused.',
  openGraph: {
    title: 'About | TrueView Media LLC',
    description:
      'A small web design studio focused on building professional websites for local service businesses.',
  },
};

const values = [
  {
    icon: Target,
    title: 'Execution Over Everything',
    description:
      'We focus on getting things done right. No endless meetings, no scope creep, no excuses. Just results.',
  },
  {
    icon: Users,
    title: 'Personal Attention',
    description:
      'You work directly with us—not a revolving door of account managers. Your project gets our full focus.',
  },
  {
    icon: Zap,
    title: 'Speed Without Shortcuts',
    description:
      "We move fast because we've refined our process, not because we cut corners.",
  },
  {
    icon: Shield,
    title: 'Honesty First',
    description:
      'We tell you what you need to hear, not what you want to hear. No inflated promises.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-slate-900 mb-6">About TrueView Media</h1>
            <p className="text-xl text-slate-600">
              A small studio with a clear focus: building professional websites for local service businesses that need to earn trust and drive customer action.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <Section background="white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            Why we exist
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Small businesses do essential work. They serve their communities, build trust with customers, and keep things moving day to day. But too many of them are held back by outdated, ineffective websites that don{"'"}t reflect the quality of what they actually offer.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              We started TrueView Media to fix that problem. Not with flashy gimmicks or overpriced agency retainers, but with straightforward web design that works: fast-loading sites, clear messaging, and professional presentation that helps customers take action.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              We work with a wide range of small businesses—contractors, HVAC technicians, barbershops, salons, service providers, and local professionals of all kinds—anyone who wants a website that looks credible, works properly, and does its job.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              We are a small operation by design. That means personal attention, direct communication, and real accountability. When you work with us, you{"'"}re not handed off to a junior team member—you work directly with the people who design and build your site.
            </p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section background="gray">
        <SectionHeader
          title="How we work"
          subtitle="Our approach to building websites that actually perform."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-white rounded-xl p-6 border border-slate-200"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-brand-50 text-brand-600 rounded-lg mb-4">
                <value.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{value.title}</h3>
              <p className="text-slate-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* What We're Not */}
      <Section background="white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            What we&apos;re not
          </h2>
          <p className="text-slate-600 mb-6">
            Being clear about what we don&apos;t do is just as important as what we do:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-slate-400 font-bold">✕</span>
              <span className="text-slate-600">
                <strong className="text-slate-900">Not a full-service agency.</strong> We build websites. We don&apos;t run ad campaigns, manage social media, or do ongoing marketing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-slate-400 font-bold">✕</span>
              <span className="text-slate-600">
                <strong className="text-slate-900">Not a template mill.</strong> Every site is built for your specific business, not slapped together from generic templates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-slate-400 font-bold">✕</span>
              <span className="text-slate-600">
                <strong className="text-slate-900">Not an enterprise solution.</strong> We work best with small and medium local businesses. Large corporations with complex requirements aren&apos;t our specialty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-slate-400 font-bold">✕</span>
              <span className="text-slate-600">
                <strong className="text-slate-900">Not making promises we cannot keep.</strong> We will not claim to &quot;10x your leads&quot; or guarantee page one rankings. We build quality sites—results depend on many factors.
              </span>
            </li>
          </ul>
        </div>
      </Section>

      {/* What We Believe */}
      <Section background="gray">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            What we believe
          </h2>
          <div className="space-y-4">
            {[
              'You should own your website, domain, and hosting—no vendor lock-in.',
              'Pricing should be clear upfront, not revealed after a sales call.',
              'Websites should load fast and work on every device.',
              "Good design serves a purpose—it's not just decoration.",
              "Communication should be direct and honest, even when it's uncomfortable.",
              'Small businesses deserve professional treatment, not second-rate templates.',
            ].map((belief) => (
              <div key={belief} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{belief}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Location */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Based in Texas, serving clients nationwide
          </h2>
          <p className="text-slate-600 mb-8">
            While we are based in Texas, we work with local service businesses across the country. Location does not limit our ability to deliver—modern tools make collaboration easy regardless of where you are based.
          </p>
          <Link href="/contact" className="btn-primary">
            Get in touch
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </Section>

      {/* CTA */}
      <CTABand
        title="Want to work with us?"
        subtitle="Let us see if we are a good fit for your project."
      />
    </>
  );
}
