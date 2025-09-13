'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, AlertTriangle, Trophy, BarChart3, Calendar, Clock, CheckCircle, Target, User, Mail, Phone, Building, X } from 'lucide-react';

interface ClearScore {
  current_score?: number;
  score?: number;
  primary_issue?: string;
  top_risk?: string;
  quick_win?: string;
  strategic_solution?: string;
}

interface Assessment {
  clear_analysis?: {
    credibility?: ClearScore;
    logic?: ClearScore;
    empowerment?: ClearScore;
    accessibility?: ClearScore;
    resilience?: ClearScore;
  };
  solution_roadmap?: {
    immediate_actions?: Array<{
      action: string;
      addresses?: string;
      effort?: string;
      impact?: string;
    }>;
    strategic_initiatives?: Array<{
      action: string;
      addresses?: string;
      investment?: string;
      roi_timeline?: string;
    }>;
  };
  next_step?: {
    recommended_meeting?: string;
    urgency?: string;
  };
}

interface ClearAssessmentProps {
  assessment: Assessment;
}

const ClearAssessment: React.FC<ClearAssessmentProps> = ({ assessment }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Safety check
  if (!assessment?.clear_analysis) {
    return null;
  }

  const { clear_analysis, solution_roadmap, next_step } = assessment;

  const getScoreLevel = (score: number) => {
    if (score >= 8) return 'high';
    if (score >= 5) return 'medium';
    return 'low';
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 5) return 'text-yellow-400';
    return 'text-red-400';
  };

  const clearCategories = [
    { key: 'credibility', label: 'Credibility', icon: Target, data: clear_analysis.credibility, description: 'Brand trust & reputation' },
    { key: 'logic', label: 'Logic', icon: BarChart3, data: clear_analysis.logic, description: 'Strategic decision making' },
    { key: 'empowerment', label: 'Empowerment', icon: Trophy, data: clear_analysis.empowerment, description: 'Team efficiency & automation' },
    { key: 'accessibility', label: 'Accessibility', icon: Target, data: clear_analysis.accessibility, description: 'Reach & usability' },
    { key: 'resilience', label: 'Resilience', icon: CheckCircle, data: clear_analysis.resilience, description: 'Security & sustainability' }
  ];

  // Create slides
  const slides = [
    // Slide 1: Overview Scores
    {
      title: "Assessment Overview",
      content: (
        <div className="space-y-4 sm:space-y-6">
          <p className="text-white/70 text-center mb-4 sm:mb-6 text-sm sm:text-base">Your digital transformation assessment results</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
            {clearCategories.map((category) => {
              if (!category.data) return null;

              const score = category.data.current_score || category.data.score || 0;
              const IconComponent = category.icon;

              return (
                <div key={category.key} className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5 text-blue-400" />
                      <div>
                        <h4 className="text-white font-medium text-sm">{category.label}</h4>
                        <p className="text-white/50 text-xs">{category.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Score Bar Graph */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/60">Score</span>
                      <span className={`text-sm font-medium ${getScoreColor(score)}`}>{score}/10</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          score >= 8 ? 'bg-green-400' : score >= 5 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${score * 10}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )
    },

    // Slides 2-6: Individual category details
    ...clearCategories.filter(cat => cat.data).map((category) => {
      const score = category.data?.current_score || category.data?.score || 0;
      const issue = category.data?.primary_issue || category.data?.top_risk || '';
      const quickWin = category.data?.quick_win || '';
      const IconComponent = category.icon;

      return {
        title: category.label,
        content: (
          <div className="space-y-6">
            <div className="text-left sm:text-center">
              <div className="flex justify-start sm:justify-center mb-4">
                <div className={`w-20 h-20 rounded-full border-4 ${
                  score >= 8 ? 'border-green-400' : score >= 5 ? 'border-yellow-400' : 'border-red-400'
                } flex items-center justify-center`}>
                  <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{category.label}</h3>
              <p className="text-white/60">{category.description}</p>
            </div>

            <div className="flex flex-col items-center gap-4 max-w-2xl mx-auto">
              {issue && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 w-full text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span className="text-red-300 font-medium text-sm">Primary Issue</span>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{issue}</p>
                </div>
              )}

              {quickWin && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 w-full text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Trophy className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 font-medium text-sm">Quick Win</span>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{quickWin}</p>
                </div>
              )}
            </div>
          </div>
        )
      };
    }),

    // Slide: Roadmap Timeline
    {
      title: "Implementation Roadmap",
      content: (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-white/70 text-sm">Your strategic implementation timeline</p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/20"></div>

            {/* Immediate Actions */}
            {solution_roadmap?.immediate_actions && solution_roadmap.immediate_actions.length > 0 && (
              <div className="relative flex items-start mb-4">
                <div className="bg-green-500 rounded-full w-3 h-3 mt-2 mr-3 flex-shrink-0 relative z-10"></div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-3 h-3 text-green-400" />
                    <span className="text-green-300 font-medium text-sm">30 Days - Immediate Actions</span>
                  </div>
                  <div className="space-y-1.5">
                    {solution_roadmap.immediate_actions.slice(0, 3).map((action, index) => (
                      <div key={index} className="bg-green-500/5 rounded-lg p-2 text-left">
                        <span className="text-white text-xs block text-left mb-1">{action.action}</span>
                        <div className="flex flex-wrap gap-1">
                          <span className="bg-green-500/20 px-1.5 py-0.5 rounded text-green-300 text-xs whitespace-nowrap">{action.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Strategic Initiatives */}
            {solution_roadmap?.strategic_initiatives && solution_roadmap.strategic_initiatives.length > 0 && (
              <div className="relative flex items-start">
                <div className="bg-blue-500 rounded-full w-3 h-3 mt-2 mr-3 flex-shrink-0 relative z-10"></div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-3 h-3 text-blue-400" />
                    <span className="text-blue-300 font-medium text-sm">Long Term - Strategic Initiatives</span>
                  </div>
                  <div className="space-y-1.5">
                    {solution_roadmap.strategic_initiatives.slice(0, 3).map((initiative, index) => (
                      <div key={index} className="bg-blue-500/5 rounded-lg p-2 text-left">
                        <span className="text-white text-xs block mb-1">{initiative.action}</span>
                        <div className="flex flex-wrap gap-1">
                          <span className="bg-blue-500/20 px-1.5 py-0.5 rounded text-blue-300 text-xs whitespace-nowrap">{initiative.investment}</span>
                          <span className="bg-blue-500/20 px-1.5 py-0.5 rounded text-blue-300 text-xs whitespace-nowrap">{initiative.roi_timeline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    },

    // Final Slide: Contact Form & CTA
    {
      title: "Book Your Strategy Session",
      content: (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <User className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-white mb-1">Ready to Transform Your Business?</h3>
            <p className="text-white/70 text-sm">{next_step?.urgency || "Let's discuss your personalized strategy"}</p>
          </div>

          {/* Lead Form */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-white/70 text-xs mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-3 h-3 text-white/40 absolute left-2 top-2.5" />
                  <input
                    type="text"
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-8 pr-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-xs mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-3 h-3 text-white/40 absolute left-2 top-2.5" />
                  <input
                    type="email"
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-8 pr-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-xs mb-1">Phone</label>
                <div className="relative">
                  <Phone className="w-3 h-3 text-white/40 absolute left-2 top-2.5" />
                  <input
                    type="tel"
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-8 pr-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-xs mb-1">Company</label>
                <div className="relative">
                  <Building className="w-3 h-3 text-white/40 absolute left-2 top-2.5" />
                  <input
                    type="text"
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-8 pr-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                    placeholder="Company name"
                  />
                </div>
              </div>
            </div>

            <motion.button
              onClick={() => {
                console.log('Opening modal, showModal state:', showModal);
                setShowModal(true);
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-300 mt-3 inline-flex items-center justify-center gap-2 text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book Strategy Session
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      {/* Dark overlay */}
      <motion.div
        className="fixed inset-0 bg-black/40 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      <div className="fixed inset-0 flex items-start sm:items-center justify-center p-2 sm:p-4 mx-2 sm:mx-4 md:mx-auto z-50 overflow-auto">
        <motion.div
          className="glassmorphic-container h-[500px] sm:h-[600px] w-full max-w-4xl relative p-4 sm:p-6 md:p-8 my-4 sm:my-0 overflow-y-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              {slides[currentSlide].title}
            </h2>
            <p className="text-white/50 text-sm">
              {currentSlide + 1} of {slides.length}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 mx-8">
            <div className="bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Slide Counter */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-blue-400 w-6' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            {slides[currentSlide].content}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-white/10">
          <motion.button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </motion.button>

          <motion.button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>

    {/* Modal for Book Strategy Session */}
    <AnimatePresence>
      {showModal && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-[60]"
            style={{ zIndex: 9998 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[61]" style={{ zIndex: 9999 }}>
            <motion.div
              className="relative max-w-xs sm:max-w-sm w-full mx-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 rounded-full p-2 backdrop-blur-md border border-white/20 transition-all duration-200 z-20 shadow-lg"
                style={{ zIndex: 10001 }}
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <div className="rounded-xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20">
                <img
                  src="/IMG_3303.jpg"
                  alt="Strategy Session with Client Portal"
                  className="w-full h-auto max-w-full object-contain"
                  style={{ maxHeight: '280px' }}
                  onError={(e) => {
                    console.error('Failed to load image:', e);
                    e.currentTarget.src = '/logo.png'; // Fallback to logo
                  }}
                  onLoad={() => console.log('Image loaded successfully')}
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
    </>
  );
};

export default ClearAssessment;