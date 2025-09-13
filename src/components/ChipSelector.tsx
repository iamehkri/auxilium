'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

interface ChipOption {
  id: string;
  label: string;
  icon: string;
  description: string;
  color?: string;
}

interface ChipSelectorProps {
  title: string;
  message: string;
  options: ChipOption[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  allowMultiple?: boolean;
  maxSelections?: number;
  simpleLayout?: boolean;
  rowLayout?: boolean;
}

const ChipSelector: React.FC<ChipSelectorProps> = ({
  title,
  message,
  options,
  selectedIds,
  onSelect,
  allowMultiple = false,
  maxSelections = 1,
  simpleLayout = false,
  rowLayout = false
}) => {
  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="w-4 h-4" /> : <LucideIcons.HelpCircle className="w-4 h-4" />;
  };

  const handleSelect = (id: string) => {
    if (allowMultiple) {
      if (selectedIds.includes(id)) {
        // Deselect
        onSelect(id);
      } else if (selectedIds.length < maxSelections) {
        // Select if under limit
        onSelect(id);
      }
    } else {
      onSelect(id);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-8">
      <motion.div
        className="glassmorphic-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 font-['Inter',sans-serif]">{title}</h3>
          <p className="text-white/70 text-sm md:text-base font-['Inter',sans-serif]">{message}</p>
          {allowMultiple && (
            <p className="text-white/50 text-xs mt-2 font-['Inter',sans-serif]">
              Select up to {maxSelections} ({selectedIds.length}/{maxSelections} selected)
            </p>
          )}
        </div>

        <div className={
          simpleLayout
            ? "flex flex-wrap gap-3 justify-center"
            : rowLayout
            ? "flex flex-col gap-2"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        }>
          {options.map((option) => {
            const isSelected = selectedIds.includes(option.id);
            const canSelect = !allowMultiple || selectedIds.length < maxSelections || isSelected;

            if (simpleLayout) {
              return (
                <motion.button
                  key={option.id}
                  onClick={() => canSelect && handleSelect(option.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-md border ${
                    isSelected
                      ? 'bg-blue-500/20 border-blue-400 text-blue-400'
                      : canSelect
                      ? 'bg-white/15 border-white/20 text-white/90 hover:bg-white/25 hover:border-white/30'
                      : 'bg-white/5 border-white/10 text-white/40 opacity-50'
                  }`}
                  whileHover={canSelect ? { scale: 1.05 } : {}}
                  whileTap={canSelect ? { scale: 0.95 } : {}}
                  disabled={!canSelect}
                >
                  <div className={`w-5 h-5 ${option.color || 'text-white'}`}>
                    {getIconComponent(option.icon)}
                  </div>
                  <span className="text-sm font-medium whitespace-nowrap">
                    {option.label}
                  </span>
                </motion.button>
              );
            }

            if (rowLayout) {
              // Create a color array that cycles through different colors for question marks
              const colors = [
                'text-blue-400', 'text-green-400', 'text-yellow-400', 'text-purple-400',
                'text-pink-400', 'text-orange-400', 'text-cyan-400', 'text-red-400'
              ];
              const colorIndex = options.findIndex(opt => opt.id === option.id) % colors.length;
              const questionMarkColor = option.color || colors[colorIndex];

              return (
                <motion.button
                  key={option.id}
                  onClick={() => canSelect && handleSelect(option.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 backdrop-blur-md border text-left ${
                    isSelected
                      ? 'bg-blue-500/20 border-blue-400'
                      : canSelect
                      ? 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30'
                      : 'bg-white/5 border-white/10 opacity-50'
                  }`}
                  whileHover={canSelect ? { scale: 1.02 } : {}}
                  whileTap={canSelect ? { scale: 0.98 } : {}}
                  disabled={!canSelect}
                >
                  <div className={`flex-shrink-0 ${questionMarkColor}`}>
                    <LucideIcons.HelpCircle className="w-5 h-5" />
                  </div>
                  <span className={`text-sm font-medium flex-1 ${
                    isSelected ? 'text-white' : 'text-white/90'
                  }`}>
                    {option.label}
                  </span>
                  {isSelected && (
                    <div className="flex-shrink-0 text-blue-400">
                      <LucideIcons.Check className="w-5 h-5" />
                    </div>
                  )}
                </motion.button>
              );
            }

            return (
              <motion.button
                key={option.id}
                onClick={() => canSelect && handleSelect(option.id)}
                className={`chip-button ${
                  isSelected
                    ? 'chip-selected'
                    : canSelect
                    ? 'chip-available'
                    : 'chip-disabled'
                }`}
                whileHover={canSelect ? { scale: 1.02, y: -2 } : {}}
                whileTap={canSelect ? { scale: 0.98 } : {}}
                disabled={!canSelect}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`chip-icon ${
                    isSelected ? 'text-blue-400' : (option.color || 'text-white/60')
                  }`}>
                    {getIconComponent(option.icon)}
                  </div>
                  <h4 className={`chip-title ${
                    isSelected ? 'text-white' : 'text-white/80'
                  }`}>
                    {option.label}
                  </h4>
                </div>
                <p className={`chip-description ${
                  isSelected ? 'text-white/90' : 'text-white/60'
                }`}>
                  {option.description}
                </p>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default ChipSelector;