/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'white': '#FFFFFF',
      },
    fontFamily: {
      tacticSans: ["TacticSans","sans-serif"],
    }
  },
},
plugins: [],
}