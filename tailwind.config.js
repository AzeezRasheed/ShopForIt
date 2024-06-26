/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      macbook16: "3072px",
    },
    backgroundImage: {
      none: "none",
      "gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))",
      "gradient-to-tr":
        "linear-gradient(to top right, var(--tw-gradient-stops))",
      "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
      "gradient-to-br":
        "linear-gradient(to bottom right, var(--tw-gradient-stops))",
      "gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
      "gradient-to-bl":
        "linear-gradient(to bottom left, var(--tw-gradient-stops))",
      "gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))",
      "gradient-to-tl":
        "linear-gradient(to top left, var(--tw-gradient-stops))",
    },
    cursor: {
      auto: "auto",
      default: "default",
      pointer: "pointer",
      wait: "wait",
      text: "text",
      move: "move",
      "not-allowed": "not-allowed",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      sen: ["Playfair Display", "serif"],
      Montserrat: ["Montserrat", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
      Manrope: ["Manrope", "sans-serif"],
      Roboto: ["Roboto", "sans-serif"],
      Artifika: ["Artifika", "sans-serif"],
      OpenSans: ["OpenSans", "sans-serif"],
      Sacramento: ["Sacramento", "sans-serif"],
      BeauRivage: ["Sacramento", "cursive"],
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      small: ["0.875rem", { lineHeight: "1rem" }],
      larger: ["0.875rem", { lineHeight: "1.5rem" }],
      "small-text": ["1rem", { lineHeight: "1.25rem" }],
      "large-text": ["1.75rem", { lineHeight: "2rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "1" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    fontWeight: {
      thin: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },

    extend: {
      width: {
        "1/7": "14.2857143%",
        "2/7": "28.5714286%",
        "3/7": "42.8571429%",
        "4/7": "57.1428571%",
        "5/7": "71.4285714%",
        "6/7": "85.7142857%",
        modal: "50rem",
        "large-modal": "60rem",
        "input-sm": "21rem",
        "input-lg": "44rem",
        "mini-modal": "40rem",
      },
      height: {
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "48px",
        modal: "36rem",
        "large-modal": "45.5rem",
        "main-modal": "40rem",
        "sub-modal": "37rem",
        "mini-modal": "11.5rem",
        "small-modal": "18.5rem",
      },
    },
    extend: {},
  },
  plugins: [require("tailwindcss"), require("tailwindcss/nesting")],
};
