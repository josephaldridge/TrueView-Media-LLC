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
  const backgrounds = {
    brand: 'bg-brand-600',
    dark: 'bg-slate-900',
  };

  return (
    <section className={`${backgrounds[variant]} text-white section-padding`}>
      <div className="container-custom text-center">
        <h2 className="text-white text-3xl md:text-4xl font-semibold mb-4">
          {title}
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium bg-white text-brand-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Request Information
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          {showPhone && (
            <a
              href="tel:972-339-0754"
              className="inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              972-339-0754
            </a>
          )}
        </div>
        {showEmail && (
          <p className="mt-6 text-white/60 text-sm">
            Or email us at{' '}
            <a
              href="mailto:contact@trueviewmediallc.com"
              className="text-white hover:underline"
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
