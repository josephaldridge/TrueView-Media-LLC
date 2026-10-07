'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, Mail, LogIn } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/#work' },
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
            ? 'bg-black shadow-lg shadow-black/20'
            : 'bg-black'
        }`}
      >
        <nav className="container-custom" aria-label="Main navigation">
          <div className="flex items-center justify-between h-24 md:h-32">
            {/* Logo */}
            <Link
              href="/"
              className="group flex flex-col items-center justify-center"
              aria-label="TrueView Media — home"
            >
              {/* Split from the single logo so the T can breathe on its own.
                  Both assets are keyed to transparency, so the pulse glow
                  follows the letterform rather than a black rectangle. */}
              <Image
                src="/logo-t.png"
                alt=""
                aria-hidden="true"
                width={360}
                height={379}
                className="logo-t-pulse h-12 md:h-[68px] w-auto"
                priority
              />
              <Image
                src="/logo-wordmark.png"
                alt="TrueView Media"
                width={624}
                height={41}
                className="h-[7px] md:h-[9px] w-auto mt-2.5 md:mt-3.5"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-light tracking-wider text-gray-300 hover:text-rose-gold transition-colors uppercase"
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
                  className="font-light text-gray-400 hover:text-rose-gold flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  972-339-0754
                </a>
                <a
                  href="mailto:contact@trueviewmediallc.com"
                  className="font-light text-gray-400 hover:text-rose-gold flex items-center gap-2 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  contact@trueviewmediallc.com
                </a>
              </div>
              <Link href="/contact" className="btn-primary text-sm py-2.5">
                Request Information
              </Link>
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 text-xs font-light tracking-wider text-gray-500 hover:text-rose-gold transition-colors uppercase"
              >
                <LogIn className="w-3.5 h-3.5" />
                Login
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="btn-icon-glass md:hidden inline-flex items-center justify-center p-2 text-gray-300 hover:text-rose-gold rounded-lg"
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
            mobileMenuOpen
              ? 'max-h-[34rem] border-t border-white/10'
              : 'max-h-0'
          }`}
        >
          <div className="container-custom py-4 space-y-2 bg-dark-600">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-base font-light tracking-wider text-gray-300 hover:text-rose-gold hover:bg-white/5 rounded-lg uppercase"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <Link
                href="/contact"
                className="btn-primary w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Request Information
              </Link>
              <Link
                href="/admin/login"
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-light tracking-wider text-gray-500 hover:text-rose-gold uppercase transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sticky call button */}
      <a
        href="tel:972-339-0754"
        className="md:hidden fixed bottom-4 right-4 z-50 flex items-center justify-center w-14 h-14 bg-rose-gold text-white rounded-full shadow-lg shadow-black/30 hover:bg-rose-dark transition-colors"
        aria-label="Call 972-339-0754"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* Spacer for fixed header */}
      <div className="h-24 md:h-32" />
    </>
  );
}
