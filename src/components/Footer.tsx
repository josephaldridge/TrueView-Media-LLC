import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Process', href: '/process' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Website Build', href: '/services#website-build' },
    { name: 'Website Refresh', href: '/services#website-refresh' },
    { name: 'Local SEO Setup', href: '/services#local-seo' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300" role="contentinfo">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-white font-semibold text-lg mb-4"
            >
              <span className="text-brand-400">TrueView</span>
              <span>Media</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Professional websites for local service businesses. Fast, reliable, and built to earn trust.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>Based in Texas — serving clients nationwide.</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:972-339-0754"
                  className="flex items-center gap-3 text-sm hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 text-brand-400" />
                  <span>972-339-0754</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@trueviewmediallc.com"
                  className="flex items-center gap-3 text-sm hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0 text-brand-400" />
                  <span>contact@trueviewmediallc.com</span>
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="btn-primary text-sm py-2.5">
                Request Information
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">
              © {currentYear} TrueView Media LLC. All rights reserved.
            </p>
            <p className="text-xs text-slate-500">
              Domain and hosting are owned by the client.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
