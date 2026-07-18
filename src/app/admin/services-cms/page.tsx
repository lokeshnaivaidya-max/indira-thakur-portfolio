'use client';

import { useCMS } from '@/hooks/useCMS';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import ImageManager from '@/components/admin/ImageManager';
import { useState } from 'react';
import { HiPlus, HiTrash } from 'react-icons/hi2';

export default function AdminServicesPage() {
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

  const services = config.services || {};

  const handleServiceChange = (index: number, field: string, value: string) => {
    const svcs = [...(services.services || [])];
    svcs[index] = { ...svcs[index], [field]: value };
    updateSection('services', { services: svcs });
  };

  const handleServiceImageChange = (index: number, image: any) => {
    const svcs = [...(services.services || [])];
    svcs[index] = { ...svcs[index], image };
    updateSection('services', { services: svcs });
  };

  const addService = () => {
    const svcs = [...(services.services || []), { title: '', subtitle: '', description: '', gradient: 'from-[#1A1110] via-[#2C1810] to-[#1A1A1A]', image: { url: '', alt: '' } }];
    updateSection('services', { services: svcs });
  };

  const removeService = (index: number) => {
    const svcs = (services.services || []).filter((_: any, i: number) => i !== index);
    updateSection('services', { services: svcs });
  };

  const gradients = [
    'from-[#1A1110] via-[#2C1810] to-[#1A1A1A]',
    'from-[#2C1810] via-[#3D2C25] to-[#1A1110]',
    'from-[#1A1A1A] via-[#2C1810] to-[#3D2C25]',
    'from-[#3D2C25] via-[#2C1810] to-[#2C2C2C]',
    'from-[#2C2C2C] via-[#1A1A1A] to-rich-black',
  ];

  return (
    <div className="h-full flex flex-col">
      <AdminPageHeader
        title="Services"
        description="Manage services section content and images"
        error={error}
        success={success}
        onClearMessages={clearMessages}
      />

      <div className="flex-1 overflow-y-auto space-y-6 max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <Section title="Section Header" defaultOpen>
          <div className="grid grid-cols-2 gap-4">
            <FieldInput label="Eyebrow" value={services.eyebrow || ''} onChange={(v) => updateSection('services', { eyebrow: v })} placeholder="e.g., What I Offer" />
            <FieldInput label="Heading" value={services.heading || ''} onChange={(v) => updateSection('services', { heading: v })} placeholder="e.g., Services" />
          </div>
          <ImageManager
            label="Banner Image"
            description="Services section banner"
            value={services.bannerImage || { url: '', alt: '' }}
            onChange={(img) => updateSection('services', { bannerImage: img })}
            aspect="aspect-[16/9]"
            folder="services/banner"
          />
        </Section>

        {/* Service Items */}
        <Section title={`Services (${(services.services || []).length})`} defaultOpen>
          <div className="space-y-6">
            {(services.services || []).map((svc: any, i: number) => (
              <div key={i} className="p-5 bg-ivory/50 border border-cream/40 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-warm-gray/40 uppercase tracking-wider">Service #{i + 1}</span>
                  <button type="button" onClick={() => removeService(i)} className="text-red-400 hover:text-red-600 transition-colors">
                    <HiTrash className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FieldInput label="Title" value={svc.title || ''} onChange={(v) => handleServiceChange(i, 'title', v)} placeholder="e.g., Newborn Photography" />
                  <FieldInput label="Subtitle" value={svc.subtitle || ''} onChange={(v) => handleServiceChange(i, 'subtitle', v)} placeholder="e.g., 01" />
                </div>
                <FieldTextarea label="Description" value={svc.description || ''} onChange={(v) => handleServiceChange(i, 'description', v)} rows={3} placeholder="Service description..." />
                <div>
                  <label className="block font-sans text-xs font-medium tracking-wider uppercase text-warm-gray/70 mb-1.5">Gradient</label>
                  <div className="flex flex-wrap gap-2">
                    {gradients.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => handleServiceChange(i, 'gradient', g)}
                        className={`w-12 h-8 rounded bg-gradient-to-br ${g} border-2 transition-colors ${svc.gradient === g ? 'border-magenta' : 'border-transparent hover:border-cream'}`}
                      />
                    ))}
                  </div>
                </div>
                <ImageManager
                  label="Service Image"
                  value={svc.image || { url: '', alt: '' }}
                  onChange={(img) => handleServiceImageChange(i, img)}
                  aspect="aspect-[16/9]"
                  folder={`services/${svc.title?.toLowerCase().replace(/\s+/g, '-') || 'item'}`}
                />
              </div>
            ))}
            <button type="button" onClick={addService} className="flex items-center gap-2 text-magenta font-sans text-xs hover:text-raspberry transition-colors">
              <HiPlus className="w-4 h-4" /> Add Service
            </button>
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
