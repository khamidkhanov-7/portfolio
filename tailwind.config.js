/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#050505',
          900: '#0a0a0a',
          850: '#0f0f0f',
          800: '#161616',
          700: '#1f1f1f',
          600: '#2a2a2a',
          500: '#3a3a3a',
          400: '#6b6b6b',
          300: '#9a9a9a',
          200: '#c4c4c4',
          100: '#e8e8e8',
        },
        accent: {
          DEFAULT: '#e8c547',
          soft: '#f0d56e',
          deep: '#c9a83a',
        },
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-ring': 'pulse-ring 3s ease-out infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.5' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
