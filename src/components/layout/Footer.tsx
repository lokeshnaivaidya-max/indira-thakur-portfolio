'use client';

import Link from 'next/link';
import { FaInstagram, FaFacebook, FaYoutube, FaPinterest } from 'react-icons/fa6';
import { HiArrowUp } from 'react-icons/hi2';
import { useEffect, useState } from 'react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Contact', href: '/#contact' },
  { label: 'FAQ', href: '/#faq' },
];

const services = [
  { label: 'Newborn Photography', href: '/services/newborn' },
  { label: 'Maternity Photography', href: '/services/maternity' },
  { label: 'Portrait Photography', href: '/services/portrait' },
  { label: 'Personal Events', href: '/services/events' },
  { label: 'Corporate Events', href: '/services/corporate' },
  { label: 'Brand Collaborations', href: '/services/brand' },
];

export default function Footer() {
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-warm-black text-soft-white/90 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_0%,_#C9A96E_0%,_transparent_60%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-3xl text-soft-white">
              Indira <span className="text-muted-gold">Thakur</span>
            </Link>
            <p className="mt-4 text-earth-brown/70 font-serif-alt text-lg italic leading-relaxed">
              Photography by Indira Thakur
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full border border-earth-brown/30 flex items-center justify-center text-earth-brown hover:text-muted-gold hover:border-muted-gold transition-all duration-300">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-earth-brown/30 flex items-center justify-center text-earth-brown hover:text-muted-gold hover:border-muted-gold transition-all duration-300">
                <FaFacebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-earth-brown/30 flex items-center justify-center text-earth-brown hover:text-muted-gold hover:border-muted-gold transition-all duration-300">
                <FaYoutube className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-earth-brown/30 flex items-center justify-center text-earth-brown hover:text-muted-gold hover:border-muted-gold transition-all duration-300">
                <FaPinterest className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans-alt text-xs tracking-[0.2em] uppercase text-muted-gold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-earth-brown/70 hover:text-soft-white transition-colors duration-300 font-sans-alt text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-sans-alt text-xs tracking-[0.2em] uppercase text-muted-gold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="text-earth-brown/70 hover:text-soft-white transition-colors duration-300 font-sans-alt text-sm">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans-alt text-xs tracking-[0.2em] uppercase text-muted-gold mb-6">Get In Touch</h4>
            <div className="space-y-4 text-earth-brown/70 font-sans-alt text-sm">
              <p>Contact information coming soon</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-earth-brown/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-earth-brown/50 text-xs font-sans-alt">
            &copy; {new Date().getFullYear()} Indira Thakur Photography. All rights reserved.
          </p>
          <p className="text-earth-brown/50 text-xs font-sans-alt">
            All rights reserved.
          </p>
        </div>
      </div>

      {/* Back to Top */}
      {showBackTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 w-12 h-12 bg-muted-gold text-soft-white rounded-full flex items-center justify-center shadow-lg hover:bg-warm-gold transition-all duration-300"
          aria-label="Back to top"
        >
          <HiArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}
