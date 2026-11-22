import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Accessibility,
  DoorOpen,
  Lamp,
  Lightbulb,
  Phone,
  RectangleVertical,
  ScanLine,
  Snowflake,
  Sparkles,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { changingRoomFeatures, hallFeatures, pageMeta, routes, specifications, venue } from "@/data/venueData";
import { media } from "@/data/media";
import { usePageMeta } from "@/hooks/usePageMeta";
import ArrowLink from "@/components/ui/ArrowLink";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import PageHero from "@/components/ui/PageHero";
import SmartImage from "@/components/ui/SmartImage";
import SplitHeading from "@/components/ui/SplitHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import CapacitySwitcher from "@/components/venue/CapacitySwitcher";

const featureIcons: Record<(typeof hallFeatures)[number]["id"], LucideIcon> = {
  walls: RectangleVertical,
  chandeliers: Lamp,
  lighting: Lightbulb,
  flooring: ScanLine,
  air: Snowflake,
  wifi: Wifi,
  mirrors: Sparkles,
  access: Accessibility,
};

/**
 * Scroll-expanding parallax CTA modelled on 8 Northumberland Avenue's
 * `.image-parallax-cta` (`border-radius: 10px` expanding gracefully toward
 * edge-to-edge on desktop scroll with subtle parallax drift).
 */
function WalkthroughParallaxCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const frameScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.94, 1, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={sectionRef} data-ambient-tone="warm-sand" aria-labelledby="walkthrough-heading" className="py-12 sm:py-16 lg:py-20">
      <div className="container-site">
        <motion.div
          style={reduceMotion ? undefined : { scale: frameScale }}
          className="relative isolate overflow-hidden rounded-card bg-olive-deep will-change-transform"
        >
          <motion.div
            style={reduceMotion ? undefined : { y: bgY }}
            className="pointer-events-none absolute -inset-y-12 inset-x-0 -z-20 will-change-transform"
          >
            <SmartImage image={media.walkthrough} alt="" className="h-full w-full !bg-olive-deep" />
          </motion.div>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-olive-deep/85" />
          <Reveal className="grid items-end gap-10 p-8 py-16 sm:p-14 sm:py-20 lg:grid-cols-12 lg:p-20 lg:py-24">
            <div className="lg:col-span-7">
              <Eyebrow tone="light">Venue Walkthrough</Eyebrow>
              <SplitHeading
                id="walkthrough-heading"
                as="h2"
                className="display-lg mt-6 text-ivory"
                text="See the hall in person"
              />
              <p className="lead mt-6 max-w-xl text-ivory/85">
                Nothing replaces standing in the room. Book an in-person tour and we will walk you through layouts,
                lighting and every practical detail.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:col-span-5 lg:justify-end">
              <Button to={`${routes.enquire}?viewing=1`} size="lg">
                Book a Viewing
              </Button>
              <Button
                href={venue.phone.href}
                variant="outlineLight"
                size="lg"
                icon={<Phone size={15} strokeWidth={1.5} />}
                iconPosition="left"
              >
                {venue.phone.display}
              </Button>
            </div>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}

export default function TheVenue() {
  usePageMeta(pageMeta.venue);

  return (
    <>
      <PageHero
        eyebrow="The Venue"
        title={
          <>
            Designed to Transform Around Your <em className="text-gold-champagne">Vision</em>
          </>
        }
        intro="Pristine white walls, grand crystal chandeliers and customisable LED mood lighting. One versatile ground-floor hall, ready to become whatever your occasion asks of it."
        image={media.venueHero}
      />

      {/* Capacity and layout switcher */}
      <section id="capacities" data-ambient-tone="ivory" aria-labelledby="capacities-heading" className="section-pad scroll-mt-20">
        <div className="container-site">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Capacities &amp; Layouts</Eyebrow>
              <SplitHeading
                id="capacities-heading"
                as="h2"
                className="display-lg mt-6"
                text="One hall, seven ways to gather"
              />
            </div>
            <p className="lead lg:col-span-4 lg:col-start-9">
              From a standing reception for {venue.maxGuests} to a boardroom of 200, the hall is arranged around the
              shape of your event.
            </p>
          </Reveal>
          <Reveal className="mt-12 lg:mt-16">
            <CapacitySwitcher />
          </Reveal>
        </div>
      </section>

      {/* Spaces and facilities */}
      <section data-ambient-tone="sage-mist" aria-labelledby="spaces-heading" className="section-pad">
        <div className="container-site">
          <Reveal>
            <Eyebrow>Spaces &amp; Facilities</Eyebrow>
            <h2 id="spaces-heading" className="sr-only">
              Spaces and facilities
            </h2>
          </Reveal>

          <div className="mt-10 grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal variant="editorial" className="group overflow-hidden rounded-card lg:sticky lg:top-28 lg:col-span-6">
              <SmartImage
                image={media.mainHall}
                className="aspect-[4/3] rounded-card lg:aspect-[5/6]"
                imgClassName="group-hover:scale-105"
              />
            </Reveal>
            <div className="lg:col-span-6">
              <Reveal>
                <p className="font-condensed-label text-xs font-semibold tracking-[0.2em] text-gold">01</p>
                <SplitHeading as="h3" className="display-lg mt-4" text="The Main Banqueting Hall" />
                <p className="lead mt-6 max-w-xl">
                  A single, expansive ground-floor hall. Its white walls are a deliberate blank canvas, so your colours,
                  florals and lighting define the room, not ours.
                </p>
              </Reveal>
              <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2">
                {hallFeatures.map((feature) => {
                  const Icon = featureIcons[feature.id];
                  return (
                    <RevealItem
                      as="li"
                      key={feature.id}
                      className="card-surface group flex gap-4 p-5 hover:-translate-y-1"
                    >
                      <span
                        aria-hidden="true"
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-olive/25 bg-stone/60 text-olive transition-all duration-base ease-editorial group-hover:border-olive-deep group-hover:bg-olive-deep group-hover:text-gold-champagne"
                      >
                        <Icon size={18} strokeWidth={1.35} />
                      </span>
                      <div>
                        <p className="font-condensed text-[1.375rem] leading-tight text-ink">{feature.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate">{feature.text}</p>
                      </div>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </div>
          </div>

          <div className="mt-20 grid items-center gap-12 lg:mt-32 lg:grid-cols-12 lg:gap-16">
            <Reveal className="order-2 lg:order-1 lg:col-span-5">
              <p className="font-condensed-label text-xs font-semibold tracking-[0.2em] text-gold">02</p>
              <SplitHeading as="h3" className="display-lg mt-4" text="Private Changing Room" />
              <p className="lead mt-6">
                A dedicated suite for the bride, groom or VIP hosts. Somewhere to prepare, to pause and to gather
                yourself before the entrance everyone is waiting for.
              </p>
              <ul className="mt-8 border-b border-hairline">
                {changingRoomFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="group flex items-center gap-4 border-t border-hairline py-4 text-ink transition-colors duration-base ease-editorial hover:border-gold/60"
                  >
                    <DoorOpen
                      size={18}
                      strokeWidth={1.25}
                      className="shrink-0 text-gold transition-transform duration-base ease-editorial group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal variant="editorial" className="group order-1 overflow-hidden rounded-card lg:order-2 lg:col-span-6 lg:col-start-7">
              <SmartImage
                image={media.changingRoom}
                className="aspect-[4/3] rounded-card"
                imgClassName="group-hover:scale-105"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section data-ambient-tone="champagne" aria-labelledby="specs-heading" className="section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Specifications</Eyebrow>
              <SplitHeading id="specs-heading" as="h2" className="display-lg mt-6" text="The details, stated plainly" />
              <p className="mt-6 max-w-sm">
                Technical, accessibility and vendor information for planners, suppliers and hosts. If something is not
                listed here, please ask.
              </p>
              <ArrowLink to={`${routes.enquire}#faqs`} className="mt-9">
                Read the Full FAQs
              </ArrowLink>
            </div>
          </Reveal>

          <RevealGroup as="dl" className="border-b border-hairline lg:col-span-7 lg:col-start-6">
            {specifications.map((spec) => (
              <RevealItem
                key={spec.id}
                className="grid gap-3 border-t border-hairline py-7 transition-colors duration-base ease-editorial hover:border-gold/50 sm:grid-cols-[13rem_1fr] sm:gap-8"
              >
                <dt className="font-condensed text-[1.75rem] leading-tight text-ink">{spec.title}</dt>
                <dd>
                  <ul className="space-y-2.5">
                    {spec.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed">
                        <span aria-hidden="true" className="mt-[0.7rem] h-px w-3 shrink-0 bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <WalkthroughParallaxCta />
    </>
  );
}
