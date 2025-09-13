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
    <footer className="relative py-16 px-4 sm:px-6 lg:px-8 mt-24">
      {/* Background overlay to blend with dark shader */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Tagline */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 relative">
                  <Image 
                    src="/logo.png" 
                    alt="Auxilium Logo" 
                    fill 
                    className="object-contain"
                  />
                </div>
              </div>
              
              <p className="text-white/80 text-lg leading-relaxed mb-6 max-w-md">
                <span className="bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 bg-clip-text text-transparent font-semibold">Auxilium.io — Empowering Resilience Through Digital Aid.</span>
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <button
                    key={social.name}
                    onClick={() => handleLinkClick(social.href)}
                    className="w-12 h-12 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-accent-500/20 transition-all duration-300 group border border-white/10"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5 text-white/60 group-hover:text-accent-400 group-hover:scale-110 transition-all duration-300" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-sora font-bold text-lg mb-6 text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-white/70 hover:text-accent-400 transition-colors duration-300 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-sora font-bold text-lg mb-6 text-white">
                Services
              </h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <span className="text-white/70 hover:text-accent-400 transition-colors duration-300 cursor-pointer">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent-500/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent-500" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Email</p>
                  <p className="text-white/80">hello@auxilium.io</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary-500/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-secondary-500" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Phone</p>
                  <p className="text-white/80">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-500/10 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Location</p>
                  <p className="text-white/80">Everywhere, Digital First</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/50 text-sm">
              © {currentYear} Auxilium.io. All rights reserved.
            </p>
            
            <div className="flex space-x-6 text-sm">
              <button className="text-white/50 hover:text-accent-400 transition-colors duration-300">
                Privacy Policy
              </button>
              <button className="text-white/50 hover:text-accent-400 transition-colors duration-300">
                Terms of Service
              </button>
              <button className="text-white/50 hover:text-accent-400 transition-colors duration-300">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-500/10 rounded-full -translate-x-16 translate-y-16 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary-500/10 rounded-full translate-x-20 translate-y-20 blur-2xl"></div>
      </div>
    </footer>
  );
};

export default Footer;
