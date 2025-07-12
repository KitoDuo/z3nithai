/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zenith-lavender': '#E6E6FA', // Example lavender
        'zenith-pink': '#FFB6C1',     // Example baby pink
        'zenith-blue': '#ADD8E6',     // Example sky blue
        'zenith-mint': '#98FB98',     // Example mint green
        'zenith-beige': '#F5F5DC',    // Example beige
        'zenith-white': '#FFFFFF',
        'zenith-gray': {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'], // Or DM Sans
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-typing': 'fadeIn 0.5s ease-out forwards, typeWriter 2s steps(40, end) 0.5s forwards',
        'pulse-gentle': 'pulseGentle 2s infinite ease-in-out',
        'slide-in-up': 'slideInUp 0.5s ease-out forwards',
        'bubble-float': 'bubbleFloat 5s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        typeWriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        pulseGentle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        bubbleFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
