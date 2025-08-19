'use client';

import React, { useState } from 'react';
import { MessageSquare, Heart, Cloud, FileText, Mail, CreditCard, Zap, Calendar } from 'lucide-react';

interface Integration {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  position: { x: number; y: number };
}

const integrations: Integration[] = [
  { name: 'Slack', icon: MessageSquare, color: '#4A154B', position: { x: 10, y: 30 } },
  { name: 'HubSpot', icon: Heart, color: '#FF7A59', position: { x: 80, y: 20 } },
  { name: 'Salesforce', icon: Cloud, color: '#00A1E0', position: { x: 20, y: 70 } },
  { name: 'Notion', icon: FileText, color: '#000000', position: { x: 70, y: 80 } },
  { name: 'Gmail', icon: Mail, color: '#EA4335', position: { x: 50, y: 10 } },
  { name: 'Stripe', icon: CreditCard, color: '#6772E5', position: { x: 90, y: 60 } },
  { name: 'Zapier', icon: Zap, color: '#FF4A00', position: { x: 30, y: 50 } },
  { name: 'Calendly', icon: Calendar, color: '#006BFF', position: { x: 60, y: 90 } },
];

const AnimatedBeam: React.FC = () => {
  const [hoveredIntegration, setHoveredIntegration] = useState<string | null>(null);

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-sora font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="gradient-text">Works With Your Tools</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Seamlessly integrate with the tools and platforms your team already uses
          </p>
        </div>

        {/* Integration Network */}
        <div className="relative h-96 glass rounded-3xl border border-white/20 dark:border-white/10 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-auxilium-teal"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          {/* Central Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-16 h-16 bg-auxilium-gradient rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-sm font-bold gradient-text">A</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-auxilium-teal/20 rounded-full animate-ping"></div>
          </div>

          {/* Integration Nodes */}
          {integrations.map((integration, index) => (
            <div
              key={integration.name}
              className="absolute z-10 cursor-pointer group"
              style={{
                left: `${integration.position.x}%`,
                top: `${integration.position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onMouseEnter={() => setHoveredIntegration(integration.name)}
              onMouseLeave={() => setHoveredIntegration(null)}
            >
              {/* Connection beam */}
              <svg
                className="absolute inset-0 -z-10"
                style={{
                  width: `${Math.abs(50 - integration.position.x) + 50}px`,
                  height: `${Math.abs(50 - integration.position.y) + 50}px`,
                  left: integration.position.x > 50 ? '-50px' : `${50 - integration.position.x}px`,
                  top: integration.position.y > 50 ? '-50px' : `${50 - integration.position.y}px`,
                }}
              >
                <line
                  x1={integration.position.x > 50 ? '50' : `${integration.position.x}`}
                  y1={integration.position.y > 50 ? '50' : `${integration.position.y}`}
                  x2="50%"
                  y2="50%"
                  stroke="url(#beamGradient)"
                  strokeWidth="2"
                  className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />
                <defs>
                  <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4DD0E1" stopOpacity="0.8"/>
                    <stop offset="50%" stopColor="#81D4FA" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#7C4DFF" stopOpacity="0.8"/>
                  </linearGradient>
                </defs>
              </svg>

              {/* Node */}
              <div className="relative">
                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full border-2 border-auxilium-teal flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <integration.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                
                {/* Animated beam effect */}
                {hoveredIntegration === integration.name && (
                  <div className="absolute inset-0 rounded-full">
                    <div className="w-full h-full rounded-full bg-auxilium-teal/20 animate-ping"></div>
                    <div 
                      className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 beam-animation"
                      style={{
                        background: 'radial-gradient(circle, #4DD0E1 0%, transparent 70%)',
                        boxShadow: '0 0 10px #4DD0E1, 0 0 20px #4DD0E1, 0 0 30px #4DD0E1',
                      }}
                    ></div>
                  </div>
                )}

                {/* Tooltip */}
                {hoveredIntegration === integration.name && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap">
                    {integration.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-white"></div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Traveling beam animation */}
          <div className="absolute inset-0 z-0">
            <div className="relative w-full h-full">
              <div className="absolute w-2 h-2 bg-auxilium-teal rounded-full beam-animation opacity-70"
                   style={{
                     top: '50%',
                     left: '10%',
                     boxShadow: '0 0 10px #4DD0E1',
                     animationDelay: '0s'
                   }}>
              </div>
              <div className="absolute w-2 h-2 bg-resilience-violet rounded-full beam-animation opacity-70"
                   style={{
                     top: '30%',
                     left: '20%',
                     boxShadow: '0 0 10px #7C4DFF',
                     animationDelay: '2s'
                   }}>
              </div>
              <div className="absolute w-2 h-2 bg-calm-sky rounded-full beam-animation opacity-70"
                   style={{
                     top: '70%',
                     left: '30%',
                     boxShadow: '0 0 10px #81D4FA',
                     animationDelay: '4s'
                   }}>
              </div>
            </div>
          </div>
        </div>

        {/* Integration stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">50+</div>
            <div className="text-gray-600 dark:text-gray-300">Integrations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
            <div className="text-gray-600 dark:text-gray-300">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-300">Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">5min</div>
            <div className="text-gray-600 dark:text-gray-300">Setup Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedBeam;