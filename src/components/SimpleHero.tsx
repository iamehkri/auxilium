'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SimpleHero: React.FC = () => {
  // Parallax scrolling effects
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yBackground = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Dark background overlay with parallax */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -z-10" 
        style={{ y: yBackground }}
      />
      
      {/* Content with parallax */}
      <motion.div 
        className="relative z-10 max-w-6xl mx-auto text-center"
        style={{ y: yText, opacity }}
      >
        {/* Tagline */}
        <motion.p 
          className="inline-block mb-8 px-6 py-3 rounded-full text-sm font-medium bg-white/10 text-primary-400 backdrop-blur-sm border border-white/20 shadow-lg shadow-primary-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          The Future of Digital Experiences
        </motion.p>

        {/* Main heading */}
        <motion.h1 
          className="font-display font-bold text-4xl md:text-7xl lg:text-8xl leading-tight tracking-tight mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 bg-clip-text text-transparent">
            REDEFINE
          </span>
          <br />
          <span className="text-white">
            DIGITAL
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We craft{" "}
            <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent font-semibold">
              extraordinary digital experiences
            </span>
            {" "}that blur the line between imagination and reality
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full max-w-md sm:max-w-none mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.button
            className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-full overflow-hidden shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-300 text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Launch Project</span>
          </motion.button>

          <motion.button
            className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary-500 text-primary-500 font-semibold rounded-full backdrop-blur-sm hover:bg-primary-500 hover:text-white transition-all duration-300 shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/40 text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Universe
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SimpleHero;