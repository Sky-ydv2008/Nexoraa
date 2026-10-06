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
        'nex-bg': '#080D1D',
        'nex-surface': '#0D1428',
        'nex-darkblue': '#111A35',
        'nex-indigo': '#3036A6',
        'nex-electric': '#3478F6',
        'nex-cyan': '#22D3EE',
        'nex-cyan-light': '#67E8F9',
        'nex-primary': '#F5F7FF',
        'nex-secondary': '#A7B0C5',
        'nex-muted': '#5F6980',
        'nex-border': 'rgba(255, 255, 255, 0.10)',
        'nex-border-bright': 'rgba(103, 232, 249, 0.35)',
      },
      fontFamily: {
        display: ['Syne', 'Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
