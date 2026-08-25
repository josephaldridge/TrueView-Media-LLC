import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, SectionHeader, Reveal } from '@/components';
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
    'TrueView Media LLC is a veteran-owned web design studio focused on building professional websites for small businesses and entrepreneurs nationwide.',
  openGraph: {
    title: 'About | TrueView Media LLC',
    description:
      'A veteran-owned web design studio focused on building professional websites for small businesses and entrepreneurs.',
  },
};

const values = [
  {
    icon: Target,
    title: 'Execution Over Everything',
    description:
      'We focus on getting things done right. A defined scope, a clear timeline, and a finished site you can put to work.',
  },
  {
    icon: Users,
    title: 'Personal Attention',
    description:
      'You work directly with the people designing and building your site, start to finish. Your project gets our full focus.',
  },
  {
    icon: Zap,
    title: 'Speed Without Shortcuts',
    description:
      "We move fast because we've refined our process over many builds—every site still gets the full quality pass.",
  },
  {
    icon: Shield,
    title: 'Honesty First',
    description:
      'Straight answers, realistic timelines, and honest guidance on what will actually move the needle for your business.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-dark-400 to-dark-600 pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <Reveal
              direction="right"
              className="w-16 h-px bg-gradient-to-r from-rose-gold to-transparent mb-8"
            />
            <Reveal
              as="h1"
              delay={80}
              className="text-white font-display font-light tracking-wide mb-6"
            >
              About TrueView Media
            </Reveal>
            <Reveal as="p" delay={180} className="text-xl text-gray-400">
              A veteran-owned studio with a clear focus: building professional websites for small business owners and entrepreneurs who need to earn trust and drive results.
            </Reveal>
          </div>
        </div>
      </section>

      {/* Story */}
      <Section background="white">
        <div className="max-w-3xl mx-auto">
          <Reveal as="h2" className="text-2xl font-light tracking-wide text-white mb-6">
            Why we exist
          </Reveal>
          <div className="prose prose-invert max-w-none">
            <Reveal as="p" delay={0} className="text-gray-400 text-lg leading-relaxed mb-6">
              Small businesses do essential work. They serve their communities, build trust with customers, and keep things moving day to day. But too many of them are held back by outdated, ineffective websites that don{"'"}t reflect the quality of what they actually offer.
            </Reveal>
            <Reveal as="p" delay={90} className="text-gray-400 text-lg leading-relaxed mb-6">
              We started TrueView Media to fix that problem. We do it with straightforward web design that works: fast-loading sites, clear messaging, and professional presentation that helps customers take action—at a price a small business can say yes to.
            </Reveal>
            <Reveal as="p" delay={180} className="text-gray-400 text-lg leading-relaxed mb-6">
              We work with a wide range of small businesses and entrepreneurs—from service providers and consultants to e-commerce startups and creative professionals. Anyone who wants a website that looks credible, works properly, and helps grow their business.
            </Reveal>
            <Reveal as="p" delay={270} className="text-gray-400 text-lg leading-relaxed">
              We are a veteran-owned, small operation by design. That means personal attention, direct communication, and real accountability. When you work with us, you{"'"}re working directly with the people who design and build your site, from the first call through launch.
            </Reveal>
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
          {values.map((value, i) => (
            <Reveal
              key={value.title}
              delay={i * 90}
              className="bg-dark-500/50 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-rose-gold/10 text-rose-gold rounded-lg mb-4">
                <value.icon className="w-5 h-5" />
              </div>
              <h3 className="font-light tracking-wide text-white mb-2">{value.title}</h3>
              <p className="text-gray-400 text-sm">{value.description}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Where We Fit */}
      <Section background="white">
        <div className="max-w-3xl mx-auto">
          <Reveal as="h2" className="text-2xl font-light tracking-wide text-white mb-6">
            Where we do our best work
          </Reveal>
          <Reveal as="p" delay={100} className="text-gray-400 mb-6">
            We are specialists, and that focus is what makes the work good:
          </Reveal>
          <ul className="space-y-3">
            <Reveal as="li" direction="right" className="flex items-start gap-3" delay={150}>
              <CheckCircle className="w-5 h-5 text-rose-gold flex-shrink-0 mt-0.5" />
              <span className="text-gray-400">
                <strong className="text-white">Websites, done properly.</strong> Design, build, and launch is all we do—so it is what we have gotten very good at.
              </span>
            </Reveal>
            <Reveal as="li" direction="right" className="flex items-start gap-3" delay={240}>
              <CheckCircle className="w-5 h-5 text-rose-gold flex-shrink-0 mt-0.5" />
              <span className="text-gray-400">
                <strong className="text-white">Built for your business.</strong> Every site is designed around your customers, your services, and the way you actually sell.
              </span>
            </Reveal>
            <Reveal as="li" direction="right" className="flex items-start gap-3" delay={330}>
              <CheckCircle className="w-5 h-5 text-rose-gold flex-shrink-0 mt-0.5" />
              <span className="text-gray-400">
                <strong className="text-white">Sized for small business.</strong> Small businesses and entrepreneurs are exactly who we build for, and our process is tuned to that scale.
              </span>
            </Reveal>
            <Reveal as="li" direction="right" className="flex items-start gap-3" delay={420}>
              <CheckCircle className="w-5 h-5 text-rose-gold flex-shrink-0 mt-0.5" />
              <span className="text-gray-400">
                <strong className="text-white">Honest about results.</strong> We tell you what a great website can realistically do for your business, and then we build one that does it.
              </span>
            </Reveal>
          </ul>
        </div>
      </Section>

      {/* What We Believe */}
      <Section background="gray">
        <div className="max-w-3xl mx-auto">
          <Reveal as="h2" className="text-2xl font-light tracking-wide text-white mb-6">
            What we believe
          </Reveal>
          <div className="space-y-4">
            {[
              'You should own your website, domain, and hosting outright.',
              'Pricing should be published upfront, before you ever pick up the phone.',
              'Websites should load fast and work on every device.',
              "Good design serves a purpose—every choice should earn its place.",
              "Communication should be direct, honest, and prompt.",
              'Small businesses and entrepreneurs deserve the same craft a big brand would get.',
            ].map((belief, i) => (
              <Reveal
                key={belief}
                delay={i * 80}
                direction="right"
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-rose-gold flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{belief}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Location */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal as="h2" className="text-2xl font-light tracking-wide text-white mb-4">
            Based in Texas, serving clients nationwide
          </Reveal>
          <Reveal as="p" delay={100} className="text-gray-400 mb-8">
            While we are based in Texas, we work with small businesses and entrepreneurs across the country. Location does not limit our ability to deliver—modern tools make collaboration easy regardless of where you are.
          </Reveal>
          <Reveal delay={200}>
            <Link href="/contact" className="btn-primary">
              Get in touch
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Reveal>
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
