'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, Briefcase, User, Mail, Lightbulb } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: <Home size={18} />, href: '#home' },
  { id: 'work', label: 'Work', icon: <Briefcase size={18} />, href: '#work' },
  { id: 'about', label: 'About', icon: <User size={18} />, href: '#about' },
  { id: 'services', label: 'Services', icon: <Lightbulb size={18} />, href: '#services' },
  { id: 'contact', label: 'Contact', icon: <Mail size={18} />, href: '#contact' },
];

const LiquidNavigation: React.FC = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for liquid effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(springY, [-300, 300], [10, -10]);
  const rotateY = useTransform(springX, [-300, 300], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleItemClick = (item: NavItem) => {
    setActiveItem(item.id);
    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      ref={containerRef}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Main Navigation Container */}
      <motion.div
        className="relative bg-black/20 backdrop-blur-2xl rounded-full p-2 border border-white/10 shadow-2xl shadow-primary-500/30"
        animate={{
          background: hoveredItem 
            ? 'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(34, 197, 94, 0.2), rgba(168, 85, 247, 0.2))'
            : 'rgba(255, 255, 255, 0.1)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Liquid Background Blob */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background: 'linear-gradient(45deg, #3b82f6, #22c55e, #a855f7)',
            filter: 'blur(20px)',
          }}
          animate={{
            scale: hoveredItem ? 1.1 : 1,
            opacity: hoveredItem ? 0.5 : 0.3,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        {/* Navigation Items */}
        <div className="relative flex items-center space-x-2">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative px-4 py-3 rounded-full text-sm font-semibold transition-colors duration-300 group font-heading"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active/Hover Background */}
              {(activeItem === item.id || hoveredItem === item.id) && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: activeItem === item.id 
                      ? 'linear-gradient(45deg, #3b82f6, #22c55e)'
                      : 'linear-gradient(45deg, #22c55e, #a855f7)',
                  }}
                  layoutId={activeItem === item.id ? "activeBackground" : "hoverBackground"}
                  initial={false}
                  animate={{
                    opacity: activeItem === item.id ? 1 : 0.6,
                    scale: activeItem === item.id ? 1 : 0.95,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              {/* Content */}
              <div className="relative flex items-center space-x-2">
                <motion.div
                  animate={{
                    rotate: hoveredItem === item.id ? 360 : 0,
                    scale: hoveredItem === item.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`${
                    activeItem === item.id || hoveredItem === item.id
                      ? 'text-white drop-shadow-sm'
                      : 'text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  {item.icon}
                </motion.div>

                {/* Label with morphing animation */}
                <motion.span
                  className={`font-medium ${
                    activeItem === item.id || hoveredItem === item.id
                      ? 'text-white drop-shadow-sm'
                      : 'text-neutral-700 dark:text-neutral-300'
                  }`}
                  animate={{
                    opacity: hoveredItem === item.id || activeItem === item.id ? 1 : 0,
                    width: hoveredItem === item.id || activeItem === item.id ? 'auto' : 0,
                    marginLeft: hoveredItem === item.id || activeItem === item.id ? 8 : 0,
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                >
                  {item.label}
                </motion.span>
              </div>

              {/* Liquid ripple effect on hover */}
              {hoveredItem === item.id && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  style={{
                    borderImage: 'linear-gradient(45deg, #3b82f6, #22c55e, #a855f7) 1',
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Ambient glow effect */}
        <motion.div
          className="absolute -inset-4 rounded-full opacity-20 blur-2xl"
          style={{
            background: 'linear-gradient(45deg, #3b82f6, #22c55e, #a855f7)',
          }}
          animate={{
            scale: hoveredItem ? [1, 1.1, 1] : 1,
            opacity: hoveredItem ? [0.2, 0.4, 0.2] : 0.2,
          }}
          transition={{
            duration: 2,
            repeat: hoveredItem ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.nav>
  );
};

export default LiquidNavigation;