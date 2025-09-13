'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Gradient Wave Shader Material
const gradientWaveShader = {
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform float uMouseX;
    uniform float uMouseY;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      
      // Create flowing wave pattern
      float wave1 = sin(pos.x * 2.0 + uTime * 1.5) * 0.1;
      float wave2 = cos(pos.y * 1.5 + uTime * 2.0) * 0.08;
      float wave3 = sin((pos.x + pos.y) * 0.8 + uTime * 1.2) * 0.06;
      
      // Mouse interaction
      float mouseInfluence = length(vec2(uMouseX, uMouseY)) * 0.05;
      
      pos.z += wave1 + wave2 + wave3 + mouseInfluence;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform float uMouseX;
    uniform float uMouseY;
    
    void main() {
      vec2 uv = vUv;
      
      // Create animated gradients
      float gradient1 = sin(uv.x * 3.14 + uTime * 0.8);
      float gradient2 = cos(uv.y * 3.14 + uTime * 1.2);
      
      // Mix colors based on position and time
      vec3 color = mix(uColor1, uColor2, gradient1 * 0.5 + 0.5);
      color = mix(color, uColor3, gradient2 * 0.3 + 0.3);
      
      // Add shimmer effect
      float shimmer = sin(uTime * 3.0 + uv.x * 10.0 + uv.y * 8.0) * 0.1 + 0.9;
      color *= shimmer;
      
      // Mouse interaction glow
      vec2 mousePos = vec2(uMouseX, uMouseY);
      float dist = distance(uv, mousePos * 0.5 + 0.5);
      float glow = 1.0 - smoothstep(0.0, 0.3, dist);
      color += glow * 0.2;
      
      // Add transparency based on position for depth effect
      float alpha = 0.8 - abs(vPosition.z) * 0.5;
      
      gl_FragColor = vec4(color, alpha);
    }
  `
};

// Animated Shader Plane Component
function AnimatedShaderPlane({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouseX: { value: 0 },
      uMouseY: { value: 0 },
      uColor1: { value: new THREE.Color('#3b82f6') }, // Primary blue
      uColor2: { value: new THREE.Color('#22c55e') }, // Accent green
      uColor3: { value: new THREE.Color('#a855f7') }, // Secondary purple
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uMouseX.value = mousePosition.x;
      materialRef.current.uniforms.uMouseY.value = mousePosition.y;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]} rotation={[-Math.PI / 6, 0, 0]}>
      <planeGeometry args={[20, 12, 100, 60]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={gradientWaveShader.vertexShader}
        fragmentShader={gradientWaveShader.fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Floating Orb with Custom Shader
function FloatingOrb({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const orbShader = {
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      uniform float uTime;
      uniform vec3 uColor;
      
      void main() {
        float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        float pulse = sin(uTime * 2.0) * 0.3 + 0.7;
        
        vec3 color = uColor * pulse;
        float alpha = fresnel * 0.8;
        
        gl_FragColor = vec4(color, alpha);
      }
    `
  };

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#22c55e') },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={orbShader.vertexShader}
        fragmentShader={orbShader.fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

// Background Particle Field with Shader
function ShaderParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const particleCount = 1000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, []);

  const particleShader = {
    vertexShader: `
      uniform float uTime;
      uniform float uSize;
      varying float vAlpha;
      
      void main() {
        vec3 pos = position;
        pos.y += sin(uTime + position.x * 0.01) * 2.0;
        pos.x += cos(uTime * 0.8 + position.z * 0.01) * 1.5;
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = uSize * (300.0 / -mvPosition.z);
        
        vAlpha = 1.0 - (abs(pos.z) / 15.0);
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      uniform vec3 uColor;
      
      void main() {
        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
        float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
        
        gl_FragColor = vec4(uColor, alpha * vAlpha * 0.6);
      }
    `
  };

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 4.0 },
      uColor: { value: new THREE.Color('#3b82f6') },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleShader.vertexShader}
        fragmentShader={particleShader.fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const ShaderHero: React.FC = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  
  // Parallax scrolling effects
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yBackground = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Shader Background */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y: yBackground }}
      >
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}
        >
          <ShaderParticles />
          <AnimatedShaderPlane mousePosition={mousePosition} />
          <FloatingOrb position={[-6, 2, 0]} />
          <FloatingOrb position={[6, -2, -1]} />
          <FloatingOrb position={[0, 3, -2]} />
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
        </Canvas>
      </motion.div>

      {/* Content with parallax */}
      <motion.div 
        className="relative z-10 max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8"
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

        {/* Main heading */}
        <motion.h1 
          className="font-display font-bold text-4xl md:text-7xl lg:text-8xl leading-tight tracking-tight mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 bg-clip-text text-transparent">
            REDEFINE
          </span>
          <br />
          <span className="text-white">
            DIGITAL
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We craft{" "}
            <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent font-semibold">
              extraordinary digital experiences
            </span>
            {" "}that blur the line between imagination and reality
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full max-w-md sm:max-w-none mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.button
            className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-full overflow-hidden shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Launch Project</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent-500 to-secondary-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary-500 text-primary-500 font-semibold rounded-full backdrop-blur-sm hover:bg-primary-500 hover:text-white transition-all duration-300 shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/40"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Universe
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
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
    </section>
  );
};

export default ShaderHero;