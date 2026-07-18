import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoadingScreen from '@/components/premium/LoadingScreen';
import CustomCursor from '@/components/premium/CustomCursor';

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
        <CustomCursor />
        <div className="grain-overlay" />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
