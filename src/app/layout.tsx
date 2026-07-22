import type { Metadata } from 'next';
import { Playfair_Display, Inter, DM_Mono } from 'next/font/google';
import './globals.css';
import ServerDataProvider from '@/components/layout/ServerDataProvider';

export const dynamic = 'force-dynamic';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://indirathakurphotography.com'),
  title: {
    default: 'Indira Thakur Photography | Luxury Fine Art Photography Mumbai & Bangalore',
    template: '%s | Indira Thakur Photography',
  },
  description: 'Bespoke newborn, maternity, fine art portrait, wedding, and event storytelling in Mumbai & Bangalore, India. Preserving the quiet soul of sacred family moments.',
  keywords: [
    'Indira Thakur Photography',
    'Luxury Newborn Photographer Bangalore',
    'Maternity Photography Mumbai',
    'Fine Art Portrait Photography',
    'Couture Maternity Photography India',
    'Luxury Wedding Photographer Bangalore',
    'Bespoke Family Photographer Mumbai'
  ],
  authors: [{ name: 'Indira Thakur' }],
  creator: 'Indira Thakur',
  publisher: 'Indira Thakur Photography',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Indira Thakur Photography',
    url: 'https://indirathakurphotography.com',
    title: 'Indira Thakur Photography | Fine Art & Editorial',
    description: 'Luxury newborn, maternity, portrait, and event storytelling in Mumbai & Bangalore, India.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Indira Thakur Photography Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indira Thakur Photography | Fine Art & Editorial',
    description: 'Luxury newborn, maternity, portrait, and event storytelling in Mumbai & Bangalore, India.',
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://indirathakurphotography.com/#business',
      'name': 'Indira Thakur Photography',
      'url': 'https://indirathakurphotography.com',
      'logo': 'https://indirathakurphotography.com/logo.png',
      'image': 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
      'telephone': '+91-9876543210',
      'email': 'hello@indirathakurphotography.com',
      'priceRange': '$$$$',
      'address': [
        {
          '@type': 'PostalAddress',
          'addressLocality': 'Mumbai',
          'addressRegion': 'Maharashtra',
          'addressCountry': 'IN'
        },
        {
          '@type': 'PostalAddress',
          'addressLocality': 'Bangalore',
          'addressRegion': 'Karnataka',
          'addressCountry': 'IN'
        }
      ],
      'areaServed': ['Mumbai', 'Bangalore', 'India', 'Worldwide'],
      'knowsAbout': [
        'Newborn Photography',
        'Maternity Photography',
        'Fine Art Portraiture',
        'Family Legacy Portraits',
        'Cinematic Wedding Photography',
        'Event Cinematography'
      ]
    },
    {
      '@type': 'Person',
      '@id': 'https://indirathakurphotography.com/#person',
      'name': 'Indira Thakur',
      'jobTitle': 'Lead Fine Art Photographer & Director',
      'url': 'https://indirathakurphotography.com/about',
      'worksFor': {
        '@id': 'https://indirathakurphotography.com/#business'
      }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${dmMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="bg-ivory text-rich-black font-sans antialiased" suppressHydrationWarning>
        <ServerDataProvider>{children}</ServerDataProvider>
      </body>
    </html>
  );
}