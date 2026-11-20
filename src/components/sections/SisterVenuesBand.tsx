import { group } from "@/data/venueData";
import ArrowLink from "@/components/ui/ArrowLink";
import Eyebrow from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

interface SisterVenuesBandProps {
  /** `band` is the full editorial spotlight; `card` is the compact cross-link. */
  variant?: "band" | "card";
}

/** Cross-link to The Imperial Banqueting Hall and Kashas Suite Croydon. */
export default function SisterVenuesBand({ variant = "band" }: SisterVenuesBandProps) {
  const [imperial, suite] = group.sisterVenues.names;

  if (variant === "card") {
    return (
      <Reveal className="grid items-center gap-8 border border-hairline bg-ivory p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div>
          <Eyebrow>Our Sister Venues · South London</Eyebrow>
          <h2 className="display-md mt-5">
            {imperial} &amp; {suite}
          </h2>
          <p className="mt-4 max-w-2xl">
            Celebrating south of the river? {group.sisterVenues.description}
          </p>
        </div>
        <ArrowLink href={group.sisterVenues.url} external>
          Visit {group.sisterVenues.domain}
        </ArrowLink>
      </Reveal>
    );
  }

  return (
    <section aria-labelledby="sister-venues-heading" className="section-pad bg-stone">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <Eyebrow>Our Sister Venues · {group.sisterVenues.location}</Eyebrow>
          <h2 id="sister-venues-heading" className="display-lg mt-6">
            Also considering South London?
          </h2>
          <p className="lead mt-6 max-w-xl">{group.sisterVenues.description}</p>
        </Reveal>
        <Reveal className="lg:col-span-5 lg:col-start-8 lg:pt-12" delay={0.1}>
          <ul className="border-b border-hairline">
            {[imperial, suite].map((name) => (
              <li key={name} className="flex items-baseline gap-5 border-t border-hairline py-5">
                <span aria-hidden="true" className="text-gold">
                  →
                </span>
                <span className="font-display text-[1.75rem] leading-tight text-ink sm:text-4xl">{name}</span>
              </li>
            ))}
          </ul>
          <ArrowLink href={group.sisterVenues.url} external className="mt-9">
            Explore our Croydon venues
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
