'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const allLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

const desktopLinks = allLinks.filter(
  (l) => l.href !== '/' && l.href !== '/contact'
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-ivory/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.04)]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="font-serif text-lg text-rich-black italic tracking-tight">Indira Thakur</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              {desktopLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-sans text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 py-2 ${
                    pathname === link.href
                      ? 'text-rich-black font-medium'
                      : 'text-warm-gray/60 hover:text-rich-black'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Book Now Button */}
            <div className="hidden md:flex items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-rich-black text-white font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-charcoal transition-all duration-500"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-rich-black"
              aria-label="Open menu"
            >
              <div className="w-5 h-3.5 flex flex-col justify-between">
                <span className="w-full h-px bg-rich-black" />
                <span className="w-full h-px bg-rich-black" />
                <span className="w-full h-px bg-rich-black" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-ivory flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center text-rich-black"
              aria-label="Close menu"
            >
              <div className="w-5 h-5 relative">
                <span className="absolute top-1/2 left-0 w-full h-px bg-rich-black -translate-y-1/2 rotate-45" />
                <span className="absolute top-1/2 left-0 w-full h-px bg-rich-black -translate-y-1/2 -rotate-45" />
              </div>
            </button>

            <nav className="flex flex-col items-center gap-8">
              {allLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-serif text-3xl transition-colors duration-500 ${
                      pathname === link.href
                        ? 'text-rich-black font-medium'
                        : 'text-rich-black/70 hover:text-rich-black'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: allLinks.length * 0.08, duration: 0.5 }}
              className="mt-8"
            >
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center px-8 py-3 bg-rich-black text-white font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-charcoal transition-all duration-500"
              >
                Book Now
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
