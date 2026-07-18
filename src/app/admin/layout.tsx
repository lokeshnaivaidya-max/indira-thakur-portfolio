'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { HiHome, HiPhoto, HiCommandLine, HiUserGroup, HiStar, HiQuestionMarkCircle, HiCalendarDays, HiEnvelope, HiCog6Tooth, HiArrowRightOnRectangle, HiBars3, HiXMark, HiHeart, HiUsers } from 'react-icons/hi2';

const sidebarLinks = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: HiHome },
  { label: 'Gallery', href: '/admin/gallery', icon: HiPhoto },
  { label: 'Services', href: '/admin/services', icon: HiCommandLine },
  { label: 'Testimonials', href: '/admin/testimonials', icon: HiUserGroup },
  { label: 'Reviews', href: '/admin/reviews', icon: HiStar },
  { label: 'FAQ', href: '/admin/faq', icon: HiQuestionMarkCircle },
  { label: 'Bookings', href: '/admin/bookings', icon: HiCalendarDays },
  { label: 'Contact', href: '/admin/contact', icon: HiEnvelope },
  { label: 'About', href: '/admin/about', icon: HiHeart },
  { label: 'Users', href: '/admin/users', icon: HiUsers },
  { label: 'SEO', href: '/admin/seo', icon: HiCog6Tooth },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-ivory flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-rich-black/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white border-r border-cream/50 transform transition-transform duration-300 lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-cream/50">
            <div className="flex items-center justify-between">
              <Link href="/admin/dashboard" className="font-serif text-xl text-rich-black">
                Admin <span className="text-magenta/60">Panel</span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-warm-brown"
              >
                <HiXMark className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-sans text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-rich-black text-white'
                      : 'text-warm-gray/70 hover:bg-cream/50 hover:text-rich-black'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="p-4 border-t border-cream/50 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-warm-gray/70 hover:bg-cream/50 hover:text-rich-black font-sans text-sm transition-all"
            >
              <HiHome className="w-4 h-4" />
              View Website
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-warm-gray/70 hover:bg-magenta/10 hover:text-magenta font-sans text-sm transition-all w-full"
            >
              <HiArrowRightOnRectangle className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top Bar (Mobile) */}
        <div className="sticky top-0 z-30 lg:hidden bg-white/90 backdrop-blur-md border-b border-cream/50 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-warm-brown"
          >
            <HiBars3 className="w-6 h-6" />
          </button>
        </div>

        <main className="p-6 md:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
