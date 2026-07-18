'use client';

import { useState } from 'react';
import { HiPlus, HiTrash, HiPencil } from 'react-icons/hi2';

const initialFaqs: any[] = [];

export default function AdminFAQPage() {
  const [faqs] = useState(initialFaqs);

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-rich-black mb-2">FAQ</h1>
          <p className="font-sans text-sm text-warm-gray/60">Manage frequently asked questions.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-rich-black text-white font-sans text-xs tracking-wider uppercase hover:bg-warm-gray transition-all">
          <HiPlus className="w-4 h-4" />
          Add FAQ
        </button>
      </div>

      <div className="bg-white rounded-sm border border-cream/50 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cream/50 bg-ivory/50">
              <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Question</th>
              <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Category</th>
              <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Order</th>
              <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq.id} className="border-b border-cream/30 hover:bg-ivory/50 transition-colors">
                <td className="p-4 font-serif text-sm text-rich-black max-w-md truncate">{faq.question}</td>
                <td className="p-4"><span className="font-sans text-xs px-3 py-1 bg-cream/50 text-warm-gray rounded-sm">{faq.category}</span></td>
                <td className="p-4 font-sans text-sm text-warm-gray/70">{faq.order}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="p-2 rounded-sm hover:bg-cream/50 text-warm-gray/60 hover:text-rich-black transition-all"><HiPencil className="w-4 h-4" /></button>
                    <button className="p-2 rounded-sm hover:bg-magenta/10 text-warm-gray/60 hover:text-rose-500 transition-all"><HiTrash className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
