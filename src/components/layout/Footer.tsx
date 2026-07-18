'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-rich-black text-white/60">
      <div className="container-editorial py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div>
            <p className="font-serif text-xl text-white italic">Indira Thakur</p>
            <p className="font-mono text-[9px] text-white/30 uppercase tracking-[0.25em] mt-1">Photography</p>
            <p className="font-sans text-sm text-white/40 mt-6 max-w-xs leading-relaxed">
              Capturing life&apos;s most precious moments with warmth, artistry, and an unwavering attention to detail.
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
              <li><a href="mailto:hello@indirathakur.com" className="font-sans text-sm text-white/40 hover:text-white transition-colors duration-500">hello@indirathakur.com</a></li>
              <li><a href="tel:+919999999999" className="font-sans text-sm text-white/40 hover:text-white transition-colors duration-500">+91 99999 99999</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-white/40 hover:text-white transition-colors duration-500">Instagram</a></li>
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
