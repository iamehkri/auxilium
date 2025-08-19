'use client';

import React from 'react';
import { Play, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-24">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="font-sora font-bold text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight">
          <span className="gradient-text">
            Empowering Resilience
          </span>
          <br />
          <span className="text-gray-800 dark:text-white">
            Through Digital Aid
          </span>
        </h1>

        {/* Mission Statement */}
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Auxilium.io is your digital ally — empowering organizations with modern, beautiful web and app development, 
          meaningful marketing & social media, virtual experiences, media development, AI-powered workflow improvements, 
          and strategic consulting.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={scrollToContact}
            className="px-8 py-4 bg-auxilium-gradient text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:animate-glow"
          >
            Work With Us
          </button>
          <button
            onClick={scrollToServices}
            className="px-8 py-4 border-2 border-auxilium-teal text-auxilium-teal font-semibold rounded-2xl hover:bg-auxilium-teal hover:text-white transition-all duration-300"
          >
            Our Services
          </button>
        </div>

        {/* Hero Video Placeholder */}
        <div className="relative max-w-4xl mx-auto">
          <div className="aspect-video bg-gradient-to-br from-auxilium-teal/10 to-resilience-violet/10 rounded-3xl glass border border-white/20 dark:border-white/10 flex items-center justify-center group hover:scale-105 transition-transform duration-500">
            <div className="text-center">
              <div className="w-20 h-20 bg-auxilium-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                Watch Our Story
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Placeholder for hero video
              </p>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-auxilium-teal/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-resilience-violet/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-auxilium-teal" />
        </div>
      </div>
    </section>
  );
};

export default Hero;