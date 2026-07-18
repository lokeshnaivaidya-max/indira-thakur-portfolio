'use client';

import { useState } from 'react';
import { HiTrash } from 'react-icons/hi2';

const initialReviews: any[] = [];

export default function AdminReviewsPage() {
  const [reviews] = useState(initialReviews);

  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl text-warm-black mb-2">Reviews</h1>
      <p className="font-sans-alt text-sm text-earth-brown/60 mb-10">Manage Google and social media reviews.</p>

      <div className="bg-soft-white rounded-sm border border-warm-cream/50 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-warm-cream/50 bg-warm-ivory/50">
              <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Client</th>
              <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Rating</th>
              <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Source</th>
              <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Content</th>
              <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Featured</th>
              <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id} className="border-b border-warm-cream/30 hover:bg-warm-ivory/50 transition-colors">
                <td className="p-4 font-serif text-sm text-warm-black">{r.name}</td>
                <td className="p-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <span key={i} className="text-muted-gold text-xs">★</span>
                    ))}
                  </div>
                </td>
                <td className="p-4"><span className="font-sans-alt text-xs px-3 py-1 bg-cream/50 text-earth-brown rounded-sm">{r.source}</span></td>
                <td className="p-4 font-sans-alt text-sm text-earth-brown/70 max-w-xs truncate">{r.content}</td>
                <td className="p-4">{r.featured ? <span className="text-muted-gold">★</span> : <span className="text-beige">★</span>}</td>
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
