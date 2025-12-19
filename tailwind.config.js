/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        neo: {
          yellow: '#FFEB3B',
          pink: '#FF6B9D',
          cyan: '#00E5FF',
          lime: '#C6FF00',
          orange: '#FF9800',
          purple: '#E040FB',
        },
      },
      boxShadow: {
        'neo': '6px 6px 0px 0px rgba(0, 0, 0, 1)',
        'neo-sm': '3px 3px 0px 0px rgba(0, 0, 0, 1)',
        'neo-lg': '8px 8px 0px 0px rgba(0, 0, 0, 1)',
        'neo-xl': '12px 12px 0px 0px rgba(0, 0, 0, 1)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
