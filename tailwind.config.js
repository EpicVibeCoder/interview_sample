/** @type {import('tailwindcss').Config} */
const config = {
      content: ["./src/**/*.{js,jsx,ts,tsx}"],
      theme: {
            extend: {
                  animation: {
                        slideIn: "slideIn 0.5s ease-in-out",
                        slideOut: "slideOut 0.5s ease-in-out",
                  },
                  keyframes: {
                        slideIn: {
                              "0%": { transform: "translateX(100%)" },
                              "100%": { transform: "translateX(0)" },
                        },
                        slideOut: {
                              "0%": { transform: "translateX(-100%)" },
                              "100%": { transform: "translateX(0)" },
                        },
                  },
                  fontFamily: {
                        poppins: ["var(--font-poppins)", "sans-serif"],
                        raleway: ["var(--font-raleway)", "sans-serif"],
                        roboto: ["var(--font-roboto)", "sans-serif"],
                        "bebas-neue": ["var(--font-bebas-neue)", "cursive"],
                        sans: ["Open Sans", "sans-serif"],
                        inter: ["var(--font-inter)", "sans-serif"],
                  },
                  screens: {
                        xs: "370px", // Example of a smaller breakpoint
                  },
            },
      },
      plugins: [],
};

export default config;
