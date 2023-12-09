/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        text: {
          50: "#eef2f6",
          100: "#dde4ee",
          200: "#bbcadd",
          300: "#99afcc",
          400: "#7795bb",
          500: "#557aaa",
          600: "#446288",
          700: "#334966",
          800: "#223144",
          900: "#111822",
          950: "#090c11",
        },
        background: {
          50: "#eef1f7",
          100: "#dce4ef",
          200: "#b9c8df",
          300: "#96adcf",
          400: "#7391bf",
          500: "#5076af",
          600: "#405e8c",
          700: "#304769",
          800: "#202f46",
          900: "#101823",
          950: "#080c11",
        },
        main: {
          50: "#eef7f6",
          100: "#dcefee",
          200: "#b9dfdd",
          300: "#96cfcc",
          400: "#73bfbb",
          500: "#50afaa",
          600: "#408c88",
          700: "#306966",
          800: "#204644",
          900: "#102322",
          950: "#081111",
        },
        secondary: {
          50: "#f1f7ed",
          100: "#e3efdc",
          200: "#c7e0b8",
          300: "#acd095",
          400: "#90c171",
          500: "#74b14e",
          600: "#5d8e3e",
          700: "#466a2f",
          800: "#2e471f",
          900: "#172310",
          950: "#0c1208",
        },
        accent: {
          50: "#f8f3ed",
          100: "#f1e7da",
          200: "#e3d0b5",
          300: "#d5b890",
          400: "#c7a16b",
          500: "#b98946",
          600: "#946e38",
          700: "#6f522a",
          800: "#4a371c",
          900: "#251b0e",
          950: "#120e07",
        },
      },
    },
  },
  plugins: [],
};
