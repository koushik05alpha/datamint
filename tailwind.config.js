/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#21883d',
          dark: '#176b2d',
          light: '#2da84f',
        },
        accent: '#10b981',
        mint: {
          DEFAULT: '#cfe7d6',
          soft: '#e8f3ec',
        },
        bg: {
          DEFAULT: '#faf9f5',
          2: '#ffffff',
        },
        surface: {
          DEFAULT: '#ffffff',
          2: '#f4f6f5',
          3: '#edf1ee',
        },
        ink: {
          DEFAULT: '#0f172a',
          2: '#334155',
          3: '#64748b',
        },
        border: {
          DEFAULT: '#e6eae7',
          2: '#eff2f0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 1px 2px rgba(15,23,42,.05), 0 1px 3px rgba(15,23,42,.03)',
        DEFAULT: '0 6px 20px rgba(15,23,42,.07), 0 2px 6px rgba(15,23,42,.04)',
        lg: '0 20px 50px rgba(15,23,42,.1), 0 8px 18px rgba(15,23,42,.05)',
        brand: '0 10px 30px rgba(33,136,61,.28)',
      },
    },
  },
  plugins: [],
};
