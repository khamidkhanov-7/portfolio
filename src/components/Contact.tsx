import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { CONTACT_INBOX, OWNER } from '@/data/content';

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const MAX_MESSAGE = 500;

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [sendFailed, setSendFailed] = useState(false);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email';
    }
    if (!form.message.trim()) {
      e.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      e.message = 'Message should be at least 10 characters';
    }
    return e;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendFailed(false);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_INBOX}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New portfolio message from ${form.name}`,
          _template: 'table',
        }),
      });
      const data = await res.json();
      if (!res.ok || String(data.success) !== 'true') throw new Error(data.message);

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('idle');
      setSendFailed(true);
    }
  };

  const inputBase =
    'w-full rounded-xl border bg-ink-850/60 px-4 py-3 font-body text-base text-ink-100 sm:text-sm placeholder:text-ink-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/30';

  return (
    <section id="contact" className="relative overflow-x-clip py-28 lg:py-36">
      {/* Background */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="font-body text-xs uppercase tracking-[0.3em] text-accent">04 — Contact</span>
          <span className="h-px flex-1 bg-gradient-to-r from-ink-700 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: heading + info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink-100 sm:text-4xl lg:text-5xl">
              Let&apos;s build{' '}
              <span className="text-gradient-accent">something great</span>.
            </h2>
            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-ink-300">
              Have a project in mind, a role to fill, or just want to say hi?
              Send me a message and I&apos;ll get back to you.
            </p>

            <div className="mt-10 space-y-4">
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center gap-4"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-ink-700 bg-ink-850/60 text-accent">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="font-body text-xs text-ink-500">Email</div>
                  <a href={`mailto:${OWNER.email}`} className="font-body text-sm text-ink-200 transition-colors hover:text-accent">{OWNER.email}</a>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center gap-4"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-ink-700 bg-ink-850/60 text-accent">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="font-body text-xs text-ink-500">Location</div>
                  <div className="font-body text-sm text-ink-200">{OWNER.location}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="gradient-border rounded-2xl p-6 lg:p-8"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="mb-2 block font-body text-sm font-medium text-ink-200">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Your name"
                  className={`${inputBase} ${errors.name ? 'border-rose-500/60' : 'border-ink-700'} focus:border-accent/40`}
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-1.5 flex items-center gap-1 font-body text-xs text-rose-400"
                    >
                      <AlertCircle size={12} />
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-2 block font-body text-sm font-medium text-ink-200">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="you@example.com"
                  className={`${inputBase} ${errors.email ? 'border-rose-500/60' : 'border-ink-700'} focus:border-accent/40`}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-1.5 flex items-center gap-1 font-body text-xs text-rose-400"
                    >
                      <AlertCircle size={12} />
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Message with char counter */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="message" className="font-body text-sm font-medium text-ink-200">
                    Message
                  </label>
                  <span
                    className={`font-body text-xs ${
                      form.message.length > MAX_MESSAGE * 0.9 ? 'text-accent' : 'text-ink-500'
                    }`}
                  >
                    {form.message.length}/{MAX_MESSAGE}
                  </span>
                </div>
                <textarea
                  id="message"
                  rows={5}
                  maxLength={MAX_MESSAGE}
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Tell me about your project..."
                  className={`${inputBase} resize-none ${errors.message ? 'border-rose-500/60' : 'border-ink-700'} focus:border-accent/40`}
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-1.5 flex items-center gap-1 font-body text-xs text-rose-400"
                    >
                      <AlertCircle size={12} />
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                data-cursor="pointer"
                whileTap={{ scale: 0.98 }}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent px-6 py-3.5 font-body text-sm font-semibold text-ink-950 transition-all hover:shadow-[0_0_30px_-5px_rgba(232,197,71,0.5)] disabled:opacity-70"
              >
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 size={18} />
                      Message sent!
                    </motion.span>
                  ) : status === 'submitting' ? (
                    <motion.span
                      key="submitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-5 w-5 animate-spin rounded-full border-2 border-ink-950/30 border-t-ink-950"
                    />
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <span>Send message</span>
                      <Send size={16} className="transition-transform group-hover:translate-x-1" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center font-body text-xs text-emerald-400"
                  >
                    Thanks! I&apos;ll get back to you soon.
                  </motion.p>
                )}
                {sendFailed && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-1 text-center font-body text-xs text-rose-400"
                  >
                    <AlertCircle size={12} />
                    Couldn&apos;t send your message. Please try again or email me directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
