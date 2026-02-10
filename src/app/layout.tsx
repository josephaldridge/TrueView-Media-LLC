import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Header, Footer, ExitIntentPopup } from '@/components';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://trueviewmediallc.com'),
  title: {
    default: 'TrueView Media LLC | Professional Websites for Small Businesses & Entrepreneurs',
    template: '%s | TrueView Media LLC',
  },
  description:
    'Professional websites built to earn trust and drive results. Fast, mobile-first websites for small business owners and entrepreneurs nationwide.',
  keywords: [
    'web design',
    'small business website',
    'entrepreneur website',
    'startup website',
    'business web design',
    'professional website',
    'affordable web design',
    'website for small business',
  ],
  authors: [{ name: 'TrueView Media LLC' }],
  creator: 'TrueView Media LLC',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trueviewmediallc.com',
    siteName: 'TrueView Media LLC',
    title: 'TrueView Media LLC | Professional Websites for Small Businesses & Entrepreneurs',
    description:
      'Professional websites built to earn trust and drive results. Fast, mobile-first websites for small business owners and entrepreneurs nationwide.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrueView Media LLC | Professional Websites for Small Businesses & Entrepreneurs',
    description:
      'Professional websites built to earn trust and drive results. Fast, mobile-first websites for small business owners and entrepreneurs.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ExitIntentPopup />
        <Analytics />
      </body>
    </html>
  );
}
