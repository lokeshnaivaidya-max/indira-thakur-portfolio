'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiBars3, HiXMark } from 'react-icons/hi2';

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
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-700 ease-out ${
          scrolled ? 'bg-ivory/90 backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-8 md:px-16 lg:px-24 h-20 md:h-24">
          <Link href="/" className="group">
            <span className="font-serif text-xl md:text-2xl text-rich-black italic">Indira Thakur</span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[11px] text-warm-gray uppercase tracking-[0.2em] hover:text-magenta transition-colors duration-500"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="font-sans text-[11px] text-white uppercase tracking-[0.2em] bg-rich-black px-6 py-3 hover:bg-charcoal transition-all duration-500"
            >
              Book Now
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-rich-black"
            aria-label="Open menu"
          >
            <HiBars3 className="w-6 h-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[9999] bg-ivory flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center text-rich-black"
              aria-label="Close menu"
            >
              <HiXMark className="w-6 h-6" />
            </button>

            <nav className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-3xl md:text-4xl text-rich-black hover:text-magenta transition-colors duration-500"
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
