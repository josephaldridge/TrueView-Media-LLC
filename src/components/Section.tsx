import { ReactNode } from 'react';
import Reveal from './Reveal';

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
    white: 'bg-dark-600',
    gray: 'bg-dark-500',
    dark: 'bg-dark-700 text-white',
    brand: 'bg-gradient-to-r from-rose-dark via-rose-gold to-rose-dark text-white',
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
      <Reveal as="h2" className="text-white font-light tracking-wide">
        {title}
      </Reveal>
      {subtitle && (
        <Reveal as="p" delay={120} className="mt-4 text-lg text-gray-400">
          {subtitle}
        </Reveal>
      )}
    </div>
  );
}
