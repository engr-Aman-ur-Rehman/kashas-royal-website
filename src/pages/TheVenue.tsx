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

export default function TheVenue() {
  usePageMeta(pageMeta.venue);

  return (
    <>
      <PageHero
        eyebrow="The Venue"
        title={
          <>
            Designed to Transform Around Your <em className="font-normal italic text-gold-champagne">Vision</em>
          </>
        }
        intro="Pristine white walls, grand crystal chandeliers and customisable LED mood lighting. One versatile ground-floor hall, ready to become whatever your occasion asks of it."
        image={media.venueHero}
      />

      {/* Capacity and layout switcher */}
      <section id="capacities" aria-labelledby="capacities-heading" className="section-pad scroll-mt-20">
        <div className="container-site">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Capacities &amp; Layouts</Eyebrow>
              <h2 id="capacities-heading" className="display-lg mt-6">
                One hall, seven ways to gather
              </h2>
            </div>
            <p className="lg:col-span-4 lg:col-start-9">
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
      <section aria-labelledby="spaces-heading" className="section-pad bg-stone">
        <div className="container-site">
          <Reveal>
            <Eyebrow>Spaces &amp; Facilities</Eyebrow>
            <h2 id="spaces-heading" className="sr-only">
              Spaces and facilities
            </h2>
          </Reveal>

          <div className="mt-10 grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal variant="editorial" className="lg:sticky lg:top-28 lg:col-span-6">
              <SmartImage image={media.mainHall} className="aspect-[4/3] rounded-media lg:aspect-[5/6]" />
            </Reveal>
            <div className="lg:col-span-6">
              <Reveal>
                <p className="font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-gold">01</p>
                <h3 className="display-lg mt-4">The Main Banqueting Hall</h3>
                <p className="lead mt-6 max-w-xl">
                  A single, expansive ground-floor hall. Its white walls are a deliberate blank canvas, so your colours,
                  florals and lighting define the room, not ours.
                </p>
              </Reveal>
              <RevealGroup as="ul" className="mt-10 grid border-t border-hairline sm:grid-cols-2">
                {hallFeatures.map((feature, index) => {
                  const Icon = featureIcons[feature.id];
                  return (
                    <RevealItem
                      as="li"
                      key={feature.id}
                      className={`flex gap-4 border-b border-hairline py-6 ${index % 2 === 1 ? "sm:pl-6" : "sm:pr-6"}`}
                    >
                      <Icon size={22} strokeWidth={1} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
                      <div>
                        <p className="font-display text-xl font-medium leading-snug text-ink">{feature.title}</p>
                        <p className="mt-1 text-sm leading-relaxed">{feature.text}</p>
                      </div>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </div>
          </div>

          <div className="mt-20 grid items-center gap-12 lg:mt-32 lg:grid-cols-12 lg:gap-16">
            <Reveal className="order-2 lg:order-1 lg:col-span-5">
              <p className="font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-gold">02</p>
              <h3 className="display-lg mt-4">Private Changing Room</h3>
              <p className="lead mt-6">
                A dedicated suite for the bride, groom or VIP hosts. Somewhere to prepare, to pause and to gather
                yourself before the entrance everyone is waiting for.
              </p>
              <ul className="mt-8 border-b border-hairline">
                {changingRoomFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-4 border-t border-hairline py-4 text-ink">
                    <DoorOpen size={18} strokeWidth={1} className="shrink-0 text-gold" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal variant="editorial" className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
              <SmartImage image={media.changingRoom} className="aspect-[4/3] rounded-media" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section aria-labelledby="specs-heading" className="section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Specifications</Eyebrow>
              <h2 id="specs-heading" className="display-lg mt-6">
                The details, stated plainly
              </h2>
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
                className="grid gap-3 border-t border-hairline py-7 sm:grid-cols-[13rem_1fr] sm:gap-8"
              >
                <dt className="font-display text-2xl font-medium leading-tight text-ink">{spec.title}</dt>
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

      {/* Walkthrough CTA */}
      <section aria-labelledby="walkthrough-heading" className="relative isolate overflow-hidden bg-olive">
        <SmartImage image={media.walkthrough} alt="" className="!absolute inset-0 -z-20 !bg-olive" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-olive/90" />
        <Reveal className="container-site grid items-end gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <Eyebrow tone="light">Venue Walkthrough</Eyebrow>
            <h2 id="walkthrough-heading" className="display-lg mt-6 text-ivory">
              See the hall in person
            </h2>
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
      </section>
    </>
  );
}
