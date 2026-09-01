import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        shift: {
          orange: '#FE5E0E',
          black: '#0A0A0A',
          paper: '#F7F4EF',
          muted: '#9B938A',
          line: '#3A302B',
        },
      },
      fontFamily: {
        display: ['Satoshi', 'Inter', 'Arial', 'sans-serif'],
        body: ['Inter', 'Arial', 'sans-serif'],
        arabic: ['"IBM Plex Sans Arabic"', 'Arial', 'sans-serif'],
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
