import {
  BadgeCheck,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Star,
  Truck,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import type { PreviewContent } from '@/lib/previews/types';
import BookingForm from './BookingForm';
import ShowcaseNav from './ShowcaseNav';
import { ContactLines, MapEmbed, ctaLabel, telHref } from './shared';

/**
 * Photo-led, conversion-focused layout for visual service businesses.
 *
 * Structured so every screen ends in a way to book: sticky call button in the
 * header, a booking form mid-page, and a phone number repeated at every
 * natural decision point.
 */
export default function ShowcaseTemplate({
  content,
}: {
  content: PreviewContent;
}) {
  const bookingServices =
    content.bookingServices ?? content.services.map((s) => s.title);

  return (
    <div id="top" className="bg-[#0a0d14] text-slate-200">
      <ShowcaseNav
        businessName={content.businessName}
        logo={content.logo}
        phone={content.phone}
      />

      {/* ---------------- Hero ---------------- */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-20">
        {content.heroImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${content.heroImage})` }}
            aria-hidden="true"
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0a0d14]/80 via-[#0a0d14]/75 to-[#0a0d14]"
          aria-hidden="true"
        />
        <div className="preview-mesh opacity-50" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="max-w-3xl">
            {content.rating && (
              <Reveal className="inline-flex items-center gap-2 preview-glass rounded-full px-4 py-2 mb-8">
                <span className="flex" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </span>
                <span className="text-sm text-white">
                  {content.rating.value} from {content.rating.count}{' '}
                  {content.rating.source ?? ''} reviews
                </span>
              </Reveal>
            )}

            <Reveal
              as="p"
              delay={60}
              className="preview-accent-text text-sm font-bold uppercase tracking-[0.2em] mb-4"
            >
              {content.tagline}
            </Reveal>

            <Reveal
              as="h1"
              delay={120}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.03]"
            >
              {content.businessName}
            </Reveal>

            <Reveal
              as="p"
              delay={200}
              className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl"
            >
              {content.intro}
            </Reveal>

            <Reveal delay={280} className="flex flex-wrap gap-4">
              <a
                href="#book"
                className="preview-btn preview-btn-solid px-8 py-4 text-base"
              >
                <Calendar className="w-5 h-5" />
                {ctaLabel(content)}
              </a>
              <a
                href={telHref(content.phone)}
                className="preview-btn preview-btn-glass px-8 py-4 text-base"
              >
                <Phone className="w-5 h-5" />
                {content.phone}
              </a>
            </Reveal>

            {content.stats && content.stats.length > 0 && (
              <Reveal delay={360} className="mt-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {content.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-3xl md:text-4xl font-extrabold text-white">
                        {stat.value}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-slate-400 mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- Trust bar ---------------- */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <Reveal className="flex items-center gap-3">
            <Truck className="w-5 h-5 preview-accent-text flex-shrink-0" />
            <span className="text-slate-300">
              Mobile service — we come to you
            </span>
          </Reveal>
          <Reveal delay={90} className="flex items-center gap-3">
            <BadgeCheck className="w-5 h-5 preview-accent-text flex-shrink-0" />
            <span className="text-slate-300">
              Professional-grade products &amp; process
            </span>
          </Reveal>
          <Reveal delay={180} className="flex items-center gap-3">
            <Clock className="w-5 h-5 preview-accent-text flex-shrink-0" />
            <span className="text-slate-300">
              {content.hours?.[0] ?? 'Open 7 days'}
            </span>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Services ---------------- */}
      <section id="services" className="scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <Reveal
            as="p"
            className="preview-accent-text text-sm font-bold uppercase tracking-[0.2em] mb-3"
          >
            What we do
          </Reveal>
          <Reveal
            as="h2"
            delay={70}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
          >
            Services
          </Reveal>
          <Reveal
            as="p"
            delay={140}
            className="text-slate-400 max-w-2xl mb-14"
          >
            Every job is quoted before we start, and priced on the vehicle in
            front of us rather than a menu.
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.services.map((service, i) => (
              <Reveal
                key={service.title}
                delay={i * 80}
                className="preview-glass preview-lift rounded-2xl p-7 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-xl font-bold text-white">
                    {service.title}
                  </h3>
                  {service.price && (
                    <span className="text-sm font-bold preview-accent-text whitespace-nowrap">
                      {service.price}
                    </span>
                  )}
                </div>
                <p className="text-slate-400 leading-relaxed flex-1">
                  {service.description}
                </p>
                <a
                  href="#book"
                  className="inline-flex items-center gap-1 text-sm font-semibold preview-accent-text mt-5 hover:gap-2 transition-all"
                >
                  Book this
                  <ChevronRight className="w-4 h-4" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Feature ---------------- */}
      {content.feature && (
        <section className="relative overflow-hidden border-y border-white/10">
          <div className="preview-mesh opacity-40" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div>
                <Reveal
                  as="p"
                  className="preview-accent-text text-sm font-bold uppercase tracking-[0.2em] mb-3"
                >
                  Signature service
                </Reveal>
                <Reveal
                  as="h2"
                  delay={70}
                  className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5"
                >
                  {content.feature.title}
                </Reveal>
                <Reveal
                  as="p"
                  delay={140}
                  className="text-lg text-slate-300 leading-relaxed mb-8"
                >
                  {content.feature.description}
                </Reveal>

                {content.feature.bullets && (
                  <ul className="space-y-3 mb-9">
                    {content.feature.bullets.map((bullet, i) => (
                      <Reveal
                        as="li"
                        key={bullet}
                        delay={200 + i * 70}
                        direction="right"
                        className="flex items-start gap-3 text-slate-300"
                      >
                        <Check className="w-5 h-5 preview-accent-text flex-shrink-0 mt-0.5" />
                        {bullet}
                      </Reveal>
                    ))}
                  </ul>
                )}

                <Reveal delay={420}>
                  <a
                    href="#book"
                    className="preview-btn preview-btn-solid px-7 py-3.5"
                  >
                    Ask about this
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </Reveal>
              </div>

              {content.feature.image && (
                <Reveal
                  direction="left"
                  delay={120}
                  className="rounded-2xl overflow-hidden border border-white/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={content.feature.image.src}
                    alt={content.feature.image.alt}
                    className="w-full h-[28rem] object-cover"
                    loading="lazy"
                  />
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Gallery ---------------- */}
      {content.gallery && content.gallery.length > 0 && (
        <section id="work" className="scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
            <Reveal
              as="p"
              className="preview-accent-text text-sm font-bold uppercase tracking-[0.2em] mb-3"
            >
              Recent work
            </Reveal>
            <Reveal
              as="h2"
              delay={70}
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-14"
            >
              See the difference
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {content.gallery.map((image, i) => (
                <Reveal
                  key={image.src}
                  delay={i * 80}
                  direction="scale"
                  className="group rounded-2xl overflow-hidden border border-white/10 preview-lift"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {image.caption && (
                    <p className="px-5 py-4 text-sm text-slate-400 bg-white/[0.02]">
                      {image.caption}
                    </p>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Reviews ---------------- */}
      {content.testimonials && content.testimonials.length > 0 && (
        <section
          id="reviews"
          className="scroll-mt-24 border-y border-white/10 bg-white/[0.02]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
              <div>
                <Reveal
                  as="p"
                  className="preview-accent-text text-sm font-bold uppercase tracking-[0.2em] mb-3"
                >
                  Reviews
                </Reveal>
                <Reveal
                  as="h2"
                  delay={70}
                  className="text-4xl md:text-5xl font-extrabold tracking-tight text-white"
                >
                  What customers say
                </Reveal>
              </div>
              {content.rating && (
                <Reveal delay={140} className="flex items-center gap-3">
                  <span className="text-5xl font-extrabold text-white">
                    {content.rating.value}
                  </span>
                  <span>
                    <span className="flex" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </span>
                    <span className="text-sm text-slate-400">
                      {content.rating.count} reviews
                    </span>
                  </span>
                </Reveal>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.testimonials.map((t, i) => (
                <Reveal
                  key={t.author}
                  delay={i * 90}
                  className="preview-glass rounded-2xl p-7"
                >
                  <span className="flex mb-4" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, n) => (
                      <Star
                        key={n}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </span>
                  <p className="text-slate-200 leading-relaxed mb-5">
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
          </div>
        </section>
      )}

      {/* ---------------- Booking ---------------- */}
      <section id="book" className="scroll-mt-24 relative overflow-hidden">
        <div className="preview-mesh opacity-40" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              <Reveal
                as="p"
                className="preview-accent-text text-sm font-bold uppercase tracking-[0.2em] mb-3"
              >
                Book now
              </Reveal>
              <Reveal
                as="h2"
                delay={70}
                className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5"
              >
                Get your vehicle on the schedule
              </Reveal>
              <Reveal
                as="p"
                delay={140}
                className="text-lg text-slate-300 leading-relaxed mb-10"
              >
                Tell us what you drive and when suits you. We confirm every
                appointment by phone before anything is booked.
              </Reveal>

              <Reveal delay={200} className="space-y-5 mb-10">
                <a
                  href={telHref(content.phone)}
                  className="flex items-center gap-4 group"
                >
                  <span className="w-12 h-12 rounded-xl preview-glass flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 preview-accent-text" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-widest text-slate-500">
                      Call or text
                    </span>
                    <span className="block text-lg font-semibold text-white group-hover:underline">
                      {content.phone}
                    </span>
                  </span>
                </a>

                {content.address && (
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-xl preview-glass flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 preview-accent-text" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-widest text-slate-500">
                        Based in
                      </span>
                      <span className="block text-white">
                        {content.address}
                      </span>
                    </span>
                  </div>
                )}

                {content.hours && content.hours.length > 0 && (
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-xl preview-glass flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 preview-accent-text" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-widest text-slate-500">
                        Hours
                      </span>
                      {content.hours.map((line) => (
                        <span key={line} className="block text-white">
                          {line}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
              </Reveal>
            </div>

            <Reveal direction="left" delay={120}>
              <BookingForm
                slug={content.slug}
                services={bookingServices}
                phone={content.phone}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Service areas ---------------- */}
      {content.serviceAreas && content.serviceAreas.length > 0 && (
        <section
          id="areas"
          className="scroll-mt-24 border-y border-white/10 bg-white/[0.02]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Reveal
                  as="h2"
                  className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-5"
                >
                  Areas we serve
                </Reveal>
                <Reveal as="p" delay={70} className="text-slate-400 mb-8">
                  Fully mobile across North Texas. If your town is nearby but
                  not listed, call and ask.
                </Reveal>
                <div className="flex flex-wrap gap-2.5">
                  {content.serviceAreas.map((area, i) => (
                    <Reveal
                      key={area}
                      delay={i * 45}
                      direction="scale"
                      className="preview-glass rounded-full px-4 py-2 text-sm text-slate-200"
                    >
                      {area}
                    </Reveal>
                  ))}
                </div>
              </div>

              {content.mapQuery && (
                <Reveal
                  direction="left"
                  delay={120}
                  className="rounded-2xl overflow-hidden border border-white/10"
                >
                  <MapEmbed
                    query={content.mapQuery}
                    className="w-full h-80 border-0 opacity-90"
                  />
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- FAQ ---------------- */}
      {content.faqs && content.faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
          <Reveal
            as="h2"
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-12 text-center"
          >
            Common questions
          </Reveal>
          <div className="space-y-4">
            {content.faqs.map((faq, i) => (
              <Reveal
                key={faq.question}
                delay={i * 70}
                className="preview-glass rounded-xl overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none text-white font-medium">
                    {faq.question}
                    <ChevronRight className="w-5 h-5 preview-accent-text flex-shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="px-6 pb-5 text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- Final CTA ---------------- */}
      <section className="relative overflow-hidden border-t border-white/10">
        <div className="preview-mesh opacity-60" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
          <Reveal
            as="h2"
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5"
          >
            Ready when you are
          </Reveal>
          <Reveal as="p" delay={80} className="text-lg text-slate-300 mb-10">
            Call now, or send a booking request and we&apos;ll get back to you.
          </Reveal>
          <Reveal
            delay={160}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href={telHref(content.phone)}
              className="preview-btn preview-btn-solid px-9 py-4 text-lg"
            >
              <Phone className="w-5 h-5" />
              {content.phone}
            </a>
            <a
              href="#book"
              className="preview-btn preview-btn-glass px-9 py-4 text-lg"
            >
              <Calendar className="w-5 h-5" />
              Book online
            </a>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Footer (NAP for local SEO) ---------------- */}
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            {content.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={content.logo}
                alt={content.businessName}
                className="h-12 w-auto object-contain mb-4"
              />
            ) : (
              <p className="text-white font-bold text-lg mb-4">
                {content.businessName}
              </p>
            )}
            <p className="text-sm text-slate-500 leading-relaxed">
              {content.tagline}
            </p>
          </div>

          <div>
            <p className="text-white font-semibold mb-4">Contact</p>
            <ContactLines
              content={content}
              className="space-y-1.5 text-sm text-slate-400"
            />
          </div>

          <div>
            <p className="text-white font-semibold mb-4">Services</p>
            <ul className="space-y-1.5 text-sm text-slate-400">
              {content.services.slice(0, 6).map((service) => (
                <li key={service.title}>{service.title}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5">
          <p className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-xs text-slate-600">
            © {new Date().getFullYear()} {content.businessName}. All rights
            reserved.
          </p>
        </div>
      </footer>

      {/* Sticky mobile call bar */}
      <a
        href={telHref(content.phone)}
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 preview-accent-bg text-white font-bold py-4 text-center flex items-center justify-center gap-2 shadow-2xl"
      >
        <Phone className="w-5 h-5" />
        Call {content.phone}
      </a>
      <div className="lg:hidden h-16" aria-hidden="true" />
    </div>
  );
}
