import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        rice: {
          50: "#fbfaf4",
          100: "#f4f0e3",
          200: "#e7dfc7"
        },
        ink: {
          700: "#243834",
          800: "#152a28",
          900: "#0c1c1b"
        },
        jade: {
          50: "#eef8f3",
          100: "#d6eee4",
          500: "#287d66",
          600: "#1e6855",
          700: "#175244"
        },
        cinnabar: {
          100: "#f8d7d0",
          500: "#b84432",
          700: "#823024"
        },
        amberInk: {
          100: "#f4dfb3",
          500: "#b8892d",
          700: "#765719"
        }
      },
      boxShadow: {
        panel: "0 18px 50px rgba(21, 42, 40, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
