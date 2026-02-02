import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Rose gold / copper accent colors
        brand: {
          50: '#fdf8f6',
          100: '#f9ede8',
          200: '#f3d9cf',
          300: '#e9bfad',
          400: '#d4967a',
          500: '#c4836a',
          600: '#b87333',
          700: '#9a5d42',
          800: '#7d4a35',
          900: '#663d2d',
          950: '#371e16',
        },
        // Rose gold specific shades
        rose: {
          gold: '#b87c5c',
          light: '#d4a088',
          dark: '#8b5a3c',
        },
        // Dark theme background colors (lightened)
        dark: {
          50: '#3a3a3a',
          100: '#333333',
          200: '#2d2d2d',
          300: '#272727',
          400: '#222222',
          500: '#1e1e1e',
          600: '#1a1a1a',
          700: '#161616',
          800: '#121212',
          900: '#0e0e0e',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom, #1a1a1a, #0d0d0d)',
        'gradient-dark-reverse': 'linear-gradient(to top, #1a1a1a, #0d0d0d)',
        'gradient-radial': 'radial-gradient(ellipse at center, #1e1e1e, #0d0d0d)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(184, 124, 92, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(184, 124, 92, 0.4)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
