/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#FCFCFB',
          100: '#F9F9F8',
          200: '#F1F1EF',
          300: '#E4E4E1',
          400: '#D1D1CB',
        },
        dark: {
          950: '#060607',
          900: '#0B0B0D',
          850: '#111114',
          800: '#18181C',
          700: '#27272D',
          600: '#3F3F46',
        },
        accent: {
          DEFAULT: '#FF2E93',
          hover: '#E01E7E',
          light: '#FFE4F1',
          glow: 'rgba(255, 46, 147, 0.35)',
        },
        aws: {
          DEFAULT: '#FF9900',
          dark: '#232F3E',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
