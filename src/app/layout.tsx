import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Header, Footer } from '@/components';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://trueviewmediallc.com'),
  title: {
    default: 'TrueView Media LLC | Professional Websites for Local Service Businesses',
    template: '%s | TrueView Media LLC',
  },
  description:
    'Professional websites built to earn trust and drive calls. Fast, mobile-first websites for contractors, HVAC, plumbers, electricians, and local service businesses.',
  keywords: [
    'web design',
    'local business website',
    'contractor website',
    'HVAC website',
    'plumber website',
    'electrician website',
    'small business web design',
    'Texas web design',
  ],
  authors: [{ name: 'TrueView Media LLC' }],
  creator: 'TrueView Media LLC',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trueviewmediallc.com',
    siteName: 'TrueView Media LLC',
    title: 'TrueView Media LLC | Professional Websites for Local Service Businesses',
    description:
      'Professional websites built to earn trust and drive calls. Fast, mobile-first websites for contractors, HVAC, plumbers, electricians, and local service businesses.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrueView Media LLC | Professional Websites for Local Service Businesses',
    description:
      'Professional websites built to earn trust and drive calls. Fast, mobile-first websites for local service businesses.',
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
        <Analytics />
      </body>
    </html>
  );
}
