'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnView } from '@/components/RevealOnView';
import NavigationSearchBar from '@/components/NavigationSearchBar';
import { Target, Wrench, TrendingUp, X } from 'lucide-react';

const PortfolioPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const caseStudies = [
    {
      title: "Digital Banking Transformation",
      client: "Community Development Financial Institution",
      category: "Financial Inclusion",
      challenge: "A community-focused bank serving underbanked populations needed to modernize their digital infrastructure to compete with larger institutions while maintaining their mission-driven approach. Legacy systems were creating barriers to financial inclusion.",
      solution: "We collaborated with their leadership team to co-create a comprehensive digital platform featuring multilingual accessibility, simplified onboarding, and community-focused financial tools. The solution included AI-powered financial literacy resources and integrated community impact tracking.",
      impact: {
        quantitative: [
          "47% increase in new account openings within 6 months",
          "82% reduction in average onboarding time",
          "35% improvement in customer satisfaction scores",
          "$2.3M in additional community lending capacity"
        ],
        qualitative: "The bank's CEO noted: 'Auxilium.io didn't just build us a platform—they helped us digitally transform while staying true to our community mission. We're now reaching families we never could before.'"
      },
      tags: ["Digital Transformation", "Financial Inclusion", "Community Impact", "Accessibility"],
      imageSrc: "/generated/digital-banking.jpg",
      gradientFrom: "#3b82f6",
      gradientTo: "#22c55e"
    },
    {
      title: "Educational Platform for Social Justice",
      client: "National Civil Rights Organization",
      category: "Education & Advocacy",
      challenge: "A 50-year-old civil rights organization needed to engage younger audiences and scale their educational programs digitally. Their existing resources were fragmented across multiple platforms, limiting their reach and impact measurement.",
      solution: "We developed a unified learning management system with interactive curricula, virtual reality historical experiences, and real-time activism tools. The platform includes advanced analytics for measuring engagement and learning outcomes across diverse communities.",
      impact: {
        quantitative: [
          "300% increase in youth program enrollment",
          "15x improvement in content engagement rates",
          "89% completion rate for online courses",
          "Reached 50,000+ students across 12 states"
        ],
        qualitative: "Their Education Director shared: 'This platform transformed how we teach civil rights history. Young people are not just learning—they're taking action. It's revolutionized our educational mission.'"
      },
      tags: ["Education Technology", "Social Justice", "Youth Engagement", "Analytics"],
      imageSrc: "/generated/about-mission.jpg",
      gradientFrom: "#22c55e",
      gradientTo: "#a855f7"
    },
    {
      title: "Healthcare Access Analytics",
      client: "Rural Health Consortium",
      category: "Healthcare Equity",
      challenge: "A consortium of rural healthcare providers struggled to identify service gaps and allocate resources effectively across underserved communities. Data silos prevented comprehensive understanding of population health needs.",
      solution: "We created an integrated data platform combining electronic health records, social determinants data, and community health metrics. The system includes predictive modeling for resource allocation and real-time monitoring of health equity indicators.",
      impact: {
        quantitative: [
          "23% improvement in care coordination efficiency",
          "67% reduction in duplicate services across sites",
          "41% increase in preventive care utilization",
          "$890K in annual operational savings"
        ],
        qualitative: "The Consortium's Medical Director explained: 'We finally have the data visibility we need to serve our communities equitably. This platform has become central to our strategic decision-making process.'"
      },
      tags: ["Healthcare Analytics", "Rural Health", "Data Integration", "Population Health"],
      imageSrc: "/generated/healthcare-analytics.jpg",
      gradientFrom: "#a855f7",
      gradientTo: "#3b82f6"
    },
    {
      title: "Environmental Justice Platform",
      client: "Indigenous Environmental Coalition",
      category: "Environmental Justice",
      challenge: "A coalition of indigenous communities needed to document environmental impacts, coordinate advocacy efforts, and share traditional ecological knowledge while maintaining cultural sensitivity and data sovereignty.",
      solution: "We co-designed a culturally appropriate platform featuring secure community data management, storytelling tools, and environmental monitoring dashboards. The solution respects indigenous data sovereignty while enabling powerful advocacy campaigns.",
      impact: {
        quantitative: [
          "12 successful policy interventions within first year",
          "78% increase in community participation",
          "95% of traditional knowledge safely digitized",
          "Protected 45,000 acres through data-driven advocacy"
        ],
        qualitative: "A tribal leader reflected: 'Auxilium.io understood that technology must serve our values, not the other way around. They helped us protect both our land and our stories for future generations.'"
      },
      tags: ["Environmental Justice", "Indigenous Rights", "Data Sovereignty", "Cultural Preservation"],
      imageSrc: "/generated/environmental-platform.jpg",
      gradientFrom: "#10b981",
      gradientTo: "#3b82f6"
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
                Impact Stories
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-light mb-8 text-white font-display">
                PORTFOLIO OF <span className="text-accent-300">PROGRESS</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Compelling narratives of impact where{" "}
                <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent font-semibold">
                  mission meets execution
                </span>
                . Each case study represents a shared journey of transformation, measurable results, and systemic change.
              </p>
            </motion.div>
          </RevealOnView>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto space-y-32">
          {caseStudies.map((study, index) => (
            <RevealOnView key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${study.gradientFrom.replace('#', 'from-[#')}] ${study.gradientTo.replace('#', 'to-[#')}] opacity-20 rounded-3xl blur-3xl`}></div>
                  <div className="relative overflow-hidden rounded-3xl">
                    <img
                      src={study.imageSrc}
                      alt={study.title}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {study.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div>
                    <span className="text-accent-400 font-semibold text-sm uppercase tracking-wider">{study.category}</span>
                    <h3 className="text-4xl md:text-5xl font-light text-white mt-2 mb-4">{study.title}</h3>
                    <p className="text-gray-400 text-lg">{study.client}</p>
                  </div>

                  {/* Challenge */}
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                      <Target className="w-5 h-5 text-red-400 mr-3" />
                      The Challenge
                    </h4>
                    <p className="text-gray-300 leading-relaxed">{study.challenge}</p>
                  </div>

                  {/* Solution */}
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                      <Wrench className="w-5 h-5 text-blue-400 mr-3" />
                      The Auxilium.io Solution
                    </h4>
                    <p className="text-gray-300 leading-relaxed">{study.solution}</p>
                  </div>

                  {/* Impact */}
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 text-green-400 mr-3" />
                      The Impact
                    </h4>

                    <div className="space-y-4">
                      <div>
                        <h5 className="text-white font-medium mb-3">Quantifiable Results:</h5>
                        <ul className="space-y-2">
                          {study.impact.quantitative.map((metric, metricIndex) => (
                            <li key={metricIndex} className="flex items-start text-gray-300">
                              <span className="text-green-400 mr-3 mt-1">•</span>
                              <span className="font-semibold">{metric}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <h5 className="text-white font-medium mb-3">Client Testimonial:</h5>
                        <blockquote className="text-gray-300 italic leading-relaxed">
                          "{study.impact.qualitative}"
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </RevealOnView>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <RevealOnView>
            <div className="text-center bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-16">
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-white font-display">
                Ready to write your <span className="text-accent-300">impact story</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                Every great mission deserves a powerful digital foundation. Let's create measurable impact together.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  onClick={() => window.location.href = '/'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-300 cursor-pointer"
                >
                  Start Your Project
                </motion.button>
                <motion.button
                  onClick={() => setShowModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 cursor-pointer"
                >
                  Download Case Study PDF
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

            {/* Case Study Access Image */}
            <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20">
              <img
                src="/IMG_3303.jpg"
                alt="Case Study Access"
                className="w-full h-auto max-w-full object-contain"
                onError={(e) => {
                  console.error('Failed to load case study access image:', e);
                  e.currentTarget.src = '/logo.png'; // Fallback to logo
                }}
                onLoad={() => console.log('Case study access image loaded successfully')}
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

export default PortfolioPage;