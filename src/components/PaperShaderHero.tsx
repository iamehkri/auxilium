'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import ActionSearchBar from './ActionSearchBar';

const PaperShaderHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<'initial' | 'industry_selection' | 'challenge_category' | 'specific_details' | 'loading' | 'assessment'>('initial');

  // Parallax scrolling effects
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const handleChatSubmit = async (message: string) => {
    // The ActionSearchBar will handle its own sequence now
    console.log('Chat submitted:', message);
  };

  const handleStepChange = (step: 'initial' | 'industry_selection' | 'challenge_category' | 'specific_details' | 'loading' | 'assessment') => {
    setCurrentStep(step);
  };


  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true);
    const handleMouseLeave = () => setIsActive(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative min-h-screen z-20 ${currentStep === 'assessment' ? 'overflow-auto' : 'overflow-hidden'}`}>

      {/* Client Portal Button - Top Right */}
      {currentStep !== 'assessment' && (
        <motion.div
          className="absolute top-8 right-8 z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
        <motion.button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-xl transition-all duration-300 backdrop-blur-xl text-white/80 hover:text-white text-sm font-medium"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ExternalLink className="w-4 h-4 text-blue-400" />
          <span>Client Portal</span>
        </motion.button>
        </motion.div>
      )}

      {/* Large Semi-Transparent Logo Background */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="relative w-96 h-96 md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] opacity-40">
          <img
            src="/logo.png"
            alt="Auxilium.io Logo"
            className="w-full h-full object-contain filter brightness-200"
            style={{
              mixBlendMode: 'screen',
              filter: 'brightness(2) contrast(1.2) saturate(0)'
            }}
          />
        </div>
      </div>

      {/* Background Text for Assessment */}
      {currentStep === 'assessment' && (
        <div className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none">
          <h1
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white/5 select-none whitespace-nowrap"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            We make "it" extremely simple.
          </h1>
        </div>
      )}

      {/* Content with parallax */}
      <motion.div
        className={`relative z-30 w-full mx-auto px-4 sm:px-0 ${
          currentStep === 'assessment'
            ? 'min-h-screen pt-4'
            : 'text-center flex items-center justify-center h-screen'
        }`}
        style={{ y: currentStep === 'assessment' ? 0 : 0 }}
      >
        <div className="w-full max-w-4xl mx-auto">

        {/* Main heading - clean */}
        <motion.h1
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight font-bold text-white mb-6 leading-tight sm:whitespace-nowrap"
          style={{ fontFamily: 'Poppins, sans-serif' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="font-semibold text-white">
            We make "it" extremely simple.
          </span>
        </motion.h1>

        {/* Action Search Bar */}
        <motion.div
          className="mb-16 w-full max-w-lg sm:max-w-3xl md:max-w-5xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <ActionSearchBar onChatSubmit={handleChatSubmit} onStepChange={handleStepChange} />
        </motion.div>

        {/* Removed scroll indicator */}
        </div>
      </motion.div>

      {/* Interactive glow effect on mouse hover */}
      {isActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-full h-full bg-gradient-radial from-white/10 via-transparent to-transparent" />
        </motion.div>
      )}

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
                alt="Client Portal Access"
                className="w-full h-auto max-w-full object-contain"
                onError={(e) => {
                  console.error('Failed to load client portal image:', e);
                  e.currentTarget.src = '/logo.png'; // Fallback to logo
                }}
                onLoad={() => console.log('Client portal image loaded successfully')}
              />
            </div>
          </motion.div>
          </div>
        </>
      )}
      </AnimatePresence>
    </div>
  );
};

export default PaperShaderHero;
