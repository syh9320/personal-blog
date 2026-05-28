/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        page: "var(--page)",
        surface: "var(--surface)",
        "surface-raised": "var(--surface-raised)",
        "surface-muted": "var(--surface-muted)",
        "border-soft": "var(--border-soft)",
        "border-strong": "var(--border-strong)",
        "text-primary": "var(--text-primary)",
        "text-muted": "var(--text-muted)",
        accent: "var(--accent)",
        "accent-strong": "var(--accent-strong)",
        "accent-soft": "var(--accent-soft)",
        "success-soft": "var(--success-soft)",
      },
      fontFamily: {
        sans: ['Inter', '"Noto Sans SC"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "0.5rem",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
      },
    },
  },
  plugins: [typography],
};
