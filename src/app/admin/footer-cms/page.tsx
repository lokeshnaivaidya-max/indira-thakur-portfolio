'use client';

import { useCMS } from '@/hooks/useCMS';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import ImageManager from '@/components/admin/ImageManager';
import { useState } from 'react';

export default function AdminFooterPage() {
  const { config, loading, saving, error, success, updateSection, saveConfig, clearMessages } = useCMS();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-magenta/30 border-t-magenta rounded-full animate-spin mx-auto mb-3" />
          <p className="font-sans text-sm text-warm-gray/50">Loading...</p>
        </div>
      </div>
    );
  }

  if (!config) return null;

  const f = config.footer || {};

  return (
    <div className="h-full flex flex-col">
      <AdminPageHeader
        title="Footer"
        description="Manage footer content, logo, and social links"
        error={error}
        success={success}
        onClearMessages={clearMessages}
      />

      <div className="flex-1 overflow-y-auto space-y-6 max-w-4xl mx-auto w-full">
        <Section title="Footer Content" defaultOpen>
          <FieldInput label="Tagline" value={f.tagline || ''} onChange={(v) => updateSection('footer', { tagline: v })} placeholder="e.g., Photography" />
          <FieldTextarea label="Description" value={f.description || ''} onChange={(v) => updateSection('footer', { description: v })} rows={3} placeholder="Footer description..." />
          <div className="grid grid-cols-2 gap-4">
            <FieldInput label="Email" value={f.email || ''} onChange={(v) => updateSection('footer', { email: v })} placeholder="hello@indirathakur.com" />
            <FieldInput label="Phone" value={f.phone || ''} onChange={(v) => updateSection('footer', { phone: v })} placeholder="+91 99999 99999" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FieldInput label="Instagram URL" value={f.instagramUrl || ''} onChange={(v) => updateSection('footer', { instagramUrl: v })} placeholder="https://instagram.com" />
            <FieldInput label="Facebook URL" value={f.facebookUrl || ''} onChange={(v) => updateSection('footer', { facebookUrl: v })} placeholder="https://facebook.com" />
          </div>
        </Section>

        <Section title="Footer Images">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageManager label="Logo" value={f.logo || { url: '', alt: '' }} onChange={(img) => updateSection('footer', { logo: img })} aspect="aspect-[3/1]" folder="footer/logo" />
            <ImageManager label="Background Image" value={f.backgroundFooter || { url: '', alt: '' }} onChange={(img) => updateSection('footer', { backgroundFooter: img })} aspect="aspect-[16/9]" folder="footer/background" />
          </div>
        </Section>

        <div className="sticky bottom-0 bg-ivory/95 backdrop-blur-sm border-t border-cream/50 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-10 px-4 sm:px-6 md:px-8 lg:px-10 py-4">
          <button type="button" onClick={() => saveConfig()} disabled={saving} className="w-full max-w-md mx-auto px-8 py-3.5 bg-rich-black text-white font-sans text-xs tracking-wider uppercase hover:bg-charcoal transition-all disabled:opacity-50 rounded flex items-center justify-center gap-2">
            {saving ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>) : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white border border-cream/50 rounded-lg overflow-hidden">
      <button type="button" onClick={() => setOpen(!open)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-cream/20 transition-colors">
        <h2 className="font-serif text-lg text-rich-black">{title}</h2>
        <span className={`w-4 h-4 flex items-center justify-center transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <span className="w-3 h-px bg-warm-gray/40 absolute" />
          <span className="w-px h-3 bg-warm-gray/40 absolute" />
        </span>
      </button>
      {open && <div className="px-6 pb-6 space-y-4">{children}</div>}
    </div>
  );
}

function FieldInput({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block font-sans text-xs font-medium tracking-wider uppercase text-warm-gray/70 mb-1.5">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full px-4 py-2.5 bg-white border border-cream/60 text-rich-black font-sans text-sm rounded focus:outline-none focus:border-magenta/40 transition-colors" />
    </div>
  );
}

function FieldTextarea({ label, value, onChange, rows = 4, placeholder }: { label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return (
    <div>
      <label className="block font-sans text-xs font-medium tracking-wider uppercase text-warm-gray/70 mb-1.5">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} placeholder={placeholder} className="w-full px-4 py-2.5 bg-white border border-cream/60 text-rich-black font-sans text-sm rounded focus:outline-none focus:border-magenta/40 transition-colors resize-none" />
    </div>
  );
}
