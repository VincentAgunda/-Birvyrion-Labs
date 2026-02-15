/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter', // Assuming you've chosen Inter and imported it in public/index.html
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ],
      },
      colors: {
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          800: '#1e1e1e',
          900: '#121212',
          950: '#0a0a0a',
        },
        cyan: {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06B6D4',
          600: '#0891B2',
        },
        blue: {
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        'light-primary': '#1A202C',
        'light-secondary': '#4A5568',
        'light-accent': '#2563EB',
        'light-bg-base': '#FFFFFF',
        'light-bg-subtle': '#F8FAFC',
        'dark-primary': '#F8FAFC',
        'dark-secondary': '#A0AEC0',
        'dark-accent': '#22D3EE',
        'dark-bg-base': '#0A0A0A',
        'dark-bg-subtle': '#1F2937',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-pulse': 'fadePulse 1.2s ease-in-out infinite', // route indicator
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
        fadePulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.9)' },
          '50%': { opacity: '0.8', transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.backdrop-blur-sm': {
          'backdrop-filter': 'blur(4px)',
          '-webkit-backdrop-filter': 'blur(4px)',
        },
        '.backdrop-blur-md': {
          'backdrop-filter': 'blur(8px)',
          '-webkit-backdrop-filter': 'blur(8px)',
        },
        '.backdrop-blur-lg': {
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
        },
        '.backdrop-blur-xl': {
          'backdrop-filter': 'blur(24px)',
          '-webkit-backdrop-filter': 'blur(24px)',
        },
        '.backdrop-blur-2xl': {
          'backdrop-filter': 'blur(48px)',
          '-webkit-backdrop-filter': 'blur(48px)',
        },
        '.backdrop-blur-3xl': {
          'backdrop-filter': 'blur(64px)',
          '-webkit-backdrop-filter': 'blur(64px)',
        },
      };
      addUtilities(newUtilities, ['responsive', 'dark']);
    },
  ],
};
