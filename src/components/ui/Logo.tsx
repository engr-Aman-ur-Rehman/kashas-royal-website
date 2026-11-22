import { venue } from "@/data/venueData";

/** Transparent golden brand assets derived from the Kashas Royal emblem logo. */
export const LOGO_SRC = "/images/kashas-royal-logo.png";
export const LOGO_CREST_SRC = "/images/kashas-royal-crest.png";
export const LOGO_FLOURISH_SRC = "/images/kashas-royal-flourish.png";

interface LogoCrestProps {
  /** Tailwind width class, e.g. "w-11". Height follows the crest's natural proportion. */
  className?: string;
}

/** The transparent sculpted gold KR emblem crest on its own (header, mobile menu, badges). */
export function LogoCrest({ className = "w-11" }: LogoCrestProps) {
  return (
    <img
      src={LOGO_CREST_SRC}
      alt=""
      aria-hidden="true"
      width={473}
      height={576}
      draggable={false}
      className={`block h-auto shrink-0 select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] ${className}`}
    />
  );
}

/** The gold KR crest framed on a deep heritage olive tile with a crisp gold border, for light surfaces. */
export function LogoEmblem({ className = "w-16" }: LogoCrestProps) {
  return (
    <span
      className={`relative grid aspect-[4/5] shrink-0 place-items-center overflow-hidden rounded-[2px] bg-olive-deep p-[11%] shadow-[0_0_0_1px_rgb(var(--color-gold)),0_0_0_5px_rgb(var(--color-ivory)),0_0_0_6px_rgba(79,91,49,0.3)] ${className}`}
    >
      <LogoCrest className="w-full" />
    </span>
  );
}

/**
 * Header & mobile-menu lockup: sculpted transparent gold KR crest paired with
 * the modern handwritten `Beau Rivage` Kashas Royal signature wordmark.
 */
export function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`group/logo inline-flex items-center gap-3 ${className}`}>
      <LogoCrest className="w-10 transition-transform duration-base ease-editorial group-hover/logo:scale-[1.04] sm:w-11" />
      <span className="flex flex-col leading-none">
        <span className="brand-wordmark font-signature pb-0.5 pr-1.5 text-[1.95rem] leading-[0.94] sm:text-[2.3rem]">
          {venue.name}
        </span>
        <span className="mt-1 hidden font-sans text-[0.5625rem] font-medium uppercase tracking-[0.28em] text-gold-champagne/90 sm:block lg:hidden xl:block">
          {venue.tagline}
        </span>
      </span>
    </span>
  );
}

interface LogoFullProps {
  className?: string;
}

/**
 * Stacked footer lockup: transparent gold KR emblem crest above the modern
 * handwritten `Beau Rivage` Kashas Royal signature wordmark, tagline, and
 * matching golden ornamental flourish.
 */
export function LogoFull({ className = "" }: LogoFullProps) {
  return (
    <div
      className={`inline-flex flex-col items-center text-center ${className}`}
      aria-label={`${venue.name} — ${venue.tagline}`}
    >
      <LogoCrest className="w-24 sm:w-[6.75rem]" />
      <span className="brand-wordmark font-signature mt-2.5 pb-1 pr-2 text-[2.65rem] leading-[0.95] sm:text-[3rem]">
        {venue.name}
      </span>
      <span className="mt-1 font-sans text-[0.625rem] font-medium uppercase tracking-[0.3em] text-gold-champagne/90">
        {venue.tagline}
      </span>
      <img
        src={LOGO_FLOURISH_SRC}
        alt=""
        aria-hidden="true"
        width={502}
        height={60}
        draggable={false}
        className="mt-3 block h-auto w-44 select-none opacity-95 drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
      />
    </div>
  );
}
