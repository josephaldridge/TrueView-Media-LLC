import Link from 'next/link';
import { Phone, Mail, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

interface CTABandProps {
  title?: string;
  subtitle?: string;
  showPhone?: boolean;
  showEmail?: boolean;
  variant?: 'brand' | 'dark';
}

export default function CTABand({
  title = "Ready to get started?",
  subtitle = "Let's build a website that earns trust and drives calls.",
  showPhone = true,
  showEmail = true,
  variant = 'brand',
}: CTABandProps) {
  return (
    <section className="relative bg-dark-700 text-white section-padding overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-gold/5 to-transparent" />
      
      <div className="container-custom text-center relative z-10">
        <Reveal
          direction="scale"
          className="w-16 h-px bg-gradient-to-r from-transparent via-rose-gold to-transparent mx-auto mb-8"
        />
        <Reveal
          as="h2"
          delay={80}
          className="text-white text-3xl md:text-4xl font-light tracking-wide mb-4"
        >
          {title}
        </Reveal>
        <Reveal as="p" delay={160} className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          {subtitle}
        </Reveal>
        <Reveal
          delay={240}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="btn-primary px-8 py-3.5"
          >
            Get Your Free Preview
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          {showPhone && (
            <a
              href="tel:972-339-0754"
              className="btn-outline px-6 py-3.5"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now: 972-339-0754
            </a>
          )}
        </Reveal>
        {showEmail && (
          <Reveal as="p" delay={320} className="mt-4 text-gray-500 text-sm">
            Or email us at{' '}
            <a
              href="mailto:contact@trueviewmediallc.com"
              className="text-rose-gold hover:text-rose-light transition-colors"
            >
              contact@trueviewmediallc.com
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}

interface CTAButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'default' | 'large';
  className?: string;
  external?: boolean;
}

export function CTAButton({
  href = '/contact',
  children,
  variant = 'primary',
  size = 'default',
  className = '',
  external = false,
}: CTAButtonProps) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
  };

  const sizes = {
    default: '',
    large: 'px-8 py-4 text-lg',
  };

  const combinedClassName = `${variants[variant]} ${sizes[size]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={combinedClassName}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  );
}
