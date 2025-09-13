'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnView } from '@/components/RevealOnView';
import NavigationSearchBar from '@/components/NavigationSearchBar';
import { Users, Target, Shield, TrendingUp, X } from 'lucide-react';

const AboutPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900">

      {/* Navigation Search Bar */}
      <div className="fixed top-4 right-4 z-50">
        <NavigationSearchBar />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <RevealOnView>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="inline-block mb-6 px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-primary-400 backdrop-blur-sm border border-white/20">
                The Auxilium.io Mandate
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-light mb-8 text-white font-display">
                MORE THAN <span className="text-accent-300">A NAME</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                We were founded on a singular principle: that true digital aid transcends technology to enable{" "}
                <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent font-semibold">
                  transformative, systemic change
                </span>
                . Our mission is to strengthen mission-driven organizations and communities, empowering them to address the world's most important challenges with breakthrough results.
              </p>
            </motion.div>
          </RevealOnView>
        </div>
      </section>

      {/* Our Purpose */}
      <section className="py-20 px-6 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <RevealOnView>
            <div className="space-y-12">
              <div>
                <h2 className="text-5xl md:text-6xl font-light mb-8 text-white font-display">
                  Our <span className="text-accent-300">Purpose</span>
                </h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  The name "Auxilium," derived from the Latin word for "help," reflects our core belief that technology should serve a higher purpose. We don't simply build digital solutions—we forge strategic partnerships that turn complex organizational challenges into opportunities for exponential impact.
                </p>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  When development programs need to reach underserved communities, when nonprofits require resilient systems to scale their mission, when institutions face digital transformation that could redefine their impact, they turn to Auxilium.io.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-white mb-6">Our Commitment to Systemic Change</h3>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  We believe that lasting change requires more than isolated projects or quick fixes. Every solution we develop is designed to create ripple effects that strengthen entire ecosystems.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Whether we're building platforms that advance quality education, developing systems that reduce inequalities, or creating data infrastructures that accelerate social progress, our work is anchored to the global frameworks that matter most. We speak both the language of technology and the language of impact, ensuring that every line of code contributes to a larger mission of societal transformation.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <blockquote className="text-xl text-white font-light italic">
                  "At Auxilium.io, we understand that your 'it'—whether it's a platform, a process, or a vision—represents something far greater than a technical challenge. It's your pathway to creating lasting change in the world. That's why we don't just make 'it' simple—we make 'it' transformational."
                </blockquote>
                <cite className="text-accent-400 text-sm mt-4 block">— The Auxilium.io Philosophy</cite>
              </div>
            </div>
          </RevealOnView>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 px-6 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto">
          <RevealOnView>
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 text-white font-display">
                OUR CORE <span className="text-accent-300">PRINCIPLES</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Four foundational commitments that guide every partnership and solution we create.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Strategic Partnership",
                  description: "We don't deliver products; we integrate with your team as trusted advisors, providing the strategic guidance needed to turn technological challenges into catalysts for organizational growth and mission acceleration.",
                  icon: <Users className="w-8 h-8 text-accent-400" />
                },
                {
                  title: "Purpose-Driven Technology",
                  description: "Our technical expertise is explicitly applied within social and mission-driven contexts. Every solution is architected to align with and amplify your core purpose, transforming technology from a tool into a force multiplier for impact.",
                  icon: <Target className="w-8 h-8 text-primary-400" />
                },
                {
                  title: "Adaptive & Resilient Systems",
                  description: "We build solutions designed to last and evolve. Our approach to security, scalability, and long-term resilience ensures your organization can navigate disruption while maintaining operational excellence and mission focus.",
                  icon: <Shield className="w-8 h-8 text-green-400" />
                },
                {
                  title: "Data-Powered Impact",
                  description: "We leverage analytics and insights not just for operational efficiency, but for mission growth. Our data strategies are guided by metrics that truly matter—increased engagement, enhanced program effectiveness, expanded reach, and sustainable impact.",
                  icon: <TrendingUp className="w-8 h-8 text-purple-400" />
                }
              ].map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-300">
                    <div className="mb-6">{principle.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-4">{principle.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{principle.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </RevealOnView>
        </div>
      </section>

      {/* Call to Partnership */}
      <section className="py-20 px-6 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <RevealOnView>
            <div className="text-center bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-16">
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-white font-display">
                Ready to build solutions that drive <span className="text-accent-300">systemic change</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                Let's explore how strategic digital partnership can empower your team, accelerate your mission, and unlock your organization's full potential for impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  onClick={() => window.location.href = '/'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-300 cursor-pointer"
                >
                  Schedule Strategic Consultation
                </motion.button>
                <motion.button
                  onClick={() => setShowModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
                >
                  Download Impact Framework
                </motion.button>
              </div>
            </div>
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

            {/* Client Portal Image */}
            <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20">
              <img
                src="/IMG_3303.jpg"
                alt="Impact Framework Access"
                className="w-full h-auto max-w-full object-contain"
                onError={(e) => {
                  console.error('Failed to load impact framework image:', e);
                  e.currentTarget.src = '/logo.png'; // Fallback to logo
                }}
                onLoad={() => console.log('Impact framework image loaded successfully')}
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

export default AboutPage;