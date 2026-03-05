/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'IBM Plex Sans Arabic'", "'Tajawal'", "'IBM Plex Sans'", 'sans-serif'],
        tajawal: ["'Tajawal'", "'IBM Plex Sans Arabic'", 'sans-serif'],
      },
      colors: {
        charcoal: {
          DEFAULT: '#0f0f0f',
          mid: '#1a1a1a',
          light: '#242424',
        },
        gold: {
          DEFAULT: '#B8860B',
          deep: '#8B6914',
          bright: '#D4A017',
          shimmer: '#F0C040',
        },
        cream: {
          DEFAULT: '#F5F5DC',
        },
      },
    },
  },
  plugins: [],
};
