"use client"

import { RevealOnView } from "./RevealOnView"
import RotatingEarth from "./RotatingEarth"
import { Globe, Users, MapPin, Zap } from "lucide-react"

const globalStats = [
  { icon: <Globe className="w-6 h-6" />, number: "50+", label: "Countries Served" },
  { icon: <Users className="w-6 h-6" />, number: "1000+", label: "Projects Delivered" },
  { icon: <MapPin className="w-6 h-6" />, number: "25+", label: "Time Zones" },
  { icon: <Zap className="w-6 h-6" />, number: "24/7", label: "Support Available" },
]

const globalOffices = [
  { city: "Houston", country: "United States", specialty: "Energy & Enterprise Solutions" },
  { city: "Chicago", country: "United States", specialty: "Fintech & Trading Platforms" },
  { city: "London", country: "United Kingdom", specialty: "Financial Services & Banking" },
  { city: "Dubai", country: "UAE", specialty: "E-commerce & Digital Innovation" },
  { city: "Seoul", country: "South Korea", specialty: "Mobile Apps & Gaming Tech" },
  { city: "Vilnius", country: "Lithuania", specialty: "Blockchain & Crypto Solutions" },
  { city: "Bogota", country: "Colombia", specialty: "Digital Transformation & AI" },
]

export default function WeAreGlobal() {
  return (
    <div className="min-h-screen py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background gradient overlay to blend with fixed shader */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <RevealOnView intensity="hero">
            <h2 className="text-5xl md:text-7xl font-light text-white mb-6">
              WE ARE <span className="text-accent-400">GLOBAL</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Delivering cutting-edge digital solutions across continents, 
              cultures, and time zones with seamless collaboration.
            </p>
          </RevealOnView>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Globe Section - Full page expandable */}
          <RevealOnView delay={0.2} className="relative">
            <div className="relative w-full h-full">
              <RotatingEarth 
                width={600} 
                height={600} 
                className="w-full h-full min-h-[400px] lg:min-h-[600px]"
              />
              
              {/* Floating indicators */}
              <div className="absolute top-10 right-4 bg-accent-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-accent-400/30 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
                  <span className="text-accent-400 text-sm font-medium">Live Projects</span>
                </div>
              </div>
              
              <div className="absolute bottom-10 left-4 bg-primary-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-primary-400/30 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                  <span className="text-primary-400 text-sm font-medium">Active Teams</span>
                </div>
              </div>
            </div>
          </RevealOnView>

          {/* Stats and Offices */}
          <div className="space-y-12">
            {/* Global Stats */}
            <RevealOnView delay={0.3} staggerChildren>
              <h3 className="text-3xl font-light text-white mb-8">Global Impact</h3>
              <div className="grid grid-cols-2 gap-6">
                {globalStats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-accent-400/50 transition-all duration-500 group"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="text-accent-400 group-hover:text-accent-300 transition-colors duration-300">
                        {stat.icon}
                      </div>
                      <div className="text-3xl font-bold text-white group-hover:text-accent-100 transition-colors duration-300">
                        {stat.number}
                      </div>
                    </div>
                    <div className="text-white/60 text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnView>

            {/* Global Offices */}
            <RevealOnView delay={0.4} staggerChildren>
              <h3 className="text-3xl font-light text-white mb-8">Our Offices</h3>
              <div className="space-y-4">
                {globalOffices.map((office, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-primary-400/50 transition-all duration-500 group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-semibold group-hover:text-primary-300 transition-colors duration-300">
                          {office.city}, {office.country}
                        </div>
                        <div className="text-white/50 text-sm">
                          {office.specialty}
                        </div>
                      </div>
                      <div className="w-3 h-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50 group-hover:shadow-green-400/80 transition-shadow duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnView>

            {/* Call to Action */}
            <RevealOnView delay={0.5}>
              <div className="bg-gradient-to-r from-accent-500/20 to-primary-500/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h4 className="text-2xl font-light text-white mb-4">
                  Ready to Go Global?
                </h4>
                <p className="text-white/70 mb-6 leading-relaxed">
                  Join thousands of companies worldwide who trust us to deliver 
                  exceptional digital experiences across all markets.
                </p>
                <button className="bg-gradient-to-r from-accent-500 to-accent-400 hover:from-accent-600 hover:to-accent-500 text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-accent-500/25 border border-accent-400/20">
                  Start Your Global Project
                </button>
              </div>
            </RevealOnView>
          </div>
        </div>
      </div>
    </div>
  )
}