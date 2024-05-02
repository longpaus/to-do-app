/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c38fff',
        onPrimary: '#000000',
        secondary: '#03dac6',
        onSecondary: '#000000',
        background: '#121212',
        surface: '#1e1e1e',
        onSurface: 'white',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'focus'],
      primaryColor: ['hover', 'focus'],
      textColor: ['hover', 'focus'],
    },
  },
  plugins: [],
}

