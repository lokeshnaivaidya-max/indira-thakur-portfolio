'use client';

import Link from 'next/link';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { PolaroidImage } from '@/components/ui/PolaroidImage';

export default function Footer() {
  const { config } = useSiteConfig();

  const footerData = config?.footer || {
    tagline: 'Photography',
    description: "Capturing life's most precious moments with warmth, artistry, and an unwavering attention to detail.",
    email: 'hello@indirathakur.com',
    phone: '+91 99999 99999',
    instagramUrl: 'https://instagram.com',
    facebookUrl: '',
    logo: { url: '', alt: '' },
    backgroundFooter: { url: '', alt: '' },
  };

  const hasImage = (url: string) => url && url.trim() !== '';

  return (
    <footer className="relative bg-rich-black text-white/60 overflow-hidden">
      {hasImage(footerData.backgroundFooter?.url) && (
        <div className="absolute inset-0">
          <PolaroidImage
            src={footerData.backgroundFooter.url}
            alt={footerData.backgroundFooter.alt || ''}
            fill
            objectFit="cover"
            sizes="100vw"
            className="!w-full !h-full opacity-10"
            containerClassName="!w-full !h-full !absolute !inset-0"
          />
        </div>
      )}

      <div className="container-editorial py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div>
            {hasImage(footerData.logo?.url) ? (
              <PolaroidImage
                src={footerData.logo.url}
                alt={footerData.logo.alt || 'Indira Thakur Photography'}
                width={120}
                height={48}
                objectFit="contain"
                containerClassName="!w-auto !h-12 !mb-3"
                className="!w-auto !h-12"
              />
            ) : (
              <p className="font-serif text-xl text-white italic">Indira Thakur</p>
            )}
            <p className="font-mono text-[11px] text-white/50 uppercase tracking-[0.25em] mt-1">{footerData.tagline}</p>
            <p className="font-sans text-sm text-white/50 mt-6 max-w-xs leading-relaxed">{footerData.description}</p>
          </div>

          <nav aria-label="Footer navigation">
            <h4 className="font-mono text-[11px] text-white/50 uppercase tracking-[0.25em] mb-6">Explore</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/services', label: 'Services' },
                { href: '/gallery', label: 'Gallery' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-sans text-sm text-white/40 hover:text-magenta transition-colors duration-500 py-1.5 min-h-[44px] inline-block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer navigation">
            <h4 className="font-mono text-[11px] text-white/50 uppercase tracking-[0.25em] mb-6">Connect</h4>
            <ul className="space-y-3">
              <li><a href={`mailto:${footerData.email}`} className="font-sans text-sm text-white/40 hover:text-magenta transition-colors duration-500 py-1.5 min-h-[44px] inline-block">{footerData.email}</a></li>
              <li><a href={`tel:${footerData.phone?.replace(/\s/g, '')}`} className="font-sans text-sm text-white/40 hover:text-magenta transition-colors duration-500 py-1.5 min-h-[44px] inline-block">{footerData.phone}</a></li>
              {footerData.instagramUrl && (
                <li><a href={footerData.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-white/40 hover:text-magenta transition-colors duration-500 py-1.5 min-h-[44px] inline-block">Instagram</a></li>
              )}
              {footerData.facebookUrl && (
                <li><a href={footerData.facebookUrl} target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-white/40 hover:text-magenta transition-colors duration-500 py-1.5 min-h-[44px] inline-block">Facebook</a></li>
              )}
            </ul>
          </nav>
        </div>

        <div className="w-full h-px bg-white/5 mt-16 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/40">&copy; {new Date().getFullYear()} Indira Thakur Photography</p>
        </div>
      </div>
    </footer>
  );
}
