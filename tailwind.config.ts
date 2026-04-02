import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f5f7fb",
        foreground: "#111827",
        accent: {
          DEFAULT: "#2563eb",
          dark: "#1d4ed8",
          soft: "#dbeafe",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      boxShadow: {
        panel: "0 24px 60px rgba(15, 23, 42, 0.08)",
        soft: "0 10px 35px rgba(15, 23, 42, 0.08)",
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(to right, rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.12) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
