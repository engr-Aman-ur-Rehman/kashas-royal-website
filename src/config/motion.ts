import type { Transition, Variants } from "framer-motion";

/**
 * Single source of truth for every Framer Motion animation on the site.
 * Adjust the curves and durations here to change the feel everywhere.
 * (CSS hover transitions use --ease-editorial / --duration-* in src/index.css.)
 */

export const easings = {
  /** Slow, confident deceleration used for almost everything. */
  editorial: [0.22, 1, 0.36, 1],
  /** Symmetric ease for overlays and drawers. */
  inOut: [0.65, 0, 0.35, 1],
  /** Gentle exit. */
  out: [0.33, 1, 0.68, 1],
} as const satisfies Record<string, readonly [number, number, number, number]>;

export const durations = {
  fast: 0.3,
  base: 0.7,
  slow: 1.1,
  reveal: 1.3,
} as const;

export const staggers = {
  tight: 0.06,
  base: 0.1,
  relaxed: 0.16,
} as const;

/** Shared `viewport` prop for scroll-triggered reveals. */
export const viewportOnce = { once: true, margin: "0px 0px -60px 0px" } as const;

export const transitions = {
  base: { duration: durations.base, ease: easings.editorial },
  slow: { duration: durations.slow, ease: easings.editorial },
  fast: { duration: durations.fast, ease: easings.out },
  overlay: { duration: 0.45, ease: easings.inOut },
  layout: { duration: 0.6, ease: easings.editorial },
} satisfies Record<string, Transition>;

/** Content rises a short distance while fading in. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: transitions.slow },
};

/** Plain opacity fade for overlays and subtle elements. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.base },
  exit: { opacity: 0, transition: transitions.fast },
};

/** Parent wrapper that staggers its `fadeUp` / `editorialReveal` children. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: staggers.base, delayChildren: 0.05 },
  },
};

/** Image and headline reveal: content is unmasked from the bottom edge up. */
export const editorialReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(12% 0% 0% 0%)", y: 24 },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    y: 0,
    transition: { duration: durations.reveal, ease: easings.editorial },
  },
};

/** Cross-fade used when tabbed content swaps (events, capacities, menus). */
export const panelSwap: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
  exit: { opacity: 0, y: -8, transition: transitions.fast },
};

/** Full-screen mobile menu. */
export const drawer: Variants = {
  hidden: { opacity: 0, y: "-4%" },
  visible: { opacity: 1, y: "0%", transition: transitions.overlay },
  exit: { opacity: 0, y: "-2%", transition: { duration: 0.3, ease: easings.inOut } },
};

/** Dialog panels: privacy policy and gallery lightbox. */
export const modalPanel: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: transitions.base },
  exit: { opacity: 0, y: 12, scale: 0.99, transition: transitions.fast },
};

/** Accordion body height animation. */
export const accordion: Variants = {
  collapsed: { height: 0, opacity: 0, transition: { duration: 0.4, ease: easings.inOut } },
  expanded: { height: "auto", opacity: 1, transition: { duration: 0.5, ease: easings.editorial } },
};
