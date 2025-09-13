'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Plane, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Tilt } from 'react-parallax-tilt';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  color: string;
  gradient: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Neural Commerce',
    category: 'AI Application',
    description: 'Revolutionary e-commerce platform powered by neural networks',
    tags: ['AI', 'Machine Learning', 'E-commerce'],
    color: '#3B82F6',
    gradient: 'from-blue-500 to-cyan-400'
  },
  {
    id: '2',
    title: 'Quantum Workflows',
    category: 'Automation',
    description: 'Next-gen workflow automation with quantum-inspired algorithms',
    tags: ['Automation', 'Workflows', 'Enterprise'],
    color: '#10B981',
    gradient: 'from-emerald-500 to-teal-400'
  },
  {
    id: '3',
    title: 'Metaverse Studio',
    category: 'Virtual Reality',
    description: 'Immersive 3D creation platform for the metaverse',
    tags: ['VR', '3D', 'Metaverse'],
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-indigo-400'
  },
  {
    id: '4',
    title: 'Biometric Auth',
    category: 'Security',
    description: 'Advanced biometric authentication system',
    tags: ['Security', 'Biometric', 'Authentication'],
    color: '#F59E0B',
    gradient: 'from-amber-500 to-orange-400'
  },
  {
    id: '5',
    title: 'Smart Analytics',
    category: 'Data Science',
    description: 'AI-powered analytics dashboard with predictive insights',
    tags: ['Analytics', 'AI', 'Dashboard'],
    color: '#EF4444',
    gradient: 'from-red-500 to-rose-400'
  },
  {
    id: '6',
    title: 'Voice Interface',
    category: 'AI Application',
    description: 'Natural language interface for complex applications',
    tags: ['Voice', 'NLP', 'Interface'],
    color: '#06B6D4',
    gradient: 'from-cyan-500 to-blue-400'
  }
];

// 3D Holographic Card
function HolographicCard({ project, position, isActive }: { 
  project: Project; 
  position: [number, number, number]; 
  isActive: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(project.color) },
      opacity: { value: isActive ? 0.8 : 0.4 }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float time;
      
      void main() {
        vUv = uv;
        vPosition = position;
        
        vec3 pos = position;
        pos.z += sin(pos.x * 4.0 + time) * 0.1;
        pos.z += sin(pos.y * 4.0 + time * 0.8) * 0.1;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      uniform float opacity;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vec2 center = vec2(0.5);
        float dist = distance(vUv, center);
        
        float hologram = sin(vUv.y * 50.0 + time * 5.0) * 0.1 + 0.9;
        hologram *= smoothstep(0.8, 0.0, dist);
        
        vec3 finalColor = color * hologram;
        float alpha = opacity * smoothstep(0.8, 0.0, dist);
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending
  });

  useFrame(() => {
    material.uniforms.time.value += 0.016;
  });

  return (
    <Box
      ref={meshRef}
      position={position}
      args={[1.5, 2, 0.1]}
      material={material}
      scale={isActive ? 1.1 : 1}
    />
  );
}

// Individual Project Card
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Tilt
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        perspective={1000}
        scale={1.02}
        transitionSpeed={1000}
        gyroscope={true}
      >
        <div className="relative h-96 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10">
          {/* Holographic background */}
          <div className="absolute inset-0">
            <div 
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`}
            />
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background: `linear-gradient(45deg, 
                  ${project.color}20 0%, 
                  transparent 50%, 
                  ${project.color}20 100%)`,
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          </div>

          {/* Scanning lines effect */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
              animate={{
                y: ['-100%', '500%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* 3D Canvas for holographic effect */}
          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <HolographicCard
                project={project}
                position={[0, 0, 0]}
                isActive={isHovered}
              />
            </Canvas>
          </div>

          {/* Content overlay */}
          <div className="relative z-10 p-6 h-full flex flex-col justify-between bg-gradient-to-t from-black/60 via-transparent to-transparent">
            <div>
              <motion.div
                className="inline-block px-3 py-1 text-xs font-medium text-white bg-white/20 rounded-full backdrop-blur-sm border border-white/30"
                animate={{
                  boxShadow: isHovered 
                    ? [`0 0 20px ${project.color}40`, `0 0 40px ${project.color}20`]
                    : '0 0 0px transparent',
                }}
                transition={{ duration: 0.3 }}
              >
                {project.category}
              </motion.div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 font-orbitron">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <motion.span
                    key={tag}
                    className="px-2 py-1 text-xs text-white/80 bg-white/10 rounded backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (index * 0.1) + (tagIndex * 0.05) }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Holographic button */}
              <motion.button
                className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-white/10 to-white/20 rounded-lg backdrop-blur-sm border border-white/30 hover:from-white/20 hover:to-white/30 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: isHovered 
                    ? `0 0 20px ${project.color}40`
                    : '0 0 0px transparent',
                }}
              >
                Explore Project
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: isHovered ? ['0%', '100%'] : '0%',
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                />
              </motion.button>
            </div>
          </div>

          {/* Glitch effect on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.1, 0, 0.05, 0] }}
              transition={{ duration: 0.2, repeat: 2 }}
              style={{
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  ${project.color}40 50%, 
                  transparent 100%)`,
                mixBlendMode: 'screen',
              }}
            />
          )}
        </div>
      </Tilt>
    </motion.div>
  );
};

const HolographicShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <section 
      ref={containerRef}
      id="work" 
      className="py-20 px-4 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent dark:via-white/5" />
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, 
              rgba(59, 130, 246, 0.1) 0%, 
              transparent 50%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p 
            className="inline-block mb-4 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-empower-blue/10 to-agentic-violet/10 text-empower-blue backdrop-blur-sm border border-empower-blue/20"
            animate={{
              boxShadow: ['0 0 20px rgba(59, 130, 246, 0.3)', '0 0 40px rgba(59, 130, 246, 0.1)'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            Our Digital Universe
          </motion.p>
          
          <h2 className="font-orbitron font-bold text-4xl md:text-6xl mb-6">
            <span className="bg-gradient-to-r from-empower-blue via-global-green to-agentic-violet bg-clip-text text-transparent">
              HOLOGRAPHIC
            </span>
            <br />
            <span className="text-gray-800 dark:text-white">SHOWCASE</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Step into our dimensional gallery where each project exists as a living, 
            breathing hologram in digital space.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-empower-blue/20 to-agentic-violet/20 text-white font-semibold rounded-full backdrop-blur-sm border border-white/20 hover:from-empower-blue/30 hover:to-agentic-violet/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Enter Full Gallery</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-empower-blue to-agentic-violet rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-empower-blue to-agentic-violet rounded-full opacity-20 blur-sm"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HolographicShowcase;