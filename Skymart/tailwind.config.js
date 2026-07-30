/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#C2FF00',
          hover: '#D4FF33',
          dark: '#A8E600',
          soft: 'rgba(194, 255, 0, 0.12)',
        },
        surface: {
          DEFAULT: '#0A0A0A',
          card: '#141414',
          soft: '#18181B',
          border: '#1F1F23',
          hover: '#1C1C21',
        },
        ink: {
          DEFAULT: '#FFFFFF',
          muted: '#A1A1AA',
          soft: '#71717A',
        },
        light: {
          bg: '#FAFAFA',
          card: '#FFFFFF',
          border: '#E5E7EB',
          text: '#18181B',
          muted: '#52525B',
        },
      },
      boxShadow: {
        'soft': '0 4px 24px -8px rgba(0, 0, 0, 0.4)',
        'glow': '0 0 40px -10px rgba(194, 255, 0, 0.35)',
        'card': '0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.1)',
        'card-hover': '0 10px 40px -12px rgba(0,0,0,0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        'hero-gradient': 'radial-gradient(ellipse 80% 50% at 30% 0%, rgba(194,255,0,0.12), transparent 60%)',
        'auth-split': 'linear-gradient(135deg, #0A0A0A 0%, #141414 50%, #0A0A0A 100%)',
      },
      backgroundSize: {
        'grid': '48px 48px',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
}
