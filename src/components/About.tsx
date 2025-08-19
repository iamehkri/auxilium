'use client';

import React from 'react';
import { Shield, Heart, Target, Users, Rocket } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-sora font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="gradient-text">About Auxilium</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Understanding our mission of empowering resilience through digital aid
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            {/* Resilience Section */}
            <div className="glass rounded-3xl p-8 border border-white/20 dark:border-white/10">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-auxilium-gradient rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-sora font-bold text-2xl mb-4 text-gray-800 dark:text-white">
                    What is Resilience?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Resilience is the ability to adapt, recover, and thrive in the face of challenges. 
                    In today's digital landscape, organizational resilience means having robust systems, 
                    flexible processes, and the technological foundation to navigate uncertainty while 
                    continuing to serve your mission effectively.
                  </p>
                </div>
              </div>
            </div>

            {/* Digital Aid Section */}
            <div className="glass rounded-3xl p-8 border border-white/20 dark:border-white/10">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-resilience-violet rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-sora font-bold text-2xl mb-4 text-gray-800 dark:text-white">
                    What is Digital Aid?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Digital aid encompasses the tools, technologies, and strategies that support 
                    organizations in achieving their goals. It's about leveraging modern digital 
                    solutions to enhance capabilities, streamline operations, and create meaningful 
                    connections with the communities you serve.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="glass rounded-3xl p-8 border border-white/20 dark:border-white/10 bg-gradient-to-br from-auxilium-teal/5 to-resilience-violet/5">
              <h3 className="font-sora font-bold text-2xl mb-4 gradient-text">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                We believe that every organization deserves access to world-class digital solutions. 
                Auxilium.io bridges the gap between complex technology and practical implementation, 
                ensuring that your team can focus on what matters most while we handle the digital 
                infrastructure that powers your success.
              </p>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            {/* Main visual placeholder */}
            <div className="aspect-square bg-gradient-to-br from-auxilium-teal/10 to-resilience-violet/10 rounded-3xl glass border border-white/20 dark:border-white/10 flex items-center justify-center group hover:scale-105 transition-transform duration-500">
              <div className="text-center">
                <div className="w-32 h-32 bg-auxilium-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                  About Us Video
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Placeholder for about video content
                </p>
              </div>
            </div>

            {/* Floating stats */}
            <div className="absolute -top-6 -right-6 glass rounded-2xl p-4 border border-white/20 dark:border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">100+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Projects</div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 border border-white/20 dark:border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Support</div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-20 -left-10 w-20 h-20 bg-calm-sky/20 rounded-full blur-xl animate-float"></div>
            <div className="absolute bottom-20 -right-10 w-24 h-24 bg-resilience-violet/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 bg-auxilium-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-sora font-bold text-xl mb-3 text-gray-800 dark:text-white">Excellence</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We deliver exceptional quality in every project, ensuring your digital presence exceeds expectations.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-resilience-violet rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-sora font-bold text-xl mb-3 text-gray-800 dark:text-white">Partnership</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We work alongside you as trusted partners, understanding your unique needs and goals.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-calm-sky rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-sora font-bold text-xl mb-3 text-gray-800 dark:text-white">Innovation</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We leverage cutting-edge technologies to create solutions that future-proof your organization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;