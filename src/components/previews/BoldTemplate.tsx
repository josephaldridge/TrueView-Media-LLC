import { ArrowDown, Phone } from 'lucide-react';
import Reveal from '@/components/Reveal';
import type { PreviewContent } from '@/lib/previews/types';
import { ContactLines, StatStrip, ctaLabel, telHref } from './shared';

/**
 * Full-bleed saturated colour and oversized type. No photography in the hero
 * at all, which is what separates it at a glance from every dark or white
 * layout — the whole screen is the brand colour.
 */
export default function BoldTemplate({
  content,
}: {
  content: PreviewContent;
}) {
  return (
    <div className="bg-white text-slate-900">
      <section
        className="relative min-h-screen flex flex-col text-white overflow-hidden"
        style={{ backgroundColor: 'var(--preview-accent)' }}
      >
        {/* Oversized watermark initial */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-[6%] -bottom-[18%] text-[46rem] leading-none font-black text-white/[0.07] select-none"
        >
          {content.businessName.charAt(0)}
        </span>

        <header className="relative flex items-center justify-between gap-4 px-6 sm:px-10 py-7">
          <span className="font-black tracking-tight text-lg">
            {content.businessName}
          </span>
          <a
            href={telHref(content.phone)}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-white/25 transition-colors"
          >
            <Phone className="w-4 h-4" />
            {content.phone}
          </a>
        </header>

        <div className="relative flex-1 flex items-center px-6 sm:px-10 py-16">
          <div className="max-w-5xl">
            <Reveal
              as="p"
              className="text-sm font-bold uppercase tracking-[0.3em] opacity-75 mb-8"
            >
              {content.tagline}
            </Reveal>
            <Reveal
              as="h1"
              delay={90}
              className="text-[13vw] lg:text-[9rem] font-black tracking-[-0.04em] leading-[0.85] mb-10 uppercase"
            >
              {content.businessName}
            </Reveal>
            <Reveal
              as="p"
              delay={190}
              className="text-xl sm:text-2xl max-w-2xl leading-snug opacity-95 mb-12"
            >
              {content.intro}
            </Reveal>
            <Reveal delay={280} className="flex flex-wrap gap-4">
              <a
                href={telHref(content.phone)}
                className="bg-slate-900 text-white px-9 py-5 font-black text-lg hover:bg-black transition-colors"
              >
                {ctaLabel(content)}
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 border-2 border-white px-9 py-5 font-black text-lg hover:bg-white/10 transition-colors"
              >
                See services
                <ArrowDown className="w-5 h-5" />
              </a>
            </Reveal>
          </div>
        </div>

        {content.stats && content.stats.length > 0 && (
          <div className="relative border-t border-white/25">
            <StatStrip
              content={content}
              className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/20 px-6 sm:px-10"
              valueClassName="text-3xl sm:text-4xl font-black py-6"
              labelClassName="text-[10px] uppercase tracking-widest opacity-70 pb-6"
            />
          </div>
        )}
      </section>

      {/* Services in a dense, bordered grid */}
      <section id="services" className="scroll-mt-10 px-6 sm:px-10 py-24">
        <Reveal
          as="h2"
          className="text-5xl sm:text-7xl font-black tracking-tighter uppercase mb-14"
        >
          What we do
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-slate-200">
          {content.services.map((service, i) => (
            <Reveal
              key={service.title}
              delay={i * 70}
              className="border-r border-b border-slate-200 p-8 hover:bg-slate-50 transition-colors"
            >
              <span
                className="block text-5xl font-black mb-5"
                style={{ color: 'var(--preview-accent)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl font-black mb-2 uppercase tracking-tight">
                {service.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
              {service.price && (
                <p className="mt-4 font-black">{service.price}</p>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {content.about && (
        <section className="bg-slate-900 text-white px-6 sm:px-10 py-24">
          <Reveal
            as="p"
            className="max-w-4xl text-2xl sm:text-3xl font-medium leading-snug"
          >
            {content.about}
          </Reveal>
        </section>
      )}

      {content.testimonials && content.testimonials.length > 0 && (
        <section className="px-6 sm:px-10 py-24 space-y-14">
          {content.testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 90} className="max-w-4xl">
              <p className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-sm uppercase tracking-widest text-slate-500">
                {t.author}
                {t.source && <span className="opacity-60"> · {t.source}</span>}
              </p>
            </Reveal>
          ))}
        </section>
      )}

      <footer
        className="text-white px-6 sm:px-10 py-16"
        style={{ backgroundColor: 'var(--preview-accent)' }}
      >
        <div className="flex flex-wrap gap-10 justify-between">
          <div>
            <p className="text-3xl font-black uppercase tracking-tight mb-4">
              {content.businessName}
            </p>
            <ContactLines content={content} className="space-y-1 opacity-90" />
          </div>
          <a
            href={telHref(content.phone)}
            className="self-start bg-white px-8 py-4 font-black"
            style={{ color: 'var(--preview-accent)' }}
          >
            {content.phone}
          </a>
        </div>
        <p className="mt-14 text-xs opacity-60">
          © {new Date().getFullYear()} {content.businessName}
        </p>
      </footer>
    </div>
  );
}
