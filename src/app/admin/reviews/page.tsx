'use client';

import { useState } from 'react';
import { HiTrash } from 'react-icons/hi2';

const initialReviews: any[] = [];

export default function AdminReviewsPage() {
  const [reviews] = useState(initialReviews);

  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl text-rich-black mb-2">Reviews</h1>
      <p className="font-sans text-sm text-warm-gray/60 mb-10">Manage Google and social media reviews.</p>

      <div className="bg-white rounded-sm border border-cream/50 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cream/50 bg-ivory/50">
              <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Client</th>
              <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Rating</th>
              <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Source</th>
              <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Content</th>
              <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Featured</th>
              <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id} className="border-b border-cream/30 hover:bg-ivory/50 transition-colors">
                <td className="p-4 font-serif text-sm text-rich-black">{r.name}</td>
                <td className="p-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <span key={i} className="text-magenta/60 text-xs">★</span>
                    ))}
                  </div>
                </td>
                <td className="p-4"><span className="font-sans text-xs px-3 py-1 bg-cream/50 text-warm-gray rounded-sm">{r.source}</span></td>
                <td className="p-4 font-sans text-sm text-warm-gray/70 max-w-xs truncate">{r.content}</td>
                <td className="p-4">{r.featured ? <span className="text-magenta/60">★</span> : <span className="text-beige">★</span>}</td>
                <td className="p-4">
                  <button className="p-2 rounded-sm hover:bg-magenta/10 text-warm-gray/60 hover:text-rose-500 transition-all">
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
