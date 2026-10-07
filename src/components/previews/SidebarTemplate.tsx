import { Mail, MapPin, Phone } from 'lucide-react';
import Reveal from '@/components/Reveal';
import type { PreviewContent } from '@/lib/previews/types';
import { ContactLines, ctaLabel, telHref } from './shared';

/**
 * Fixed vertical sidebar instead of a top navigation bar. The resulting
 * silhouette — a dark column down one edge, content flowing beside it — is
 * unmistakable next to any horizontally stacked layout.
 */
export default function SidebarTemplate({
  content,
}: {
  content: PreviewContent;
}) {
  return (
    <div className="bg-[#f7f7f5] text-slate-900 lg:flex min-h-screen">
      {/* Sidebar */}
      <aside className="lg:w-[340px] lg:flex-shrink-0 lg:min-h-screen lg:sticky lg:top-0 bg-slate-900 text-white flex flex-col justify-between p-8 lg:p-10">
        <div>
          <p className="font-serif text-2xl leading-tight mb-2">
            {content.businessName}
          </p>
          <p
            className="text-[11px] uppercase tracking-[0.2em]"
            style={{ color: 'var(--preview-accent)' }}
          >
            {content.tagline}
          </p>

          <nav className="mt-12 space-y-3 text-sm">
            {['Practice areas', 'About', 'Contact'].map((label, i) => (
              <a
                key={label}
                href={`#${['areas', 'about', 'contact'][i]}`}
                className="block text-slate-400 hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 space-y-5 text-sm">
          <a
            href={telHref(content.phone)}
            className="flex items-center gap-3 hover:underline"
          >
            <Phone
              className="w-4 h-4 flex-shrink-0"
              style={{ color: 'var(--preview-accent)' }}
            />
            {content.phone}
          </a>
          {content.email && (
            <a
              href={`mailto:${content.email}`}
              className="flex items-start gap-3 hover:underline break-all"
            >
              <Mail
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                style={{ color: 'var(--preview-accent)' }}
              />
              {content.email}
            </a>
          )}
          {content.address && (
            <p className="flex items-start gap-3 text-slate-400">
              <MapPin
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                style={{ color: 'var(--preview-accent)' }}
              />
              {content.address}
            </p>
          )}

          <a
            href={telHref(content.phone)}
            className="block text-center px-6 py-3.5 font-semibold text-white"
            style={{ backgroundColor: 'var(--preview-accent)' }}
          >
            {ctaLabel(content)}
          </a>
        </div>
      </aside>

      {/* Content column */}
      <main className="flex-1 min-w-0">
        <section className="px-8 lg:px-16 py-20 lg:py-28 border-b border-slate-200">
          <Reveal
            as="h1"
            className="font-serif text-4xl lg:text-6xl leading-[1.08] max-w-3xl mb-8"
          >
            {content.intro.split('.')[0]}.
          </Reveal>
          <Reveal
            as="p"
            delay={100}
            className="text-lg text-slate-600 leading-relaxed max-w-2xl"
          >
            {content.intro.split('.').slice(1).join('.').trim()}
          </Reveal>

          {content.stats && content.stats.length > 0 && (
            <Reveal delay={200} className="mt-14 flex flex-wrap gap-x-14 gap-y-6">
              {content.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl">{stat.value}</p>
                  <p className="text-[11px] uppercase tracking-widest text-slate-500 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </Reveal>
          )}
        </section>

        <section
          id="areas"
          className="scroll-mt-10 px-8 lg:px-16 py-20 border-b border-slate-200"
        >
          <Reveal
            as="p"
            className="text-[11px] uppercase tracking-[0.25em] text-slate-500 mb-10"
          >
            Practice areas
          </Reveal>
          <div className="space-y-10 max-w-3xl">
            {content.services.map((service, i) => (
              <Reveal key={service.title} delay={i * 80} className="flex gap-6">
                <span
                  className="w-px flex-shrink-0"
                  style={{ backgroundColor: 'var(--preview-accent)' }}
                />
                <div>
                  <h2 className="font-serif text-2xl mb-2">{service.title}</h2>
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {content.about && (
          <section
            id="about"
            className="scroll-mt-10 px-8 lg:px-16 py-20 border-b border-slate-200"
          >
            <Reveal
              as="p"
              className="text-[11px] uppercase tracking-[0.25em] text-slate-500 mb-8"
            >
              About the firm
            </Reveal>
            <Reveal
              as="p"
              delay={80}
              className="font-serif text-2xl leading-relaxed max-w-3xl"
            >
              {content.about}
            </Reveal>
          </section>
        )}

        {content.testimonials && content.testimonials.length > 0 && (
          <section className="px-8 lg:px-16 py-20 border-b border-slate-200 space-y-12 max-w-3xl">
            {content.testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 90}>
                <p className="text-xl leading-relaxed mb-3">
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

        <section id="contact" className="scroll-mt-10 px-8 lg:px-16 py-20">
          <Reveal as="h2" className="font-serif text-3xl mb-8">
            Contact
          </Reveal>
          <Reveal delay={80}>
            <ContactLines
              content={content}
              className="space-y-2 text-slate-600"
            />
          </Reveal>
          <p className="mt-16 text-xs text-slate-400">
            © {new Date().getFullYear()} {content.businessName}
          </p>
        </section>
      </main>
    </div>
  );
}
