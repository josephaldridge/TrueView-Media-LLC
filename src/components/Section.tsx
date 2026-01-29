import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'gray' | 'dark' | 'brand';
}

export default function Section({
  children,
  className = '',
  id,
  background = 'white',
}: SectionProps) {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-slate-50',
    dark: 'bg-slate-900 text-white',
    brand: 'bg-brand-600 text-white',
  };

  return (
    <section
      id={id}
      className={`section-padding ${backgrounds[background]} ${className}`}
    >
      <div className="container-custom">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center max-w-3xl mx-auto' : ''}`}>
      <h2 className={light ? 'text-white' : 'text-slate-900'}>{title}</h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg ${
            light ? 'text-white/80' : 'text-slate-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
