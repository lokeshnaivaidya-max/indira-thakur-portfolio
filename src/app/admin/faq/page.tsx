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
          <h1 className="font-serif text-3xl md:text-4xl text-warm-black mb-2">FAQ</h1>
          <p className="font-sans-alt text-sm text-earth-brown/60">Manage frequently asked questions.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-warm-black text-soft-white font-sans-alt text-xs tracking-wider uppercase hover:bg-earth-brown transition-all">
          <HiPlus className="w-4 h-4" />
          Add FAQ
        </button>
      </div>

      <div className="bg-soft-white rounded-sm border border-warm-cream/50 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-warm-cream/50 bg-warm-ivory/50">
              <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Question</th>
              <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Category</th>
              <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Order</th>
              <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq.id} className="border-b border-warm-cream/30 hover:bg-warm-ivory/50 transition-colors">
                <td className="p-4 font-serif text-sm text-warm-black max-w-md truncate">{faq.question}</td>
                <td className="p-4"><span className="font-sans-alt text-xs px-3 py-1 bg-cream/50 text-earth-brown rounded-sm">{faq.category}</span></td>
                <td className="p-4 font-sans-alt text-sm text-earth-brown/70">{faq.order}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="p-2 rounded-sm hover:bg-cream/50 text-earth-brown/60 hover:text-warm-black transition-all"><HiPencil className="w-4 h-4" /></button>
                    <button className="p-2 rounded-sm hover:bg-soft-rose/50 text-earth-brown/60 hover:text-rose-500 transition-all"><HiTrash className="w-4 h-4" /></button>
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
