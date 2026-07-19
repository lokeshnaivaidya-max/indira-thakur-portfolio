'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from '@/lib/toast';

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd-LdjuiUE9RSb-rlFMKYj1nJ9az_SQ5RiDeBSTNMQVu5OFYw/formResponse';

export default function GoogleContact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { toast.error('Name is required'); return; }
    if (!email.trim() || !validateEmail(email)) { toast.error('Valid email is required'); return; }

    setSubmitting(true);
    try {
      const formData = new URLSearchParams();
      formData.append('entry.1633920210', name);
      formData.append('entry.1770822543', phone);
      formData.append('entry.227649005', email);
      formData.append('entry.790080973', message);

      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });

      setSubmitted(true);
      setName(''); setEmail(''); setPhone(''); setMessage('');
      toast.success('Thank you! Your message has been received.');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container-editorial text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-mono text-[11px] text-magenta/60 uppercase tracking-[0.3em]">Get In Touch</span>
            <h2 className="font-serif text-3xl md:text-5xl text-rich-black mt-3">Thank You!</h2>
            <p className="font-sans text-sm text-warm-gray/50 mt-4 max-w-md mx-auto">Your message has been received. We&apos;ll get back to you soon.</p>
            <button onClick={() => setSubmitted(false)} className="mt-8 px-8 py-3 min-h-[44px] bg-rich-black text-white font-sans text-[11px] uppercase tracking-[0.25em] hover:bg-charcoal transition-colors duration-500">
              Send Another Message
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 bg-ivory">
      <div className="container-editorial">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="font-mono text-[11px] text-magenta/60 uppercase tracking-[0.3em]">Get In Touch</span>
            <h2 className="font-serif text-3xl md:text-5xl text-rich-black leading-[1.1] mt-3">Begin Your Story</h2>
            <div className="w-5 h-px bg-magenta/25 mt-6" />
            <p className="font-sans text-sm text-warm-gray/50 mt-5 leading-relaxed">Every beautiful photograph begins with a conversation. Send us a message and we&apos;ll be in touch.</p>
          </motion.div>

          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="mt-10 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-warm-gray/40 mb-2">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" placeholder="Your name" required aria-label="Your name" />
              </div>
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-warm-gray/40 mb-2">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="your@email.com" required aria-label="Your email" />
              </div>
            </div>
            <div>
              <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-warm-gray/40 mb-2">Phone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" placeholder="+91 99999 99999" aria-label="Your phone" />
            </div>
            <div>
              <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-warm-gray/40 mb-2">Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="textarea-field" rows={4} placeholder="Tell us about your vision..." aria-label="Your message" />
            </div>
            <button type="submit" disabled={submitting} className="w-full py-4 min-h-[48px] bg-rich-black text-white font-sans text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-500 hover:bg-charcoal disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
