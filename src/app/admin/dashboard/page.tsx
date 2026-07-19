'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  HiPhoto,
  HiCommandLine,
  HiUserGroup,
  HiQuestionMarkCircle,
  HiViewColumns,
  HiClock,
  HiArrowRight,
  HiArrowUpTray,
  HiArrowDownTray,
} from 'react-icons/hi2';

interface SiteConfigData {
  galleryPreview?: { featuredImages?: any[] };
  services?: { services?: any[] };
  testimonials?: { testimonials?: any[] };
  faq?: { faqs?: any[] };
  contact?: Record<string, unknown>;
  updatedAt?: string;
}

interface DashboardStats {
  galleryImages: number;
  services: number;
  testimonials: number;
  faqs: number;
  dynamicSections: number;
  lastUpdated: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    galleryImages: 0,
    services: 0,
    testimonials: 0,
    faqs: 0,
    dynamicSections: 0,
    lastUpdated: '',
  });
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [importMsg, setImportMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [configRes, sectionsRes, galleryRes] = await Promise.all([
        fetch('/api/site-config'),
        fetch('/api/dynamic-sections?pageKey=home'),
        fetch('/api/gallery-images'),
      ]);

      const config: SiteConfigData = configRes.ok ? await configRes.json() : {};
      const sections = sectionsRes.ok ? await sectionsRes.json() : {};
      const galleryImages = galleryRes.ok ? await galleryRes.json() : [];

      const siteConfigGalleryCount = config.galleryPreview?.featuredImages?.length ?? 0;
      const dbGalleryCount = Array.isArray(galleryImages) ? galleryImages.length : 0;

      setStats({
        galleryImages: siteConfigGalleryCount + dbGalleryCount,
        services: config.services?.services?.length ?? 0,
        testimonials: config.testimonials?.testimonials?.length ?? 0,
        faqs: config.faq?.faqs?.length ?? 0,
        dynamicSections: Array.isArray(sections.sections) ? sections.sections.length : 0,
        lastUpdated: config.updatedAt ?? '',
      });
    } catch {
      // silently fail — stats stay at defaults
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleExport = async () => {
    try {
      const res = await fetch('/api/site-config');
      if (!res.ok) throw new Error('Export failed');
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const date = new Date().toISOString().split('T')[0];
      a.href = url;
      a.download = `indira-thakur-cms-backup-${date}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert('Failed to export content.');
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setImportMsg(null);

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      const res = await fetch('/api/site-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Import failed');
      setImportMsg({ type: 'success', text: 'Content imported successfully!' });
      fetchData();
    } catch {
      setImportMsg({ type: 'error', text: 'Failed to import. Make sure the file is valid JSON.' });
    } finally {
      setImporting(false);
      e.target.value = '';
    }
  };

  const statCards = [
    { label: 'Gallery Images', value: stats.galleryImages, icon: HiPhoto },
    { label: 'Services', value: stats.services, icon: HiCommandLine },
    { label: 'Testimonials', value: stats.testimonials, icon: HiUserGroup },
    { label: 'FAQs', value: stats.faqs, icon: HiQuestionMarkCircle },
    { label: 'Dynamic Sections', value: stats.dynamicSections, icon: HiViewColumns },
    { label: 'Last Updated', value: 0, icon: HiClock, isDate: true },
  ];

  const quickActions = [
    { label: 'Edit Home', href: '/admin/home' },
    { label: 'Edit About', href: '/admin/about' },
    { label: 'Edit Services', href: '/admin/services-cms' },
    { label: 'Edit Gallery', href: '/admin/gallery-cms' },
    { label: 'Page Builder', href: '/admin/sections' },
    { label: 'SEO Settings', href: '/admin/seo-cms' },
  ];

  return (
    <div className="h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="font-serif text-2xl md:text-3xl text-rich-black mb-2">Dashboard</h2>
        <p className="font-sans text-sm text-warm-gray/60">Overview of your portfolio content.</p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
      >
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-white rounded-lg border border-cream/50 p-5"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-magenta/10">
                <stat.icon className="w-5 h-5 text-magenta" aria-hidden="true" />
              </div>
              <div>
                <p className="font-sans text-xs text-warm-gray/60 uppercase tracking-wider">{stat.label}</p>
                <p className="font-serif text-2xl text-rich-black mt-0.5">
                  {loading ? '—' : stat.isDate ? formatDate(stats.lastUpdated) : stat.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-y-auto">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg border border-cream/50 p-6"
        >
          <h3 className="font-serif text-lg text-rich-black mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <a
                key={action.href}
                href={action.href}
                className="flex items-center justify-between p-4 border border-cream/50 rounded-lg hover:bg-ivory/50 hover:border-magenta/30 transition-all group"
              >
                <span className="font-sans text-sm text-rich-black">{action.label}</span>
                <HiArrowRight className="w-4 h-4 text-warm-gray/40 group-hover:text-magenta transition-colors" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Export / Import */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="bg-white rounded-lg border border-cream/50 p-6"
        >
          <h3 className="font-serif text-lg text-rich-black mb-4">Backup & Restore</h3>
          <div className="space-y-4">
            <button
              onClick={handleExport}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-rich-black text-white rounded-lg hover:bg-charcoal transition-colors font-sans text-sm"
            >
              <HiArrowDownTray className="w-4 h-4" />
              Export All Content
            </button>

            <div>
              <label className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-cream/80 rounded-lg hover:bg-ivory/50 transition-colors font-sans text-sm text-rich-black cursor-pointer">
                <HiArrowUpTray className="w-4 h-4" />
                {importing ? 'Importing...' : 'Import Content'}
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  disabled={importing}
                  className="hidden"
                />
              </label>
            </div>

            {importMsg && (
              <p className={`font-sans text-xs ${importMsg.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {importMsg.text}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
