import { ArrowRight, Check, Mail, Phone } from 'lucide-react';
import type { PreviewContent } from '@/lib/previews/types';
import { ContactLines, accentOf, ctaLabel, telHref } from './shared';

/**
 * Restrained, credibility-first layout for consultants, agencies, clinics and
 * offices, where the buying decision is about trust rather than urgency.
 */
export default function ProfessionalTemplate({
  content,
}: {
  content: PreviewContent;
}) {
  const accent = accentOf(content);

  return (
    <div className="bg-white text-slate-800">
      <header className="border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            {content.businessName}
          </span>
          <div className="flex items-center gap-6 text-sm">
            <a href={telHref(content.phone)} className="hover:underline">
              {content.phone}
            </a>
            <a
              href={`mailto:${content.email ?? ''}`}
              className="px-4 py-2 rounded text-white font-medium"
              style={{ backgroundColor: accent }}
            >
              {ctaLabel(content)}
            </a>
          </div>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <p
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: accent }}
            >
              {content.tagline}
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6 leading-tight">
              {content.businessName}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
              {content.intro}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={telHref(content.phone)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded text-white font-medium"
                style={{ backgroundColor: accent }}
              >
                <Phone className="w-4 h-4" />
                {content.phone}
              </a>
              {content.email && (
                <a
                  href={`mailto:${content.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded border border-slate-300 font-medium hover:bg-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email us
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <h2 className="font-semibold text-slate-900 mb-4">
                Get in touch
              </h2>
              <ContactLines
                content={content}
                className="space-y-2 text-sm text-slate-600"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-3">
          How we help
        </h2>
        <div
          className="w-12 h-1 mb-12 rounded"
          style={{ backgroundColor: accent }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.services.map((service) => (
            <div key={service.title} className="flex gap-4">
              <div
                className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${accent}1a`, color: accent }}
              >
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {content.about && (
        <section className="border-y border-slate-200 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              About the practice
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {content.about}
            </p>
          </div>
        </section>
      )}

      {content.testimonials && content.testimonials.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.testimonials.map((t) => (
              <figure
                key={t.author}
                className="bg-slate-50 border border-slate-200 rounded-lg p-6"
              >
                <blockquote className="text-slate-700 leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="text-sm font-medium text-slate-500">
                  {t.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="text-white" style={{ backgroundColor: accent }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to talk?
          </h2>
          <p className="opacity-90 mb-8">
            Book a consultation and we will walk you through your options.
          </p>
          <a
            href={telHref(content.phone)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded bg-white font-semibold"
            style={{ color: accent }}
          >
            Call {content.phone}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <footer className="border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-sm text-slate-500">
          <p className="font-semibold text-slate-900 mb-3">
            {content.businessName}
          </p>
          <ContactLines content={content} className="space-y-1" />
          <p className="mt-6 text-xs">
            © {new Date().getFullYear()} {content.businessName}
          </p>
        </div>
      </footer>
    </div>
  );
}
