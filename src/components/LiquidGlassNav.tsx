'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import Image from 'next/image';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const LiquidGlassNav: React.FC = () => {
  const [activeItem, setActiveItem] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for dark mode preference
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleNavClick = (item: NavItem) => {
    setActiveItem(item.label);
    setIsMenuOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div className="glass-ultra-dark rounded-2xl shadow-2xl border border-white/30">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-16 h-16 relative">
              <Image 
                src="/logo.png" 
                alt="The Agentic Agency Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 relative">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  activeItem === item.label
                    ? 'text-empower-blue'
                    : 'text-gray-700 dark:text-gray-300 hover:text-empower-blue'
                }`}
              >
                {activeItem === item.label && (
                  <div className="absolute inset-0 bg-empower-blue/10 rounded-xl nav-pill"></div>
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-xl bg-gradient-to-r from-empower-blue to-agentic-violet hover:from-agentic-violet hover:to-empower-blue transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="w-6 h-6 text-white" />
              ) : (
                <Moon className="w-6 h-6 text-white" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg glass hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
              aria-label="Toggle menu"
            >
{isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 dark:border-white/10">
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`block w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeItem === item.label
                      ? 'text-empower-blue bg-empower-blue/10'
                      : 'text-gray-700 dark:text-gray-300 hover:text-empower-blue hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LiquidGlassNav;