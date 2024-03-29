import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        mediaSpace: "4rem, 1fr",
      },
      colors: {
        blue: {
          "50": "#ecfdff",
          "100": "#d0f7fd",
          "200": "#a7effa",
          "300": "#6ae1f6",
          "400": "#26c9ea",
          "500": "#0bc2ea",
          "600": "#0b89af",
          "700": "#106f8e",
          "800": "#175a73",
          "900": "#174a62",
          "950": "#093143",
        },
      },
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-3px) translateX(-3px)" },
        },
        click: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.98)" },
        },
      },
      animation: {
        marquee: "marquee .3s ease-in-out ",
        float: "float 2.5s infinite ease-in-out",
        click: "click 100ms ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
