import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-mesh":
          "radial-gradient(166.82% 166.82% at 103.90% -10.39%, #E84D70 0%, #A337F6 53.09%, #28A7ED 100%)",
      },
    },
    colors: {
      purple: "#AD1FEA",
      "royal-blue": "#4661E6",
      "american-blue": "#373F68",
      white: "#FFF",
      "alice-blue": "#F2F4FF",
      "ghost-white": "#F7F8FD",
      "dark-blue-gray": "#647196",
      "vivid-tangerine": "#F49F85",
      "maya-blue": "#62BCFA",
      jasper: "#D73737",
    },
    fontFamily: {
      jost: ["Jost", "serif"],
    },
  },
  plugins: [],
};
export default config;
