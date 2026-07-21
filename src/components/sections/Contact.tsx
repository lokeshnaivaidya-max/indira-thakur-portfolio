'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { PolaroidImage } from '@/components/ui/PolaroidImage';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';

export default function Contact() {
  const { config } = useSiteConfig();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) { setError('Name is required.'); return; }
    if (!email.trim()) { setError('Email is required.'); return; }
    if (!validateEmail(email)) { setError('Please enter a valid email address.'); return; }

    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, service, message }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Submission failed. Please try again.');
      }
      setSubmitted(true);
      setName(''); setEmail(''); setPhone(''); setService(''); setMessage('');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactData = config?.contact || {
    eyebrow: "Let's Create",
    heading: 'Begin Your Story',
    description: 'Every beautiful photograph begins with a conversation.',
    email: 'hello@indirathakur.com',
    phone: '+91 99999 99999',
    location: 'Bangalore, India',
    bannerImage: { url: '', alt: '' },
    socialLinks: [],
    studioImage: { url: '', alt: '' },
  };

  const hasImage = (url: string) => url && url.trim() !== '';

  return (
    <section id="contact" className="py-28 md:py-36 bg-ivory">
      <div className="container-editorial">
        {hasImage(contactData.bannerImage?.url) && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-16"
          >
            <PolaroidImage
              src={contactData.bannerImage.url}
              alt={contactData.bannerImage.alt || 'Contact Banner'}
              fill
              sizes="100vw"
              className="!w-full !h-full"
              containerClassName="!w-full !h-full"
              style={{ height: '30vh' }}
            />
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-[11px] text-magenta/60 uppercase tracking-[0.35em]">{contactData.eyebrow}</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-rich-black leading-[1.1] mt-3">{contactData.heading}</h2>
            <div className="w-5 h-px bg-magenta/25 mt-6" />
            <p className="font-sans text-sm text-warm-gray/50 mt-5 max-w-xs leading-relaxed">{contactData.description}</p>

            <div className="mt-10 space-y-4">
              {[contactData.email, contactData.phone, contactData.location].filter(Boolean).map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-px h-3.5 bg-magenta/15" />
                  <p className="font-sans text-xs text-warm-gray/50">{item}</p>
                </div>
              ))}
            </div>

            {contactData.socialLinks && contactData.socialLinks.length > 0 && (
              <div className="mt-6 pt-6 border-t border-beige/30">
                <p className="font-mono text-[11px] text-warm-gray/30 uppercase tracking-[0.2em] mb-3">Follow Along</p>
                <div className="flex gap-4">
                  {contactData.socialLinks.map((link: { platform: string; url: string }, i: number) => (
                    link.url && (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="font-sans text-xs text-magenta/60 hover:text-magenta transition-colors py-1.5 min-h-[44px] inline-flex items-center">
                        {link.platform || 'Social'}
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {hasImage(contactData.studioImage?.url) ? (
              <div className="mb-8">
                <PolaroidImage
                  src={contactData.studioImage.url}
                  alt={contactData.studioImage.alt || 'Studio'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="!w-full !h-full"
                  containerClassName="!w-full !h-full"
                  style={{ height: '30vh' }}
                />
              </div>
            ) : (
              <ImagePlaceholder aspect="h-[30vh] md:h-[35vh]" label="Studio Image" icon="camera" className="mb-8" />
            )}

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center h-48 gap-3 text-center"
                >
                  <p className="font-serif text-2xl text-rich-black">Thank you!</p>
                  <p className="font-sans text-sm text-warm-gray/50 max-w-sm">
                    Your form submission has been sent successfully. We&apos;ll be in touch soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 min-h-[44px] bg-rich-black text-white font-sans text-[11px] uppercase tracking-[0.25em] rounded hover:bg-charcoal transition-colors duration-300"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={submitting}
                        className="input-field disabled:opacity-60"
                        required
                        aria-label="Your name"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={submitting}
                        className="input-field disabled:opacity-60"
                        required
                        aria-label="Your email"
                      />
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={submitting}
                      className="input-field disabled:opacity-60"
                      aria-label="Your phone"
                    />
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      disabled={submitting}
                      className="input-field appearance-none bg-white disabled:opacity-60"
                      aria-label="Select a service"
                    >
                      <option value="">Interested in...</option>
                      <option value="newborn">Newborn</option>
                      <option value="maternity">Maternity</option>
                      <option value="portrait">Portrait</option>
                      <option value="events">Events & Brand</option>
                    </select>
                    <textarea
                      placeholder="Your vision..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={submitting}
                      className="textarea-field disabled:opacity-60"
                      rows={3}
                      aria-label="Your message"
                    />
                    {error && (
                      <p className="font-sans text-xs text-red-500" role="alert" aria-live="assertive">
                        {error}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 min-h-[44px] bg-rich-black text-white font-sans text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-500 hover:bg-charcoal disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        'Send'
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
