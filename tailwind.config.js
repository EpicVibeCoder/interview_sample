/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        slideIn: 'slideIn 0.5s ease-in-out',
        slideOut: 'slideOut 0.5s ease-in-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'bebas-neue': ['"Bebas Neue"', 'cursive'],
        'sans': ['Open Sans', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      screens: {
        'xs': '370px', // Example of a smaller breakpoint
      },
      
    },
  },
  plugins: [],
}

