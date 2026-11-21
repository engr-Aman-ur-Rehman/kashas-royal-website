import type { Transition, Variants } from "framer-motion";

/**
 * Single source of truth for every Framer Motion animation on the site.
 * Curves and durations are tuned to match 8 Northumberland Avenue's motion
 * language: GSAP `circ.out` (1.2s, 0.05s word stagger) for display titles,
 * `0.5s ease-in-out` for UI hover & card choreography, and `0.9s` for
 * media & carousel transitions.
 */

export const easings = {
  /** GSAP `circ.out` equivalent — rapid launch, velvety long settle for titles & reveals. */
  circOut: [0, 0.55, 0.45, 1],
  /** Confident editorial deceleration for image masks and panels. */
  editorial: [0.22, 1, 0.36, 1],
  /** Symmetric 8na `ease-in-out` curve for cards, drawers, overlays and UI hovers. */
  inOut: [0.45, 0, 0.55, 1],
  /** Crisp exit / quick UI transition. */
  out: [0.33, 1, 0.68, 1],
} as const satisfies Record<string, readonly [number, number, number, number]>;

export const durations = {
  fast: 0.3,
  hover: 0.5,
  base: 0.7,
  slow: 0.9,
  title: 1.2,
  reveal: 1.4,
} as const;

export const staggers = {
  word: 0.05,
  tight: 0.06,
  base: 0.1,
  relaxed: 0.16,
} as const;

/** Shared `viewport` prop for scroll-triggered reveals (mirrors 8na ScrollTrigger `top 90%`, `once: true`). */
export const viewportOnce = { once: true, margin: "0px 0px -60px 0px" } as const;

export const transitions = {
  fast: { duration: durations.fast, ease: easings.inOut },
  hover: { duration: durations.hover, ease: easings.inOut },
  base: { duration: durations.base, ease: easings.circOut },
  slow: { duration: durations.slow, ease: easings.circOut },
  title: { duration: durations.title, ease: easings.circOut },
  overlay: { duration: 0.5, ease: easings.inOut },
  layout: { duration: 0.5, ease: easings.inOut },
} satisfies Record<string, Transition>;

/** Content rises gently while fading in with 8na's `circ.out` deceleration. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.title },
};

/** Plain opacity fade for overlays and cross-fading media (matches 8na 400ms fade swipers). */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: easings.inOut } },
  exit: { opacity: 0, transition: { duration: 0.35, ease: easings.inOut } },
};

/** Parent wrapper that staggers its `fadeUp` / `editorialReveal` children. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: staggers.base, delayChildren: 0.04 },
  },
};

/** Word-by-word masked SplitText container (mirrors 8na `setupSplits`, stagger 0.05s). */
export const splitTextContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: staggers.word, delayChildren: 0.02 },
  },
};

/** Single word rising cleanly out of its line mask (1.2s `circ.out`). */
export const splitTextWord: Variants = {
  hidden: { y: "105%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: transitions.title,
  },
};

/** Image and editorial block reveal: unmasked from bottom with gentle scale settle. */
export const editorialReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(10% 0% 0% 0% round 10px)", y: 24 },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0% round 10px)",
    y: 0,
    transition: { duration: durations.title, ease: easings.circOut },
  },
};

/** Cross-fade used when tabbed content swaps (events, capacities, menus). */
export const panelSwap: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easings.circOut } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: easings.inOut } },
};

/** Full-screen mobile menu drawer. */
export const drawer: Variants = {
  hidden: { opacity: 0, y: "-3%" },
  visible: { opacity: 1, y: "0%", transition: transitions.overlay },
  exit: { opacity: 0, y: "-2%", transition: { duration: 0.3, ease: easings.inOut } },
};

/** Dialog panels: privacy policy and gallery lightbox. */
export const modalPanel: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: transitions.hover },
  exit: { opacity: 0, y: 12, scale: 0.985, transition: transitions.fast },
};

/** Accordion body height animation (matches 8na 0.5s ease-in-out slideToggle). */
export const accordion: Variants = {
  collapsed: { height: 0, opacity: 0, transition: { duration: 0.4, ease: easings.inOut } },
  expanded: { height: "auto", opacity: 1, transition: { duration: 0.5, ease: easings.inOut } },
};
