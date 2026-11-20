import { BadgeCheck, ShieldCheck, Star } from "lucide-react";
import { trustSignals } from "@/data/venueData";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const icons = { hygiene: ShieldCheck, tagvenue: BadgeCheck, google: Star } as const;

/** Badge strip: Food Hygiene Rating, Tagvenue partner, Google reviews. */
export default function TrustStrip({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <RevealGroup
      as="ul"
      className={`grid border-y sm:grid-cols-3 ${dark ? "border-hairline-gold" : "border-hairline"}`}
    >
      {trustSignals.map((signal, index) => {
        const Icon = icons[signal.id];
        return (
          <RevealItem
            as="li"
            key={signal.id}
            className={`flex items-center gap-5 py-7 sm:px-8 sm:py-9 sm:first:pl-0 sm:last:pr-0 ${
              index > 0 ? `border-t sm:border-l sm:border-t-0 ${dark ? "border-hairline-gold" : "border-hairline"}` : ""
            }`}
          >
            <Icon size={30} strokeWidth={1} className="shrink-0 text-gold" aria-hidden="true" />
            <div>
              <p className={`font-display text-4xl font-medium leading-none ${dark ? "text-ivory" : "text-ink"}`}>
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
