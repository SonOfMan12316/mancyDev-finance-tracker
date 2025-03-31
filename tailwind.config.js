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
        'ch-dark-grey': '#201F24',
        'ch-light-grey': '#F2F2F2',
        'ch-lighter-grey': '#B3B3B3',
        'ch-red': '#C94736'
      },
      keyframes: {
        sidebarExpand: {
          '0%': { 'min-width': '5.5rem' },
          '100%': { 'min-width': '16rem' },
        },
        sidebarCollapse: {
          '0%': { 'min-width': '16rem' },
          '100%': { 'min-width': '5.5rem' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'sidebar-expand': 'sidebarExpand 0.3s ease-in-out forwards',
        'sidebar-collapse': 'sidebarCollapse 0.3s ease-in-out forwards',
        'fade-in': 'fadeIn 0.5s ease-in'
      },
    },
    fontFamily: {
      poppins: ['Poppins', 'ui-sans-serif']
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('hover-focus-active', ['&:hover', '&:focus', '&:active'], 'expanded', '&.expanded');
    },
  ],
}
