import Link from 'next/link';
import Image from 'next/image';
import {
  Section,
  SectionHeader,
  ProcessCard,
  FAQ,
  homepageFAQs,
} from '@/components';
import CTABand from '@/components/CTA';
import {
  Phone,
  ArrowRight,
  CheckCircle,
  Search,
  Zap,
  Smartphone,
  Shield,
  FileCheck,
} from 'lucide-react';

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
      <section className="relative bg-gradient-to-b from-dark-400 to-dark-600 pt-16 pb-24 md:pt-24 md:pb-36 overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-gold/3 rounded-full blur-3xl" />
        
        {/* Decorative Script T */}
        <div className="absolute right-0 md:right-10 lg:right-20 top-[60%] -translate-y-1/2 w-[375px] h-[500px] md:w-[500px] md:h-[625px] lg:w-[625px] lg:h-[750px] opacity-50 pointer-events-none hidden md:block mix-blend-screen">
          <Image
            src="/t-mark.png"
            alt=""
            fill
            className="object-contain"
            aria-hidden="true"
          />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            {/* Elegant accent line */}
            <div className="w-16 h-px bg-gradient-to-r from-rose-gold to-transparent mb-8" />
            
            <h1 className="text-white font-display font-light tracking-wide mb-6">
              Websites built to{' '}
              <span className="text-rose-gold">earn trust</span> and{' '}
              <span className="text-rose-gold">drive calls</span>.
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
              We build fast, professional websites for small businesses—contractors, HVAC, plumbers, barbers, Mom & Pop shops, and more. No fluff. Just clean, effective sites that represent your business online.
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
      <Section background="white" className="py-12 border-b border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustPoints.map((point) => (
            <div key={point.text} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-rose-gold/10 text-rose-gold rounded-lg">
                <point.icon className="w-5 h-5" />
              </div>
              <span className="font-light tracking-wide text-gray-300">{point.text}</span>
            </div>
          ))}
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
            <h2 className="text-white font-light tracking-wide mb-6">
              Why small businesses choose us
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
                  <CheckCircle className="w-5 h-5 text-rose-gold flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-dark-500/50 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-rose-gold" />
              <h3 className="text-xl font-light tracking-wide text-white">
                Expectations set upfront
              </h3>
            </div>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-rose-gold font-bold">•</span>
                <span>Domain and hosting are registered in your name</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-gold font-bold">•</span>
                <span>Post-launch edits are not included—we hand off a finished site</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-gold font-bold">•</span>
                <span>We deliver a finished product, not an ongoing relationship (unless you want one)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-gold font-bold">•</span>
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
