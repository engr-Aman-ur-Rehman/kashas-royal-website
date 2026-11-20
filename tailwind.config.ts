import type { Config } from "tailwindcss";

/**
 * Every colour, font and easing below points at a CSS custom property defined
 * in src/index.css, so the brand can be re-themed from that one file.
 */
const withAlpha = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        olive: {
          DEFAULT: withAlpha("--color-olive"),
          deep: withAlpha("--color-olive-deep"),
        },
        gold: {
          DEFAULT: withAlpha("--color-gold"),
          champagne: withAlpha("--color-champagne"),
        },
        ivory: withAlpha("--color-ivory"),
        stone: withAlpha("--color-stone"),
        ink: withAlpha("--color-ink"),
        slate: withAlpha("--color-slate"),
        hairline: {
          DEFAULT: "var(--hairline-light)",
          gold: "var(--hairline-dark)",
        },
        tier: {
          gold: withAlpha("--color-gold"),
          diamond: withAlpha("--color-tier-diamond"),
          platinum: withAlpha("--color-tier-platinum"),
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
      },
      letterSpacing: {
        eyebrow: "0.2em",
      },
      transitionTimingFunction: {
        editorial: "var(--ease-editorial)",
      },
      transitionDuration: {
        base: "var(--duration-base)",
        slow: "var(--duration-slow)",
      },
      borderRadius: {
        media: "var(--radius-media)",
      },
      maxWidth: {
        site: "86rem",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
} satisfies Config;
