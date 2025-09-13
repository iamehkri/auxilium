'use client';

import React from 'react';
import { MeshGradient } from '@paper-design/shaders-react';
import ActionSearchBar from '@/components/ActionSearchBar';
import PaperShaderHero from '@/components/PaperShaderHero';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black">
      {/* Background Shader - consistent across all sections */}
      <div className="fixed inset-0 z-0">
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#000000", "#1e3a8a", "#374151", "#0f172a", "#065f46"]}
          speed={0.1}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content sections with consistent shader background */}
      <div className="relative z-10">
        <PaperShaderHero />
      </div>
    </main>
  );
}
