module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'ch-beige': '#F8F4F0',
        'ch-grey': '#696868',
        'ch-green': '#277C78',
        'ch-cyan': '#82C9D7',
        'ch-navy': '#626070',
        'ch-yellow': '#F2CDAC',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
