import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0a0a0c",
          800: "#121216",
          700: "#1a1a20",
          600: "#24242c",
        },
        ember: {
          DEFAULT: "#d4a23a",
          light: "#f0c860",
          deep: "#a87420",
          glow: "#ffcf6b",
        },
        blood: "#7c2230",
        frost: "#6fb6c9",
        arcane: "#9b6fc9",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontWeight: {
        "500": "500",
        "600": "600",
        "700": "700",
      },
      boxShadow: {
        ember: "0 0 24px -6px rgba(212,162,58,0.35)",
        "ember-strong": "0 0 40px -8px rgba(212,162,58,0.55)",
      },
      backgroundImage: {
        "erdtree-dusk":
          "radial-gradient(ellipse at 50% -10%, rgba(212,162,58,0.14), transparent 55%), radial-gradient(ellipse at 80% 110%, rgba(155,111,201,0.08), transparent 50%)",
      },
      keyframes: {
        emberPulse: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        emberPulse: "emberPulse 3.5s ease-in-out infinite",
        fadeUp: "fadeUp 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
