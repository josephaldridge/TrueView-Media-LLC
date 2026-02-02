import Link from 'next/link';
import { Phone, Mail, ArrowRight } from 'lucide-react';

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
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-gold to-transparent mx-auto mb-8" />
        <h2 className="text-white text-3xl md:text-4xl font-light tracking-wide mb-4">
          {title}
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium bg-rose-gold text-white rounded-lg hover:bg-rose-dark transition-all duration-300"
          >
            Request Information
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          {showPhone && (
            <a
              href="tel:972-339-0754"
              className="inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-white border border-white/20 rounded-lg hover:border-rose-gold hover:text-rose-gold transition-all duration-300"
            >
              <Phone className="w-4 h-4 mr-2" />
              972-339-0754
            </a>
          )}
        </div>
        {showEmail && (
          <p className="mt-6 text-gray-500 text-sm">
            Or email us at{' '}
            <a
              href="mailto:contact@trueviewmediallc.com"
              className="text-rose-gold hover:text-rose-light transition-colors"
            >
              contact@trueviewmediallc.com
            </a>
          </p>
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
