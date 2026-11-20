import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { editorialReveal, fadeUp, staggerContainer, viewportOnce } from "@/config/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** `fadeUp` for text, `editorial` for images and headline blocks. */
  variant?: "fadeUp" | "editorial";
  delay?: number;
  as?: "div" | "li" | "section" | "article";
}

const variantMap = { fadeUp, editorial: editorialReveal };

/** Animates its children into view once, the first time they are scrolled to. */
export function Reveal({ children, className, variant = "fadeUp", delay = 0, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={variantMap[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Component>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "dl";
}

/** Wrapper that staggers any <RevealItem> children as the group scrolls into view. */
export function RevealGroup({ children, className, as = "div" }: RevealGroupProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ children, className, variant = "fadeUp", as = "div" }: Omit<RevealProps, "delay">) {
  const Component = motion[as];
  return (
    <Component className={className} variants={variantMap[variant]}>
      {children}
    </Component>
  );
}
