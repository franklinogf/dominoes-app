/** @type {import('tailwindcss').Config} */
module.exports ={
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {   
    extend: {
      colors: {
        primary: {
          50: '#eff9ff',
          100: '#dff1ff',
          200: '#b8e5ff',
          300: '#78d2ff',
          400: '#31bbff',
          500: '#06a1ef',
          600: '#0081ce',
          700: '#0067a7',
          800: '#02578a',
          900: '#084872',
          950: '#062d4b',
      },
      
        red: {
          50: '#ffe5e9',
          100: '#f8bcc2',
          200: '#ed9298',
          300: '#e4676c',
          400: '#db3d3d',
          500: '#c2242f',
          600: '#981b2c',
          700: '#6d1225',
          800: '#440819',
          900: '#1e000a',
        },
      }
    },
  },
  plugins: [],
};
