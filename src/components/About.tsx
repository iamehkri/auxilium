'use client';

import React from 'react';
import { Shield, Heart, Globe, Users, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Background overlay to blend with dark shader */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 text-white">
            ABOUT <span className="text-accent-300">AUXILIUM.IO</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            At Auxilium.io, we believe technology should empower, not overwhelm.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            {/* Empowerment Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-accent-400/50 transition-all duration-500 group">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-sora font-bold text-2xl mb-4 text-white group-hover:text-accent-300 transition-colors duration-300">Technology should empower</h3>
                  <p className="text-white/70 leading-relaxed">
                    That's why our name comes from the Latin word for "help" — because that's what we provide: digital aid that strengthens organizations and communities.
                  </p>
                </div>
              </div>
            </div>

            {/* Partnership Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-secondary-400/50 transition-all duration-500 group">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-sora font-bold text-2xl mb-4 text-white group-hover:text-secondary-300 transition-colors duration-300">Who we partner with</h3>
                  <p className="text-white/70 leading-relaxed">
                    We partner with mission-driven institutions, development programs, and businesses to bridge the digital divide.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-gradient-to-br from-accent-500/10 to-secondary-500/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-accent-400/60 transition-all duration-500 group">
              <h3 className="font-sora font-bold text-2xl mb-4 bg-gradient-to-r from-accent-500 to-secondary-500 bg-clip-text text-transparent">Our promise</h3>
              <p className="text-white/80 leading-relaxed text-lg">
                Whatever your "it" is, we'll make it resilient, future‑ready, and extremely simple.
              </p>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            {/* Main visual placeholder */}
            <div className="aspect-square bg-gradient-to-br from-accent-500/10 to-secondary-500/10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group hover:scale-105 transition-transform duration-500">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-white font-medium text-lg">Studio Reel</p>
                <p className="text-sm text-white/60 mt-2">Placeholder for studio reel</p>
              </div>
            </div>

            {/* Floating stats */}
            <div className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">100+</div>
                <div className="text-sm text-white/70">Projects</div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-accent-500 to-secondary-500 bg-clip-text text-transparent">24/7</div>
                <div className="text-sm text-white/70">Support</div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-20 -left-10 w-20 h-20 bg-accent-500/20 rounded-full blur-xl animate-float"></div>
            <div className="absolute bottom-20 -right-10 w-24 h-24 bg-secondary-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-sora font-bold text-xl mb-3 text-white">Global Perspective</h3>
            <p className="text-white/70">Built for international and development contexts.</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-sora font-bold text-xl mb-3 text-white">Secure & Compliant</h3>
            <p className="text-white/70">ADA, accessibility, and data protection by default.</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-sora font-bold text-xl mb-3 text-white">Mission‑Aligned</h3>
            <p className="text-white/70">Focused on empowerment and resilience, not just delivery.</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-sora font-bold text-xl mb-3 text-white">Simplicity First</h3>
            <p className="text-white/70">We strip away complexity so you can focus on impact.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;