import Link from 'next/link';
import {
  Section,
  SectionHeader,
  ServiceCard,
  ProcessCard,
  FAQ,
  homepageFAQs,
} from '@/components';
import CTABand from '@/components/CTA';
import {
  Phone,
  ArrowRight,
  CheckCircle,
  Globe,
  RefreshCw,
  Search,
  Zap,
  Smartphone,
  Shield,
  FileCheck,
} from 'lucide-react';

const services = [
  {
    title: 'Website Build',
    description:
      'A complete, professional website built from scratch. Perfect for businesses that need a strong online presence.',
    icon: Globe,
    href: '/services#website-build',
  },
  {
    title: 'Website Refresh',
    description:
      "Redesign or migrate your existing site for a modern look and better performance. Keep what works, fix what doesn't.",
    icon: RefreshCw,
    href: '/services#website-refresh',
  },
  {
    title: 'Local SEO Setup',
    description:
      'On-page SEO fundamentals to help local customers find you. Proper titles, meta descriptions, and structured data.',
    icon: Search,
    href: '/services#local-seo',
  },
];

const processSteps = [
  {
    step: 1,
    title: 'Discovery',
    description: 'We learn about your business, goals, and what you need from your website.',
  },
  {
    step: 2,
    title: 'Build',
    description: 'We design and develop your site with regular check-ins to keep you in the loop.',
  },
  {
    step: 3,
    title: 'Review',
    description: "You review the site and we make revisions until you're satisfied.",
  },
  {
    step: 4,
    title: 'Launch',
    description: 'We deploy your site and ensure everything works correctly.',
  },
  {
    step: 5,
    title: 'Handoff',
    description: 'You receive full access and documentation. Your site, your control.',
  },
];

const trustPoints = [
  { icon: Zap, text: 'Fast turnaround' },
  { icon: Smartphone, text: 'Mobile-first design' },
  { icon: Search, text: 'SEO-ready' },
  { icon: FileCheck, text: 'Clean handoff' },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white pt-12 pb-20 md:pt-20 md:pb-32">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="text-slate-900 mb-6">
              Websites built to{' '}
              <span className="text-brand-600">earn trust</span> and{' '}
              <span className="text-brand-600">drive calls</span>.
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl">
              We build fast, professional websites for small businesses—contractors, HVAC, plumbers, barbers, shops and more. No fluff. Just clean, effective sites that represent your business online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Request Information
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a
                href="tel:972-339-0754"
                className="btn-outline text-lg px-8 py-4"
              >
                <Phone className="w-5 h-5 mr-2" />
                972-339-0754
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Points */}
      <Section background="white" className="py-12 border-b border-slate-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustPoints.map((point) => (
            <div key={point.text} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-brand-50 text-brand-600 rounded-lg">
                <point.icon className="w-5 h-5" />
              </div>
              <span className="font-medium text-slate-700">{point.text}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Services Overview */}
      <Section background="gray" id="services">
        <SectionHeader
          title="What we do"
          subtitle="Focused services for local businesses that need professional results without the agency overhead."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/services" className="btn-secondary">
            View all services
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </Section>

      {/* Process Section */}
      <Section background="gray" id="process">
        <SectionHeader
          title="How we work"
          subtitle="A straightforward process designed to get your site live quickly without surprises."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {processSteps.map((step) => (
            <ProcessCard key={step.step} {...step} />
          ))}
        </div>
      </Section>

      {/* Why Us */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-slate-900 mb-6">
              Why local businesses choose us
            </h2>
            <div className="space-y-4">
              {[
                'You own your domain and hosting—no vendor lock-in',
                'Clear pricing with no hidden fees or surprise charges',
                'Fast turnaround without cutting corners',
                'Mobile-first design that works on every device',
                'SEO fundamentals built in from the start',
                'Clean handoff with documentation',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-brand-600" />
              <h3 className="text-xl font-semibold text-slate-900">
                Expectations set upfront
              </h3>
            </div>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-brand-600 font-bold">•</span>
                <span>Domain and hosting are registered in your name</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-600 font-bold">•</span>
                <span>Post-launch edits are not included—we hand off a finished site</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-600 font-bold">•</span>
                <span>We deliver a finished product, not an ongoing relationship (unless you want one)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-600 font-bold">•</span>
                <span>No proprietary platforms—you can hire any developer in the future</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="gray" id="faq">
        <SectionHeader
          title="Frequently asked questions"
          subtitle="Straight answers to common questions about working with us."
          centered
        />
        <div className="max-w-3xl mx-auto">
          <FAQ items={homepageFAQs} />
        </div>
      </Section>

      {/* Final CTA */}
      <CTABand
        title="Ready to build a website that works?"
        subtitle="Let's talk about your project. Get a clear quote with no obligation."
      />
    </>
  );
}
