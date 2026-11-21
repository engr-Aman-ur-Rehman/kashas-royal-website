import { motion, useReducedMotion } from "framer-motion";
import { splitTextContainer, splitTextWord, viewportOnce } from "@/config/motion";

export interface SplitSegment {
  text: string;
  className?: string;
}

interface SplitHeadingProps {
  /** Plain text or an array of segments (so accent words can carry their own colour). */
  text: string | SplitSegment[];
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  id?: string;
  className?: string;
  /** Animate immediately on mount (heroes) instead of waiting for viewport entry. */
  immediate?: boolean;
}

/**
 * Masked word-by-word headline reveal modelled directly on 8 Northumberland
 * Avenue's GSAP SplitText `.animate-title` (`1.2s circ.out`, `0.05s` word
 * stagger, `overflow-hidden` clip mask per word).
 */
export default function SplitHeading({
  text,
  as = "h2",
  id,
  className = "",
  immediate = false,
}: SplitHeadingProps) {
  const reduceMotion = useReducedMotion();
  const segments: SplitSegment[] = typeof text === "string" ? [{ text }] : text;
  const fullText = segments.map((segment) => segment.text).join(" ").replace(/\s+/g, " ").trim();
  const Component = motion[as];

  if (reduceMotion) {
    const PlainTag = as;
    return (
      <PlainTag id={id} className={className}>
        {segments.map((segment, index) => (
          <span key={`${segment.text}-${index}`} className={segment.className}>
            {index > 0 ? " " : ""}
            {segment.text}
          </span>
        ))}
      </PlainTag>
    );
  }

  return (
    <Component
      id={id}
      aria-label={fullText}
      className={className}
      variants={splitTextContainer}
      initial="hidden"
      {...(immediate ? { animate: "visible" } : { whileInView: "visible", viewport: viewportOnce })}
    >
      {segments.map((segment, segmentIndex) => {
        const words = segment.text.trim().split(/\s+/).filter(Boolean);
        return words.map((word, wordIndex) => {
          const isLastWordOverall =
            segmentIndex === segments.length - 1 && wordIndex === words.length - 1;
          return (
            <span
              key={`${segmentIndex}-${wordIndex}-${word}`}
              aria-hidden="true"
              className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top"
            >
              <motion.span
                variants={splitTextWord}
                className={`inline-block will-change-transform ${segment.className ?? ""}`}
              >
                {word}
                {isLastWordOverall ? "" : "\u00A0"}
              </motion.span>
            </span>
          );
        });
      })}
    </Component>
  );
}
