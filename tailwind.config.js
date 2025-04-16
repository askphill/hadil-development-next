/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#151515',
    },
    extend: {
      colors: {
        danger: '#cc3300',
        success: '#22bb33',
      },
    },
  },
  plugins: [],
};
