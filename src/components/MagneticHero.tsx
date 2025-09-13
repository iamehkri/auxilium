'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
// import { Text, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Magnetic text component
const MagneticText = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 300, damping: 50 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 50 });
  
  const rotateX = useTransform(springY, [-100, 100], [5, -5]);
  const rotateY = useTransform(springX, [-100, 100], [-5, 5]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set((e.clientX - centerX) * 0.1);
      mouseY.set((e.clientY - centerY) * 0.1);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
    >
      {children}
    </motion.div>
  );
};

// 3D morphing sphere
function MorphingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={hovered ? 1.2 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, 0, 0]}
    >
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        color={hovered ? "#22c55e" : "#3b82f6"}
        roughness={0.1}
        metalness={0.8}
        emissive={hovered ? "#22c55e" : "#3b82f6"}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// Floating 3D text (simplified)
function FloatingText() {
  const textRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = 3 + Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={textRef} position={[0, 3, -2]}>
      <boxGeometry args={[4, 1, 0.2]} />
      <meshStandardMaterial
        color="#a855f7"
        emissive="#a855f7"
        emissiveIntensity={0.3}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// Liquid blob background
const LiquidBlob = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 100,
        y: (e.clientY / window.innerHeight - 0.5) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 opacity-30"
      style={{
        background: `radial-gradient(circle at ${50 + mousePosition.x * 0.1}% ${50 + mousePosition.y * 0.1}%, 
                    rgba(59, 130, 246, 0.4) 0%, 
                    rgba(16, 185, 129, 0.3) 30%, 
                    rgba(139, 92, 246, 0.4) 70%, 
                    transparent 100%)`,
        filter: 'blur(40px)',
      }}
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const MagneticHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  // Parallax scrolling effects
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yBackground = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWork = () => {
    const element = document.querySelector('#work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Liquid blob background */}
      <LiquidBlob />

      {/* 3D Canvas Background with parallax */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: yBackground }}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <MorphingSphere />
          <FloatingText />
        </Canvas>
      </motion.div>

      {/* Custom cursor follower */}
      <motion.div
        className="fixed w-4 h-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full pointer-events-none z-50 mix-blend-difference shadow-lg shadow-primary-500/50"
        animate={{
          x: cursorPosition.x - 8,
          y: cursorPosition.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Main content with parallax */}
      <motion.div 
        className="relative z-10 max-w-6xl mx-auto px-4 text-center"
        style={{ y: yText, opacity }}
      >
        {/* Tagline */}
        <motion.p 
          className="inline-block mb-8 px-6 py-3 rounded-full text-sm font-medium bg-white/10 text-primary-400 backdrop-blur-sm border border-white/20 shadow-lg shadow-primary-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          The Future of Digital Experiences
        </motion.p>

        {/* Main heading with magnetic effect */}
        <MagneticText className="mb-8">
          <motion.h1 
            className="font-display font-bold text-4xl md:text-7xl lg:text-8xl leading-tight tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 bg-clip-text text-transparent animate-pulse">
              REDEFINE
            </span>
            <br />
            <span className="text-white relative">
              DIGITAL
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 blur-xl"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </span>
          </motion.h1>
        </MagneticText>

        {/* Subtitle with typewriter effect */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We craft{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent font-semibold">
                extraordinary digital experiences
              </span>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent-500 to-primary-500 shadow-sm shadow-accent-500/50"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
            </span>
            {" "}that blur the line between imagination and reality
          </p>
        </motion.div>

        {/* CTA Buttons with magnetic effect */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full max-w-md sm:max-w-none mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <MagneticText>
            <motion.button
              onClick={scrollToContact}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-full overflow-hidden shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-300 text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10">Launch Project</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          </MagneticText>

          <MagneticText>
            <motion.button
              onClick={scrollToWork}
              className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary-500 text-primary-500 font-semibold rounded-full backdrop-blur-sm hover:bg-primary-500 hover:text-white transition-all duration-300 shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/40 text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Universe
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"
              />
            </motion.button>
          </MagneticText>
        </motion.div>

        {/* Scroll indicator with pulsing effect */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-6 h-10 border-2 border-primary-500 rounded-full flex justify-center shadow-lg shadow-primary-500/30">
            <motion.div
              className="w-1 h-3 bg-primary-500 rounded-full mt-2 shadow-sm shadow-primary-500/50"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Ambient particle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full shadow-sm shadow-primary-500/50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -100],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default MagneticHero;