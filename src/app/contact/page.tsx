'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnView } from '@/components/RevealOnView';
import NavigationSearchBar from '@/components/NavigationSearchBar';
import { User, Mail, Phone, Building, ArrowRight, X } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900">

      {/* Navigation Search Bar */}
      <div className="fixed top-4 right-4 z-50">
        <NavigationSearchBar />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <RevealOnView>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="inline-block mb-6 px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-primary-400 backdrop-blur-sm border border-white/20">
                Get In Touch
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-light mb-8 text-white font-display">
                LET'S <span className="text-accent-300">CONNECT</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Ready to transform your business with{" "}
                <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent font-semibold">
                  strategic digital partnership
                </span>
                ? Let's discuss your personalized strategy and explore how we can accelerate your mission.
              </p>
            </motion.div>
          </RevealOnView>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-6 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <RevealOnView>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12"
            >
              <div className="text-center mb-8">
                <User className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h2 className="text-3xl font-light text-white mb-4">Book Your Strategy Session</h2>
                <p className="text-white/70">Let's discuss your personalized strategy and unlock your organization's full potential for impact.</p>
              </div>

              {/* Lead Form */}
              <div className="bg-white/5 rounded-xl p-8 border border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        className="w-full bg-white/10 border border-white/20 rounded-lg pl-11 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
                      <input
                        type="email"
                        className="w-full bg-white/10 border border-white/20 rounded-lg pl-11 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">Phone</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
                      <input
                        type="tel"
                        className="w-full bg-white/10 border border-white/20 rounded-lg pl-11 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">Company</label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        className="w-full bg-white/10 border border-white/20 rounded-lg pl-11 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        placeholder="Company name"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-white/70 text-sm mb-2">Message (Optional)</label>
                  <textarea
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                    rows={4}
                    placeholder="Tell us about your project, challenges, or goals..."
                  />
                </div>

                <motion.button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-4 rounded-xl font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-300 mt-6 inline-flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Strategy Session
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="text-center mt-8 text-white/60 text-sm">
                <p>We typically respond within 24 hours. Your information is kept confidential.</p>
              </div>
            </motion.div>
          </RevealOnView>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
      {showModal && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-50"
            style={{ zIndex: 9998 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ zIndex: 9999 }}>
          <motion.div
            className="relative max-w-sm w-full mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{ marginTop: '2rem', marginBottom: '2rem' }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-3 -right-3 bg-red-500/80 hover:bg-red-600 rounded-full p-3 backdrop-blur-md border border-white/20 transition-all duration-200 z-20 shadow-lg"
              style={{ zIndex: 10000 }}
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Contact Confirmation Image */}
            <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20">
              <img
                src="/IMG_3303.jpg"
                alt="Contact Confirmation"
                className="w-full h-auto max-w-full object-contain"
                onError={(e) => {
                  console.error('Failed to load contact confirmation image:', e);
                  e.currentTarget.src = '/logo.png'; // Fallback to logo
                }}
                onLoad={() => console.log('Contact confirmation image loaded successfully')}
              />
            </div>
          </motion.div>
          </div>
        </>
      )}
      </AnimatePresence>
    </main>
  );
};

export default ContactPage;