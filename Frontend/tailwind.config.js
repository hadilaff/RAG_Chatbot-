/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green1: 'rgb(3, 129, 3)',
        green2: 'rgb(49, 151, 49)',
        green3: 'rgb(199, 226, 199)',
        lightBlue: 'rgb(173, 216, 230)',
        lightGray: 'rgb(206, 212, 218)',
        darkGray: 'rgb(173, 181, 189)',
        blue: 'rgb(0, 35, 187)'
      }
    },
  },
  plugins: [],
}

