'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiBars3, HiXMark } from 'react-icons/hi2';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="font-serif text-xl md:text-2xl text-warm-black">
            Indira <span className="text-muted-gold">Thakur</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="font-sans-alt text-sm text-warm-brown/80 hover:text-warm-black transition-colors">
                {item.label}
              </Link>
            ))}
            <Link href="/#contact" className="btn-primary px-6 py-2.5 text-xs">
              Book Now
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-warm-black p-2" aria-label="Menu">
            {mobileOpen ? <HiXMark className="w-6 h-6" /> : <HiBars3 className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-cream/50">
          <div className="px-6 py-6 space-y-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block font-sans-alt text-base text-warm-brown hover:text-warm-black transition-colors">
                {item.label}
              </Link>
            ))}
            <Link href="/#contact" onClick={() => setMobileOpen(false)} className="btn-primary w-full text-center text-xs mt-4">
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
