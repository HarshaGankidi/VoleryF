import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Pure-black system (no blue tint)
        sapphire: {
          DEFAULT: '#0B0B0D',
          deep: '#070708',
        },
        obsidian: '#16161A',
        abyssal: '#000000',
        pearl: '#F0E8D6',
        pewter: '#B8B5B0',
        brushed: '#9B9A95',
        champagne: {
          DEFAULT: '#E8DDB8',
          deep: '#C6B884',
        },
        // Olive kept only because the token reference exists in old utility classes
        // (e.g. ghost-button tone="olive"). The Decision section no longer uses it.
        olive: {
          DEFAULT: '#2D3325',
          deep: '#23281D',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      letterSpacing: {
        eyebrow: '0.3em',
        display: '-0.035em',
      },
      transitionTimingFunction: {
        'arrival': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'interactive': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
