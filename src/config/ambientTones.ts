export type AmbientToneId =
  | "ivory"
  | "warm-stone"
  | "sage-mist"
  | "champagne"
  | "olive-mist"
  | "warm-sand";

export interface AmbientToneConfig {
  /** Base canvas background colour that smoothly transitions on scroll. */
  bg: string;
  /** Subtle off-centre radial tint that drifts softly across the grainy canvas. */
  wash: string;
  /** Position of the subtle ambient radial glow for gentle tonal movement. */
  washPosition: string;
}

/**
 * Curated Kashas Royal scroll-reactive canvas palette.
 * Inspired by 8 Northumberland Avenue's seamless page-wide background colour
 * shifts, translated faithfully into Kashas Royal's editorial ivory, warm
 * architectural stone, soft heritage sage-olive mist and champagne linen tones.
 * Every tone maintains > 13:1 contrast against Deep Charcoal Ink (#1A1C16).
 */
export const ambientTones: Record<AmbientToneId, AmbientToneConfig> = {
  ivory: {
    bg: "#F8F6F0",
    wash: "rgba(229, 197, 114, 0.12)",
    washPosition: "18% 15%",
  },
  "warm-stone": {
    bg: "#ECE6D8",
    wash: "rgba(200, 155, 60, 0.13)",
    washPosition: "82% 28%",
  },
  "sage-mist": {
    bg: "#DCE3D1",
    wash: "rgba(79, 91, 49, 0.11)",
    washPosition: "22% 52%",
  },
  champagne: {
    bg: "#EFE4CC",
    wash: "rgba(200, 155, 60, 0.16)",
    washPosition: "78% 60%",
  },
  "olive-mist": {
    bg: "#E2E6DA",
    wash: "rgba(79, 91, 49, 0.1)",
    washPosition: "30% 40%",
  },
  "warm-sand": {
    bg: "#E9DFCC",
    wash: "rgba(181, 142, 66, 0.14)",
    washPosition: "72% 35%",
  },
};

export const DEFAULT_AMBIENT_TONE: AmbientToneId = "ivory";
