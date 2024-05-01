/** @type {import('tailwindcss').Config} */
module.exports ={
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {   
    extend: {
      colors: {
        primary: {
          '50': '#edf3ff',
          '100': '#dfe7ff',
          '200': '#c5d3ff',
          '300': '#a2b6ff',
          '400': '#7d8efc',
          '500': '#5e67f6',
          '600': '#3835e9',
          '700': '#3933cf',
          '800': '#2f2ca7',
          '900': '#2b2c84',
          '950': '#1b194d',
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
