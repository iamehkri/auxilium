'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface Node {
  id: string;
  position: [number, number, number];
  connections: string[];
  activity: number;
  layer: number;
}

interface Connection {
  from: string;
  to: string;
  strength: number;
}

// Generate neural network data
const generateNetworkData = () => {
  const nodes: Node[] = [];
  const layers = [
    { count: 5, y: -6 }, // Input layer
    { count: 8, y: -2 }, // Hidden layer 1
    { count: 6, y: 2 },  // Hidden layer 2
    { count: 3, y: 6 }   // Output layer
  ];

  let nodeId = 0;
  layers.forEach((layer, layerIndex) => {
    for (let i = 0; i < layer.count; i++) {
      const x = (i - (layer.count - 1) / 2) * 3;
      nodes.push({
        id: `node-${nodeId}`,
        position: [x, layer.y, 0],
        connections: [],
        activity: Math.random(),
        layer: layerIndex
      });
      nodeId++;
    }
  });

  // Create connections between adjacent layers
  const connections: Connection[] = [];
  layers.forEach((_, layerIndex) => {
    if (layerIndex < layers.length - 1) {
      const currentLayerNodes = nodes.filter(n => n.layer === layerIndex);
      const nextLayerNodes = nodes.filter(n => n.layer === layerIndex + 1);
      
      currentLayerNodes.forEach(currentNode => {
        nextLayerNodes.forEach(nextNode => {
          if (Math.random() > 0.3) { // 70% connection probability
            connections.push({
              from: currentNode.id,
              to: nextNode.id,
              strength: Math.random() * 0.8 + 0.2
            });
            currentNode.connections.push(nextNode.id);
          }
        });
      });
    }
  });

  return { nodes, connections };
};

// Animated neural node component
function NeuralNode({ node, time }: { node: Node; time: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const activity = useMemo(() => {
    return 0.3 + Math.sin(time * 2 + node.layer * 0.5) * 0.3;
  }, [time, node.layer]);

  const color = useMemo(() => {
    const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];
    return colors[node.layer];
  }, [node.layer]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(0.8 + activity * 0.4);
    }
  });

  return (
    <Sphere
      ref={meshRef}
      position={node.position}
      args={[0.3, 16, 16]}
    >
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.6 + activity * 0.4}
      />
    </Sphere>
  );
}

// Neural connection component
function NeuralConnection({ 
  connection, 
  nodes, 
  time 
}: { 
  connection: Connection; 
  nodes: Node[]; 
  time: number; 
}) {
  const fromNode = nodes.find(n => n.id === connection.from);
  const toNode = nodes.find(n => n.id === connection.to);
  
  if (!fromNode || !toNode) return null;

  const pulse = Math.sin(time * 3 + connection.strength * 10) * 0.5 + 0.5;
  const opacity = connection.strength * 0.3 + pulse * 0.2;

  return (
    <Line
      points={[fromNode.position, toNode.position]}
      color={`hsl(${220 + fromNode.layer * 40}, 70%, ${50 + pulse * 30}%)`}
      transparent
      opacity={opacity}
      lineWidth={connection.strength * 2}
    />
  );
}

// Data pulse effect
function DataPulse({ 
  connection, 
  nodes, 
  time 
}: { 
  connection: Connection; 
  nodes: Node[]; 
  time: number; 
}) {
  const fromNode = nodes.find(n => n.id === connection.from);
  const toNode = nodes.find(n => n.id === connection.to);
  
  if (!fromNode || !toNode) return null;

  const progress = (Math.sin(time * 2 + connection.strength * 5) + 1) / 2;
  const position: [number, number, number] = [
    fromNode.position[0] + (toNode.position[0] - fromNode.position[0]) * progress,
    fromNode.position[1] + (toNode.position[1] - fromNode.position[1]) * progress,
    fromNode.position[2] + (toNode.position[2] - fromNode.position[2]) * progress,
  ];

  return (
    <Sphere position={position} args={[0.08, 8, 8]}>
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
}

// Main neural network scene
function NeuralNetworkScene() {
  const { nodes, connections } = useMemo(() => generateNetworkData(), []);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Render nodes */}
      {nodes.map((node) => (
        <NeuralNode 
          key={node.id} 
          node={node} 
          time={state.clock.elapsedTime}
        />
      ))}
      
      {/* Render connections */}
      {connections.map((connection, index) => (
        <NeuralConnection
          key={`connection-${index}`}
          connection={connection}
          nodes={nodes}
          time={state.clock.elapsedTime}
        />
      ))}
      
      {/* Render data pulses */}
      {connections.slice(0, 10).map((connection, index) => (
        <DataPulse
          key={`pulse-${index}`}
          connection={connection}
          nodes={nodes}
          time={state.clock.elapsedTime + index * 0.2}
        />
      ))}

      {/* Layer labels */}
      <Text
        position={[-8, -6, 0]}
        fontSize={0.5}
        color="#10B981"
        anchorX="center"
        anchorY="middle"
      >
        INPUT
      </Text>
      
      <Text
        position={[-8, -2, 0]}
        fontSize={0.4}
        color="#3B82F6"
        anchorX="center"
        anchorY="middle"
      >
        PROCESSING
      </Text>
      
      <Text
        position={[-8, 2, 0]}
        fontSize={0.4}
        color="#8B5CF6"
        anchorX="center"
        anchorY="middle"
      >
        ANALYSIS
      </Text>
      
      <Text
        position={[-8, 6, 0]}
        fontSize={0.5}
        color="#F59E0B"
        anchorX="center"
        anchorY="middle"
      >
        OUTPUT
      </Text>
    </group>
  );
}

// Main component
const NeuralNetwork: React.FC<{ 
  className?: string; 
  height?: string; 
}> = ({ 
  className = '', 
  height = '400px' 
}) => {
  return (
    <div className={`relative ${className}`} style={{ height }}>
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20 rounded-2xl"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Neural network canvas */}
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#3B82F6" />
        <pointLight position={[-10, -10, 10]} intensity={0.6} color="#10B981" />
        <NeuralNetworkScene />
      </Canvas>

      {/* Overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Scanning effect */}
        <motion.div
          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-empower-blue to-transparent opacity-30"
          animate={{
            y: ['0%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-empower-blue/50" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-global-green/50" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-agentic-violet/50" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-empower-blue/50" />
      </div>

      {/* Status indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {['Processing', 'Learning', 'Optimizing'].map((status, index) => (
          <motion.div
            key={status}
            className="px-3 py-1 text-xs font-medium text-white/80 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              delay: index * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {status}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NeuralNetwork;