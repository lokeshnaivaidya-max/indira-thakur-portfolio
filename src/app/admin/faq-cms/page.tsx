'use client';

import { useCMS } from '@/hooks/useCMS';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { useState } from 'react';
import { HiPlus, HiTrash } from 'react-icons/hi2';

export default function AdminFAQPage() {
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

  const faq = config.faq || {};

  const handleFaqChange = (index: number, field: string, value: string) => {
    const items = [...(faq.faqs || [])];
    items[index] = { ...items[index], [field]: value };
    updateSection('faq', { faqs: items });
  };

  const addFaq = () => {
    const items = [...(faq.faqs || []), { question: '', answer: '' }];
    updateSection('faq', { faqs: items });
  };

  const removeFaq = (index: number) => {
    const items = (faq.faqs || []).filter((_: any, i: number) => i !== index);
    updateSection('faq', { faqs: items });
  };

  return (
    <div className="h-full flex flex-col">
      <AdminPageHeader
        title="FAQ"
        description="Manage frequently asked questions"
        error={error}
        success={success}
        onClearMessages={clearMessages}
      />

      <div className="flex-1 overflow-y-auto space-y-6 max-w-4xl mx-auto w-full">
        <Section title="Section Header" defaultOpen>
          <div className="grid grid-cols-2 gap-4">
            <FieldInput label="Eyebrow" value={faq.eyebrow || ''} onChange={(v) => updateSection('faq', { eyebrow: v })} placeholder="e.g., Questions" />
            <FieldInput label="Heading" value={faq.heading || ''} onChange={(v) => updateSection('faq', { heading: v })} placeholder="e.g., Commonly Asked" />
          </div>
        </Section>

        <Section title={`FAQs (${(faq.faqs || []).length})`} defaultOpen>
          <div className="space-y-4">
            {(faq.faqs || []).map((item: any, i: number) => (
              <div key={i} className="p-5 bg-ivory/50 border border-cream/40 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-warm-gray/40 uppercase tracking-wider">FAQ #{i + 1}</span>
                  <button type="button" onClick={() => removeFaq(i)} className="text-red-400 hover:text-red-600 transition-colors">
                    <HiTrash className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={item.question || ''}
                  onChange={(e) => handleFaqChange(i, 'question', e.target.value)}
                  placeholder="Question..."
                  className="w-full px-4 py-2.5 bg-white border border-cream/60 text-rich-black font-sans text-sm rounded focus:outline-none focus:border-magenta/40"
                />
                <textarea
                  value={item.answer || ''}
                  onChange={(e) => handleFaqChange(i, 'answer', e.target.value)}
                  rows={3}
                  placeholder="Answer..."
                  className="w-full px-4 py-2.5 bg-white border border-cream/60 text-rich-black font-sans text-sm rounded focus:outline-none focus:border-magenta/40 resize-none"
                />
              </div>
            ))}
            <button type="button" onClick={addFaq} className="flex items-center gap-2 text-magenta font-sans text-xs hover:text-raspberry transition-colors">
              <HiPlus className="w-4 h-4" /> Add FAQ
            </button>
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
