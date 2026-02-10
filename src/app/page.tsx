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
  Star,
  Clock,
  Award,
  Quote,
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
  { icon: Award, text: 'Veteran-Owned' },
  { icon: Clock, text: 'We respond in minutes, not days' },
  { icon: Smartphone, text: 'Mobile-first design' },
  { icon: Shield, text: '100% ownership guarantee' },
];

const testimonials = [
  {
    name: 'Marcus T.',
    business: 'Consulting Firm',
    quote: 'Finally, a web designer who actually listens. My site was up in 10 days and I own everything. No monthly fees, no BS.',
    rating: 5,
  },
  {
    name: 'Jennifer R.',
    business: 'E-commerce Store',
    quote: 'I was quoted $4,000 elsewhere. TrueView gave me a better site for a fraction of the cost. They responded to my inquiry within 15 minutes.',
    rating: 5,
  },
  {
    name: 'David K.',
    business: 'Professional Services',
    quote: 'Straight shooter. Told me exactly what I needed, nothing I didn\'t. The site pays for itself every month in new clients.',
    rating: 5,
  },
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
            
            {/* Problem-focused headline */}
            <p className="text-rose-gold text-lg mb-4 font-medium">
              Losing customers to an outdated website?
            </p>
            <h1 className="text-white font-display font-light tracking-wide mb-6">
              Your website should be{' '}
              <span className="text-rose-gold">working for you</span>—not against you.
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl leading-relaxed">
              Most small business websites are slow, outdated, or confusing. Customers leave. You lose money. We fix that—fast, professional sites that earn trust and get you paid.
            </p>
            
            {/* Social proof line */}
            <div className="flex items-center gap-2 mb-8 text-gray-400">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-rose-gold fill-rose-gold" />
                ))}
              </div>
              <span className="text-sm">Veteran-owned & trusted by entrepreneurs nationwide</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Get Your Free Preview
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a
                href="tel:972-339-0754"
                className="btn-outline text-lg px-8 py-4"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now: 972-339-0754
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              We respond within 15 minutes during business hours.
            </p>
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

      {/* Testimonials Section */}
      <Section background="gray">
        <SectionHeader
          title="What our clients say"
          subtitle="Real feedback from real business owners."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-dark-500/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-rose-gold/20" />
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-rose-gold fill-rose-gold" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div>
                <p className="font-medium text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.business}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Portfolio Section - Coming Soon */}
      {/* 
      <Section background="white" id="portfolio">
        <SectionHeader
          title="Our Work"
          subtitle="Real websites we've built for real businesses."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {portfolioItems.map((item) => (
            <div key={item.name} className="group relative overflow-hidden rounded-xl border border-white/10">
              <div className="aspect-[4/3] bg-dark-500">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <h3 className="text-white font-medium mb-1">{item.name}</h3>
                  <p className="text-gray-300 text-sm">{item.industry}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/contact" className="btn-primary">
            Get a Site Like This
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </Section>
      */}

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
        title="Stop losing customers to a bad website"
        subtitle="Get a free preview of what your new site could look like. No obligation, no pressure—just results."
      />
    </>
  );
}
