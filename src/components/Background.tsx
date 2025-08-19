'use client';

import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white-sand to-digital-silver dark:from-deep-space dark:to-gray-900" />
      
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid" />
      
      {/* Gradient blobs */}
      <div className="absolute inset-0">
        {/* Top-left blob */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-resilience-violet/30 to-auxilium-teal/30 rounded-full blur-3xl animate-float" />
        
        {/* Bottom-right blob */}
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-auxilium-teal/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Center floating blob */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-calm-sky/10 to-resilience-violet/10 rounded-full blur-2xl animate-pulse-slow" />
      </div>
      
      {/* Radial vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white-sand/50 dark:to-deep-space/80" />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise" />
    </div>
  );
};

export default Background;