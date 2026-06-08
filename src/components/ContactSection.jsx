import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheckCircle, FiLoader, FiAlertCircle } from 'react-icons/fi';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!accessKey || accessKey === 'your_access_key_here') {
      setSubmitError('Web3Forms Access Key is missing. Please follow the configuration instructions below.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'New Contact Form Message',
          message: formData.message,
          from_name: 'Portfolio Contact Form',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setSubmitError('Failed to send message. Please check your network connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-32 px-6 md:px-12 bg-[#F9F9FB] dark:bg-[#030014] transition-colors duration-300 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Contact Info */}
        <div className="flex flex-col justify-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] text-accent font-semibold uppercase mb-3 block"
          >
            Contact
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
          >
            Let's Build Something Great
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 mt-6 text-base md:text-lg font-light leading-relaxed max-w-lg"
          >
            Have a project in mind or want to know more about our design systems? Reach out, and let's craft something premium together.
          </motion.p>

          {/* Info Items */}
          <div className="mt-12 flex flex-col gap-6">
            {[
              { icon: FiMail, label: 'Email', value: 'mayankrafiganj19@gmail.com' },
              { icon: FiMapPin, label: 'Location', value: 'Warje, Pune 411058' }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.label}</h4>
                    <p className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200 mt-0.5">{item.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-[#F1F0F5] dark:bg-[#09061F] rounded-2xl p-8 border border-gray-100 dark:border-white/5 relative min-h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full flex flex-col gap-6"
                noValidate
              >
                {/* Configuration notice for missing key */}
                {(!accessKey || accessKey === 'your_access_key_here') && (
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl text-xs flex items-start gap-2.5 leading-relaxed">
                    <FiAlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-amber-500 animate-pulse" />
                    <div>
                      <span className="font-semibold block mb-0.5 text-amber-700 dark:text-amber-300">Email Configuration Needed</span>
                      To start receiving messages, please register for a free Access key at <a href="https://web3forms.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-700 dark:hover:text-amber-300 font-semibold">web3forms.com</a> and add it to your <code>.env</code> file:
                      <code className="block mt-1.5 p-1 bg-amber-500/5 rounded font-mono border border-amber-500/10 text-[10px] break-all">VITE_WEB3FORMS_ACCESS_KEY=your_key_here</code>
                    </div>
                  </div>
                )}

                {/* Submit Error */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-xs flex items-start gap-2.5 leading-relaxed"
                  >
                    <FiAlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
                    <div>
                      <span className="font-semibold block mb-0.5 text-red-700 dark:text-red-300">Submission Failed</span>
                      {submitError}
                    </div>
                  </motion.div>
                )}

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="John Doe"
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-xs text-red-500 mt-1"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="john@example.com"
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-xs text-red-500 mt-1"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    disabled={isSubmitting}
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Project Inquiry"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Describe your project details..."
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-xs text-red-500 mt-1"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full bg-accent hover:bg-accent-dark text-white rounded-xl py-4 flex items-center justify-center gap-2 font-semibold transition-colors duration-200 cursor-pointer min-h-[44px] focus-visible:outline-2 focus-visible:outline-accent ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      Sending Message <FiLoader className="w-4.5 h-4.5 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message <FiSend className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div 
                key="success-message"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="text-center flex flex-col items-center p-8"
              >
                <FiCheckCircle className="w-16 h-16 text-accent mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                  We'll get back to you within 24 hours. Thank you for reaching out!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
