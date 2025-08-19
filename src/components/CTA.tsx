'use client';

import React from 'react';
import { ArrowRight, Mail, Phone, MessageCircle, Zap, Shield, Users } from 'lucide-react';

const CTA: React.FC = () => {
  const handleStartProject = () => {
    // In a real implementation, this would open a contact form or navigate to a contact page
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Main CTA Card */}
        <div className="relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-auxilium-gradient rounded-3xl transform rotate-1"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-resilience-violet to-calm-sky rounded-3xl transform -rotate-1 opacity-80"></div>
          
          {/* Glass overlay card */}
          <div className="relative glass rounded-3xl border border-white/30 overflow-hidden">
            {/* Content */}
            <div className="relative z-10 p-12 md:p-16 text-center">
              <h2 className="font-sora font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
                Let's Build Resilience Together
              </h2>
              
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                Ready to transform your organization with cutting-edge digital solutions? 
                Let's create something extraordinary that empowers your mission and strengthens your impact.
              </p>

              {/* CTA Button */}
              <button
                onClick={handleStartProject}
                className="inline-flex items-center px-12 py-6 bg-white text-auxilium-teal font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:bg-white-sand group"
              >
                <span>Start Your Project</span>
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Contact info */}
              <div className="mt-12 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 text-white/80">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>hello@auxilium.io</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Schedule a Call</span>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>
            
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float"></div>
              <div className="absolute top-3/4 left-3/4 w-3 h-3 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-white/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/25 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>

        {/* Bottom section with features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center glass rounded-2xl p-6 border border-white/20 dark:border-white/10">
            <div className="w-12 h-12 bg-auxilium-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-sora font-bold text-lg mb-2 text-gray-800 dark:text-white">Fast Delivery</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Get your project launched quickly with our streamlined development process
            </p>
          </div>

          <div className="text-center glass rounded-2xl p-6 border border-white/20 dark:border-white/10">
            <div className="w-12 h-12 bg-resilience-violet rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-sora font-bold text-lg mb-2 text-gray-800 dark:text-white">Secure & Reliable</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Enterprise-grade security and reliability built into every solution
            </p>
          </div>

          <div className="text-center glass rounded-2xl p-6 border border-white/20 dark:border-white/10">
            <div className="w-12 h-12 bg-calm-sky rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-sora font-bold text-lg mb-2 text-gray-800 dark:text-white">Ongoing Support</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Continuous support and maintenance to keep your systems running smoothly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;