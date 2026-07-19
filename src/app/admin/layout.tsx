'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { HiHome, HiPhoto, HiCommandLine, HiUserGroup, HiStar, HiQuestionMarkCircle, HiCalendarDays, HiEnvelope, HiArrowRightOnRectangle, HiBars3, HiXMark, HiHeart, HiUsers, HiDocumentText, HiGlobeAlt, HiViewColumns, HiSwatch, HiBuildingStorefront, HiCog6Tooth } from 'react-icons/hi2';
import ToastContainer from '@/components/admin/Toast';

interface SidebarGroup {
  label: string;
  links: { label: string; href: string; icon: any }[];
}

const sidebarGroups: SidebarGroup[] = [
  {
    label: 'Overview',
    links: [
      { label: 'Dashboard', href: '/admin/dashboard', icon: HiHome },
    ],
  },
  {
    label: 'Website Content',
    links: [
      { label: 'Home', href: '/admin/home', icon: HiHome },
      { label: 'About', href: '/admin/about', icon: HiHeart },
      { label: 'Services', href: '/admin/services-cms', icon: HiCommandLine },
      { label: 'Gallery Preview', href: '/admin/gallery-cms', icon: HiPhoto },
      { label: 'Testimonials', href: '/admin/testimonials-cms', icon: HiUserGroup },
      { label: 'FAQ', href: '/admin/faq-cms', icon: HiQuestionMarkCircle },
      { label: 'Contact', href: '/admin/contact-cms', icon: HiEnvelope },
      { label: 'Footer', href: '/admin/footer-cms', icon: HiDocumentText },
      { label: 'SEO', href: '/admin/seo-cms', icon: HiGlobeAlt },
      { label: 'Theme', href: '/admin/theme', icon: HiSwatch },
      { label: 'Brand', href: '/admin/brand', icon: HiBuildingStorefront },
      { label: 'Page Builder', href: '/admin/sections', icon: HiViewColumns },
    ],
  },
  {
    label: 'Collections',
    links: [
      { label: 'Gallery Images', href: '/admin/gallery', icon: HiPhoto },
      { label: 'Services (DB)', href: '/admin/services', icon: HiCommandLine },
      { label: 'Reviews', href: '/admin/reviews', icon: HiStar },
    ],
  },
  {
    label: 'Operations',
    links: [
      { label: 'Bookings', href: '/admin/bookings', icon: HiCalendarDays },
      { label: 'Contacts (DB)', href: '/admin/contact', icon: HiEnvelope },
      { label: 'Users', href: '/admin/users', icon: HiUsers },
      { label: 'Account', href: '/admin/account', icon: HiCog6Tooth },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
    <div className="min-h-screen bg-ivory flex overflow-hidden">
      {/* Mobile overlay - z-40 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-rich-black/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - z-50, fixed height */}
      <aside
        className={`fixed lg:sticky top-0 z-50 h-screen w-72 bg-white border-r border-cream/50 transition-all duration-300 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${sidebarCollapsed ? 'lg:w-20' : ''}`}
        role="navigation"
        aria-label="Admin sidebar"
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo */}
          <div className="p-4 border-b border-cream/50 flex-shrink-0">
            <div className="flex items-center justify-between">
              <Link 
                href="/admin/dashboard" 
                className="font-serif text-xl text-rich-black flex items-center gap-2"
                aria-label="Admin Panel Home"
              >
                {!sidebarCollapsed && (
                  <span>Admin <span className="text-magenta/60">Panel</span></span>
                )}
                {sidebarCollapsed && <span className="font-serif text-lg text-magenta/60 italic" title="Indira Thakur Photography">IT</span>}
              </Link>
              {!sidebarCollapsed && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden text-warm-brown p-1"
                  aria-label="Close sidebar"
                >
                  <HiXMark className="w-5 h-5" />
                </button>
              )}
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`mt-2 w-full p-2 text-xs text-warm-gray/60 hover:text-rich-black transition-colors flex items-center justify-center gap-2 ${sidebarCollapsed ? 'px-0' : ''}`}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <HiBars3 className="w-4 h-4" />
              {!sidebarCollapsed && <span>Collapse</span>}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 space-y-4" role="navigation">
            {sidebarGroups.map((group) => (
              <div key={group.label}>
                {!sidebarCollapsed && (
                  <p className="px-4 mb-1 font-mono text-[9px] text-warm-gray/30 uppercase tracking-[0.2em]">
                    {group.label}
                  </p>
                )}
                <div className="space-y-0.5">
                  {group.links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg font-sans text-sm transition-all duration-200 ${
                          isActive
                            ? 'bg-rich-black text-white'
                            : 'text-warm-gray/70 hover:bg-cream/50 hover:text-rich-black'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                        title={sidebarCollapsed ? link.label : undefined}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                        {!sidebarCollapsed && <span className="truncate">{link.label}</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Bottom */}
          <div className="py-4 border-t border-cream/50 space-y-2 flex-shrink-0">
            <Link
              href="/"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-warm-gray/70 hover:bg-cream/50 hover:text-rich-black font-sans text-sm transition-all ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
              title={sidebarCollapsed ? 'View Website' : undefined}
            >
              <HiHome className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>View Website</span>}
            </Link>
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-warm-gray/70 hover:bg-magenta/10 hover:text-magenta font-sans text-sm transition-all w-full ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
              title={sidebarCollapsed ? 'Logout' : undefined}
            >
              <HiArrowRightOnRectangle className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content - full height with single scrollbar */}
      <main className="flex-1 min-w-0 lg:ml-0 flex flex-col">
        {/* Mobile Top Bar - sticky */}
        <header className="sticky top-0 z-30 lg:hidden bg-white/95 backdrop-blur-sm border-b border-cream/50 px-4 py-3 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-warm-brown p-2"
            aria-label="Open sidebar"
            aria-expanded={sidebarOpen}
          >
            <HiBars3 className="w-6 h-6" />
          </button>
        </header>

        {/* Content area - scrollable, single scrollbar on main */}
        <div className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 lg:ml-0">
          {children}
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
