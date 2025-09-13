"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RevealOnView } from "./RevealOnView"

export default function AgencyFAQ() {
  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl rounded-[32px] overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="grid lg:grid-cols-2">
          {/* FAQ Section */}
          <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-md p-8 lg:p-16 relative border-r border-white/10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20"></div>
            <div className="relative z-10">
              <RevealOnView intensity="hero" className="mb-12">
                <h1 className="text-4xl md:text-6xl font-light text-white mb-4">
                  AGENCY <span className="text-accent-300">FAQ</span>
                </h1>
                <p className="text-white/80 text-sm mb-8">
                  Everything you need to know about working with our digital agency
                </p>
              </RevealOnView>
              
              <RevealOnView staggerChildren className="space-y-4">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="item-1" className="border-b border-white/20 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2">
                    <AccordionTrigger className="text-white hover:text-white/80 text-left">
                      What services does your digital agency offer?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">
                      We specialize in full-stack web development, UI/UX design, mobile app development, 
                      e-commerce solutions, and digital marketing. Our expertise includes React, Next.js, 
                      TypeScript, and modern web technologies to create cutting-edge digital experiences.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="border-b border-white/20 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2">
                    <AccordionTrigger className="text-white hover:text-white/80 text-left">
                      How long does a typical project take?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">
                      Project timelines vary based on complexity. A landing page takes 2-3 weeks, 
                      a full web application 6-12 weeks, and enterprise solutions 3-6 months. 
                      We provide detailed project timelines during our discovery phase.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="border-b border-white/20 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2">
                    <AccordionTrigger className="text-white hover:text-white/80 text-left">
                      What is your development process?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">
                      We follow an agile methodology: Discovery & Planning → Design & Prototyping → 
                      Development & Testing → Launch & Optimization. You'll receive regular updates 
                      and have opportunities for feedback at each stage.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4" className="border-b border-white/20 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2">
                    <AccordionTrigger className="text-white hover:text-white/80 text-left">
                      Do you provide ongoing support and maintenance?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">
                      Yes! We offer comprehensive support packages including security updates, 
                      performance optimization, content updates, and feature enhancements. 
                      All our projects come with 3 months of complimentary support.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5" className="border-b border-white/20 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2">
                    <AccordionTrigger className="text-white hover:text-white/80 text-left">
                      What makes your agency different?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">
                      We combine cutting-edge technology with exceptional design to create 
                      unique digital experiences. Our team stays ahead of industry trends, 
                      implementing the latest frameworks and design patterns for maximum impact.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6" className="border-b border-white/20 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2">
                    <AccordionTrigger className="text-white hover:text-white/80 text-left">
                      How do you handle project pricing?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">
                      We offer both fixed-price and hourly rate options depending on project scope. 
                      After our initial consultation, we provide a detailed proposal with transparent 
                      pricing and no hidden fees. Payment plans are available for larger projects.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </RevealOnView>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-gradient-to-br from-white/8 via-white/4 to-white/8 backdrop-blur-md p-8 lg:p-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20"></div>
            <div className="max-w-md mx-auto relative z-10">
              <RevealOnView intensity="hero" delay={0.2}>
                <h2 className="text-3xl text-white mb-2">READY TO START?</h2>
                <p className="text-white/80 mb-8">Let's discuss your project</p>
              </RevealOnView>

              <RevealOnView staggerChildren delay={0.3}>
                <form className="space-y-6">
                  <Input
                    placeholder="Your Name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-accent-400 focus-visible:ring-offset-0 focus-visible:border-accent-400 backdrop-blur-sm"
                  />
                  <Input
                    placeholder="Email Address"
                    type="email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-accent-400 focus-visible:ring-offset-0 focus-visible:border-accent-400 backdrop-blur-sm"
                  />
                  <Input
                    placeholder="Company (Optional)"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-accent-400 focus-visible:ring-offset-0 focus-visible:border-accent-400 backdrop-blur-sm"
                  />
                  <Textarea
                    placeholder="Tell us about your project..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[120px] focus-visible:ring-accent-400 focus-visible:ring-offset-0 focus-visible:border-accent-400 backdrop-blur-sm resize-none"
                  />
                  <Button className="w-full bg-gradient-to-r from-accent-500 to-accent-400 hover:from-accent-600 hover:to-accent-500 text-black font-semibold rounded-full px-8 py-3 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-accent-500/25 border border-accent-400/20">
                    START YOUR PROJECT
                  </Button>
                </form>
              </RevealOnView>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}