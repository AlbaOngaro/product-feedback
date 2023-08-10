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
          "radial-gradient(at 36% 81%, hsla(351,76%,71%,1) 0px, transparent 50%),\
          radial-gradient(at 99% 75%, hsla(296,88%,65%,1) 0px, transparent 50%),\
          radial-gradient(at 76% 70%, hsla(261,84%,68%,1) 0px, transparent 50%),\
          radial-gradient(at 70% 53%, hsla(63,72%,62%,1) 0px, transparent 50%),\
          radial-gradient(at 54% 72%, hsla(67,73%,61%,1) 0px, transparent 50%),\
          radial-gradient(at 89% 64%, hsla(176,60%,79%,1) 0px, transparent 50%),\
          radial-gradient(at 89% 44%, hsla(350,84%,66%,1) 0px, transparent 50%)",
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
