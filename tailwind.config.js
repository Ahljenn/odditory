/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#282b30',
        secondary: '#181b20',
        odd: '#7c3aed',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
