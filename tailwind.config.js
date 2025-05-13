/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        'ch-purple': '#826CB0',
        'ch-magenta': '#934F6F',
        'ch-torquoise': '#597C7C',
        'ch-brown': '#93674C',
        'ch-blue': '#3F82B2',
        'ch-black': '#000000',
        'ch-modal': 'rgba(0,0,0,0.7)'
      },
      flexGrow: {
        1.2: '1.2',
      },
      minWidth: {
        '14': '14rem',
        '5.5': '5.5rem'
      },
      maxWidth: {
        'xl': '35rem',
        '8.375': '8.375rem'
      },
      width: {
        '5.5': '5.5rem',
        '35': '35rem',
      },
      boxShadow: {
        'budget-popover': '0px 4px 24px rgba(0, 0, 0, 0.25)'
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
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(100%)', opacity: 0 },
        },
      },
      animation: {
        'sidebar-expand': 'sidebarExpand 0.5s ease-in-out forwards',
        'sidebar-collapse': 'sidebarCollapse 0.3s ease-in-out forwards',
        'fade-in': 'fadeIn 0.5s ease-in',
        slideUp: 'slideUp 0.15s ease-out forwards',
        slideDown: 'slideDown 0.15s ease-in forwards',
      },
      screens: {
        'xl': '1200px',
      },
    },
    fontFamily: {
      poppins: ['Poppins', 'ui-sans-serif'],
      publicSans: ['Public Sans', 'ui-sans-serif']
    },
    // borderWidth: {
    //   '1': '1px',
    //   '1.5': '1.5px'
    // },
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
