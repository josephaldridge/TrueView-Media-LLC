'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Process', href: '/process' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-sm'
            : 'bg-white'
        }`}
      >
        <nav className="container-custom" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 text-slate-900 font-semibold text-lg"
            >
              <span className="text-brand-600">TrueView</span>
              <span>Media</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex flex-col items-end text-sm">
                <a
                  href="tel:972-339-0754"
                  className="font-medium text-slate-600 hover:text-slate-900 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  972-339-0754
                </a>
                <a
                  href="mailto:contact@trueviewmediallc.com"
                  className="font-medium text-slate-600 hover:text-slate-900 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  contact@trueviewmediallc.com
                </a>
              </div>
              <Link href="/contact" className="btn-primary text-sm py-2.5">
                Request Information
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">
                {mobileMenuOpen ? 'Close menu' : 'Open menu'}
              </span>
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-96 border-t border-slate-200' : 'max-h-0'
          }`}
        >
          <div className="container-custom py-4 space-y-2 bg-white">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-200">
              <Link
                href="/contact"
                className="btn-primary w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Request Information
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sticky call button */}
      <a
        href="tel:972-339-0754"
        className="md:hidden fixed bottom-4 right-4 z-50 flex items-center justify-center w-14 h-14 bg-brand-600 text-white rounded-full shadow-lg hover:bg-brand-700 transition-colors"
        aria-label="Call 972-339-0754"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
}
