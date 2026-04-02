import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary':   '#0F172A',
        'bg-card':      '#1E293B',
        'accent':       '#E11D48',
        'accent-glow':  '#F43F5E',
        'accent-hover': '#FB7185',
        'text-primary': '#F8FAFC',
        'text-muted':   '#94A3B8',
      },
    },
  },
  plugins: [],
}

export default config
