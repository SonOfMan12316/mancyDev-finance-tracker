module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'ch-beige': '#F8F4F0',
        'ch-lighter-beige': '#98908B',
        'ch-grey': '#696868',
        'ch-green': '#277C78',
        'ch-cyan': '#82C9D7',
        'ch-navy': '#626070',
        'ch-yellow': '#F2CDAC',
        'ch-dark-grey': '#201F24',
        'ch-light-grey': '#F2F2F2',
        'ch-lighter-grey': '#B3B3B3',
        'ch-red': '#C94736',
        'bg-beige': '#F2F3F7',
        'ch-black': '#000000'
      },
      flexGrow: {
        1.2: '1.2',
      },
      keyframes: {
        sidebarExpand: {
          '0%': { 'width': '5.5rem' },
          '100%': { 'width': '14rem' },
        },
        sidebarCollapse: {
          '0%': { 'min-width': '14rem' },
          '100%': { 'min-width': '5.5rem' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'sidebar-expand': 'sidebarExpand 0.5s ease-in-out forwards',
        'sidebar-collapse': 'sidebarCollapse 0.3s ease-in-out forwards',
        'fade-in': 'fadeIn 0.5s ease-in'
      },
      screens: {
        'xl': '1200px',
      },
    },
    fontFamily: {
      poppins: ['Poppins', 'ui-sans-serif'],
      publicSans: ['Public Sans', 'ui-sans-serif']
    },
    borderWidth: {
      '1': '1px',
      '1.5': '1.5px'
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
