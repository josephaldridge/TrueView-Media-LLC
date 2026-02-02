import Link from 'next/link';
import Image from 'next/image';
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
    <footer className="bg-black text-gray-400 border-t border-white/5" role="contentinfo">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.png"
                alt="TrueView Media"
                width={220}
                height={73}
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              Professional websites for local service businesses. Fast, reliable, and built to earn trust.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4 flex-shrink-0 text-rose-gold" />
              <span>Based in Texas — serving clients nationwide.</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-light tracking-wider uppercase text-sm mb-6">Navigation</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-rose-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-light tracking-wider uppercase text-sm mb-6">Services</h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-rose-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-light tracking-wider uppercase text-sm mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:972-339-0754"
                  className="flex items-center gap-3 text-sm hover:text-rose-gold transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 text-rose-gold" />
                  <span>972-339-0754</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@trueviewmediallc.com"
                  className="flex items-center gap-3 text-sm hover:text-rose-gold transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0 text-rose-gold" />
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
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} TrueView Media LLC. All rights reserved.
            </p>
            <p className="text-xs text-gray-600">
              Domain and hosting are owned by the client.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
