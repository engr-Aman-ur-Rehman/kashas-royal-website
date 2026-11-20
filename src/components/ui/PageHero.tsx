import type { ReactNode } from "react";
import { motion } from "framer-motion";
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

/** Inner-page hero: headline anchored bottom-left over a dark olive-charcoal wash. */
export default function PageHero({ eyebrow, title, intro, image, compact = false, children }: PageHeroProps) {
  return (
    <section
      className={`relative isolate flex items-end overflow-hidden bg-olive-deep ${
        compact ? "min-h-[26rem] lg:min-h-[30rem]" : "min-h-[32rem] sm:min-h-[36rem] lg:min-h-[72vh]"
      }`}
    >
      {image ? (
        <>
          <SmartImage image={image} priority alt="" className="!absolute inset-0 -z-20 !bg-olive-deep" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-olive-deep via-olive-deep/65 to-ink/55"
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
        className="container-site pb-14 pt-40 sm:pb-16 lg:pb-20"
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
