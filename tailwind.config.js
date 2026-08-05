/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        card: "rgba(15, 23, 42, 0.75)",
        "card-secondary": "rgba(19, 29, 49, 0.8)",
        border: "rgba(30, 41, 59, 0.8)",
        primary: {
          DEFAULT: "#00E5FF",
          glow: "rgba(0, 229, 255, 0.3)",
        },
        secondary: {
          DEFAULT: "#FF006E",
          glow: "rgba(255, 0, 110, 0.3)",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          glow: "rgba(139, 92, 246, 0.3)",
        },
        muted: "#94A3B8",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Consolas", "Courier New", "monospace"],
        sans: ["Inter", "Roboto", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "radar-sweep": "radarSweep 6s linear infinite",
        "scanline": "scanline 8s linear infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite alternate",
      },
      keyframes: {
        radarSweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        glowPulse: {
          "0%": { boxShadow: "0 0 5px rgba(0, 229, 255, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(0, 229, 255, 0.6), 0 0 35px rgba(0, 229, 255, 0.2)" },
        },
      },
      boxShadow: {
        "cyber-cyan": "0 0 20px rgba(0, 229, 255, 0.25)",
        "cyber-pink": "0 0 20px rgba(255, 0, 110, 0.3)",
        "cyber-purple": "0 0 20px rgba(139, 92, 246, 0.3)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};
