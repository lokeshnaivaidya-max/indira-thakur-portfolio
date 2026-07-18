"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl text-rich-black">
            Admin <span className="text-magenta/60">Login</span>
          </h1>
          <p className="mt-2 font-sans text-sm text-warm-gray/60">
            Indira Thakur Photography
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-sm border border-cream/50 space-y-6">
          {error && (
            <div className="p-4 bg-magenta/10 border border-magenta/10 text-magenta font-sans text-sm rounded-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block font-sans text-xs tracking-wider uppercase text-warm-gray/60 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-white border border-beige/60 text-rich-black placeholder:text-warm-gray/40 font-sans text-sm transition-all duration-500 focus:outline-none focus:border-magenta/40"
              placeholder="admin@indirathakur.com"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block font-sans text-xs tracking-wider uppercase text-warm-gray/60 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-white border border-beige/60 text-rich-black placeholder:text-warm-gray/40 font-sans text-sm transition-all duration-500 focus:outline-none focus:border-magenta/40"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}