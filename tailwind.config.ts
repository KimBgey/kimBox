import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        creme: "#F2EDE3",
        "creme-sec": "#E7DFD1",
        noir: "#1A1008",
        "noir-soft": "#2A1E16",
        rouge: "#C8231A",
        "rouge-deep": "#9E1B14",
        "rouge-doux": "#E04A3F",
        brun: "#8B7355",
        "brun-clair": "#B8A892",
      },
      fontFamily: {
        title: ["Playfair Display", "Cinzel", "serif"],
        body: ["Instrument Serif", "Literata", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;