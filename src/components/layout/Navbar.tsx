'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'bg-ivory/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-8 md:px-16 lg:px-24 h-20">
          <Link href="/" className="group">
            <span className="font-serif text-lg text-rich-black italic tracking-tight">Indira Thakur</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.slice(0, -1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[10px] text-warm-gray/60 uppercase tracking-[0.2em] hover:text-rich-black transition-colors duration-500"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="font-sans text-[10px] text-white uppercase tracking-[0.2em] bg-rich-black px-5 py-2.5 hover:bg-charcoal transition-all duration-500"
            >
              Book Now
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-rich-black"
            aria-label="Open menu"
          >
            <span className="sr-only">Menu</span>
            <div className="w-5 h-3.5 flex flex-col justify-between">
              <span className="w-full h-px bg-rich-black" />
              <span className="w-full h-px bg-rich-black" />
              <span className="w-full h-px bg-rich-black" />
            </div>
          </button>
        </div>
      </header>

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
              <span className="sr-only">Close</span>
              <div className="w-5 h-5 relative">
                <span className="absolute top-1/2 left-0 w-full h-px bg-rich-black -translate-y-1/2 rotate-45" />
                <span className="absolute top-1/2 left-0 w-full h-px bg-rich-black -translate-y-1/2 -rotate-45" />
              </div>
            </button>

            <nav className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-3xl text-rich-black/70 hover:text-rich-black transition-colors duration-500"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
