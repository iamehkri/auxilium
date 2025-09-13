'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, User, Mail, MessageSquare, Zap, CheckCircle } from 'lucide-react';
import NeuralNetwork from './NeuralNetwork';

interface FormData {
  name: string;
  email: string;
  message: string;
  projectType: string;
}

const projectTypes = [
  'AI Application',
  'Mobile App',
  'Web Platform',
  'AI Workflow',
  'Custom Solution',
  'Design System'
];

const QuantumContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    projectType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <section ref={containerRef} id="contact" className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20"
          >
            <motion.div
              className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-global-green to-empower-blue rounded-full flex items-center justify-center"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <CheckCircle size={40} className="text-white" />
            </motion.div>
            
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 font-orbitron">
              Quantum Connection Established
            </h3>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Your message has been transmitted through the digital dimension. 
              We'll respond within 24 hours.
            </p>

            <motion.button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', message: '', projectType: '' });
              }}
              className="px-8 py-3 bg-gradient-to-r from-empower-blue to-global-green text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Another Message
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} id="contact" className="py-20 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
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
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
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
              <span className="text-sm font-medium">Quantum Communication</span>
            </div>
          </motion.div>
          
          <h2 className="font-orbitron font-bold text-4xl md:text-6xl mb-6">
            <span className="bg-gradient-to-r from-empower-blue via-global-green to-agentic-violet bg-clip-text text-transparent">
              INITIATE
            </span>
            <br />
            <span className="text-gray-800 dark:text-white">CONNECTION</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to transform your vision into digital reality? Let's establish a quantum connection 
            and begin your journey into the extraordinary.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Neural Network Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative">
              <NeuralNetwork height="500px" className="rounded-2xl border border-white/10 backdrop-blur-sm" />
              
              {/* Info overlay */}
              <motion.div
                className="absolute top-6 left-6 p-4 bg-black/50 backdrop-blur-sm rounded-xl border border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <h4 className="text-white font-semibold mb-2 text-sm">AI Processing Network</h4>
                <p className="text-white/80 text-xs">
                  Watch our neural networks analyze and process your requirements in real-time
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-empower-blue to-global-green rounded-xl opacity-0 blur-sm"
                  animate={{
                    opacity: focusedField === 'name' ? 0.3 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative flex items-center">
                  <User className="absolute left-4 text-gray-400 z-10" size={20} />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:border-empower-blue/50 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-global-green to-agentic-violet rounded-xl opacity-0 blur-sm"
                  animate={{
                    opacity: focusedField === 'email' ? 0.3 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 text-gray-400 z-10" size={20} />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:border-global-green/50 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Project Type */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-agentic-violet to-empower-blue rounded-xl opacity-0 blur-sm"
                  animate={{
                    opacity: focusedField === 'projectType' ? 0.3 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <select
                  value={formData.projectType}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                  onFocus={() => setFocusedField('projectType')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:border-agentic-violet/50 transition-all duration-300"
                  required
                >
                  <option value="">Select Project Type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type} className="bg-gray-800 text-white">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message Field */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-empower-blue via-global-green to-agentic-violet rounded-xl opacity-0 blur-sm"
                  animate={{
                    opacity: focusedField === 'message' ? 0.3 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-gray-400 z-10" size={20} />
                  <textarea
                    placeholder="Describe your vision..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={4}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:border-empower-blue/50 transition-all duration-300 resize-none"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full py-4 bg-gradient-to-r from-empower-blue to-global-green text-white font-bold text-lg rounded-xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-global-green to-agentic-violet opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                <div className="relative z-10 flex items-center justify-center space-x-3">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Initialize Project</span>
                    </>
                  )}
                </div>

                {/* Animated background particles */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuantumContactForm;