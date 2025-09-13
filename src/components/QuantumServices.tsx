'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';
import { 
  Brain, 
  Smartphone, 
  Globe, 
  Zap, 
  Cpu, 
  Eye,
  Workflow,
  Palette
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  gradient: string;
}

const services: Service[] = [
  {
    id: '1',
    title: 'AI Applications',
    description: 'Neural networks that think beyond human limitations',
    icon: <Brain size={32} />,
    color: '#3B82F6',
    gradient: 'from-blue-500 to-cyan-400',
    features: ['Machine Learning', 'Neural Networks', 'Predictive Analytics', 'Natural Language Processing']
  },
  {
    id: '2',
    title: 'Mobile Apps',
    description: 'Pocket-sized universes with infinite possibilities',
    icon: <Smartphone size={32} />,
    color: '#10B981',
    gradient: 'from-emerald-500 to-teal-400',
    features: ['iOS & Android', 'React Native', 'Flutter', 'Progressive Web Apps']
  },
  {
    id: '3',
    title: 'Web Platforms',
    description: 'Digital ecosystems that evolve with your vision',
    icon: <Globe size={32} />,
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-indigo-400',
    features: ['React & Next.js', 'Vue & Nuxt', 'Node.js', 'Cloud Architecture']
  },
  {
    id: '4',
    title: 'AI Workflows',
    description: 'Intelligent automation that works while you dream',
    icon: <Workflow size={32} />,
    color: '#F59E0B',
    gradient: 'from-amber-500 to-orange-400',
    features: ['Process Automation', 'Smart Routing', 'Decision Trees', 'Integration APIs']
  },
  {
    id: '5',
    title: 'Custom Solutions',
    description: 'Bespoke digital experiences crafted for your reality',
    icon: <Cpu size={32} />,
    color: '#EF4444',
    gradient: 'from-red-500 to-rose-400',
    features: ['Custom Development', 'System Integration', 'Legacy Modernization', 'Scalable Architecture']
  },
  {
    id: '6',
    title: 'Design Systems',
    description: 'Visual languages that speak to souls',
    icon: <Palette size={32} />,
    color: '#06B6D4',
    gradient: 'from-cyan-500 to-blue-400',
    features: ['UI/UX Design', 'Brand Identity', 'Design Systems', 'User Research']
  }
];

// Quantum field visualization
function QuantumField() {
  const points = useRef<THREE.Points>(null);
  const noise = useMemo(() => createNoise3D(), []);
  
  const particlesCount = 3000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    
    const time = state.clock.elapsedTime * 0.5;
    const positions = points.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      
      const noiseValue = noise(x * 0.01, y * 0.01, z * 0.01 + time);
      positions[i + 1] += Math.sin(time + noiseValue) * 0.02;
      positions[i] += Math.cos(time * 0.8 + noiseValue) * 0.01;
      positions[i + 2] += Math.sin(time * 1.2 + noiseValue) * 0.015;
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={points} positions={positions}>
      <PointMaterial
        transparent
        color="#3B82F6"
        size={0.3}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

// Floating quantum orbs
function QuantumOrb({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere
        ref={meshRef}
        position={position}
        args={[1, 32, 32]}
      >
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          wireframe
        />
      </Sphere>
    </Float>
  );
}

// Individual service card
const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set((e.clientX - centerX) * 0.1);
      mouseY.set((e.clientY - centerY) * 0.1);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    if (cardRef.current) {
      cardRef.current.addEventListener('mousemove', handleMouseMove);
      cardRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener('mousemove', handleMouseMove);
        cardRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: 15 }}
      transition={{ delay: index * 0.15, duration: 0.8 }}
      style={{
        x: springX,
        y: springY,
        transformPerspective: 1000,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ scale: 1.02 }}
    >
      {/* Quantum field background */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <QuantumField />
          <QuantumOrb position={[0, 0, 0]} color={service.color} />
        </Canvas>
      </div>

      {/* Card content */}
      <div className="relative z-10 p-8 h-full bg-gradient-to-br from-white/5 to-white/10 dark:from-black/20 dark:to-black/10 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10">
        
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <motion.div
            className="p-3 rounded-xl bg-gradient-to-r from-white/10 to-white/20 backdrop-blur-sm"
            animate={{
              backgroundColor: isHovered 
                ? [`${service.color}30`, `${service.color}50`]
                : 'rgba(255, 255, 255, 0.1)',
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{
                color: isHovered ? '#ffffff' : service.color,
                rotate: isHovered ? 360 : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              {service.icon}
            </motion.div>
          </motion.div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white font-orbitron">
              {service.title}
            </h3>
            <motion.div
              className="h-1 rounded-full mt-2"
              style={{ backgroundColor: service.color }}
              initial={{ width: 0 }}
              animate={{ width: isHovered ? '100%' : '60%' }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* Features */}
        <motion.div
          className="space-y-3"
          animate={{ height: isExpanded ? 'auto' : '120px' }}
          style={{ overflow: 'hidden' }}
        >
          {service.features.map((feature, featureIndex) => (
            <motion.div
              key={feature}
              className="flex items-center space-x-3 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: (index * 0.15) + (featureIndex * 0.1),
                duration: 0.5 
              }}
              whileHover={{ 
                backgroundColor: `${service.color}20`,
                scale: 1.02 
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: service.color }}
              />
              <span className="text-sm text-gray-700 dark:text-gray-200">
                {feature}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Expand/Collapse indicator */}
        <motion.div
          className="flex justify-center mt-6"
          animate={{ opacity: isExpanded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex space-x-1"
            animate={{
              y: [0, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{ 
                  backgroundColor: service.color,
                  opacity: 0.6 + (i * 0.2) 
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute -inset-1 rounded-2xl opacity-0 blur-xl"
          style={{ backgroundColor: `${service.color}40` }}
          animate={{ opacity: isHovered ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Quantum particles on hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ 
                  backgroundColor: service.color,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const QuantumServices: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <section 
      ref={containerRef}
      id="services" 
      className="py-20 px-4 relative overflow-hidden"
    >
      {/* Quantum background field */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
          <QuantumField />
        </Canvas>
      </div>

      {/* Background effects */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
        }}
        animate={{
          background: [
            'radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4 px-6 py-3 rounded-full bg-gradient-to-r from-empower-blue/10 to-agentic-violet/10 backdrop-blur-sm border border-empower-blue/20"
            animate={{
              boxShadow: [
                '0 0 20px rgba(59, 130, 246, 0.3)',
                '0 0 40px rgba(139, 92, 246, 0.3)',
                '0 0 20px rgba(59, 130, 246, 0.3)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center space-x-2 text-empower-blue">
              <Zap size={16} />
              <span className="text-sm font-medium">Quantum Services</span>
            </div>
          </motion.div>
          
          <h2 className="font-orbitron font-bold text-4xl md:text-6xl mb-6">
            <span className="bg-gradient-to-r from-empower-blue via-global-green to-agentic-violet bg-clip-text text-transparent">
              REALITY
            </span>
            <br />
            <span className="text-gray-800 dark:text-white">TRANSFORMATION</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We don't just build applications—we architect new dimensions of possibility. 
            Each service exists in a quantum superposition of innovation and execution.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.button
            className="group relative px-10 py-5 bg-gradient-to-r from-empower-blue/20 to-agentic-violet/20 text-white font-bold text-lg rounded-full backdrop-blur-xl border border-white/20 hover:from-empower-blue/30 hover:to-agentic-violet/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Initialize Quantum Consultation</span>
            
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-empower-blue to-agentic-violet rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            
            {/* Orbital rings */}
            <motion.div
              className="absolute inset-0 border-2 border-empower-blue/50 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 border border-agentic-violet/50 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-empower-blue/20 to-agentic-violet/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
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

export default QuantumServices;