import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface CardProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
}

export default function Card({
  children,
  className = '',
  elevated = false,
}: CardProps) {
  return (
    <div className={`${elevated ? 'card-elevated' : 'card'} ${className}`}>
      {children}
    </div>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
}

export function ServiceCard({
  title,
  description,
  icon: Icon,
  href,
}: ServiceCardProps) {
  const content = (
    <>
      <div className="w-12 h-12 flex items-center justify-center bg-rose-gold/10 text-rose-gold rounded-lg mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-light tracking-wide text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      {href && (
        <div className="mt-4 flex items-center text-rose-gold text-sm font-medium">
          Learn more
          <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className="card group hover:border-rose-gold/30 block">
        {content}
      </Link>
    );
  }

  return <div className="card">{content}</div>;
}

interface PortfolioCardProps {
  title: string;
  industry: string;
  problem: string;
  solution: string;
  results: string[];
  href: string;
}

export function PortfolioCard({
  title,
  industry,
  problem,
  solution,
  results,
  href,
}: PortfolioCardProps) {
  return (
    <Link href={href} className="card group hover:border-rose-gold/30 block h-full">
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2.5 py-1 text-xs font-medium bg-rose-gold/10 text-rose-gold rounded-full">
          {industry}
        </span>
      </div>
      <h3 className="text-lg font-light tracking-wide text-white mb-3 group-hover:text-rose-gold transition-colors">
        {title}
      </h3>
      <div className="space-y-3 text-sm">
        <div>
          <p className="font-medium text-gray-300">Challenge:</p>
          <p className="text-gray-400">{problem}</p>
        </div>
        <div>
          <p className="font-medium text-gray-300">Solution:</p>
          <p className="text-gray-400">{solution}</p>
        </div>
        <div>
          <p className="font-medium text-gray-300">Results:</p>
          <ul className="text-gray-400 space-y-1">
            {results.map((result, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-rose-gold mt-0.5">•</span>
                {result}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-white/10 flex items-center text-rose-gold text-sm font-medium">
        View case study
        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

interface ProcessCardProps {
  step: number;
  title: string;
  description: string;
}

export function ProcessCard({ step, title, description }: ProcessCardProps) {
  return (
    <div className="relative">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-rose-gold text-white text-sm font-medium rounded-full">
          {step}
        </div>
        <div>
          <h3 className="text-lg font-light tracking-wide text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
