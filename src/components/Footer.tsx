'use client';

import React from 'react';
import { Linkedin, Twitter, Github, Mail, Phone, Globe } from 'lucide-react';
import Image from 'next/image';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const services = [
    'Web Development',
    'App Development',
    'Marketing',
    'Virtual Experiences',
    'AI Solutions',
    'Consulting',
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@auxilium.io' },
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <footer className="relative py-16 px-4 mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="glass rounded-3xl border border-white/20 dark:border-white/10 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Tagline */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 relative">
                  <Image 
                    src="/logo.webp" 
                    alt="Auxilium.io Logo" 
                    fill 
                    className="object-contain"
                  />
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                <span className="gradient-text font-semibold">Empowering Resilience Through Digital Aid</span>
                <br />
                Your digital ally for modern web development, meaningful marketing, 
                and strategic consulting solutions.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <button
                    key={social.name}
                    onClick={() => handleLinkClick(social.href)}
                    className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-auxilium-teal/10 transition-colors duration-300 group"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-auxilium-teal group-hover:scale-110 transition-all duration-300" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-sora font-bold text-lg mb-6 text-gray-800 dark:text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-gray-600 dark:text-gray-300 hover:text-auxilium-teal transition-colors duration-300 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-sora font-bold text-lg mb-6 text-gray-800 dark:text-white">
                Services
              </h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <span className="text-gray-600 dark:text-gray-300 hover:text-auxilium-teal transition-colors duration-300 cursor-pointer">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 pt-8 border-t border-white/20 dark:border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-auxilium-teal/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-auxilium-teal" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="text-gray-700 dark:text-gray-200">hello@auxilium.io</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-resilience-violet/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-resilience-violet" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="text-gray-700 dark:text-gray-200">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-calm-sky/10 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-calm-sky" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p className="text-gray-700 dark:text-gray-200">Everywhere, Digital First</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/20 dark:border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {currentYear} Auxilium.io. All rights reserved.
            </p>
            
            <div className="flex space-x-6 text-sm">
              <button className="text-gray-500 dark:text-gray-400 hover:text-auxilium-teal transition-colors duration-300">
                Privacy Policy
              </button>
              <button className="text-gray-500 dark:text-gray-400 hover:text-auxilium-teal transition-colors duration-300">
                Terms of Service
              </button>
              <button className="text-gray-500 dark:text-gray-400 hover:text-auxilium-teal transition-colors duration-300">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-auxilium-teal/5 rounded-full -translate-x-16 translate-y-16 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-resilience-violet/5 rounded-full translate-x-20 translate-y-20 blur-2xl"></div>
      </div>
    </footer>
  );
};

export default Footer;