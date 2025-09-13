'use client';

import React from 'react';
import { MeshGradient } from '@paper-design/shaders-react';
import PortfolioShowcase from '@/components/PortfolioShowcase';
import WeAreGlobal from '@/components/WeAreGlobal';
import AgencyFAQ from '@/components/AgencyFAQ';
import About from '@/components/About';
import HeroShowcaseGrid from '@/components/HeroShowcaseGrid';
import Footer from '@/components/Footer';

export default function Other() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black">
      {/* Background Shader - consistent across all sections */}
      <div className="fixed inset-0 z-0">
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#000000", "#1e3a8a", "#374151", "#0f172a", "#065f46"]}
          speed={0.1}
        />
      </div>

      {/* Content sections with consistent shader background */}
      <div className="relative z-10">
        <HeroShowcaseGrid />
        <PortfolioShowcase />
        <WeAreGlobal />
        <AgencyFAQ />
        <About />
        <Footer />
      </div>
    </main>
  );
}