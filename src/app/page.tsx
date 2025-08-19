'use client';

import React from 'react';
import Background from '@/components/Background';
import LiquidGlassNav from '@/components/LiquidGlassNav';
import Hero from '@/components/Hero';
import HeroShowcaseGrid from '@/components/HeroShowcaseGrid';
import AnimatedBeam from '@/components/AnimatedBeam';
import About from '@/components/About';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background with animated elements */}
      <Background />
      
      {/* Navigation */}
      <LiquidGlassNav />
      
      {/* Main content sections */}
      <Hero />
      <HeroShowcaseGrid />
      <AnimatedBeam />
      <About />
      <CTA />
      <Footer />
    </main>
  );
}