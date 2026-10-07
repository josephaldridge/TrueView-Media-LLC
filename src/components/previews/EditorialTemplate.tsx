import { Phone } from 'lucide-react';
import Reveal from '@/components/Reveal';
import type { PreviewContent } from '@/lib/previews/types';
import { ContactLines, MapEmbed, ctaLabel, telHref } from './shared';

/**
 * Light, airy and typographic — a magazine spread rather than a landing page.
 * Centred serif masthead, hairline rules, generous whitespace and no hero
 * photograph, which sets it apart from the dark image-led layouts.
 */
export default function EditorialTemplate({
  content,
}: {
  content: PreviewContent;
}) {
  return (
    <div className="bg-[#faf8f5] text-stone-900">
      {/* Masthead */}
      <header className="border-b border-stone-300">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-stone-500">
          <span>{content.serviceArea ?? 'By appointment'}</span>
          <a href={telHref(content.phone)} className="hover:text-stone-900">
            {content.phone}
          </a>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <Reveal
          as="p"
          className="text-[11px] uppercase tracking-[0.35em] text-stone-500 mb-10"
        >
          {content.tagline}
        </Reveal>
        <Reveal
          as="h1"
          delay={90}
          className="font-display text-6xl md:text-8xl leading-[0.95] tracking-tight mb-10"
        >
          {content.businessName}
        </Reveal>
        <Reveal
          direction="scale"
          delay={160}
          className="w-24 h-px bg-stone-400 mx-auto mb-10"
        />
        <Reveal
          as="p"
          delay={220}
          className="text-xl md:text-2xl leading-relaxed text-stone-700 max-w-2xl mx-auto font-light"
        >
          {content.intro}
        </Reveal>
        <Reveal delay={300} className="mt-12">
          <a
            href={telHref(content.phone)}
            className="inline-block border border-stone-900 px-10 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-stone-900 hover:text-white transition-colors"
          >
            {ctaLabel(content)}
          </a>
        </Reveal>
      </section>

      {/* Stats as a ruled band, not boxes */}
      {content.stats && content.stats.length > 0 && (
        <section className="border-y border-stone-300">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-300">
            {content.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 70} className="py-8 text-center">
                <p className="font-display text-4xl">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 mt-2">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Services as a two-column editorial list */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <Reveal
          as="h2"
          className="font-display text-4xl text-center mb-16"
        >
          Treatments &amp; Services
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {content.services.map((service, i) => (
            <Reveal key={service.title} delay={i * 80}>
              <div className="flex items-baseline justify-between gap-4 border-b border-stone-300 pb-2 mb-3">
                <h3 className="font-display text-2xl">{service.title}</h3>
                {service.price && (
                  <span className="text-sm text-stone-500 whitespace-nowrap">
                    {service.price}
                  </span>
                )}
              </div>
              <p className="text-stone-600 leading-relaxed font-light">
                {service.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {content.about && (
        <section className="bg-stone-900 text-stone-100">
          <div className="max-w-3xl mx-auto px-6 py-24 text-center">
            <Reveal
              as="p"
              className="font-display text-2xl md:text-3xl leading-relaxed font-light"
            >
              {content.about}
            </Reveal>
          </div>
        </section>
      )}

      {content.testimonials && content.testimonials.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 py-24 space-y-16 text-center">
          {content.testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 100}>
              <p className="font-display text-3xl leading-snug mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-[11px] uppercase tracking-[0.25em] text-stone-500">
                {t.author}
                {t.source && <span className="opacity-70"> · {t.source}</span>}
              </p>
            </Reveal>
          ))}
        </section>
      )}

      <section className="border-t border-stone-300">
        <div className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-14">
          <div>
            <Reveal as="h2" className="font-display text-3xl mb-6">
              Visit us
            </Reveal>
            <Reveal delay={80}>
              <ContactLines
                content={content}
                className="space-y-2 text-stone-600 font-light"
              />
            </Reveal>
            <Reveal delay={160}>
              <a
                href={telHref(content.phone)}
                className="inline-flex items-center gap-2 mt-8 text-[11px] uppercase tracking-[0.25em] border-b border-stone-900 pb-1"
              >
                <Phone className="w-3.5 h-3.5" />
                {content.phone}
              </a>
            </Reveal>
          </div>
          {content.mapQuery && (
            <Reveal direction="left" delay={120}>
              <MapEmbed
                query={content.mapQuery}
                className="w-full h-64 border border-stone-300 grayscale"
              />
            </Reveal>
          )}
        </div>
      </section>

      <footer className="border-t border-stone-300 text-center py-8 text-[10px] uppercase tracking-[0.25em] text-stone-500">
        © {new Date().getFullYear()} {content.businessName}
      </footer>
    </div>
  );
}
