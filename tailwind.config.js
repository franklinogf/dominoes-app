/** @type {import('tailwindcss').Config} */
module.exports ={
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
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
          '50': '#fff0f0',
        '100': '#ffdddd',
        '200': '#ffc0c0',
        '300': '#ff9494',
        '400': '#ff5757',
        '500': '#ff2323',
        '600': '#ff0000',
        '700': '#d70000',
        '800': '#b10303',
        '900': '#920a0a',
        '950': '#500000',
        },
      }
    },
  },
  plugins: [],
};
