"use client"

import { useState, useEffect } from "react"

// Extend Window interface for Speech Recognition
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}
import { motion } from "framer-motion"
import { Send, Zap, Shield, Database, Brain, Users, Monitor, Smartphone, BarChart, User, Briefcase, FolderOpen, Lightbulb, Mail, Mic, MicOff, Heart, Stethoscope, GraduationCap, Car, Home, Factory, Plane, ShoppingCart, Gamepad2, Camera, Music, Utensils, TreePine, Hammer, BookOpen, CreditCard, Check, HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import ChipSelector from "./ChipSelector"
import ClearAssessment from "./ClearAssessment"

interface ActionSearchBarProps {
  onChatSubmit?: (message: string) => void
  onStepChange?: (step: WorkflowStep) => void
}

type WorkflowStep = 'initial' | 'industry_selection' | 'challenge_category' | 'specific_details' | 'loading' | 'assessment';

interface ChipOption {
  id: string;
  label: string;
  icon: string;
  description: string;
}

const ActionSearchBar: React.FC<ActionSearchBarProps> = ({ onChatSubmit, onStepChange }) => {
  const [query, setQuery] = useState('')
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('initial')
  const [originalChallenge, setOriginalChallenge] = useState('')

  // Selection tracking
  const [selectedIndustry, setSelectedIndustry] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedDetails, setSelectedDetails] = useState<string[]>([])

  // Data from API
  const [chipData, setChipData] = useState<any>(null)
  const [assessmentData, setAssessmentData] = useState<any>(null)

  // Loading states
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Voice recognition state
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)

  // Notify parent of step changes
  useEffect(() => {
    onStepChange?.(currentStep)
  }, [currentStep, onStepChange])

  const handleSendMessage = async () => {
    if (!query.trim()) return

    setOriginalChallenge(query.trim())
    setIsLoading(true)
    setCurrentStep('loading')

    try {
      // Always start with industry selection for now
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query.trim(),
          phase: 'industry_selection'
        }),
      })

      const data = await response.json()
      console.log('API Response:', data)

      if (data.type === 'industry_selection' || (data.type === 'text' && data.response)) {
        let parsedData = data.data

        // Handle text response with JSON
        if (data.type === 'text') {
          const jsonMatch = data.response.match(/```json\s*([\s\S]*?)\s*```/)
          if (jsonMatch) {
            parsedData = JSON.parse(jsonMatch[1])
          }
        }

        setChipData(parsedData)
        setCurrentStep('industry_selection')
      }
    } catch (error) {
      console.error('Error:', error)
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleIndustrySelect = async (industryId: string) => {
    setSelectedIndustry(industryId)
    setIsLoading(true)
    setCurrentStep('loading')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: originalChallenge,
          industry: industryId,
          phase: 'challenge_category'
        }),
      })

      const data = await response.json()
      let parsedData = data.data

      // Handle text response with JSON
      if (data.type === 'text') {
        const jsonMatch = data.response.match(/```json\s*([\s\S]*?)\s*```/)
        if (jsonMatch) {
          parsedData = JSON.parse(jsonMatch[1])
        }
      }

      setChipData(parsedData)
      setCurrentStep('challenge_category')
    } catch (error) {
      console.error('Error:', error)
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategorySelect = async (categoryId: string) => {
    setSelectedCategory(categoryId)
    setIsLoading(true)
    setCurrentStep('loading')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: originalChallenge,
          industry: selectedIndustry,
          category: categoryId,
          phase: 'specific_details'
        }),
      })

      const data = await response.json()
      let parsedData = data.data

      // Handle text response with JSON
      if (data.type === 'text') {
        const jsonMatch = data.response.match(/```json\s*([\s\S]*?)\s*```/)
        if (jsonMatch) {
          parsedData = JSON.parse(jsonMatch[1])
        }
      }

      setChipData(parsedData)
      setCurrentStep('specific_details')
    } catch (error) {
      console.error('Error:', error)
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDetailSelect = (detailId: string) => {
    setSelectedDetails(prev => {
      if (prev.includes(detailId)) {
        return prev.filter(id => id !== detailId)
      } else if (prev.length < 3) {
        return [...prev, detailId]
      }
      return prev
    })
  }

  const handleFinalSubmit = async () => {
    setIsLoading(true)
    setCurrentStep('loading')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: originalChallenge,
          industry: selectedIndustry,
          category: selectedCategory,
          specificDetails: selectedDetails,
          phase: 'final_assessment'
        }),
      })

      const data = await response.json()
      let parsedData = data.data

      // Handle text response with JSON
      if (data.type === 'text') {
        const jsonMatch = data.response.match(/```json\s*([\s\S]*?)\s*```/)
        if (jsonMatch) {
          parsedData = JSON.parse(jsonMatch[1])
        }
      }

      setAssessmentData(parsedData)
      setCurrentStep('assessment')
    } catch (error) {
      console.error('Error:', error)
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Voice recognition functions
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setQuery(transcript)
      setIsListening(false)
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
    setRecognition(recognition)
  }

  const stopListening = () => {
    if (recognition) {
      recognition.stop()
      setIsListening(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'initial':
        return (
          <div className="w-full relative z-50 px-4 sm:px-8 lg:px-16">
            {/* Selection chips for quick input */}
            <div className="overflow-hidden mb-8">
              <div
                className="flex gap-4 animate-marquee"
                style={{ width: 'max-content' }}
              >
                <button onClick={() => setQuery("My website is loading too slowly")} className="flex items-center gap-2 px-4 py-3 bg-white/15 hover:bg-white/25 border border-white/20 hover:border-white/30 rounded-2xl transition-all duration-300 cursor-pointer group whitespace-nowrap flex-shrink-0 backdrop-blur-md">
                  <Zap className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300" />
                  <span className="text-white/90 group-hover:text-white text-sm font-medium">My website is loading too slowly</span>
                </button>

                <button onClick={() => setQuery("Our systems don't talk to each other")} className="flex items-center gap-2 px-4 py-3 bg-white/15 hover:bg-white/25 border border-white/20 hover:border-white/30 rounded-2xl transition-all duration-300 cursor-pointer group whitespace-nowrap flex-shrink-0 backdrop-blur-md">
                  <Database className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" />
                  <span className="text-white/90 group-hover:text-white text-sm font-medium">Our systems don't talk to each other</span>
                </button>

                <button onClick={() => setQuery("We need better data security")} className="flex items-center gap-2 px-4 py-3 bg-white/15 hover:bg-white/25 border border-white/20 hover:border-white/30 rounded-2xl transition-all duration-300 cursor-pointer group whitespace-nowrap flex-shrink-0 backdrop-blur-md">
                  <Shield className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300" />
                  <span className="text-white/90 group-hover:text-white text-sm font-medium">We need better data security</span>
                </button>

                <button onClick={() => setQuery("Our processes are too manual")} className="flex items-center gap-2 px-4 py-3 bg-white/15 hover:bg-white/25 border border-white/20 hover:border-white/30 rounded-2xl transition-all duration-300 cursor-pointer group whitespace-nowrap flex-shrink-0 backdrop-blur-md">
                  <Brain className="w-5 h-5 text-violet-400 group-hover:text-violet-300" />
                  <span className="text-white/90 group-hover:text-white text-sm font-medium">Our processes are too manual</span>
                </button>

                <button onClick={() => setQuery("We're not mobile-friendly")} className="flex items-center gap-2 px-4 py-3 bg-white/15 hover:bg-white/25 border border-white/20 hover:border-white/30 rounded-2xl transition-all duration-300 cursor-pointer group whitespace-nowrap flex-shrink-0 backdrop-blur-md">
                  <Smartphone className="w-5 h-5 text-pink-400 group-hover:text-pink-300" />
                  <span className="text-white/90 group-hover:text-white text-sm font-medium">We're not mobile-friendly</span>
                </button>

                <button onClick={() => setQuery("Our data reporting is a mess")} className="flex items-center gap-2 px-4 py-3 bg-white/15 hover:bg-white/25 border border-white/20 hover:border-white/30 rounded-2xl transition-all duration-300 cursor-pointer group whitespace-nowrap flex-shrink-0 backdrop-blur-md">
                  <BarChart className="w-5 h-5 text-orange-400 group-hover:text-orange-300" />
                  <span className="text-white/90 group-hover:text-white text-sm font-medium">Our data reporting is a mess</span>
                </button>

                {/* Duplicate set for continuous scroll */}
                <button onClick={() => setQuery("My website is loading too slowly")} className="flex items-center gap-2 px-4 py-3 bg-white/15 hover:bg-white/25 border border-white/20 hover:border-white/30 rounded-2xl transition-all duration-300 cursor-pointer group whitespace-nowrap flex-shrink-0 backdrop-blur-md">
                  <Zap className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300" />
                  <span className="text-white/90 group-hover:text-white text-sm font-medium">My website is loading too slowly</span>
                </button>

                <button onClick={() => setQuery("Our systems don't talk to each other")} className="flex items-center gap-2 px-4 py-3 bg-white/15 hover:bg-white/25 border border-white/20 hover:border-white/30 rounded-2xl transition-all duration-300 cursor-pointer group whitespace-nowrap flex-shrink-0 backdrop-blur-md">
                  <Database className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" />
                  <span className="text-white/90 group-hover:text-white text-sm font-medium">Our systems don't talk to each other</span>
                </button>

                <button onClick={() => setQuery("We need better data security")} className="flex items-center gap-2 px-4 py-3 bg-white/15 hover:bg-white/25 border border-white/20 hover:border-white/30 rounded-2xl transition-all duration-300 cursor-pointer group whitespace-nowrap flex-shrink-0 backdrop-blur-md">
                  <Shield className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300" />
                  <span className="text-white/90 group-hover:text-white text-sm font-medium">We need better data security</span>
                </button>

                <button onClick={() => setQuery("Our processes are too manual")} className="flex items-center gap-2 px-4 py-3 bg-white/15 hover:bg-white/25 border border-white/20 hover:border-white/30 rounded-2xl transition-all duration-300 cursor-pointer group whitespace-nowrap flex-shrink-0 backdrop-blur-md">
                  <Brain className="w-5 h-5 text-violet-400 group-hover:text-violet-300" />
                  <span className="text-white/90 group-hover:text-white text-sm font-medium">Our processes are too manual</span>
                </button>

                <button onClick={() => setQuery("We're not mobile-friendly")} className="flex items-center gap-2 px-4 py-3 bg-white/15 hover:bg-white/25 border border-white/20 hover:border-white/30 rounded-2xl transition-all duration-300 cursor-pointer group whitespace-nowrap flex-shrink-0 backdrop-blur-md">
                  <Smartphone className="w-5 h-5 text-pink-400 group-hover:text-pink-300" />
                  <span className="text-white/90 group-hover:text-white text-sm font-medium">We're not mobile-friendly</span>
                </button>

                <button onClick={() => setQuery("Our data reporting is a mess")} className="flex items-center gap-2 px-4 py-3 bg-white/15 hover:bg-white/25 border border-white/20 hover:border-white/30 rounded-2xl transition-all duration-300 cursor-pointer group whitespace-nowrap flex-shrink-0 backdrop-blur-md">
                  <BarChart className="w-5 h-5 text-orange-400 group-hover:text-orange-300" />
                  <span className="text-white/90 group-hover:text-white text-sm font-medium">Our data reporting is a mess</span>
                </button>
              </div>
            </div>

            <div className="border-t border-white/10 mb-6"></div>

            {/* Voice Input Button */}
            <div className="flex justify-center mb-4">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`p-3 rounded-full transition-all duration-300 backdrop-blur-md border-2 ${
                  isListening
                    ? 'bg-red-500/20 border-red-400 text-red-400 animate-pulse'
                    : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/15 hover:border-white/30'
                }`}
                disabled={isLoading}
              >
                {isListening ? (
                  <MicOff className="w-6 h-6" />
                ) : (
                  <Mic className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Chat Input - Main focus */}
            <div className="relative mb-8 w-full">
              <div className="relative rounded-xl overflow-hidden" style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(30px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                {/* Helper text INSIDE the input dialogue at the very top */}
                <div className="p-4 border-b border-white/20">
                  <p className="text-white/90 text-sm font-medium text-left" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    What is your "it"? Tell us your biggest challenge, and we can guide you through our process...
                  </p>
                </div>

                {/* Input field attached below */}
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Describe your challenge"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-4 pr-16 bg-transparent border-0 text-white focus:outline-none focus:ring-0 text-lg transition-all duration-300 font-medium"
                    style={{
                      height: '80px',
                      width: '100%',
                      boxSizing: 'border-box',
                      maxWidth: '100%',
                      minWidth: 0
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="absolute right-4 bottom-4 hover:scale-110 transition-transform duration-200"
                    disabled={!query.trim()}
                  >
                    <Send className="w-6 h-6 text-blue-400 hover:text-blue-300" />
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 mb-6"></div>

            {/* Website Navigation Menu */}
            <div className="flex justify-center items-center gap-2 sm:gap-4 pt-4 flex-wrap mobile-nav-chips">
              <motion.a
                href="/about"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 backdrop-blur-xl text-white/70 hover:text-white text-xs sm:text-sm font-medium"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-4 h-4 text-blue-400" />
                <span>About</span>
              </motion.a>

              <motion.a
                href="/services"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 backdrop-blur-xl text-white/70 hover:text-white text-xs sm:text-sm font-medium"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Briefcase className="w-4 h-4 text-green-400" />
                <span>Services</span>
              </motion.a>

              <motion.a
                href="/portfolio"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 backdrop-blur-xl text-white/70 hover:text-white text-xs sm:text-sm font-medium"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FolderOpen className="w-4 h-4 text-purple-400" />
                <span>Portfolio</span>
              </motion.a>

              <motion.a
                href="/insights"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 backdrop-blur-xl text-white/70 hover:text-white text-xs sm:text-sm font-medium"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Lightbulb className="w-4 h-4 text-yellow-400" />
                <span>Insights</span>
              </motion.a>

              <motion.a
                href="/contact"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 backdrop-blur-xl text-white/70 hover:text-white text-xs sm:text-sm font-medium"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-4 h-4 text-red-400" />
                <span>Contact</span>
              </motion.a>
            </div>
          </div>
        )

      case 'industry_selection':
        // Create expanded industry options with colors and icons
        const industries = [
          { id: 'healthcare', label: 'Healthcare', icon: 'Stethoscope', description: 'Medical, hospitals, clinics', color: 'text-red-400' },
          { id: 'education', label: 'Education', icon: 'GraduationCap', description: 'Schools, universities, training', color: 'text-blue-400' },
          { id: 'nonprofit', label: 'Nonprofit', icon: 'Heart', description: 'Charitable organizations', color: 'text-pink-400' },
          { id: 'technology', label: 'Technology', icon: 'Monitor', description: 'Software, IT services', color: 'text-cyan-400' },
          { id: 'automotive', label: 'Automotive', icon: 'Car', description: 'Car manufacturers, dealerships', color: 'text-orange-400' },
          { id: 'realestate', label: 'Real Estate', icon: 'Home', description: 'Property, construction', color: 'text-green-400' },
          { id: 'manufacturing', label: 'Manufacturing', icon: 'Factory', description: 'Production, industrial', color: 'text-gray-400' },
          { id: 'travel', label: 'Travel', icon: 'Plane', description: 'Tourism, hospitality', color: 'text-sky-400' },
          { id: 'retail', label: 'Retail', icon: 'ShoppingCart', description: 'Stores, e-commerce', color: 'text-purple-400' },
          { id: 'entertainment', label: 'Entertainment', icon: 'Gamepad2', description: 'Gaming, media', color: 'text-indigo-400' },
          { id: 'photography', label: 'Photography', icon: 'Camera', description: 'Photo, video services', color: 'text-yellow-400' },
          { id: 'music', label: 'Music', icon: 'Music', description: 'Audio, recording', color: 'text-violet-400' },
          { id: 'food', label: 'Food & Dining', icon: 'Utensils', description: 'Restaurants, catering', color: 'text-amber-400' },
          { id: 'environmental', label: 'Environmental', icon: 'TreePine', description: 'Green, sustainability', color: 'text-emerald-400' },
          { id: 'construction', label: 'Construction', icon: 'Hammer', description: 'Building, trades', color: 'text-stone-400' },
          { id: 'professional', label: 'Professional Services', icon: 'Briefcase', description: 'Consulting, legal', color: 'text-slate-400' },
          { id: 'finance', label: 'Finance', icon: 'CreditCard', description: 'Banking, investment', color: 'text-teal-400' },
          { id: 'publishing', label: 'Publishing', icon: 'BookOpen', description: 'Books, media', color: 'text-rose-400' }
        ]

        return (
          <div className="px-4 sm:px-8 lg:px-16">
            <ChipSelector
              title="What industry are you in?"
              message="Select your industry to get tailored solutions"
              options={industries}
              selectedIds={selectedIndustry ? [selectedIndustry] : []}
              onSelect={handleIndustrySelect}
              allowMultiple={false}
              simpleLayout={true}
            />
          </div>
        )

      case 'challenge_category':
        if (!chipData?.categories) return null
        return (
          <div className="px-4 sm:px-8 lg:px-16">
            <ChipSelector
              title="What's your main challenge area?"
              message={chipData.message || "Let's narrow down your specific challenge"}
              options={chipData.categories}
              selectedIds={selectedCategory ? [selectedCategory] : []}
              onSelect={handleCategorySelect}
              allowMultiple={false}
            />
          </div>
        )

      case 'specific_details':
        if (!chipData?.details) return null
        return (
          <div className="px-4 sm:px-8 lg:px-16">
            <ChipSelector
              title="Let's get specific"
              message={chipData.message || "Select up to 3 specific issues you're facing"}
              options={chipData.details}
              selectedIds={selectedDetails}
              onSelect={handleDetailSelect}
              allowMultiple={true}
              maxSelections={3}
              rowLayout={true}
            />
            {selectedDetails.length > 0 && (
              <div className="text-center mt-6">
                <motion.button
                  onClick={handleFinalSubmit}
                  className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-300 font-['Inter',sans-serif]"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get My Assessment
                </motion.button>
              </div>
            )}
          </div>
        )

      case 'loading':
        return (
          <div className="glassmorphic-container text-center px-4 sm:px-8 lg:px-16">
            <div className="flex flex-col items-center justify-center py-12">
              <motion.div
                className="w-16 h-16 border-4 border-white/20 border-t-blue-400 rounded-full mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 font-['Inter',sans-serif]">
                {isLoading ? "Analyzing your challenge..." : "Processing..."}
              </h3>
              <p className="text-white/70 text-sm font-['Inter',sans-serif]">
                Creating your personalized assessment
              </p>
            </div>
          </div>
        )

      case 'assessment':
        if (!assessmentData) return null
        return <ClearAssessment assessment={assessmentData} />

      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto relative z-50">
      <div className="relative flex flex-col justify-start items-center w-full">
        {renderStep()}
      </div>
    </div>
  )
}

export default ActionSearchBar