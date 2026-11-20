import { venue } from "@/data/venueData";

/** The owner's logo file. Replace the file itself to update the logo everywhere. */
export const LOGO_SRC = "/images/kashas-royal-logo.jpg";

const KEY_FILTER_ID = "logo-gold-key";

/**
 * Colour-key filter for the logo artwork. The logo is a JPG with its own olive
 * backdrop; this filter makes that backdrop transparent (it keeps pixels that
 * are more red than green, i.e. the gold) so the gold artwork sits directly on
 * any surface. Rendered once by the Layout.
 *
 * If a future logo file has a different background, tune the last row of the
 * matrix, or pass `keyed={false}` to the logo components to show it as-is.
 */
export function LogoKeyFilter() {
  return (
    <svg width="0" height="0" className="pointer-events-none absolute" aria-hidden="true" focusable="false">
      <defs>
        <filter id={KEY_FILTER_ID} colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%">
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  12 -12 0 0 -0.2" />
        </filter>
      </defs>
    </svg>
  );
}

const keyStyle = { filter: `url(#${KEY_FILTER_ID})` } as const;

/*
 * Crop values that show only the KR crest from the 1200×889 logo artwork, and
 * a clip that trims away the tops of the "Kashas Royal" lettering, which sit
 * either side of the crest's lower finial. Adjust both if a differently
 * proportioned logo file is supplied.
 */
const crestCrop = { width: "207%", left: "-53.5%", top: "2%" } as const;
const crestClip = {
  clipPath: "polygon(0 0, 100% 0, 100% 87.8%, 55.5% 87.8%, 55.5% 94.2%, 45.2% 94.2%, 45.2% 87.8%, 0 87.8%)",
} as const;

interface LogoCrestProps {
  /** Tailwind width class, e.g. "w-11". Height follows the 4:5 crest proportion. */
  className?: string;
}

function CrestArt() {
  return (
    <span className="absolute inset-0 block" style={crestClip}>
      <img
        src={LOGO_SRC}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="absolute max-w-none select-none"
        style={{ ...crestCrop, ...keyStyle }}
      />
    </span>
  );
}

/** The gold KR crest on its own, for dark olive surfaces (header, mobile menu). */
export function LogoCrest({ className = "w-11" }: LogoCrestProps) {
  return (
    <span className={`relative block aspect-[4/5] shrink-0 overflow-hidden ${className}`}>
      <CrestArt />
    </span>
  );
}

/** The gold KR crest on a deep olive tile with a crisp gold frame, for light surfaces. */
export function LogoEmblem({ className = "w-16" }: LogoCrestProps) {
  return (
    <span
      className={`relative block aspect-[4/5] shrink-0 overflow-hidden rounded-[2px] bg-olive-deep shadow-[0_0_0_1px_rgb(var(--color-gold)),0_0_0_5px_rgb(var(--color-ivory)),0_0_0_6px_rgba(79,91,49,0.3)] ${className}`}
    >
      <span className="absolute inset-[9%] block">
        <CrestArt />
      </span>
    </span>
  );
}

/** Header lockup: gold crest beside the venue name, for dark surfaces. */
export function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoCrest className="w-10 sm:w-11" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.375rem] font-medium tracking-[0.04em] text-ivory sm:text-2xl">
          {venue.name}
        </span>
        <span className="mt-1.5 hidden font-sans text-[0.5625rem] font-medium uppercase tracking-[0.28em] text-gold-champagne sm:block lg:hidden xl:block">
          {venue.tagline}
        </span>
      </span>
    </span>
  );
}

interface LogoFullProps {
  className?: string;
  /** Set false to show the logo file untouched, on its own background. */
  keyed?: boolean;
}

/** The complete logo artwork: crest, wordmark and tagline. */
export function LogoFull({ className = "w-64", keyed = true }: LogoFullProps) {
  return (
    <img
      src={LOGO_SRC}
      alt={`${venue.name} — ${venue.tagline}`}
      width={1200}
      height={889}
      draggable={false}
      className={`block h-auto select-none ${className}`}
      style={keyed ? keyStyle : undefined}
    />
  );
}
