import Link from 'next/link';
import Image from 'next/image';
import {
  Section,
  SectionHeader,
  ProcessCard,
  FAQ,
  homepageFAQs,
  Reveal,
  WorkCarousel,
} from '@/components';
import { SHOWCASE } from '@/lib/previews/showcase';
import CTABand from '@/components/CTA';
import {
  Phone,
  ArrowRight,
  CheckCircle,
  Smartphone,
  Shield,
  Star,
  Clock,
  Award,
  Gauge,
  Search,
  MousePointerClick,
  Code2,
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

const heroStats = [
  { value: '$899', label: 'flat, up to 9 pages' },
  { value: '2–3', label: 'days to launch' },
  { value: '100%', label: 'you own it' },
  { value: '$49', label: 'per edit request' },
];

const buildIncludes = [
  {
    icon: Search,
    title: 'Targeted SEO build',
    description:
      'Keyword-mapped pages, schema markup, clean heading structure, XML sitemap and Search Console setup — so you rank for what people in your town actually type.',
  },
  {
    icon: MousePointerClick,
    title: 'Conversion-first layout',
    description:
      'Every page ends in a way to contact you. Click-to-call on mobile, booking forms, and the phone number never more than a thumb away.',
  },
  {
    icon: Gauge,
    title: 'Built for speed',
    description:
      'Statically rendered, image-optimised, scoring green on Core Web Vitals. Fast sites rank higher and lose fewer visitors before the page loads.',
  },
  {
    icon: Code2,
    title: 'Modern, hand-built code',
    description:
      'Next.js and React — the stack behind the sites you already admire. No page-builder bloat, no plugin tax, nothing to break on an update.',
  },
];

const trustPoints = [
  { icon: Award, text: 'Veteran-Owned' },
  { icon: Clock, text: '2–3 day turnaround' },
  { icon: Smartphone, text: 'Mobile-first design' },
  { icon: Shield, text: '100% ownership guarantee' },
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
            <Reveal
              direction="right"
              className="w-16 h-px bg-gradient-to-r from-rose-gold to-transparent mb-8"
            />

            {/* Problem-focused headline */}
            <Reveal
              as="p"
              delay={80}
              className="text-rose-gold text-xs uppercase tracking-[0.25em] mb-5 font-medium"
            >
              ( Custom websites · built to convert )
            </Reveal>
            <Reveal
              as="h1"
              delay={160}
              className="text-white font-display font-light tracking-wide mb-6 text-5xl md:text-6xl lg:text-7xl leading-[1.05]"
            >
              Websites that{' '}
              <span className="text-rose-gold">book the call</span>
              —not just look good.
            </Reveal>
            <Reveal
              as="p"
              delay={260}
              className="text-xl text-gray-400 mb-8 max-w-2xl leading-relaxed"
            >
              Hand-built, SEO-engineered sites for small businesses. Fast, mobile-first,
              and designed around the one action you want a visitor to take. Nine pages,
              one flat fee, no retainers.
            </Reveal>

            {/* Social proof line */}
            <Reveal delay={340} className="flex items-center gap-2 mb-8 text-gray-400">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-rose-gold fill-rose-gold" />
                ))}
              </div>
              <span className="text-sm">Veteran-owned & trusted by entrepreneurs nationwide</span>
            </Reveal>

            <Reveal delay={420} className="flex flex-col sm:flex-row gap-4">
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
            </Reveal>

            <Reveal
              delay={500}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14 max-w-2xl"
            >
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl md:text-4xl font-display font-light text-white">
                    {stat.value}
                  </p>
                  <p className="text-[11px] uppercase tracking-widest text-gray-500 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trust Points */}
      <Section background="white" className="py-12 border-b border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustPoints.map((point, i) => (
            <Reveal
              key={point.text}
              delay={i * 90}
              className="flex items-center gap-3"
            >
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-rose-gold/10 text-rose-gold rounded-lg">
                <point.icon className="w-5 h-5" />
              </div>
              <span className="font-light tracking-wide text-gray-300">{point.text}</span>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Work — builds across industries */}
      <Section background="gray" id="work">
        <div className="mb-12">
          <Reveal
            as="p"
            className="text-rose-gold text-xs uppercase tracking-[0.25em] mb-4 font-medium"
          >
            ( Selected builds )
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="text-white font-light tracking-wide mb-4 max-w-3xl"
          >
            Every industry has a different buyer. The site should know that.
          </Reveal>
          <Reveal as="p" delay={160} className="text-gray-400 max-w-2xl">
            A plumber needs the phone number in your face. A med spa needs to feel
            expensive. A law firm needs to feel safe. Every build below is a
            live, working site — click any one and it opens in full.
          </Reveal>
        </div>

        <Reveal delay={220}>
          <WorkCarousel items={SHOWCASE} />
        </Reveal>
      </Section>

      {/* What a build includes */}
      <Section background="white" id="what-you-get">
        <div className="mb-14">
          <Reveal
            as="p"
            className="text-rose-gold text-xs uppercase tracking-[0.25em] mb-4 font-medium"
          >
            ( What you actually get )
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="text-white font-light tracking-wide mb-4 max-w-3xl"
          >
            The whole enchilada. For one flat fee.
          </Reveal>
          <Reveal as="p" delay={160} className="text-gray-400 max-w-2xl">
            Not a template with your logo dropped in. A site designed, written,
            built and tuned for how your customers actually find and choose you.
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {buildIncludes.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 90}
              className="bg-dark-500/50 backdrop-blur-sm rounded-xl p-7 border border-white/10 hover:border-rose-gold/25 transition-colors duration-300"
            >
              <div className="w-11 h-11 flex items-center justify-center bg-rose-gold/10 text-rose-gold rounded-lg mb-5">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-light tracking-wide text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400} className="mt-12 text-center">
          <Link href="/services" className="btn-primary">
            See everything included
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Reveal>
      </Section>

      {/* Testimonials Section - Add real reviews here when available */}

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
          {processSteps.map((step, i) => (
            <ProcessCard key={step.step} index={i} {...step} />
          ))}
        </div>
      </Section>

      {/* Why Us */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal as="h2" className="text-white font-light tracking-wide mb-6">
              Why small businesses choose us
            </Reveal>
            <div className="space-y-4">
              {[
                'You own your domain and hosting outright, start to finish',
                'Clear, flat pricing you can see before you call',
                'Fast turnaround without cutting corners',
                'Mobile-first design that works on every device',
                'SEO fundamentals built in from the start',
                'Clean handoff with documentation',
              ].map((point, i) => (
                <Reveal
                  key={point}
                  delay={100 + i * 80}
                  direction="right"
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-rose-gold flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{point}</span>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal
            direction="left"
            delay={120}
            className="bg-dark-500/50 backdrop-blur-sm rounded-xl p-8 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-rose-gold" />
              <h3 className="text-xl font-light tracking-wide text-white">
                What you get, upfront
              </h3>
            </div>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-rose-gold font-bold">•</span>
                <span>Domain and hosting registered in your name, under your control</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-gold font-bold">•</span>
                <span>A finished, launch-ready site—yours to keep the day we hand it over</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-gold font-bold">•</span>
                <span>Post-launch edits whenever you need them: $49 per request, not per edit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-gold font-bold">•</span>
                <span>Open, standard tech—so you can hire any developer you like down the road</span>
              </li>
            </ul>
          </Reveal>
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
