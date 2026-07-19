'use client';

import { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface BrandData {
  logo?: { url: string; alt: string };
}

const allLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact' },
];

const desktopLinks = allLinks.filter(
  (l) => l.href !== '/' && l.href !== '/contact'
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  console.log('[Navbar] render', { pathname });
  const [brand, setBrand] = useState<BrandData | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    fetch('/api/brand')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setBrand(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useLayoutEffect(() => {
    console.log('[Navbar] body overflow effect', { menuOpen });
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useLayoutEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-ivory/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.04)]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex-shrink-0" aria-label="Home">
              {brand?.logo?.url ? (
                <img
                  src={brand.logo.url}
                  alt={brand.logo.alt || 'Indira Thakur Photography'}
                  className="h-7 md:h-8 w-auto object-contain"
                  loading="eager"
                />
              ) : (
                <span className="font-serif text-lg text-rich-black italic tracking-tight">Indira Thakur</span>
              )}
            </Link>

            <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
              {desktopLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className={`font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-500 py-2 ${
                    pathname === link.href
                      ? 'text-rich-black font-medium'
                      : 'text-warm-gray/60 hover:text-[#B76E79]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-rich-black text-white font-sans text-xs uppercase tracking-[0.2em] hover:bg-[#B76E79] transition-all duration-500 min-h-[44px]"
              >
                Book Now
              </Link>
            </div>

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-11 h-11 flex items-center justify-center text-rich-black"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <div className="w-5 h-3.5 flex flex-col justify-between">
                <span className="w-full h-[1.5px] bg-rich-black rounded-full" />
                <span className="w-full h-[1.5px] bg-rich-black rounded-full" />
                <span className="w-full h-[1.5px] bg-rich-black rounded-full" />
              </div>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-ivory flex flex-col items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <button
              ref={closeButtonRef}
              onClick={closeMenu}
              className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center text-rich-black"
              aria-label="Close menu"
            >
              <div className="w-5 h-5 relative">
                <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-rich-black -translate-y-1/2 rotate-45 rounded-full" />
                <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-rich-black -translate-y-1/2 -rotate-45 rounded-full" />
              </div>
            </button>

            <nav className="flex flex-col items-center gap-6" aria-label="Mobile navigation">
              {allLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={pathname === link.href ? 'page' : undefined}
                    className={`font-serif text-2xl md:text-3xl transition-colors duration-500 py-2 px-4 min-h-[44px] inline-flex items-center ${
                      pathname === link.href
                        ? 'text-rich-black font-medium'
                        : 'text-rich-black/70 hover:text-[#B76E79]'
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
              transition={{ delay: allLinks.length * 0.06, duration: 0.4 }}
              className="mt-8"
            >
              <Link
                href="/contact"
                onClick={closeMenu}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-rich-black text-white font-sans text-xs uppercase tracking-[0.2em] hover:bg-[#B76E79] transition-all duration-500 min-h-[44px]"
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
