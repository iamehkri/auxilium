'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnView } from '@/components/RevealOnView';
import NavigationSearchBar from '@/components/NavigationSearchBar';
import { RefreshCw, Code, BarChart3, Shield, X } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const services = [
    {
      title: "Digital & Organizational Transformation",
      description: "Building resilient, adaptive organizations that develop muscle memory for change. We partner with mission-driven institutions to create systemic transformation that strengthens capacity and accelerates impact.",
      features: [
        "Strategic change management consultation",
        "Digital transformation roadmapping",
        "Organizational resilience assessment",
        "Technology adoption and training",
        "Process optimization and automation"
      ],
      icon: <RefreshCw className="w-12 h-12 text-blue-400" />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Web & Platform Engineering",
      description: "Secure, scalable, and custom-coded platforms that are accessibility-compliant with ADA/WCAG standards. Built for high-stakes environments requiring robust, future-ready digital infrastructure.",
      features: [
        "Custom web application development",
        "ADA/WCAG accessibility compliance",
        "Security-first architecture",
        "Scalable cloud infrastructure",
        "API development and integration"
      ],
      icon: <Code className="w-12 h-12 text-green-400" />,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Data & Insights for Mission Growth",
      description: "Make your data work for you to drive smarter strategies and better insights that fuel bigger, bolder impact. Strategic use of analytics for fundraising, engagement, and mission acceleration.",
      features: [
        "Data strategy and governance",
        "Advanced analytics and reporting",
        "Donor and engagement insights",
        "Performance dashboard creation",
        "Predictive modeling for growth"
      ],
      icon: <BarChart3 className="w-12 h-12 text-purple-400" />,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Adaptive & Resilient Systems",
      description: "Solutions that are adaptive to change, secure by design, and aligned with global development standards. Proactive systems that help navigate disruption while maintaining mission focus.",
      features: [
        "Future-proofing strategy development",
        "Security and compliance auditing",
        "Disaster recovery planning",
        "System monitoring and maintenance",
        "Global standards alignment"
      ],
      icon: <Shield className="w-12 h-12 text-orange-400" />,
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900">

      {/* Navigation Search Bar */}
      <div className="fixed top-4 right-4 z-50">
        <NavigationSearchBar />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <RevealOnView>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="inline-block mb-6 px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-primary-400 backdrop-blur-sm border border-white/20">
                Strategic Solutions
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-light mb-8 text-white font-display">
                CATALYSTS FOR <span className="text-accent-300">IMPACT</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                A portfolio of strategic solutions designed to enable{" "}
                <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent font-semibold">
                  transformative change
                </span>
                . We focus on strategic outcomes, not just technical tasks, attracting organizations with complex challenges who require a consultative approach.
              </p>
            </motion.div>
          </RevealOnView>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto">
          <RevealOnView>
            <div className="grid lg:grid-cols-2 gap-12">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500`}></div>
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 h-full hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-start gap-6 mb-8">
                      <div className="flex items-center justify-start">{service.icon}</div>
                      <div>
                        <h3 className="text-3xl font-semibold text-white mb-4">{service.title}</h3>
                        <p className="text-lg text-gray-300 leading-relaxed">{service.description}</p>
                      </div>
                    </div>

                    <div className="space-y-3" style={{ marginLeft: 'calc(3rem + 1.5rem)' }}>
                      <h4 className="text-lg font-medium text-white/90">Key Capabilities</h4>
                      <ul className="space-y-1.5">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-gray-300 text-sm leading-relaxed">
                            <div className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-3 flex-shrink-0"></div>
                            <span className="flex-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10">
                      <motion.button
                        onClick={() => setShowModal(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full py-3 px-6 bg-gradient-to-r ${service.gradient} text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300`}
                      >
                        Explore This Service
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </RevealOnView>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <RevealOnView>
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-light mb-8 text-white font-display">
                OUR STRATEGIC <span className="text-accent-300">APPROACH</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A collaborative methodology that ensures every solution aligns with your mission and accelerates your impact.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Understand & Align",
                  description: "Deep discovery of your mission, challenges, and strategic objectives to ensure perfect alignment."
                },
                {
                  step: "02",
                  title: "Co-create Solutions",
                  description: "Collaborative design process that leverages your expertise and our technical capabilities."
                },
                {
                  step: "03",
                  title: "Implement & Scale",
                  description: "Strategic deployment with built-in resilience, security, and scalability for long-term success."
                }
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {phase.step}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-white">{phase.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{phase.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </RevealOnView>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <RevealOnView>
            <div className="text-center bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-16">
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-white font-display">
                Ready to become a <span className="text-accent-300">catalyst for change</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                Let's discuss how our strategic solutions can accelerate your mission and drive transformative results.
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
                  onClick={() => window.location.href = '/portfolio'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 cursor-pointer"
                >
                  View Case Studies
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

            {/* Service Access Image */}
            <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20">
              <img
                src="/IMG_3303.jpg"
                alt="Service Access"
                className="w-full h-auto max-w-full object-contain"
                onError={(e) => {
                  console.error('Failed to load service access image:', e);
                  e.currentTarget.src = '/logo.png'; // Fallback to logo
                }}
                onLoad={() => console.log('Service access image loaded successfully')}
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

export default ServicesPage;