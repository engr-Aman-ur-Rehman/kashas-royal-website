import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { MediaImage } from "@/data/media";
import { fadeUp, staggerContainer } from "@/config/motion";
import SmartImage from "./SmartImage";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  image?: MediaImage;
  /** Shorter band for pages without a headline image. */
  compact?: boolean;
  children?: ReactNode;
}

/**
 * Inner-page hero with subtle scroll-linked parallax backdrop (echoing
 * 8 Northumberland Avenue's `.innerpage-hero .parallax-bg`) and condensed
 * Bricolage Grotesque Light display heading.
 */
export default function PageHero({ eyebrow, title, intro, image, compact = false, children }: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);

  return (
    <section
      ref={sectionRef}
      className={`relative isolate flex items-end overflow-hidden bg-olive-deep ${
        !image ? "surface-grain-dark" : ""
      } ${
        compact ? "min-h-[26rem] lg:min-h-[30rem]" : "min-h-[32rem] sm:min-h-[38rem] lg:min-h-[76svh]"
      }`}
    >
      {image ? (
        <>
          <motion.div
            style={reduceMotion ? undefined : { y: bgY, scale: bgScale }}
            className="pointer-events-none absolute -inset-y-8 inset-x-0 -z-20 will-change-transform"
          >
            <SmartImage image={image} priority alt="" className="h-full w-full !bg-olive-deep" />
          </motion.div>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-olive-deep via-olive-deep/60 to-ink/45"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/55 via-transparent to-transparent" />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_0%,rgb(var(--color-olive)/0.9),transparent_60%)]"
        />
      )}

      <motion.div
        className="container-site relative z-10 pb-14 pt-40 sm:pb-16 lg:pb-24"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={fadeUp} className="eyebrow flex items-center gap-4 text-gold-champagne">
          <span aria-hidden="true" className="h-px w-10 bg-gold" />
          {eyebrow}
        </motion.p>
        <motion.h1 variants={fadeUp} className="display-xl mt-6 max-w-5xl text-ivory text-shadow-soft">
          {title}
        </motion.h1>
        {intro ? (
          <motion.p variants={fadeUp} className="lead mt-6 max-w-2xl text-ivory/85">
            {intro}
          </motion.p>
        ) : null}
        {children ? (
          <motion.div variants={fadeUp} className="mt-9">
            {children}
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
}
