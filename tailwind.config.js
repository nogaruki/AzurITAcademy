/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        /* ── Backgrounds ── */
        deep:        "var(--bg-deep)",
        card:        "var(--bg-card)",
        "card-hov":  "var(--bg-card-hover)",
        surface:     "var(--bg-surface)",
        nav:         "var(--bg-nav)",
        code:        "var(--bg-code)",
        /* ── Borders ── */
        line:        "var(--border)",
        "line-on":   "var(--border-active)",
        /* ── Text ── */
        pri:         "var(--text-primary)",
        sec:         "var(--text-secondary)",
        mut:         "var(--text-muted)",
        /* ── Accent ── */
        accent:      "var(--accent)",
        "accent-dim":"var(--accent-glow)",
        "accent-hi": "var(--accent-bright)",
        /* ── Status colors ── */
        "c-green":       "var(--green)",
        "c-green-dim":   "var(--green-glow)",
        "c-orange":      "var(--orange)",
        "c-orange-dim":  "var(--orange-glow)",
        "c-red":         "var(--red)",
        "c-red-dim":     "var(--red-glow)",
        "c-cyan":        "var(--cyan)",
        "c-cyan-dim":    "var(--cyan-glow)",
        "c-purple":      "var(--purple)",
      },
      fontFamily: {
        sans:  ["Outfit", "sans-serif"],
        mono:  ["JetBrains Mono", "monospace"],
        serif: ["Fraunces", "serif"],
      },
      screens: {
        "bp860": "860px",
      },
    },
  },
  plugins: [],
};
