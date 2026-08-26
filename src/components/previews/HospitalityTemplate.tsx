import { Clock, MapPin, Phone } from 'lucide-react';
import Reveal from '@/components/Reveal';
import type { PreviewContent } from '@/lib/previews/types';
import {
  ContactLines,
  MapEmbed,
  StatStrip,
  accentOf,
  ctaLabel,
  telHref,
} from './shared';

/**
 * Warm, image-led layout for restaurants, cafes and bars. Hours and location
 * lead, because that is what people are actually looking for.
 */
export default function HospitalityTemplate({
  content,
}: {
  content: PreviewContent;
}) {
  const accent = accentOf(content);

  return (
    <div className="bg-[#fdfaf6] text-stone-900">
      <header className="border-b border-stone-200 bg-[#fdfaf6]/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between gap-4">
          <span className="font-serif text-xl tracking-wide">
            {content.businessName}
          </span>
          <a
            href={telHref(content.phone)}
            className="text-sm tracking-wide hover:underline"
            style={{ color: accent }}
          >
            {content.phone}
          </a>
        </div>
      </header>

      <section
        className="relative"
        style={{
          backgroundImage: content.heroImage
            ? `linear-gradient(rgba(28,25,23,.55), rgba(28,25,23,.65)), url(${content.heroImage})`
            : undefined,
          backgroundColor: content.heroImage ? undefined : '#1c1917',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-28 md:py-40 text-center text-white">
          <Reveal
            as="p"
            className="uppercase tracking-[0.3em] text-xs mb-6 opacity-80"
          >
            {content.tagline}
          </Reveal>
          <Reveal
            as="h1"
            delay={90}
            className="font-serif text-5xl md:text-7xl mb-8 leading-tight"
          >
            {content.businessName}
          </Reveal>
          <Reveal
            as="p"
            delay={180}
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-90"
          >
            {content.intro}
          </Reveal>
          <Reveal delay={270}>
            <a
              href={telHref(content.phone)}
              className="preview-btn preview-btn-solid mt-10 px-10 py-4 text-sm uppercase tracking-[0.2em] font-medium rounded-none"
            >
              {ctaLabel(content)}
            </a>
          </Reveal>

          {content.stats && content.stats.length > 0 && (
            <Reveal delay={360} className="mt-16">
              <StatStrip
                content={content}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
                valueClassName="font-serif text-3xl"
                labelClassName="text-[11px] uppercase tracking-[0.2em] opacity-70 mt-1"
              />
            </Reveal>
          )}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <Reveal
          direction="scale"
          className="preview-accent-bg w-16 h-px mx-auto mb-12"
        />
        <Reveal
          as="h2"
          delay={80}
          className="font-serif text-3xl md:text-4xl text-center mb-14"
        >
          What we serve
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {content.services.map((service, i) => (
            <Reveal key={service.title} delay={i * 90}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-2xl mb-2 preview-accent-text">
                  {service.title}
                </h3>
                {service.price && (
                  <span className="text-sm text-stone-500 whitespace-nowrap">
                    {service.price}
                  </span>
                )}
              </div>
              <p className="text-stone-600 leading-relaxed">
                {service.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {content.about && (
        <section className="bg-stone-900 text-stone-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
            <Reveal as="h2" className="font-serif text-3xl mb-6">
              Our story
            </Reveal>
            <Reveal as="p" delay={90} className="text-lg leading-relaxed opacity-90">
              {content.about}
            </Reveal>
          </div>
        </section>
      )}

      {content.testimonials && content.testimonials.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 space-y-12">
          {content.testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 110} className="text-center">
              <p className="font-serif text-2xl md:text-3xl leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <cite className="text-sm uppercase tracking-widest text-stone-500 not-italic">
                {t.author}
                {t.source && <span className="opacity-60"> · {t.source}</span>}
              </cite>
            </Reveal>
          ))}
        </section>
      )}

      <section className="border-t border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div>
            <MapPin className="w-5 h-5 mx-auto md:mx-0 mb-3" style={{ color: accent }} />
            <h3 className="font-serif text-lg mb-2">Find us</h3>
            <p className="text-stone-600 text-sm">{content.address}</p>
          </div>
          <div>
            <Clock className="w-5 h-5 mx-auto md:mx-0 mb-3" style={{ color: accent }} />
            <h3 className="font-serif text-lg mb-2">Hours</h3>
            {content.hours?.map((line) => (
              <p key={line} className="text-stone-600 text-sm">
                {line}
              </p>
            ))}
          </div>
          <div>
            <Phone className="w-5 h-5 mx-auto md:mx-0 mb-3" style={{ color: accent }} />
            <h3 className="font-serif text-lg mb-2">Reservations</h3>
            <ContactLines content={content} className="text-stone-600 text-sm space-y-1" />
          </div>
        </div>
      </section>

      {content.mapQuery && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <Reveal direction="scale" className="overflow-hidden rounded-lg border border-stone-200">
            <MapEmbed query={content.mapQuery} className="w-full h-72 border-0" />
          </Reveal>
        </section>
      )}

      <footer className="bg-stone-900 text-stone-400 text-center py-8 text-xs">
        © {new Date().getFullYear()} {content.businessName}
      </footer>
    </div>
  );
}
