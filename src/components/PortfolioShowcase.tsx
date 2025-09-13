'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { RevealOnView } from './RevealOnView';

const portfolioProjects = [
  {
    title: "Digital Banking Platform",
    subtitle: "UI/UX Design & Frontend Development",
    imageSrc: "/generated/digital-banking.jpg",
    tags: ["React", "TypeScript", "Fintech"],
    href: "#",
    gradientFrom: "#3b82f6",
    gradientTo: "#22c55e",
  },
  {
    title: "E-Commerce Reimagined",
    subtitle: "Full-Stack Development & Strategy",
    imageSrc: "/generated/web-platform-engineering.jpg",
    tags: ["Next.js", "Node.js", "Commerce"],
    href: "#",
    gradientFrom: "#22c55e",
    gradientTo: "#a855f7",
  },
  {
    title: "AI-Powered Analytics",
    subtitle: "Machine Learning & Data Visualization",
    imageSrc: "/generated/data-insights.jpg",
    tags: ["Python", "AI/ML", "Analytics"],
    href: "#",
    gradientFrom: "#a855f7",
    gradientTo: "#3b82f6",
  },
  {
    title: "Creative Studio Website",
    subtitle: "Brand Identity & Web Design",
    imageSrc: "/generated/digital-transformation.jpg",
    tags: ["Branding", "Design", "Creative"],
    href: "#",
    gradientFrom: "#f59e0b",
    gradientTo: "#ef4444",
  },
  {
    title: "Mobile Health App",
    subtitle: "React Native & UX Design",
    imageSrc: "/generated/healthcare-analytics.jpg",
    tags: ["React Native", "Healthcare", "Mobile"],
    href: "#",
    gradientFrom: "#10b981",
    gradientTo: "#3b82f6",
  },
  {
    title: "Blockchain DApp",
    subtitle: "Web3 Development & Smart Contracts",
    imageSrc: "/generated/resilient-systems.jpg",
    tags: ["Web3", "Solidity", "DeFi"],
    href: "#",
    gradientFrom: "#8b5cf6",
    gradientTo: "#f59e0b",
  },
];

const PortfolioShowcase: React.FC = () => {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Section Header */}
      <div className="max-w-8xl mx-auto mb-20">
        <RevealOnView className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block mb-4 px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-primary-400 backdrop-blur-sm border border-white/20">
              Our Work
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 text-white font-display">
              PORTFOLIO <span className="text-accent-300">SHOWCASE</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our latest projects where{" "}
              <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent font-semibold">
                innovation meets execution
              </span>
              . Each project tells a story of digital transformation and creative excellence.
            </p>
          </motion.div>
        </RevealOnView>
      </div>

      {/* Portfolio Grid */}
      <div className="max-w-8xl mx-auto">
        <RevealOnView 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          staggerChildren={true}
        >
          {portfolioProjects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              subtitle={project.subtitle}
              imageSrc={project.imageSrc}
              tags={project.tags}
              href={project.href}
              gradientFrom={project.gradientFrom}
              gradientTo={project.gradientTo}
              revealDelay={index * 0.1}
              priority={index < 3}
            />
          ))}
        </RevealOnView>
      </div>

      {/* Call to Action */}
      <RevealOnView className="text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-full overflow-hidden shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View All Projects</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent-500 to-secondary-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </RevealOnView>
    </section>
  );
};

export default PortfolioShowcase;