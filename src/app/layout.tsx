import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import StickyBooking from '@/components/layout/StickyBooking';
import BackToTop from '@/components/layout/BackToTop';

export const metadata: Metadata = {
  title: {
    default: 'Indira Thakur Photography | Capturing Life\'s Most Precious Moments',
    template: '%s | Indira Thakur Photography',
  },
  description: 'Award-winning photographer specializing in newborn, maternity, portrait, and event photography. Based in your city, capturing emotions and memories that last a lifetime.',
  keywords: ['photographer', 'newborn photography', 'maternity photography', 'portrait photography', 'event photography', 'Indira Thakur'],
  authors: [{ name: 'Indira Thakur' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Indira Thakur Photography',
    title: 'Indira Thakur Photography | Capturing Life\'s Most Precious Moments',
    description: 'Award-winning photographer specializing in newborn, maternity, portrait, and event photography.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indira Thakur Photography',
    description: 'Capturing life\'s most precious moments with elegance and emotion.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-warm-ivory text-charcoal font-sans antialiased overflow-x-hidden">
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <StickyBooking />
          <BackToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
