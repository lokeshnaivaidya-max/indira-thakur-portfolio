'use client';

import { useCMS } from '@/hooks/useCMS';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import ImageManager from '@/components/admin/ImageManager';
import { useState } from 'react';

export default function AdminHomePage() {
  const { config, loading, saving, error, success, updateSection, saveConfig, clearMessages } = useCMS();
  const [newCategory, setNewCategory] = useState('');

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

  const home = config.home || {};

  const addCategory = () => {
    if (!newCategory.trim()) return;
    const cats = [...(home.categories || []), newCategory.trim()];
    updateSection('home', { categories: cats });
    setNewCategory('');
  };

  const removeCategory = (index: number) => {
    const cats = (home.categories || []).filter((_: any, i: number) => i !== index);
    updateSection('home', { categories: cats });
  };

  return (
    <div className="h-full flex flex-col">
      <AdminPageHeader
        title="Home Page"
        description="Manage the Hero section, homepage images, and content"
        error={error}
        success={success}
        onClearMessages={clearMessages}
      />

      <div className="flex-1 overflow-y-auto space-y-6 max-w-4xl mx-auto w-full">
        {/* Hero Content */}
        <Section title="Hero Content" defaultOpen>
          <FieldInput label="Tagline" value={home.tagline || ''} onChange={(v) => updateSection('home', { tagline: v })} placeholder="e.g., Photography" />
          <FieldInput label="Main Heading" value={home.heading || ''} onChange={(v) => updateSection('home', { heading: v })} placeholder="e.g., Every Frame" />
          <FieldInput label="Italic Heading" value={home.headingItalic || ''} onChange={(v) => updateSection('home', { headingItalic: v })} placeholder="e.g., Tells a Story" />
          <FieldTextarea label="Subtext (one per line)" value={(home.categories || []).join('\n')} onChange={(v) => updateSection('home', { categories: v.split('\n').filter(Boolean) })} rows={4} placeholder="Newborn&#10;Maternity&#10;Portrait&#10;Events" />

          <div>
            <label className="block font-sans text-xs font-medium tracking-wider uppercase text-warm-gray/70 mb-1.5">Categories</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(home.categories || []).map((cat: string, i: number) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-cream/50 border border-cream/60 rounded-full font-sans text-xs text-rich-black">
                  {cat}
                  <button type="button" onClick={() => removeCategory(i)} className="text-warm-gray/40 hover:text-red-500">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Add category..." className="flex-1 px-3 py-2 bg-white border border-cream/60 text-rich-black font-sans text-sm rounded focus:outline-none focus:border-magenta/40" onKeyDown={(e) => e.key === 'Enter' && addCategory()} />
              <button type="button" onClick={addCategory} className="px-4 py-2 bg-rich-black text-white text-xs uppercase tracking-wider rounded hover:bg-charcoal transition-colors">Add</button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FieldInput label="CTA Text" value={home.ctaText || ''} onChange={(v) => updateSection('home', { ctaText: v })} placeholder="e.g., Book Now" />
            <FieldInput label="CTA Link" value={home.ctaLink || ''} onChange={(v) => updateSection('home', { ctaLink: v })} placeholder="e.g., /#contact" />
            <FieldInput label="Secondary CTA Text" value={home.secondaryCtaText || ''} onChange={(v) => updateSection('home', { secondaryCtaText: v })} placeholder="e.g., Portfolio" />
            <FieldInput label="Secondary CTA Link" value={home.secondaryCtaLink || ''} onChange={(v) => updateSection('home', { secondaryCtaLink: v })} placeholder="e.g., /gallery" />
          </div>
        </Section>

        {/* Hero Images */}
        <Section title="Hero Images">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageManager
              label="Hero Main Image"
              description="Main hero background image"
              value={home.images?.heroMain || { url: '', alt: '' }}
              onChange={(img) => updateSection('home', { images: { ...home.images, heroMain: img } })}
              aspect="aspect-[16/9]"
              folder="home/hero"
            />
            <ImageManager
              label="Hero Secondary Image"
              description="Secondary hero image"
              value={home.images?.heroSecondary || { url: '', alt: '' }}
              onChange={(img) => updateSection('home', { images: { ...home.images, heroSecondary: img } })}
              aspect="aspect-[16/9]"
              folder="home/hero"
            />
            <ImageManager
              label="Background Image"
              description="Hero section background"
              value={home.images?.background || { url: '', alt: '' }}
              onChange={(img) => updateSection('home', { images: { ...home.images, background: img } })}
              aspect="aspect-[16/9]"
              folder="home/hero"
            />
          </div>
        </Section>

        {/* Save */}
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
