import { ArrowRight, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import Reveal from '@/components/Reveal';
import type { PreviewContent } from '@/lib/previews/types';
import {
  ContactLines,
  MapEmbed,
  StatStrip,
  ctaLabel,
  telHref,
} from './shared';

/**
 * Dark, glassmorphic layout with scroll reveals throughout — the most
 * contemporary of the four. Suits businesses selling on craft or premium
 * positioning rather than urgency.
 */
export default function PremiumTemplate({
  content,
}: {
  content: PreviewContent;
}) {
  return (
    <div className="bg-[#0b0f19] text-slate-200 min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0b0f19]/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {content.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={content.logo}
              alt={content.businessName}
              className="h-9 w-auto"
            />
          ) : (
            <span className="text-lg font-semibold tracking-tight text-white">
              {content.businessName}
            </span>
          )}
          <a
            href={telHref(content.phone)}
            className="preview-btn preview-btn-glass px-5 py-2.5 text-sm"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">{content.phone}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="preview-mesh" aria-hidden="true" />
        {content.heroImage && (
          <div
            className="absolute inset-0 opacity-25 bg-cover bg-center"
            style={{ backgroundImage: `url(${content.heroImage})` }}
            aria-hidden="true"
          />
        )}

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-36">
          <Reveal
            as="p"
            className="inline-flex items-center gap-2 preview-glass rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-white/80 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {content.tagline}
          </Reveal>

          <Reveal
            as="h1"
            delay={90}
            className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-8 max-w-4xl leading-[1.05]"
          >
            {content.businessName}
          </Reveal>

          <Reveal
            as="p"
            delay={180}
            className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10"
          >
            {content.intro}
          </Reveal>

          <Reveal delay={270} className="flex flex-wrap gap-4">
            <a
              href={telHref(content.phone)}
              className="preview-btn preview-btn-solid px-8 py-4 text-base"
            >
              <Phone className="w-5 h-5" />
              {content.phone}
            </a>
            {content.email && (
              <a
                href={`mailto:${content.email}`}
                className="preview-btn preview-btn-glass px-8 py-4 text-base"
              >
                {ctaLabel(content)}
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </Reveal>

          {content.stats && content.stats.length > 0 && (
            <Reveal delay={360} className="mt-16">
              <StatStrip
                content={content}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
                valueClassName="text-3xl md:text-4xl font-semibold text-white preview-gradient-text"
                labelClassName="text-xs uppercase tracking-widest text-slate-400 mt-1"
              />
            </Reveal>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24">
        <Reveal
          as="h2"
          className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3"
        >
          What we do
        </Reveal>
        <Reveal
          delay={80}
          className="w-16 h-0.5 rounded preview-accent-bg mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.services.map((service, i) => (
            <Reveal
              key={service.title}
              delay={i * 90}
              className="preview-glass preview-lift rounded-2xl p-7"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-xl font-semibold text-white">
                  {service.title}
                </h3>
                {service.price && (
                  <span className="text-sm preview-accent-text font-semibold whitespace-nowrap">
                    {service.price}
                  </span>
                )}
              </div>
              <p className="text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gallery */}
      {content.gallery && content.gallery.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {content.gallery.map((image, i) => (
              <Reveal
                key={image.src}
                delay={i * 70}
                direction="scale"
                className="overflow-hidden rounded-xl border border-white/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* About */}
      {content.about && (
        <section className="relative border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
            <Reveal
              as="h2"
              className="text-3xl font-semibold tracking-tight text-white mb-6"
            >
              About {content.businessName}
            </Reveal>
            <Reveal
              as="p"
              delay={90}
              className="text-lg text-slate-300 leading-relaxed"
            >
              {content.about}
            </Reveal>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {content.testimonials && content.testimonials.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.testimonials.map((t, i) => (
              <Reveal
                key={t.author}
                delay={i * 100}
                className="preview-glass rounded-2xl p-7"
              >
                <p className="text-lg text-slate-200 leading-relaxed mb-5">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-sm text-slate-400">
                  {t.author}
                  {t.source && (
                    <span className="opacity-60"> · {t.source}</span>
                  )}
                </p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="relative overflow-hidden border-t border-white/5">
        <div className="preview-mesh opacity-60" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal
                as="h2"
                className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4"
              >
                Get in touch
              </Reveal>
              <Reveal
                as="p"
                delay={80}
                className="text-slate-400 mb-8 max-w-md"
              >
                Call, email, or drop in. We answer every enquiry ourselves.
              </Reveal>
              <Reveal delay={160} className="flex flex-wrap gap-4 mb-8">
                <a
                  href={telHref(content.phone)}
                  className="preview-btn preview-btn-solid px-7 py-3.5"
                >
                  <Phone className="w-4 h-4" />
                  {content.phone}
                </a>
                {content.email && (
                  <a
                    href={`mailto:${content.email}`}
                    className="preview-btn preview-btn-glass px-7 py-3.5"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                )}
              </Reveal>
              <Reveal delay={240}>
                <ContactLines
                  content={content}
                  className="space-y-1.5 text-sm text-slate-400"
                />
              </Reveal>
            </div>

            {content.mapQuery && (
              <Reveal
                direction="left"
                delay={120}
                className="preview-glass rounded-2xl overflow-hidden"
              >
                <MapEmbed
                  query={content.mapQuery}
                  className="w-full h-72 border-0 opacity-90"
                />
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
          <p className="text-white font-medium">{content.businessName}</p>
          <div className="flex items-center gap-4">
            {content.address && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {content.address}
              </span>
            )}
          </div>
          <p className="text-xs">
            © {new Date().getFullYear()} {content.businessName}
          </p>
        </div>
      </footer>
    </div>
  );
}
