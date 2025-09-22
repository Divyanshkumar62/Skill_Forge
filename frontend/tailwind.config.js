/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Solo Leveling inspired color palette
        solo: {
          // Primary dark blue from anime
          primary: '#0A1428',    // Deep midnight blue
          secondary: '#1B2951',  // Royal dark blue
          accent: '#2D4F8E',     // Medium blue
          light: '#4A7BC8',     // Lighter blue
          glow: '#6B9EFF',      // Bright blue glow
          purple: '#6A5ACD',    // Purple accents
          gold: '#FFD700',      // Gold highlights
          shadow: '#000B1A'     // Deepest shadow
        },
        // Gaming rarity colors
        rarity: {
          common: '#B0B0B0',    // Silver/Gray
          rare: '#4A90E2',      // Blue
          epic: '#9B59B6',      // Purple
          legendary: '#F39C12', // Orange/Gold
          mythic: '#E74C3C',    // Red
          divine: '#FFD700'     // Gold
        },
        // Status colors
        status: {
          success: '#27AE60',
          warning: '#F39C12',
          error: '#E74C3C',
          info: '#3498DB'
        }
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'power-pulse': 'powerPulse 2s ease-in-out infinite'
      },
      keyframes: {
        glow: {
          from: { textShadow: '0 0 20px #6B9EFF, 0 0 30px #6B9EFF, 0 0 40px #6B9EFF' },
          to: { textShadow: '0 0 10px #6B9EFF, 0 0 15px #6B9EFF, 0 0 20px #6B9EFF' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        powerPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(107, 158, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(107, 158, 255, 0.6)' }
        }
      },
      backdropBlur: {
        'xs': '2px'
      }
    },
  },
  plugins: [],
}