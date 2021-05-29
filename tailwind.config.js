module.exports = {
  mode:'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundOpacity: {
        'disable': '0.05'
      },
      colors: {
        'primary': '#89CAFF',
        'danger': '#FF8989',
        'success': '#7AE07E',
        'navbar': '#1E1E1E'
      },
      fontFamily: {
        'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        'poppins': ['Poppins']
      },
      zIndex: {
        '-10': '-10',
        '-20': '-20',
        '-30': '-30'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
