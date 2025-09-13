'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, Info, Briefcase, FileText, Phone, X, ArrowRight } from 'lucide-react';

interface NavigationItem {
  title: string;
  description: string;
  path: string;
  iconName: string;
  keywords: string[];
}

const NavigationSearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<NavigationItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigationItems: NavigationItem[] = [
    {
      title: "Home",
      description: "Our main page with AI assessment tool",
      path: "/",
      iconName: "home",
      keywords: ["home", "main", "assessment", "ai", "tool", "start"]
    },
    {
      title: "About Us",
      description: "Learn about our mission and core principles",
      path: "/about",
      iconName: "info",
      keywords: ["about", "mission", "principles", "team", "auxilium", "purpose", "values"]
    },
    {
      title: "Services",
      description: "Digital transformation and strategic solutions",
      path: "/services",
      iconName: "briefcase",
      keywords: ["services", "solutions", "digital", "transformation", "web", "platform", "data", "analytics"]
    },
    {
      title: "Portfolio",
      description: "Case studies and impact stories",
      path: "/portfolio",
      iconName: "filetext",
      keywords: ["portfolio", "case studies", "projects", "work", "examples", "impact", "results"]
    },
    {
      title: "Insights",
      description: "Strategic thinking and industry analysis",
      path: "/insights",
      iconName: "filetext",
      keywords: ["insights", "blog", "articles", "thinking", "analysis", "resources", "knowledge"]
    },
    {
      title: "Contact",
      description: "Get in touch and book a strategy session",
      path: "/contact",
      iconName: "phone",
      keywords: ["contact", "get in touch", "strategy session", "consultation", "book", "meeting"]
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "home": return <Home className="w-4 h-4" />;
      case "info": return <Info className="w-4 h-4" />;
      case "briefcase": return <Briefcase className="w-4 h-4" />;
      case "filetext": return <FileText className="w-4 h-4" />;
      case "phone": return <Phone className="w-4 h-4" />;
      default: return <Home className="w-4 h-4" />;
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredItems(navigationItems);
    } else {
      const filtered = navigationItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleNavigation = (path: string) => {
    window.location.href = path;
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    } else if (e.key === 'Enter' && filteredItems.length > 0) {
      handleNavigation(filteredItems[0].path);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-full transition-all duration-300 backdrop-blur-xl text-white/80 hover:text-white text-sm font-medium"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Search className="w-4 h-4 text-blue-400" />
        <span>Search & Navigate</span>
      </motion.button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Search Interface */}
            <div className="fixed inset-0 flex items-start justify-center pt-20 p-4 z-50">
              <motion.div
                className="w-full max-w-2xl"
                initial={{ opacity: 0, y: -50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {/* Search Input */}
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search pages or type to navigate..."
                    className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)',
                    }}
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Results */}
                <motion.div
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(20px)',
                  }}
                  layout
                >
                  {filteredItems.length > 0 ? (
                    <div className="max-h-96 overflow-y-auto">
                      {filteredItems.map((item, index) => (
                        <motion.button
                          key={item.path}
                          onClick={() => handleNavigation(item.path)}
                          className="w-full flex items-center gap-4 p-4 hover:bg-white/10 transition-all duration-200 text-left border-b border-white/10 last:border-b-0 group"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ x: 4 }}
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-400/20 transition-colors">
                            {getIcon(item.iconName)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-white group-hover:text-blue-200 transition-colors">
                              {item.title}
                            </div>
                            <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors truncate">
                              {item.description}
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors flex-shrink-0" />
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-white/60">
                      <Search className="w-8 h-8 mx-auto mb-2 text-white/40" />
                      <p>No results found for "{searchTerm}"</p>
                      <p className="text-sm mt-1">Try searching for pages, services, or topics</p>
                    </div>
                  )}
                </motion.div>

                {/* Quick Tips */}
                {searchTerm === '' && (
                  <motion.div
                    className="mt-4 text-center text-white/50 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p>💡 Try: "services", "portfolio", "contact", or "about"</p>
                    <p className="mt-1">Press Enter to navigate to the first result • ESC to close</p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationSearchBar;