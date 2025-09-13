'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { MeshGradient } from '@paper-design/shaders-react';

interface QuizOption {
  label: string;
  value: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  input_type: string;
  options: string[];
  next: any;
  category: string;
  notes?: string;
}

const quizData: QuizQuestion[] = [
  {
    "id": 1,
    "question": "Which industry does your business operate in?",
    "input_type": "radio",
    "options": [
      "E-commerce",
      "Retail (Brick-and-Mortar)",
      "Professional Services",
      "Local Services (e.g. Home Services)",
      "Hospitality/Travel",
      "Healthcare",
      "Finance/Fintech",
      "Education/Training",
      "Other"
    ],
    "next": {
      "E-commerce": 2,
      "Retail (Brick-and-Mortar)": 2,
      "Professional Services": 4,
      "Local Services (e.g. Home Services)": 4,
      "Hospitality/Travel": 4,
      "default": 6
    },
    "category": "Qualifier"
  },
  {
    "id": 2,
    "question": "How do you sell your products? (Select the primary channel)",
    "input_type": "radio",
    "options": [
      "Online via an e-commerce website/marketplace",
      "Through a physical store or in-person sales",
      "Both online and through a physical location"
    ],
    "next": {
      "Through a physical store or in-person sales": 3,
      "default": 6
    },
    "category": "Qualifier"
  },
  {
    "id": 3,
    "question": "Are you considering expanding to online sales (e.g., launching an online store) in the near future?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 6,
    "category": "Qualifier"
  },
  {
    "id": 4,
    "question": "Do you offer online booking or scheduling for your services?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": {
      "No": 5,
      "Yes": 6
    },
    "category": "Qualifier"
  },
  {
    "id": 5,
    "question": "Have you considered adding online booking to improve customer convenience?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 6,
    "category": "Qualifier"
  },
  {
    "id": 6,
    "question": "What is your primary goal for digital improvement or transformation?",
    "input_type": "radio",
    "options": [
      "Increase online sales or lead generation",
      "Improve brand presence and credibility",
      "Enhance customer experience/satisfaction",
      "Optimize operations and efficiency",
      "Strengthen security and compliance",
      "Expand to new channels/markets",
      "Other/Not sure"
    ],
    "next": 7,
    "category": "Qualifier"
  },
  {
    "id": 7,
    "question": "Do you have an official company website?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": {
      "Yes": 8,
      "No": 9
    },
    "category": "Credibility"
  },
  {
    "id": 8,
    "question": "Is your website optimized for mobile and search engines (SEO)?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 10,
    "category": "Credibility"
  },
  {
    "id": 9,
    "question": "Are you planning to create a website in the next 6-12 months?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 10,
    "category": "Credibility"
  },
  {
    "id": 10,
    "question": "Is your branding (logos, messaging) consistent across all digital platforms you use?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 11,
    "category": "Credibility"
  },
  {
    "id": 11,
    "question": "Do you actively engage with customers or followers on social media (regular posts, responses, campaigns)?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 12,
    "category": "Credibility"
  },
  {
    "id": 12,
    "question": "Do you showcase customer reviews, testimonials, or case studies to build credibility?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 13,
    "category": "Credibility"
  },
  {
    "id": 13,
    "question": "Do you have a clear digital strategy or roadmap aligned with your business goals?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 14,
    "category": "Logic"
  },
  {
    "id": 14,
    "question": "Do you track key performance indicators (KPIs) (sales, web traffic, conversion rates, etc.) using analytics tools or dashboards?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 15,
    "category": "Logic"
  },
  {
    "id": 15,
    "question": "Do you regularly analyze data or run experiments (A/B tests) to improve your marketing or operations?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 16,
    "category": "Logic"
  },
  {
    "id": 16,
    "question": "Would you say decisions in your business are guided by data and evidence, not just intuition?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 17,
    "category": "Logic"
  },
  {
    "id": 17,
    "question": "Do you use a Customer Relationship Management (CRM) system to manage leads and customer information?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": {
      "Yes": 18,
      "No": 19
    },
    "category": "Empowerment"
  },
  {
    "id": 18,
    "question": "Is your CRM fully utilized and integrated (e.g., tracking interactions, automated follow-ups, pipeline management)?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 20,
    "category": "Empowerment"
  },
  {
    "id": 19,
    "question": "Have you considered implementing a CRM to better manage customer relationships?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 20,
    "category": "Empowerment"
  },
  {
    "id": 20,
    "question": "Do you automate any repetitive tasks or workflows (e.g., using scripts or tools to save manual effort)?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 21,
    "category": "Empowerment"
  },
  {
    "id": 21,
    "question": "Do you use email marketing to nurture leads or engage customers (newsletters, promotional emails)?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": {
      "Yes": 22,
      "No": 23
    },
    "category": "Empowerment"
  },
  {
    "id": 22,
    "question": "Are your email campaigns automated or segmented (e.g., drip sequences, personalized content)?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 24,
    "category": "Empowerment"
  },
  {
    "id": 23,
    "question": "Have you considered using email campaigns or newsletters to engage your audience?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 24,
    "category": "Empowerment"
  },
  {
    "id": 24,
    "question": "Is your website (or primary online platform) mobile-friendly and easy to navigate for users?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 25,
    "category": "Accessibility"
  },
  {
    "id": 25,
    "question": "Do you have (or plan to develop) a mobile app for your customers or employees?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 26,
    "category": "Accessibility"
  },
  {
    "id": 26,
    "question": "Do you provide a seamless experience across channels (omnichannel) – e.g., can customers easily transition between online, mobile, and in-store interactions?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 27,
    "category": "Accessibility"
  },
  {
    "id": 27,
    "question": "Have you evaluated your website or digital content for accessibility (ensuring it's usable by people with disabilities, e.g., ADA compliance)?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 28,
    "category": "Accessibility"
  },
  {
    "id": 28,
    "question": "Do you have cybersecurity measures in place (e.g., firewalls, anti-virus, regular updates, employee phishing training)?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": {
      "Yes": 29,
      "No": 30
    },
    "category": "Resilience"
  },
  {
    "id": 29,
    "question": "Do you conduct regular cybersecurity audits or penetration testing to find vulnerabilities?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 30,
    "category": "Resilience"
  },
  {
    "id": 30,
    "question": "Do you have a data backup and disaster recovery plan for your critical business information?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 31,
    "category": "Resilience"
  },
  {
    "id": 31,
    "question": "Are you compliant with relevant data privacy laws (e.g., GDPR, CCPA) and any industry-specific regulations (PCI for payments, HIPAA for health, etc.)?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": 32,
    "category": "Resilience"
  },
  {
    "id": 32,
    "question": "Do you use a secure and modern payment processing system for transactions, and is it PCI-DSS compliant?",
    "input_type": "radio",
    "options": ["Yes", "No"],
    "next": null,
    "category": "Resilience"
  }
];

const categoryColors = {
  Qualifier: 'from-blue-500 to-cyan-500',
  Credibility: 'from-purple-500 to-pink-500',
  Logic: 'from-green-500 to-emerald-500',
  Empowerment: 'from-yellow-500 to-orange-500',
  Accessibility: 'from-cyan-500 to-blue-500',
  Resilience: 'from-red-500 to-rose-500'
};

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [questionHistory, setQuestionHistory] = useState<number[]>([1]);

  const currentQuestion = quizData.find(q => q.id === questionHistory[currentQuestionIndex]);

  useEffect(() => {
    setSelectedAnswer(answers[currentQuestion?.id || 0] || '');
  }, [currentQuestionIndex, currentQuestion, answers]);

  const getNextQuestionId = (question: QuizQuestion, answer: string): number | null => {
    if (!question.next) return null;

    if (typeof question.next === 'number') return question.next;

    return question.next[answer] || question.next.default || null;
  };

  const handleNext = () => {
    if (!selectedAnswer || !currentQuestion) return;

    // Save the answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer
    }));

    const nextQuestionId = getNextQuestionId(currentQuestion, selectedAnswer);

    if (nextQuestionId === null) {
      setIsCompleted(true);
      return;
    }

    // Add next question to history
    const newHistory = [...questionHistory.slice(0, currentQuestionIndex + 1), nextQuestionId];
    setQuestionHistory(newHistory);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer('');
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedAnswer('');
    setIsCompleted(false);
    setQuestionHistory([1]);
  };

  if (isCompleted) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-black">
        {/* Background Shader */}
        <div className="fixed inset-0 z-0">
          <MeshGradient
            className="absolute inset-0 w-full h-full"
            colors={["#000000", "#1e3a8a", "#374151", "#0f172a", "#065f46"]}
            speed={0.1}
            backgroundColor="#000000"
          />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <motion.div
            className="w-full max-w-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center shadow-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-white mb-4">
                  Assessment Complete!
                </h1>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  Thank you for completing our digital transformation assessment.
                  We'll analyze your responses and provide personalized insights.
                </p>

                <div className="space-y-4">
                  <button
                    onClick={handleRestart}
                    className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl text-white font-semibold text-lg hover:scale-105 transition-all duration-200"
                  >
                    Take Assessment Again
                  </button>
                  <button
                    onClick={() => window.location.href = '/'}
                    className="w-full px-8 py-4 bg-white/10 border border-white/30 rounded-xl text-white font-medium hover:bg-white/20 transition-all duration-200"
                  >
                    Return to Home
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  if (!currentQuestion) return null;

  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Shader */}
      <div className="fixed inset-0 z-0">
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#000000", "#1e3a8a", "#374151", "#0f172a", "#065f46"]}
          speed={0.1}
          backgroundColor="#000000"
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl">
          {/* Progress Bar */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-white/80 text-sm font-medium">
                Question {currentQuestionIndex + 1} of {quizData.length}
              </span>
              <span className="text-white/80 text-sm font-medium">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 backdrop-blur-lg">
              <motion.div
                className={`h-full bg-gradient-to-r ${categoryColors[currentQuestion.category as keyof typeof categoryColors]} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Category Badge */}
              <motion.div
                className="inline-block mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className={`px-4 py-2 rounded-full bg-gradient-to-r ${categoryColors[currentQuestion.category as keyof typeof categoryColors]} text-white text-sm font-medium`}>
                  {currentQuestion.category}
                </span>
              </motion.div>

              {/* Question */}
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {currentQuestion.question}
              </motion.h2>

              {/* Options */}
              <motion.div
                className="space-y-4 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {currentQuestion.options.map((option, index) => (
                  <motion.label
                    key={option}
                    className={`block cursor-pointer transition-all duration-200 ${
                      selectedAnswer === option
                        ? 'transform scale-105'
                        : 'hover:transform hover:scale-102'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className={`p-6 rounded-2xl border transition-all duration-200 ${
                      selectedAnswer === option
                        ? `border-accent-400 bg-gradient-to-br ${categoryColors[currentQuestion.category as keyof typeof categoryColors]}/20`
                        : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30'
                    } backdrop-blur-lg`}>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="answer"
                          value={option}
                          checked={selectedAnswer === option}
                          onChange={(e) => setSelectedAnswer(e.target.value)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                          selectedAnswer === option
                            ? 'border-accent-400 bg-accent-400'
                            : 'border-white/40'
                        }`}>
                          {selectedAnswer === option && (
                            <motion.div
                              className="w-2 h-2 bg-white rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          )}
                        </div>
                        <span className="text-white text-lg font-medium">
                          {option}
                        </span>
                      </div>
                    </div>
                  </motion.label>
                ))}
              </motion.div>

              {/* Navigation */}
              <motion.div
                className="flex justify-between items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  onClick={handleBack}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center px-6 py-3 bg-white/10 border border-white/30 rounded-xl text-white font-medium hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  className="flex items-center px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl text-white font-semibold hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}