'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnView } from '@/components/RevealOnView';
import NavigationSearchBar from '@/components/NavigationSearchBar';
import { FileText, X } from 'lucide-react';

const InsightsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const featuredArticles = [
    {
      title: "Future-Proofing Nonprofits: A Strategic Technology Assessment Framework",
      excerpt: "Legacy systems are holding back mission-driven organizations. Learn our proven methodology for evaluating, modernizing, and future-proofing your technology infrastructure.",
      category: "Digital Transformation",
      readTime: "8 min read",
      date: "March 2024",
      author: "Auxilium.io Strategy Team",
      imageSrc: "/generated/digital-transformation.jpg",
      featured: true,
      tags: ["Technology Assessment", "Legacy Modernization", "Strategic Planning"]
    },
    {
      title: "Bridging the Digital Divide: Designing for Accessibility and Inclusion",
      excerpt: "True digital equity requires intentional design. Explore practical strategies for creating inclusive digital experiences that serve all communities effectively.",
      category: "Digital Equity",
      readTime: "12 min read",
      date: "February 2024",
      author: "UX Research Team",
      imageSrc: "/generated/web-platform-engineering.jpg",
      featured: false,
      tags: ["Accessibility", "Inclusive Design", "Digital Equity"]
    },
    {
      title: "Scaling Social Impact with Intelligent Analytics",
      excerpt: "Data-driven decision making is transforming how nonprofits measure and amplify their impact. Learn how AI and analytics can accelerate your mission.",
      category: "Impact Measurement",
      readTime: "10 min read",
      date: "January 2024",
      author: "Data Science Team",
      imageSrc: "/generated/data-insights.jpg",
      featured: false,
      tags: ["AI", "Analytics", "Impact Measurement"]
    }
  ];

  const resources = [
    {
      title: "Nonprofit CRM Selection Guide",
      description: "A comprehensive framework for evaluating and selecting the right CRM system for your mission-driven organization.",
      type: "Download Guide",
      category: "Technology Strategy"
    },
    {
      title: "Digital Accessibility Checklist",
      description: "Essential ADA/WCAG compliance requirements every nonprofit website needs to meet.",
      type: "Checklist",
      category: "Accessibility"
    },
    {
      title: "Impact Measurement Framework",
      description: "Tools and methodologies for measuring and communicating your organization's social impact effectively.",
      type: "Framework",
      category: "Impact Measurement"
    }
  ];

  const categories = [
    "All Insights",
    "Digital Transformation",
    "Impact Measurement",
    "Technology Strategy",
    "Accessibility",
    "Organizational Resilience"
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
                Thought Leadership
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-light mb-8 text-white font-display">
                KNOWLEDGE FOR <span className="text-accent-300">RESILIENCE</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Strategic insights, frameworks, and resources that{" "}
                <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent font-semibold">
                  empower mission-driven organizations
                </span>
                {" "}to navigate complexity, drive innovation, and amplify their impact.
              </p>
            </motion.div>
          </RevealOnView>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <RevealOnView>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    index === 0
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                      : 'bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </RevealOnView>
        </div>
      </section>

      {/* Featured Article */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto">
          <RevealOnView>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              onClick={() => setShowModal(true)}
              className="relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative grid lg:grid-cols-2 gap-12 items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 hover:bg-white/10 transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-accent-500/20 text-accent-400 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <span className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm">
                      {featuredArticles[0].category}
                    </span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-light text-white leading-tight">
                    {featuredArticles[0].title}
                  </h2>

                  <p className="text-lg text-gray-300 leading-relaxed">
                    {featuredArticles[0].excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredArticles[0].tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="text-sm text-gray-400">
                      <span>{featuredArticles[0].author}</span>
                      <span className="mx-2">•</span>
                      <span>{featuredArticles[0].date}</span>
                      <span className="mx-2">•</span>
                      <span>{featuredArticles[0].readTime}</span>
                    </div>
                    <motion.button
                      onClick={() => setShowModal(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      Read Article
                    </motion.button>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={featuredArticles[0].imageSrc}
                    alt={featuredArticles[0].title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </motion.div>
          </RevealOnView>
        </div>
      </section>

      {/* Recent Articles Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto">
          <RevealOnView>
            <div className="mb-12">
              <h3 className="text-4xl md:text-5xl font-light text-white mb-4">Recent Insights</h3>
              <p className="text-xl text-gray-300">Stay ahead with our latest strategic thinking and industry analysis.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.slice(1).map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  onClick={() => setShowModal(true)}
                  className="group cursor-pointer"
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <img
                        src={article.imageSrc}
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 text-gray-800 rounded-full text-sm font-medium">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <h4 className="text-xl font-semibold text-white leading-tight group-hover:text-accent-300 transition-colors">
                        {article.title}
                      </h4>

                      <p className="text-gray-300 leading-relaxed">
                        {article.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-white/10 text-gray-400 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <div className="text-sm text-gray-400">
                          <span>{article.date}</span>
                          <span className="mx-2">•</span>
                          <span>{article.readTime}</span>
                        </div>
                        <button
                          onClick={() => setShowModal(true)}
                          className="text-accent-400 text-sm font-medium group-hover:text-accent-300 cursor-pointer hover:underline"
                        >
                          Read more →
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </RevealOnView>
        </div>
      </section>


      {/* Newsletter Signup */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <RevealOnView>
            <div className="text-center bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-16">
              <h3 className="text-4xl md:text-5xl font-light mb-6 text-white font-display">
                Stay Ahead of the <span className="text-accent-300">Curve</span>
              </h3>
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                Get our latest insights, frameworks, and strategic thinking delivered to your inbox monthly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <motion.button
                  onClick={() => setShowModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                No spam, just strategic insights. Unsubscribe anytime.
              </p>
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

            {/* Article Access Image */}
            <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20">
              <img
                src="/IMG_3303.jpg"
                alt="Article Access"
                className="w-full h-auto max-w-full object-contain"
                onError={(e) => {
                  console.error('Failed to load article access image:', e);
                  e.currentTarget.src = '/logo.png'; // Fallback to logo
                }}
                onLoad={() => console.log('Article access image loaded successfully')}
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

export default InsightsPage;