'use client';

import React from 'react';
import { Globe, Smartphone, Headphones, Video, Bot, Target } from 'lucide-react';

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  delay: string;
}

const services: ServiceCard[] = [
  {
    title: 'Web & App Development',
    description: 'Modern, responsive websites and applications built with cutting-edge technologies.',
    icon: Globe,
    gradient: 'from-auxilium-teal to-calm-sky',
    delay: '0ms'
  },
  {
    title: 'Marketing & Social Media',
    description: 'Strategic digital marketing campaigns that amplify your brand and engage your audience.',
    icon: Smartphone,
    gradient: 'from-resilience-violet to-pink-400',
    delay: '100ms'
  },
  {
    title: 'Virtual Experiences',
    description: 'Immersive virtual events, tours, and experiences that connect people across distances.',
    icon: Headphones,
    gradient: 'from-calm-sky to-auxilium-teal',
    delay: '200ms'
  },
  {
    title: 'Media Development',
    description: 'Compelling video content, graphics, and multimedia that tell your story beautifully.',
    icon: Video,
    gradient: 'from-pink-400 to-resilience-violet',
    delay: '300ms'
  },
  {
    title: 'AI-Powered Workflows',
    description: 'Intelligent automation and AI solutions that streamline your business processes.',
    icon: Bot,
    gradient: 'from-auxilium-teal to-resilience-violet',
    delay: '400ms'
  },
  {
    title: 'Strategic Consulting',
    description: 'Expert guidance and strategic planning to help your organization thrive digitally.',
    icon: Target,
    gradient: 'from-resilience-violet to-calm-sky',
    delay: '500ms'
  }
];

const HeroShowcaseGrid: React.FC = () => {
  return (
    <section id="services" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-sora font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="gradient-text">Our Services</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive digital solutions designed to empower your organization's growth and resilience
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative"
              style={{ animationDelay: service.delay }}
            >
              <div className="glass rounded-3xl p-8 h-full hover:scale-105 transform transition-all duration-500 hover:shadow-2xl border border-white/20 dark:border-white/10">
                {/* Gradient tag chip */}
                <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${service.gradient} text-white text-sm font-medium mb-6`}>
                  <service.icon className="w-4 h-4 mr-2" />
                  Service
                </div>

                {/* Service content */}
                <h3 className="font-sora font-bold text-2xl mb-4 text-gray-800 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}></div>

                {/* Media placeholder */}
                <div className="mt-6 aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <service.icon className="w-12 h-12 mx-auto mb-2 text-gray-400 dark:text-gray-500" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Media Placeholder
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-auxilium-gradient text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Explore All Services
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-auxilium-teal/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-resilience-violet/10 rounded-full blur-xl"></div>
      </div>
    </section>
  );
};

export default HeroShowcaseGrid;