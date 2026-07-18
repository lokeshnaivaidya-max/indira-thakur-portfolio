'use client';

import Link from 'next/link';

export default function StickyBooking() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden">
      <Link
        href="/#contact"
        className="flex items-center gap-3 px-6 py-3 bg-warm-black text-soft-white font-sans-alt text-xs tracking-[0.15em] uppercase shadow-xl hover:bg-earth-brown transition-all duration-500"
      >
        Book Your Session
      </Link>
    </div>
  );
}
