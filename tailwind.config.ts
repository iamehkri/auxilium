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
        // Premium Digital Agency Brand Colors
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',  // Main brand blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',  // Main accent green
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',  // Main secondary purple
          600: '#9333ea',
          700: '#7c2d12',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',  // Main dark
          950: '#020617',
        },
        neutral: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        // Legacy colors for compatibility
        'empower-blue': '#3b82f6',
        'global-green': '#22c55e',
        'agentic-violet': '#a855f7',
        'white-sand': '#fafafa',
        'deep-space': '#0f172a',
      },
      fontFamily: {
        // Primary Typography Stack
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'display': ['CalSans-SemiBold', 'Inter', 'system-ui', 'sans-serif'],
        'heading': ['Sora', 'Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', 'monospace'],
        'code': ['Source Code Pro', 'Monaco', 'Cascadia Code', 'monospace'],
        // Premium fonts
        'cal': ['CalSans-SemiBold', 'system-ui', 'sans-serif'],
        'sora': ['Sora', 'system-ui', 'sans-serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'orbitron': ['Orbitron', 'Monaco', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1.1' }],
        '9xl': ['8rem', { lineHeight: '1.1' }],
        // Display sizes
        'display-xs': ['3rem', { lineHeight: '1.1' }],
        'display-sm': ['3.75rem', { lineHeight: '1.1' }],
        'display-md': ['4.5rem', { lineHeight: '1.1' }],
        'display-lg': ['6rem', { lineHeight: '1.1' }],
        'display-xl': ['8rem', { lineHeight: '1.1' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // Premium brand gradients
        'brand-primary': 'linear-gradient(135deg, #3b82f6 0%, #22c55e 50%, #a855f7 100%)',
        'brand-secondary': 'linear-gradient(120deg, #2563eb 0%, #16a34a 100%)',
        'brand-accent': 'linear-gradient(45deg, #a855f7 0%, #3b82f6 100%)',
        // Mesh gradients
        'mesh-gradient': 'radial-gradient(at 40% 20%, #3b82f6 0px, transparent 50%), radial-gradient(at 80% 0%, #22c55e 0px, transparent 50%), radial-gradient(at 80% 50%, #a855f7 0px, transparent 50%)',
        'dark-mesh': 'radial-gradient(at 40% 20%, rgba(59, 130, 246, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(34, 197, 94, 0.3) 0px, transparent 50%), radial-gradient(at 80% 50%, rgba(168, 85, 247, 0.3) 0px, transparent 50%)',
        // Dot patterns
        'dot-grid': 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
        'dot-grid-dense': 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 1px, transparent 1px)',
        // Legacy
        'agentic-gradient': 'linear-gradient(135deg, #3B82F6 0%, #22c55e 50%, #a855f7 100%)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'beam': 'beam 8s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'hologram-flicker': 'hologram-flicker 3s ease-in-out infinite',
        'quantum-pulse': 'quantum-pulse 2s ease-in-out infinite',
        'magnetic-field': 'magnetic-field 4s ease-in-out infinite',
        'liquid-morph': 'liquid-morph 6s ease-in-out infinite',
        'quantum-load': 'quantum-load 1s ease-out',
        'rotate-slow': 'spin 8s linear infinite',
        'rotate-reverse': 'spin 6s linear infinite reverse',
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
        'hologram-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
          '75%': { opacity: '0.9' },
        },
        'quantum-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(16, 185, 129, 0.4)',
            transform: 'scale(1.02)'
          },
        },
        'magnetic-field': {
          '0%': { 
            backgroundPosition: '0% 50%',
            filter: 'hue-rotate(0deg)'
          },
          '50%': { 
            backgroundPosition: '100% 50%',
            filter: 'hue-rotate(180deg)'
          },
          '100%': { 
            backgroundPosition: '0% 50%',
            filter: 'hue-rotate(360deg)'
          },
        },
        'liquid-morph': {
          '0%, 100%': { borderRadius: '50px 30px 40px 60px' },
          '25%': { borderRadius: '30px 60px 50px 40px' },
          '50%': { borderRadius: '60px 40px 30px 50px' },
          '75%': { borderRadius: '40px 50px 60px 30px' },
        },
        'quantum-load': {
          '0%': { 
            transform: 'scale(0) rotate(0deg)',
            opacity: '0'
          },
          '50%': { 
            transform: 'scale(1.2) rotate(180deg)',
            opacity: '1'
          },
          '100%': { 
            transform: 'scale(1) rotate(360deg)',
            opacity: '1'
          },
        },
      },
      backgroundSize: {
        'dot-size': '22px 22px',
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      transformOrigin: {
        'center-center': 'center center',
      },
      cursor: {
        'none': 'none',
      },
    },
  },
  plugins: [],
}
export default config