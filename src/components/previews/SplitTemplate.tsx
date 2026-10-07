import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react';
import Reveal from '@/components/Reveal';
import type { PreviewContent } from '@/lib/previews/types';
import { ContactLines, MapEmbed, ctaLabel, telHref } from './shared';

/**
 * Hard vertical split: a solid accent panel carrying the message on one side,
 * imagery on the other. Reads as a completely different silhouette from the
 * centred and left-aligned layouts, even at thumbnail size.
 */
export default function SplitTemplate({
  content,
}: {
  content: PreviewContent;
}) {
  return (
    <div className="bg-white text-slate-900">
      {/* Hero: colour block beside imagery, no conventional header bar */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div
          className="relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 text-white"
          style={{ backgroundColor: 'var(--preview-accent)' }}
        >
          <div className="flex items-center justify-between gap-4">
            <span className="text-lg font-bold tracking-tight">
              {content.businessName}
            </span>
            <a
              href={telHref(content.phone)}
              className="text-sm font-semibold underline underline-offset-4 decoration-white/40 hover:decoration-white"
            >
              {content.phone}
            </a>
          </div>

          <div className="py-16">
            <Reveal
              as="p"
              className="text-xs uppercase tracking-[0.3em] opacity-80 mb-6"
            >
              {content.tagline}
            </Reveal>
            <Reveal
              as="h1"
              delay={90}
              className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.02] mb-7"
            >
              {content.intro.split('.')[0]}.
            </Reveal>
            <Reveal
              as="p"
              delay={180}
              className="text-lg opacity-90 max-w-md leading-relaxed mb-10"
            >
              {content.intro.split('.').slice(1).join('.').trim()}
            </Reveal>
            <Reveal delay={260} className="flex flex-wrap gap-3">
              <a
                href={telHref(content.phone)}
                className="inline-flex items-center gap-2 bg-white px-7 py-4 font-bold text-base"
                style={{ color: 'var(--preview-accent)' }}
              >
                <Phone className="w-4 h-4" />
                Call now
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border-2 border-white/50 px-7 py-4 font-bold text-base hover:bg-white/10 transition-colors"
              >
                {ctaLabel(content)}
                <ArrowRight className="w-4 h-4" />
              </a>
            </Reveal>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm opacity-85">
            {content.hours?.[0] && (
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {content.hours[0]}
              </span>
            )}
            {content.serviceArea && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {content.serviceArea}
              </span>
            )}
          </div>
        </div>

        <div className="relative min-h-[50vh] lg:min-h-full bg-slate-900">
          {content.heroImage ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${content.heroImage})` }}
              aria-hidden="true"
            />
          ) : (
            <div className="preview-mesh opacity-70" aria-hidden="true" />
          )}
          {content.stats && content.stats.length > 0 && (
            <div className="absolute inset-x-0 bottom-0 bg-slate-900/85 backdrop-blur-sm grid grid-cols-2 sm:grid-cols-4 gap-px">
              {content.stats.map((stat) => (
                <div key={stat.label} className="p-5 text-white">
                  <p className="text-2xl font-black">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-60 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services as a numbered ledger, not cards */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <Reveal as="h2" className="text-3xl font-black tracking-tight mb-12">
          Services
        </Reveal>
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {content.services.map((service, i) => (
            <Reveal
              key={service.title}
              delay={i * 70}
              className="grid grid-cols-[auto_1fr_auto] gap-6 items-baseline py-7 group"
            >
              <span className="text-sm font-mono text-slate-400">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-xl font-bold mb-1.5">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed max-w-2xl">
                  {service.description}
                </p>
              </div>
              {service.price && (
                <span
                  className="font-bold whitespace-nowrap"
                  style={{ color: 'var(--preview-accent)' }}
                >
                  {service.price}
                </span>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {content.about && (
        <section
          className="text-white"
          style={{ backgroundColor: 'var(--preview-accent)' }}
        >
          <div className="max-w-3xl mx-auto px-6 py-24">
            <Reveal as="p" className="text-xl leading-relaxed">
              {content.about}
            </Reveal>
          </div>
        </section>
      )}

      {content.testimonials && content.testimonials.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-10">
          {content.testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 90}>
              <p className="text-2xl font-medium leading-snug mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-sm text-slate-500">
                {t.author}
                {t.source && <span className="opacity-70"> · {t.source}</span>}
              </p>
            </Reveal>
          ))}
        </section>
      )}

      <section id="contact" className="scroll-mt-10 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal as="h2" className="text-3xl font-black tracking-tight mb-5">
              Get in touch
            </Reveal>
            <Reveal delay={80}>
              <ContactLines
                content={content}
                className="space-y-1.5 text-slate-300"
              />
            </Reveal>
            <Reveal delay={160}>
              <a
                href={telHref(content.phone)}
                className="inline-flex items-center gap-2 mt-8 px-8 py-4 font-bold text-white"
                style={{ backgroundColor: 'var(--preview-accent)' }}
              >
                <Phone className="w-4 h-4" />
                {content.phone}
              </a>
            </Reveal>
          </div>
          {content.mapQuery && (
            <Reveal direction="left" delay={120}>
              <MapEmbed
                query={content.mapQuery}
                className="w-full h-64 border-0 grayscale contrast-125"
              />
            </Reveal>
          )}
        </div>
      </section>

      <footer className="bg-slate-900 border-t border-white/10 text-slate-500 text-xs">
        <p className="max-w-5xl mx-auto px-6 py-6">
          © {new Date().getFullYear()} {content.businessName}
        </p>
      </footer>
    </div>
  );
}
