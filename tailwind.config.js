/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        Tprimary: {
          DEFAULT: "#D20653",
          50: "#fef1f8",
          100: "#fee5f2",
          200: "#ffcae7",
          300: "#ff9fd1",
          400: "#ff64b1",
          500: "#fe3691",
          600: "#ef136d",
          700: "#d20653",
          800: "#ac0844",
          900: "#8f0c3c",
          950: "#58001f",
        },
        secondary: {
          DEFAULT: "#FF951D",
          50: "#fff9ed",
          100: "#fff2d4",
          200: "#ffe2a8",
          300: "#ffcb70",
          400: "#ffa937",
          500: "#ff951d",
          600: "#f07206",
          700: "#c75607",
          800: "#9e430e",
          900: "#7f3a0f",
          950: "#451b05",
        },

        darkColor: {
          DEFAULT: "#333333",
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#828282",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#333333",
          950: "#262626",
        },
        whiteColor: {
          DEFAULT: "#ffffff",
          50: "#ffffff",
          100: "#efefef",
          200: "#dcdcdc",
          300: "#bdbdbd",
          400: "#989898",
          500: "#7c7c7c",
          600: "#656565",
          700: "#525252",
          800: "#464646",
          900: "#3d3d3d",
          950: "#292929",
        },
        bodyBg: {
          DEFAULT: "#F6F4F5",
          50: "#f6f4f5",
          100: "#f2eef0",
          200: "#e7e1e4",
          300: "#d6cbd1",
          400: "#bcadb5",
          500: "#a3909a",
          600: "#8c7681",
          700: "#74616a",
          800: "#61535a",
          900: "#54484e",
          950: "#2b2428",
        },
      },

      fontFamily: {
        Nunito: ["Nunito", "sans-serif"],
        Abril: ["Abril Fatface", "cursive"],
      },
    },
  },
};
