import Link from 'next/link';
import { FaInstagram, FaFacebook } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-warm-black text-white/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <Link href="/" className="font-serif text-2xl text-white">Indira <span className="text-muted-gold">Thakur</span></Link>
            <p className="mt-3 text-white/50 font-sans-alt text-sm leading-relaxed">Capturing life&apos;s most precious moments with warmth and artistry.</p>
            <div className="flex gap-4 mt-5">
              <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-muted-gold hover:border-muted-gold transition-all"><FaInstagram className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-muted-gold hover:border-muted-gold transition-all"><FaFacebook className="w-4 h-4" /></a>
            </div>
          </div>
          <div>
            <h4 className="font-sans-alt text-xs tracking-wider uppercase text-white/40 mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Gallery', 'Contact'].map((item) => (
                <li key={item}><Link href={item === 'Home' ? '/' : `/#${item.toLowerCase()}`} className="text-white/60 hover:text-white font-sans-alt text-sm transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-sans-alt text-xs tracking-wider uppercase text-white/40 mb-5">Contact</h4>
            <div className="space-y-3 text-white/60 font-sans-alt text-sm">
              <p>Email: info@indirathakur.com</p>
              <p>Phone: +1 (555) 000-0000</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-white/30 font-sans-alt text-xs">
          &copy; {new Date().getFullYear()} Indira Thakur Photography. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
