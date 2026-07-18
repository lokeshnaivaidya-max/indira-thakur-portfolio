'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

interface FormData { name: string; email: string; phone: string; service: string; message: string }

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    alert('Thank you! Your message has been sent.');
    reset();
  };

  return (
    <section id="contact" className="section-padding bg-warm-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-sans-alt text-sm text-muted-gold tracking-wider uppercase">Let&apos;s Connect</span>
          <h2 className="section-title mt-3">Get in Touch</h2>
          <p className="mt-4 text-warm-brown/70 font-sans-alt">I&apos;d love to hear about your vision. Let&apos;s create something beautiful together.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-6">
            <div>
              <p className="font-sans-alt text-sm text-muted-gold tracking-wider uppercase">Contact Information</p>
              <div className="mt-4 space-y-3 text-warm-brown/70 font-sans-alt">
                <p>Email: info@indirathakur.com</p>
                <p>Phone: +1 (555) 000-0000</p>
              </div>
            </div>
            <div>
              <p className="font-sans-alt text-sm text-muted-gold tracking-wider uppercase">Services</p>
              <div className="mt-4 space-y-2 text-warm-brown/70 font-sans-alt text-sm">
                {['Newborn Photography', 'Maternity Photography', 'Portrait Photography', 'Events', 'Brand Collaborations'].map((s) => (
                  <p key={s}>{s}</p>
                ))}
              </div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div>
              <input type="text" placeholder="Your Name *" {...register('name', { required: true })} className="input-field" />
              {errors.name && <p className="text-muted-gold text-xs mt-1">Required</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <input type="email" placeholder="Email *" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className="input-field" />
                {errors.email && <p className="text-muted-gold text-xs mt-1">Valid email required</p>}
              </div>
              <div>
                <input type="tel" placeholder="Phone" {...register('phone')} className="input-field" />
              </div>
            </div>
            <div>
              <select {...register('service')} className="input-field">
                <option value="">Select a Service</option>
                <option value="newborn">Newborn Photography</option>
                <option value="maternity">Maternity Photography</option>
                <option value="portrait">Portrait Photography</option>
                <option value="events">Personal/Corporate Events</option>
                <option value="brand">Brand Collaborations</option>
              </select>
            </div>
            <div>
              <textarea placeholder="Tell me about your vision..." {...register('message', { required: true })} className="textarea-field" />
              {errors.message && <p className="text-muted-gold text-xs mt-1">Required</p>}
            </div>
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
