import type { Metadata } from 'next';
import './globals.css';
import PublicLayoutWrapper from '@/components/layout/PublicLayoutWrapper';
import LoadingScreen from '@/components/premium/LoadingScreen';

export const metadata: Metadata = {
  title: {
    default: 'Indira Thakur Photography | Capturing Life\'s Precious Moments',
    template: '%s | Indira Thakur Photography',
  },
  description: 'Professional photographer specializing in newborn, maternity, portrait, and event photography. Based in Bangalore.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Indira Thakur Photography',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
  <body className="bg-ivory text-rich-black font-sans antialiased">
    <LoadingScreen />
    <div className="grain-overlay" />
    <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
      </body>
    </html>
  );
}
