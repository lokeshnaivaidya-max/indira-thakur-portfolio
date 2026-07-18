'use client';

import Link from 'next/link';
import { useSiteConfig } from '@/hooks/useSiteConfig';

export default function Footer() {
  const { config } = useSiteConfig();

  const footerData = config?.footer || {
    tagline: 'Photography',
    description: "Capturing life's most precious moments with warmth, artistry, and an unwavering attention to detail.",
    email: 'hello@indirathakur.com',
    phone: '+91 99999 99999',
    instagramUrl: 'https://instagram.com',
    facebookUrl: '',
  };

  return (
    <footer className="bg-rich-black text-white/60">
      <div className="container-editorial py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div>
            <p className="font-serif text-xl text-white italic">Indira Thakur</p>
            <p className="font-mono text-[9px] text-white/30 uppercase tracking-[0.25em] mt-1">{footerData.tagline}</p>
            <p className="font-sans text-sm text-white/40 mt-6 max-w-xs leading-relaxed">
              {footerData.description}
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[9px] text-white/30 uppercase tracking-[0.25em] mb-6">Explore</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/#about', label: 'About' },
                { href: '/#services', label: 'Services' },
                { href: '/gallery', label: 'Gallery' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-sans text-sm text-white/40 hover:text-white transition-colors duration-500">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[9px] text-white/30 uppercase tracking-[0.25em] mb-6">Connect</h4>
            <ul className="space-y-3">
              <li><a href={`mailto:${footerData.email}`} className="font-sans text-sm text-white/40 hover:text-white transition-colors duration-500">{footerData.email}</a></li>
              <li><a href={`tel:${footerData.phone?.replace(/\s/g, '')}`} className="font-sans text-sm text-white/40 hover:text-white transition-colors duration-500">{footerData.phone}</a></li>
              {footerData.instagramUrl && (
                <li><a href={footerData.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-white/40 hover:text-white transition-colors duration-500">Instagram</a></li>
              )}
              {footerData.facebookUrl && (
                <li><a href={footerData.facebookUrl} target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-white/40 hover:text-white transition-colors duration-500">Facebook</a></li>
              )}
            </ul>
          </div>
        </div>

        <div className="w-full h-px bg-white/5 mt-16 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/20">&copy; {new Date().getFullYear()} Indira Thakur Photography</p>
        </div>
      </div>
    </footer>
  );
}
