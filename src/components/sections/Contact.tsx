'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { FaInstagram, FaFacebook, FaYoutube, FaPinterest } from 'react-icons/fa6';
import { HiPhone, HiEnvelope, HiMapPin } from 'react-icons/hi2';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert('Thank you! Your message has been sent. I will get back to you within 24 hours.');
        reset();
      }
    } catch {
      alert('Something went wrong. Please try again or email me directly.');
    }
  };

  return (
    <section id="contact" className="section-padding bg-warm-ivory relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_30%_70%,_#C9A96E_0%,_transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <SectionHeading
          subtitle="Let&apos;s Connect"
          title="Get in Touch"
          description="I&apos;d love to hear about your vision. Let&apos;s create something beautiful together."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-warm-blush/50 flex items-center justify-center flex-shrink-0">
                  <HiEnvelope className="w-5 h-5 text-muted-gold" />
                </div>
                <div>
                  <p className="font-serif text-lg text-warm-black">Email</p>
                  <p className="font-sans-alt text-sm text-earth-brown/70 mt-1">hello@indirathakur.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-warm-blush/50 flex items-center justify-center flex-shrink-0">
                  <HiPhone className="w-5 h-5 text-muted-gold" />
                </div>
                <div>
                  <p className="font-serif text-lg text-warm-black">Phone</p>
                  <p className="font-sans-alt text-sm text-earth-brown/70 mt-1">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-warm-blush/50 flex items-center justify-center flex-shrink-0">
                  <HiMapPin className="w-5 h-5 text-muted-gold" />
                </div>
                <div>
                  <p className="font-serif text-lg text-warm-black">Studio Address</p>
                  <p className="font-sans-alt text-sm text-earth-brown/70 mt-1">123 Photography Lane<br />Creative District, CA 90210</p>
                </div>
              </div>
            </div>

            <div className="border-t border-warm-cream/60 pt-6">
              <p className="font-serif text-lg text-warm-black mb-2">Business Hours</p>
              <p className="font-sans-alt text-sm text-earth-brown/70">Monday - Saturday: 9:00 AM - 7:00 PM</p>
              <p className="font-sans-alt text-sm text-earth-brown/70">Sunday: By appointment only</p>
            </div>

            <div className="border-t border-warm-cream/60 pt-6">
              <p className="font-serif text-lg text-warm-black mb-4">Follow the Journey</p>
              <div className="flex gap-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-earth-brown/20 flex items-center justify-center text-earth-brown hover:text-muted-gold hover:border-muted-gold transition-all duration-300">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-earth-brown/20 flex items-center justify-center text-earth-brown hover:text-muted-gold hover:border-muted-gold transition-all duration-300">
                  <FaFacebook className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-earth-brown/20 flex items-center justify-center text-earth-brown hover:text-muted-gold hover:border-muted-gold transition-all duration-300">
                  <FaYoutube className="w-4 h-4" />
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-earth-brown/20 flex items-center justify-center text-earth-brown hover:text-muted-gold hover:border-muted-gold transition-all duration-300">
                  <FaPinterest className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name *"
                  {...register('name', { required: true })}
                  className="premium-input"
                />
                {errors.name && <p className="text-warm-gold text-xs mt-1 font-sans-alt">Name is required</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="email"
                    placeholder="Email Address *"
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    className="premium-input"
                  />
                  {errors.email && <p className="text-warm-gold text-xs mt-1 font-sans-alt">Valid email is required</p>}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    {...register('phone')}
                    className="premium-input"
                  />
                </div>
              </div>
              <div>
                <select {...register('service')} className="premium-input">
                  <option value="">Select a Service</option>
                  <option value="newborn">Newborn Photography</option>
                  <option value="maternity">Maternity Photography</option>
                  <option value="portrait">Portrait Photography</option>
                  <option value="events">Personal Events</option>
                  <option value="corporate">Corporate Events</option>
                  <option value="brand">Brand Collaborations</option>
                </select>
              </div>
              <div>
                <textarea
                  placeholder="Tell me about your vision... *"
                  {...register('message', { required: true })}
                  className="premium-textarea"
                />
                {errors.message && <p className="text-warm-gold text-xs mt-1 font-sans-alt">Message is required</p>}
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
