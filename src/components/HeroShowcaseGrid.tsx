'use client';

import React from 'react';
import { Code, Brain, Smartphone, Zap, Database, Shield, Palette, Users } from 'lucide-react';

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  delay: string;
}

const services: ServiceCard[] = [
  {
    title: 'Web Development',
    description: 'Full-stack solutions from responsive websites to enterprise platforms — intuitive, accessible, and scalable.',
    icon: Code,
    gradient: 'from-blue-500 to-cyan-500',
    delay: '0ms'
  },
  {
    title: 'AI & Machine Learning',
    description: 'Intelligent systems that learn and adapt — from predictive analytics to neural networks.',
    icon: Brain,
    gradient: 'from-purple-500 to-pink-500',
    delay: '100ms'
  },
  {
    title: 'Mobile Applications',
    description: 'Native iOS & Android apps — seamless user experience across all devices.',
    icon: Smartphone,
    gradient: 'from-green-500 to-emerald-500',
    delay: '200ms'
  },
  {
    title: 'Digital Transformation',
    description: 'Process automation and digital innovation — modernizing operations for the future.',
    icon: Zap,
    gradient: 'from-yellow-500 to-orange-500',
    delay: '300ms'
  },
  {
    title: 'Cloud Infrastructure',
    description: 'Scalable cloud solutions — secure, reliable, and optimized for performance.',
    icon: Database,
    gradient: 'from-cyan-500 to-blue-500',
    delay: '400ms'
  },
  {
    title: 'Cybersecurity',
    description: 'Protection & compliance — comprehensive security strategies for digital assets.',
    icon: Shield,
    gradient: 'from-red-500 to-rose-500',
    delay: '500ms'
  },
  {
    title: 'UI/UX Design',
    description: 'User experience excellence — beautiful, intuitive designs that users love.',
    icon: Palette,
    gradient: 'from-pink-500 to-purple-500',
    delay: '600ms'
  },
  {
    title: 'Consulting',
    description: 'Strategic guidance — expert advice to navigate complex technology decisions.',
    icon: Users,
    gradient: 'from-orange-500 to-red-500',
    delay: '700ms'
  }
];

const HeroShowcaseGrid: React.FC = () => {
  return (
    <section id="services" className="relative py-24 px-4">
      {/* Background overlay for cohesion with shader */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 text-white">
            WHAT WE <span className="text-accent-300">DO</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital solutions — from web development and AI to cybersecurity and consulting.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative"
              style={{ animationDelay: service.delay }}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 h-full hover:scale-105 transform transition-all duration-500 hover:shadow-2xl border border-white/10 hover:border-white/20 hover:bg-white/10">
                {/* Gradient tag chip */}
                <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${service.gradient} text-white text-sm font-medium mb-6`}>
                  <service.icon className="w-4 h-4 mr-2" />
                  Service
                </div>

                {/* Service content */}
                <h3 className="font-sora font-bold text-2xl mb-4 text-white">
                  {service.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}></div>

                {/* Media placeholder */}
                <div className="mt-6 aspect-video bg-black/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10">
                  <div className="text-center">
                    <service.icon className="w-12 h-12 mx-auto mb-2 text-white/50" />
                    <p className="text-sm text-white/40">
                      Media Placeholder
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary-500/20 rounded-full blur-xl"></div>
      </div>
    </section>
  );
};

export default HeroShowcaseGrid;
