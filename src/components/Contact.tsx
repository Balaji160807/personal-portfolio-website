import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Linkedin, MapPin, ArrowUpRight, Copy, Check, AlertCircle, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string; // Anti-spam trap
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'warning' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent accidental double submission
    if (status === 'sending') return;

    // Client-side quick validation
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please provide your name (min 2 characters)';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 2) {
      errors.subject = 'Please enter a subject (min 2 characters)';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please provide message details (min 10 characters)';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setStatus('sending');
    setServerMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          website: formData.honeypot, // Honeypot trap
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (data.warning) {
          setStatus('warning');
          setServerMessage(data.warning);
        } else {
          setStatus('success');
          setServerMessage(data.message || 'Your message has been received.');
        }

        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#FF2E93', '#FFFFFF', '#FF9900'],
        });
      } else {
        setStatus('error');
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        setServerMessage(
          data.error ||
            'Something went wrong while sending your message. Please try again or contact me directly by email.'
        );
      }
    } catch (err: any) {
      console.error('[Contact Form] Network or server error:', err);
      setStatus('error');
      setServerMessage(
        'Unable to connect to the email server. Please email balajicloud16@gmail.com directly or try again.'
      );
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      honeypot: '',
    });
    setFieldErrors({});
    setServerMessage('');
  };

  return (
    <section id="contact" className="py-24 md:py-36 px-4 md:px-8 lg:px-12 bg-[#0B0B0D] text-white relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#FF2E93]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-96 h-96 bg-[#FF9900]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Large Typography */}
        <div className="pb-16 border-b border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FF2E93] animate-ping" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#FF2E93] uppercase">
              PRODUCTION CONTACT GATEWAY
            </span>
          </div>

          <div className="overflow-hidden">
            <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter uppercase leading-[0.88] text-white">
              LET'S BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">
                SOMETHING
              </span>
              <span className="text-[#FF2E93]">.</span>
            </h2>
          </div>

          <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl font-normal leading-relaxed">
            Have a project, opportunity, or technical idea? The form connects to an automated transactional email workflow with instant delivery and confirmation.
          </p>
        </div>

        {/* Asymmetric Two-Column Grid: Coordinates (Left) & Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 items-start">
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">
              VERIFIED CHANNELS & DIRECT ACCESS
            </div>

            {/* Email Card with direct mailto */}
            <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-[#FF2E93] transition-all duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[11px] font-mono text-gray-400">DIRECT EMAIL</span>
                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                  className="text-xs font-mono text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="font-mono text-base sm:text-lg font-bold text-white hover:text-[#FF2E93] transition-colors break-all"
                  aria-label="Send direct email to balajicloud16@gmail.com"
                >
                  {PERSONAL_INFO.email}
                </a>
                <Mail className="w-5 h-5 text-[#FF2E93] shrink-0 ml-2" />
              </div>
            </div>

            {/* Phone Card */}
            <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-[#FF2E93] transition-all duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[11px] font-mono text-gray-400">TELEPHONE</span>
                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                  className="text-xs font-mono text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                  title="Copy phone to clipboard"
                >
                  {copiedField === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                  className="font-mono text-base sm:text-lg font-bold text-white hover:text-[#FF2E93] transition-colors"
                  aria-label="Call Balaji at +91 6374766824"
                >
                  {PERSONAL_INFO.phone}
                </a>
                <Phone className="w-5 h-5 text-[#FF2E93] shrink-0 ml-2" />
              </div>
            </div>

            {/* LinkedIn Card */}
            <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-[#FF2E93] transition-all duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[11px] font-mono text-gray-400">PROFESSIONAL NETWORK</span>
                <span className="text-xs font-mono text-gray-400">LINKEDIN</span>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm sm:text-base font-bold text-white hover:text-[#FF2E93] transition-colors break-all flex items-center gap-2"
                  aria-label="Visit Balaji's LinkedIn profile"
                >
                  <span>{PERSONAL_INFO.linkedinHandle}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#FF2E93]" />
                </a>
                <Linkedin className="w-5 h-5 text-[#FF2E93] shrink-0 ml-2" />
              </div>
            </div>

            {/* Location Card */}
            <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-gray-400 block mb-1">ENGINEERING BASE</span>
                <span className="font-display font-bold text-white text-base">
                  {PERSONAL_INFO.location}
                </span>
              </div>
              <MapPin className="w-5 h-5 text-gray-500" />
            </div>

            {/* Workflow Pipeline Explainer */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-xs font-mono text-gray-400 space-y-2">
              <div className="text-[11px] font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF2E93]" />
                <span>REAL EMAIL PIPELINE IN ACTION:</span>
              </div>
              <p className="text-[11px] leading-relaxed text-gray-400">
                Submitting invokes <code className="text-[#FF2E93] bg-white/5 px-1 py-0.5 rounded">POST /api/contact</code>. It dispatches a priority notification to Balaji's inbox and returns an automated confirmation to your address.
              </p>
            </div>
          </div>

          {/* Right Column: Production Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#141418] border border-white/10 shadow-2xl relative">
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    Send Transmission
                  </h3>
                  <p className="text-xs font-mono text-gray-400 mt-1">
                    Connect directly with Balaji R via transactional gateway
                  </p>
                </div>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  REPLY &lt; 24H
                </span>
              </div>

              {/* Success / Warning State Animation */}
              <AnimatePresence mode="wait">
                {status === 'success' || status === 'warning' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="py-10 text-center space-y-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div>
                      <span className="text-xs font-mono font-bold tracking-widest text-[#FF2E93] uppercase block mb-1">
                        MESSAGE RECEIVED ✓
                      </span>
                      <h4 className="font-display font-black text-2xl sm:text-3xl text-white">
                        Thanks for reaching out, {formData.name}!
                      </h4>
                    </div>

                    <p className="text-sm font-sans text-gray-300 max-w-md mx-auto leading-relaxed">
                      {status === 'warning' ? (
                        <span className="text-amber-300">{serverMessage}</span>
                      ) : (
                        <>
                          Your transmission has been delivered to Balaji's inbox. An automated confirmation email was also dispatched to{' '}
                          <strong className="text-white underline decoration-[#FF2E93]">{formData.email}</strong>.
                        </>
                      )}
                    </p>

                    <div className="pt-2 flex justify-center">
                      <button
                        onClick={handleReset}
                        className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono font-bold uppercase tracking-wider text-white transition-colors flex items-center gap-2"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>SEND ANOTHER MESSAGE</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5" key="form">
                    {/* Server Error Alert Banner */}
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-start gap-3"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                        <div className="flex-1">
                          <strong className="block font-bold text-rose-200">Transmission Alert</strong>
                          <span>{serverMessage}</span>
                          <div className="mt-2">
                            <a
                              href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
                                formData.subject || 'Portfolio Inquiry'
                              )}&body=${encodeURIComponent(formData.message || '')}`}
                              className="text-white underline font-bold hover:text-[#FF2E93] inline-flex items-center gap-1"
                            >
                              <span>Click here to open direct email client (Mailto)</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Anti-Spam Honeypot Field (Hidden from human visitors) */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="contact_website">Website</label>
                      <input
                        type="text"
                        id="contact_website"
                        name="honeypot"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.honeypot}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact_name"
                          className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2 font-medium"
                        >
                          Name <span className="text-[#FF2E93]">*</span>
                        </label>
                        <input
                          id="contact_name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          aria-invalid={!!fieldErrors.name}
                          aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                          className={`w-full px-4 py-3 rounded-2xl bg-white/[0.05] border outline-none font-mono text-sm text-white placeholder:text-gray-600 transition-all ${
                            fieldErrors.name
                              ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                              : 'border-white/15 focus:border-[#FF2E93] focus:ring-1 focus:ring-[#FF2E93]'
                          }`}
                        />
                        {fieldErrors.name && (
                          <p id="name-error" className="text-[11px] font-mono text-rose-400 mt-1">
                            {fieldErrors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact_email"
                          className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2 font-medium"
                        >
                          Email <span className="text-[#FF2E93]">*</span>
                        </label>
                        <input
                          id="contact_email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          aria-invalid={!!fieldErrors.email}
                          aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                          className={`w-full px-4 py-3 rounded-2xl bg-white/[0.05] border outline-none font-mono text-sm text-white placeholder:text-gray-600 transition-all ${
                            fieldErrors.email
                              ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                              : 'border-white/15 focus:border-[#FF2E93] focus:ring-1 focus:ring-[#FF2E93]'
                          }`}
                        />
                        {fieldErrors.email && (
                          <p id="email-error" className="text-[11px] font-mono text-rose-400 mt-1">
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label
                        htmlFor="contact_subject"
                        className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2 font-medium"
                      >
                        Subject <span className="text-[#FF2E93]">*</span>
                      </label>
                      <input
                        id="contact_subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What would you like to discuss?"
                        aria-invalid={!!fieldErrors.subject}
                        aria-describedby={fieldErrors.subject ? 'subject-error' : undefined}
                        className={`w-full px-4 py-3 rounded-2xl bg-white/[0.05] border outline-none font-mono text-sm text-white placeholder:text-gray-600 transition-all ${
                          fieldErrors.subject
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-white/15 focus:border-[#FF2E93] focus:ring-1 focus:ring-[#FF2E93]'
                        }`}
                      />
                      {fieldErrors.subject && (
                        <p id="subject-error" className="text-[11px] font-mono text-rose-400 mt-1">
                          {fieldErrors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        htmlFor="contact_message"
                        className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2 font-medium"
                      >
                        Message <span className="text-[#FF2E93]">*</span>
                      </label>
                      <textarea
                        id="contact_message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project, opportunity or idea..."
                        aria-invalid={!!fieldErrors.message}
                        aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                        className={`w-full px-4 py-3 rounded-2xl bg-white/[0.05] border outline-none font-mono text-sm text-white placeholder:text-gray-600 transition-all resize-none ${
                          fieldErrors.message
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-white/15 focus:border-[#FF2E93] focus:ring-1 focus:ring-[#FF2E93]'
                        }`}
                      />
                      {fieldErrors.message && (
                        <p id="message-error" className="text-[11px] font-mono text-rose-400 mt-1">
                          {fieldErrors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button with Loading & Double-Click Protection */}
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className={`w-full py-4 rounded-2xl font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group active:scale-[0.99] ${
                        status === 'sending'
                          ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
                          : 'bg-[#FF2E93] hover:bg-[#E01E7E] text-white hover:shadow-[#FF2E93]/40'
                      }`}
                    >
                      {status === 'sending' ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-white" />
                          <span>SENDING...</span>
                        </>
                      ) : (
                        <>
                          <span>SEND MESSAGE</span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
