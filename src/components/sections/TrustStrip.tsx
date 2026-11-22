import { BadgeCheck, ShieldCheck, Star } from "lucide-react";
import { trustSignals } from "@/data/venueData";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const icons = { hygiene: ShieldCheck, tagvenue: BadgeCheck, google: Star } as const;

/** Badge strip: Food Hygiene Rating, Tagvenue partner, Google reviews. */
export default function TrustStrip({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <RevealGroup as="ul" className="grid gap-5 sm:grid-cols-3">
      {trustSignals.map((signal) => {
        const Icon = icons[signal.id];
        return (
          <RevealItem
            as="li"
            key={signal.id}
            className={`group flex items-center gap-5 rounded-card border p-6 transition-all duration-base ease-editorial hover:-translate-y-1 sm:p-8 ${
              dark
                ? "border-hairline-gold bg-olive/30 hover:border-gold-champagne/70 hover:bg-olive/45"
                : "border-hairline bg-ivory/85 backdrop-blur-[2px] hover:border-gold/75 hover:bg-ivory/95 hover:shadow-[0_24px_48px_-28px_rgb(var(--color-olive-deep)/0.28)]"
            }`}
          >
            <span
              aria-hidden="true"
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-all duration-base ease-editorial ${
                dark
                  ? "border-gold/50 text-gold-champagne group-hover:border-gold group-hover:bg-gold group-hover:text-ink"
                  : "border-olive/25 bg-stone/60 text-olive group-hover:border-olive-deep group-hover:bg-olive-deep group-hover:text-gold-champagne"
              }`}
            >
              <Icon size={22} strokeWidth={1.35} />
            </span>
            <div>
              <p className={`font-condensed text-[2.75rem] leading-none sm:text-[3.25rem] ${dark ? "text-ivory" : "text-ink"}`}>
                {signal.value}
                {signal.stars ? (
                  <>
                    <Star
                      size={20}
                      strokeWidth={0}
                      fill="currentColor"
                      className="mb-2 ml-1.5 inline-block text-gold"
                      aria-hidden="true"
                    />
                    <span className="sr-only"> stars</span>
                  </>
                ) : null}
              </p>
              <p className={`eyebrow mt-2.5 ${dark ? "text-gold-champagne" : "text-olive"}`}>{signal.label}</p>
              <p className={`mt-1 text-xs ${dark ? "text-ivory/65" : "text-slate"}`}>{signal.detail}</p>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
