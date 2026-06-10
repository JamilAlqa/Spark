import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FBFAF7",
        ink: "#161618",
        gray2: "#73737B",
        faint: "#A6A6AD",
        line: "#E8E6DF",
        accent: "#F4571F",
      },
    },
  },
  plugins: [],
};
export default config;
