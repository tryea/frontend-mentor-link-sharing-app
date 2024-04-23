import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light_grey: "#FAFAFA",
        grey: "#737373",
        dark_grey: "#333333",
        light_purple: "#EFEBFF",
        purple: "#633CFF",
        purple_hover: "#BEADFF",
        borders: "#D9D9D9",
        red: "#FF3939",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "short-height-desktop": {
          raw: "(max-height: 750px)",
        },
        "medium-height-desktop": {
          raw: "(min-height: 750px) and (max-height: 900px)",
        },
        "tall-height-desktop": {
          raw: "(min-height: 900px)",
        },
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addUtilities({
        ".body-m": {
          fontSize: "16px",
          lineHeight: "1.5",
          fontWeight: "400",
        },

        ".body-s": {
          fontSize: "12px",
          lineHeight: "1.5",
          fontWeight: "400",
        },

        ".heading-m": {
          fontSize: "32px",
          lineHeight: "1.5",
          fontWeight: "700",
        },

        ".heading-base": {
          fontSize: "24px",
          lineHeight: "1.5",
          fontWeight: "700",
        },

        ".heading-s": {
          fontSize: "16px",
          lineHeight: "1.5",
          fontWeight: "600",
        },
      });
    }),
  ],
};
export default config;
