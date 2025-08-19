import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Auxilium brand colors
        'auxilium-teal': '#4DD0E1',
        'resilience-violet': '#7C4DFF',
        'calm-sky': '#81D4FA',
        'digital-silver': '#CFD8DC',
        'deep-space': '#0B0C10',
        'white-sand': '#F9FAFB',
      },
      fontFamily: {
        'sora': ['Sora', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'orbitron': ['Orbitron', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'auxilium-gradient': 'linear-gradient(135deg, #4DD0E1 0%, #81D4FA 50%, #7C4DFF 100%)',
        'dot-grid': 'radial-gradient(circle, rgba(77, 208, 225, 0.1) 1px, transparent 1px)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'beam': 'beam 8s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        beam: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #4DD0E1, 0 0 10px #4DD0E1, 0 0 15px #4DD0E1' },
          '100%': { boxShadow: '0 0 10px #4DD0E1, 0 0 20px #4DD0E1, 0 0 30px #4DD0E1' },
        },
      },
      backgroundSize: {
        'dot-size': '22px 22px',
      },
    },
  },
  plugins: [],
}
export default config