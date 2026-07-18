'use client';

import { useState } from 'react';
import { HiPlus, HiTrash } from 'react-icons/hi2';

const initialCollaborations: any[] = [];

export default function AdminCollaborationsPage() {
  const [collaborations] = useState(initialCollaborations);

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-warm-black mb-2">Collaborations</h1>
          <p className="font-sans-alt text-sm text-earth-brown/60">Manage brand collaborations and partnerships.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-warm-black text-soft-white font-sans-alt text-xs tracking-wider uppercase hover:bg-earth-brown transition-all">
          <HiPlus className="w-4 h-4" />
          Add Collaboration
        </button>
      </div>

      <div className="bg-soft-white rounded-sm border border-warm-cream/50 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-warm-cream/50 bg-warm-ivory/50">
              <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Brand Name</th>
              <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Description</th>
              <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Featured</th>
              <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {collaborations.map((c) => (
              <tr key={c.id} className="border-b border-warm-cream/30 hover:bg-warm-ivory/50 transition-colors">
                <td className="p-4 font-serif text-sm text-warm-black">{c.name}</td>
                <td className="p-4 font-sans-alt text-sm text-earth-brown/70">{c.description}</td>
                <td className="p-4">
                  {c.featured ? <span className="text-muted-gold">★</span> : <span className="text-beige">★</span>}
                </td>
                <td className="p-4">
                  <button className="p-2 rounded-sm hover:bg-soft-rose/50 text-earth-brown/60 hover:text-rose-500 transition-all">
                    <HiTrash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
