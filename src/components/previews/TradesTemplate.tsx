import { Clock, MapPin, Phone, ShieldCheck, Wrench } from 'lucide-react';
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
 * Bold, high-contrast layout for trades: the phone number is the loudest
 * element on the page because that is how these businesses actually get work.
 */
export default function TradesTemplate({
  content,
}: {
  content: PreviewContent;
}) {
  const accent = accentOf(content);

  return (
    <div className="bg-white text-slate-900">
      <header className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <span className="text-lg font-bold tracking-tight">
            {content.businessName}
          </span>
          <a
            href={telHref(content.phone)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-bold text-white"
            style={{ backgroundColor: accent }}
          >
            <Phone className="w-4 h-4" />
            {content.phone}
          </a>
        </div>
      </header>

      <section
        className="relative text-white"
        style={{
          backgroundImage: content.heroImage
            ? `linear-gradient(rgba(15,23,42,.78), rgba(15,23,42,.88)), url(${content.heroImage})`
            : undefined,
          backgroundColor: content.heroImage ? undefined : '#0f172a',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="preview-mesh opacity-40" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <Reveal
            as="p"
            className="preview-accent-bg inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6"
          >
            {content.tagline}
          </Reveal>
          <Reveal
            as="h1"
            delay={90}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-3xl"
          >
            {content.businessName}
          </Reveal>
          <Reveal
            as="p"
            delay={180}
            className="text-lg md:text-xl text-slate-200 max-w-2xl mb-8 leading-relaxed"
          >
            {content.intro}
          </Reveal>
          <Reveal delay={270} className="flex flex-wrap gap-4">
            <a
              href={telHref(content.phone)}
              className="preview-btn preview-btn-solid px-8 py-4 text-lg font-bold"
            >
              <Phone className="w-5 h-5" />
              Call {content.phone}
            </a>
            <a
              href={`mailto:${content.email ?? ''}`}
              className="preview-btn preview-btn-glass px-8 py-4 text-lg font-bold"
            >
              {ctaLabel(content)}
            </a>
          </Reveal>

          {content.stats && content.stats.length > 0 && (
            <Reveal delay={360} className="mt-14">
              <StatStrip
                content={content}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
                valueClassName="text-3xl md:text-4xl font-extrabold text-white"
                labelClassName="text-xs uppercase tracking-widest text-slate-400 mt-1"
              />
            </Reveal>
          )}
        </div>
      </section>

      <section className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-medium">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" style={{ color: accent }} />
            Licensed &amp; insured
          </span>
          {content.serviceArea && (
            <span className="flex items-center gap-2">
              <MapPin className="w-5 h-5" style={{ color: accent }} />
              {content.serviceArea}
            </span>
          )}
          {content.hours?.[0] && (
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" style={{ color: accent }} />
              {content.hours[0]}
            </span>
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <Reveal
          as="h2"
          className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10"
        >
          What we do
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.services.map((service, i) => (
            <Reveal
              key={service.title}
              delay={i * 90}
              className="preview-lift border-2 border-slate-200 rounded-xl p-6 bg-white"
            >
              <div className="flex items-start justify-between gap-4">
                <Wrench className="w-6 h-6 mb-3 preview-accent-text" />
                {service.price && (
                  <span className="text-sm font-bold preview-accent-text whitespace-nowrap">
                    {service.price}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {content.about && (
        <section className="bg-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
            <Reveal as="h2" className="text-3xl font-extrabold tracking-tight mb-4">
              About us
            </Reveal>
            <Reveal as="p" delay={90} className="text-lg text-slate-700 leading-relaxed">
              {content.about}
            </Reveal>
          </div>
        </section>
      )}

      {content.testimonials && content.testimonials.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.testimonials.map((t, i) => (
              <Reveal
                key={t.author}
                delay={i * 100}
                direction="right"
                className="border-l-4 pl-6 py-2 border-l-[color:var(--preview-accent)]"
              >
                <p className="text-lg text-slate-700 mb-3">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <cite className="text-sm font-bold text-slate-500 not-italic">
                  {t.author}
                  {t.source && (
                    <span className="font-normal opacity-70"> · {t.source}</span>
                  )}
                </cite>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="text-white" style={{ backgroundColor: accent }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Need a plumber today?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Call now and speak to someone who can actually help.
          </p>
          <a
            href={telHref(content.phone)}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-md text-xl font-extrabold bg-white"
            style={{ color: accent }}
          >
            <Phone className="w-6 h-6" />
            {content.phone}
          </a>
        </div>
      </section>

      {content.mapQuery && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <Reveal
            direction="scale"
            className="rounded-xl overflow-hidden border-2 border-slate-200"
          >
            <MapEmbed
              query={content.mapQuery}
              className="w-full h-72 border-0"
            />
          </Reveal>
        </section>
      )}

      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <p className="text-white font-bold text-lg mb-4">
            {content.businessName}
          </p>
          <ContactLines content={content} className="space-y-1 text-sm" />
          <p className="text-xs text-slate-500 mt-8">
            © {new Date().getFullYear()} {content.businessName}
          </p>
        </div>
      </footer>
    </div>
  );
}
