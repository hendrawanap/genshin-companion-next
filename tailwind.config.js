module.exports = {
  // mode:'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundOpacity: {
        'disable': '4%',
        '15': '15%'
      },
      colors: {
        dark: {
          '0': '#1E1E1E',
          '5': '#292929',
          '15': '#404040',
          '25': '#565656',
        },
        'primary': '#7BC4FF',
        'danger': '#FF8989',
        'success': '#7AE07E',
        'navbar': '#1E1E1E',
        'google': '#EA99D8'
      },
      textOpacity: {
        'high': '87%',
        'medium': '60%',
        'disabled': '38%',
      },
      placeholderOpacity: {
        'high': '87%',
        'medium': '60%',
        'disabled': '38%',
      },
      fontSize: {
        '2xs': ['.625rem', '1rem']
      },
      fontFamily: {
        'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        'poppins': ['Poppins']
      },
      zIndex: {
        '-10': '-10',
        '-20': '-20',
        '-30': '-30'
      },
      minWidth: {
        'xs': '20rem',
        'sm': '24rem',
        'md': '28rem',
        'lg': '32rem',
        'xl': '42rem',
        '2xl': '48rem',
        '3xl': '56rem',
      },
      transitionProperty: {
        'height': 'height',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
