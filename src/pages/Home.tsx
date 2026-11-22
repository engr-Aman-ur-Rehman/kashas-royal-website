import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Accessibility, ArrowRight, Car, Download, TrainFront } from "lucide-react";
import {
  eventTypes,
  group,
  pageMeta,
  routes,
  signatureStarters,
  valuePillars,
  venue,
  type EventTypeId,
} from "@/data/venueData";
import { media } from "@/data/media";
import { easings, fade, fadeUp, panelSwap, staggerContainer } from "@/config/motion";
import { usePageMeta } from "@/hooks/usePageMeta";
import ArrowLink from "@/components/ui/ArrowLink";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import SmartImage from "@/components/ui/SmartImage";
import SplitHeading from "@/components/ui/SplitHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TabList, TabPanel } from "@/components/ui/Tabs";
import FaqPreview from "@/components/sections/FaqPreview";
import ReviewsSlider from "@/components/sections/ReviewsSlider";
import TrustStrip from "@/components/sections/TrustStrip";

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={heroRef} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-olive-deep">
      {/* Parallax backdrop echoing 8 Northumberland Avenue's `.innerpage-hero .parallax-bg`. */}
      <motion.div
        style={reduceMotion ? undefined : { y: bgY, scale: bgScale }}
        className="pointer-events-none absolute inset-x-0 -top-6 -z-20 h-[120%] will-change-transform"
      >
        <SmartImage image={media.hero} priority alt="" className="h-full w-full !bg-olive-deep" />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-olive-deep via-olive-deep/55 to-ink/45"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/65 via-ink/15 to-transparent" />

      <motion.div
        className="container-site pb-24 pt-36 sm:pb-24 lg:pb-28"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={fadeUp} className="eyebrow flex items-center gap-4 text-gold-champagne">
          <span aria-hidden="true" className="h-px w-10 bg-gold" />
          Banqueting &amp; Events · Romford
        </motion.p>
        <SplitHeading
          as="h1"
          immediate
          className="display-xl mt-6 max-w-[16ch] text-ivory text-shadow-soft"
          text={[
            { text: "A Royal Canvas for" },
            { text: "Extraordinary", className: "text-gold-champagne" },
            { text: "Celebrations" },
          ]}
        />
        <motion.p variants={fadeUp} className="lead mt-7 max-w-xl text-ivory/85">
          Romford’s customisable banqueting hall for up to {venue.maxGuests} guests. Pristine white walls, crystal
          chandeliers and LED mood lighting, shaped entirely around your occasion.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button to={routes.enquire} size="lg" icon={<ArrowRight size={16} strokeWidth={1.5} />}>
            Make an Enquiry
          </Button>
          <Button to={routes.venue} variant="outlineLight" size="lg">
            Explore The Venue
          </Button>
        </motion.div>
      </motion.div>

      <a
        href="#pillars"
        className="group absolute bottom-7 right-5 hidden items-center gap-3 font-condensed-label text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-ivory/75 transition-colors duration-base ease-editorial hover:text-gold-champagne sm:right-8 sm:flex lg:right-12 xl:right-40"
      >
        Scroll
        <span aria-hidden="true" className="relative block h-12 w-px overflow-hidden bg-ivory/25">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-gold-champagne"
            animate={{ y: ["-100%", "220%"] }}
            transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
          />
        </span>
      </a>
    </section>
  );
}

function ValuePillars() {
  return (
    <section id="pillars" data-ambient-tone="ivory" aria-labelledby="pillars-heading" className="section-pad">
      <div className="container-site">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Why Kashas Royal</Eyebrow>
            <SplitHeading id="pillars-heading" as="h2" className="display-lg mt-6" text="Celebrations on a grander scale" />
          </div>
          <p className="lead lg:col-span-4 lg:col-start-9">
            One hall, one dedicated team and the freedom to host your occasion exactly as you imagine it.
          </p>
        </Reveal>

        <RevealGroup as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {valuePillars.map((pillar, index) => (
            <RevealItem
              as="li"
              key={pillar.title}
              className="card-surface group relative flex flex-col overflow-hidden p-7 hover:-translate-y-1.5 sm:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-base ease-editorial group-hover:scale-x-100"
              />
              <div className="flex items-center justify-between">
                <span
                  aria-hidden="true"
                  className="font-condensed-label text-xs font-semibold tracking-[0.18em] text-olive/70 transition-colors duration-base ease-editorial group-hover:text-gold"
                >
                  0{index + 1}
                </span>
                <span
                  aria-hidden="true"
                  className="font-sans text-xl leading-none text-gold transition-transform duration-base ease-editorial group-hover:translate-x-1.5"
                >
                  →
                </span>
              </div>
              <h3 className="font-condensed mt-7 text-[1.95rem] leading-[1.02] text-ink transition-colors duration-base ease-editorial group-hover:text-olive-deep">
                {pillar.title}
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-slate">{pillar.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function HallFeature() {
  return (
    <section data-ambient-tone="warm-stone" aria-labelledby="hall-heading" className="section-pad">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-7">
          <Reveal variant="editorial" className="group overflow-hidden rounded-card">
            <SmartImage
              image={media.mainHall}
              className="aspect-[4/3] rounded-card sm:aspect-[5/4]"
              imgClassName="group-hover:scale-105"
            />
          </Reveal>
          <Reveal
            variant="editorial"
            delay={0.2}
            className="group absolute -bottom-10 right-4 hidden w-[38%] overflow-hidden rounded-card border-[6px] border-[color:var(--ambient-bg)] shadow-[0_24px_48px_-24px_rgba(26,28,22,0.35)] transition-[border-color] duration-[1400ms] ease-editorial sm:block lg:-right-10"
          >
            <SmartImage
              image={media.hallLighting}
              useThumb
              className="aspect-[4/5] rounded-[6px]"
              imgClassName="group-hover:scale-105"
            />
          </Reveal>
        </div>

        <Reveal className="lg:col-span-4 lg:col-start-9">
          <Eyebrow>The Main Banqueting Hall</Eyebrow>
          <SplitHeading id="hall-heading" as="h2" className="display-lg mt-6" text="We build worlds within white walls" />
          <p className="lead mt-6">
            A single, expansive ground-floor hall with pristine white walls that take on any colour, theme or tradition.
          </p>
          <p className="mt-4">
            Grand crystal chandeliers set the tone overhead, customisable LED mood lighting shifts the atmosphere from
            ceremony to celebration, and a private changing room keeps the bride, groom or VIP hosts composed and close
            at hand.
          </p>
          <ArrowLink to={`${routes.venue}#capacities`} className="mt-9">
            View Capacities &amp; Floor Plans
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}

const eventTabs = eventTypes.map((event) => ({ id: event.id, label: event.homeLabel }));
const eventImages = {
  weddings: media.weddings,
  private: media.privateParties,
  corporate: media.corporate,
} as const;
const eventHomeTitles: Record<EventTypeId, string> = {
  weddings: "Weddings (South Asian & Multicultural)",
  private: "Private Celebrations (Birthdays & Baby Showers)",
  corporate: "Corporate Events & Galas",
};

/**
 * Mirrors 8 Northumberland Avenue's `.tabs-alternative`: desktop tabs activate
 * smoothly on hover as well as click/keyboard, gliding from `-translate-x-9` to
 * `translate-x-0` over 500ms ease-in-out as the gold arrow reveals.
 */
function EventsShowcase() {
  const [activeId, setActiveId] = useState<EventTypeId>("weddings");
  const active = eventTypes.find((event) => event.id === activeId) ?? eventTypes[0];

  return (
    <section data-ambient-tone="sage-mist" aria-labelledby="events-heading" className="section-pad">
      <div className="container-site">
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Events We Host</Eyebrow>
            <SplitHeading
              id="events-heading"
              as="h2"
              className="display-lg mt-6 max-w-2xl"
              text="Every occasion, given its due"
            />
          </div>
          <ArrowLink to={routes.events} className="shrink-0">
            All Events &amp; Packages
          </ArrowLink>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <TabList
              idBase="home-events"
              label="Event types"
              tabs={eventTabs}
              activeId={activeId}
              onChange={setActiveId}
              orientation="vertical"
              activateOnHover
              className="overflow-hidden border-b border-hairline"
              tabClassName={(isActive) =>
                `group flex w-full items-baseline border-t border-hairline py-5 text-left transition-colors duration-base ease-editorial ${
                  isActive ? "text-ink" : "text-ink/55 hover:text-ink"
                }`
              }
              renderTab={(tab, isActive) => (
                <span
                  className={`flex items-baseline transition-transform duration-base ease-editorial ${
                    isActive ? "lg:translate-x-0" : "lg:-translate-x-9 lg:group-hover:translate-x-0"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`w-9 shrink-0 font-sans text-2xl text-gold transition-opacity duration-base ease-editorial ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-80"
                    }`}
                  >
                    →
                  </span>
                  <span className="font-condensed text-[2.125rem] leading-[1.02] sm:text-[2.75rem]">
                    {tab.label}
                  </span>
                </span>
              )}
            />

            <TabPanel idBase="home-events" activeId={activeId} className="mt-8 min-h-[15rem] outline-offset-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={active.id} variants={panelSwap} initial="hidden" animate="visible" exit="exit">
                  <h3 className="eyebrow text-olive">{eventHomeTitles[active.id]}</h3>
                  <p className="mt-4 max-w-md">{active.summary}</p>
                  <ArrowLink to={`${routes.events}#${active.id}`} className="mt-7">
                    Explore {active.homeLabel}
                  </ArrowLink>
                </motion.div>
              </AnimatePresence>
            </TabPanel>
          </div>

          <Reveal variant="editorial" className="lg:col-span-7">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-card bg-stone lg:aspect-[5/4]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active.id}
                  className="absolute inset-0"
                  variants={fade}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div
                    initial={{ scale: 1.04 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.75, ease: easings.circOut }}
                    className="h-full w-full"
                  >
                    <SmartImage
                      image={eventImages[active.id]}
                      className="h-full w-full"
                      imgClassName="group-hover:scale-105"
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const packagePillars = [
  {
    number: "01",
    title: "Wedding Full Package",
    text: "All-inclusive: exclusive hall hire, welcome drinks on arrival, an authentic 3-course menu with professional waiter service and table décor.",
    to: `${routes.events}#hire-options`,
    cta: "Enquire for Pricing",
    image: media.weddingPackage,
  },
  {
    number: "02",
    title: "Gold / Diamond / Platinum Décor",
    text: "Three curated tiers of styling, from classic elegance to a full royal transformation of the hall.",
    to: `${routes.events}#decor`,
    cta: "Explore Décor Tiers",
    image: media.decorPlatinum,
  },
  {
    number: "03",
    title: "Flexible Dry Hire",
    text: "A blank canvas with complete vendor freedom. Bring your own caterers, your own DJ and your own styling.",
    to: `${routes.events}#hire-options`,
    cta: "Request a Bespoke Quote",
    image: media.dryHire,
  },
];

/**
 * Combines 8 Northumberland Avenue's two signature card interactions:
 * 1) `.events-relation .single-event`: cards expand smoothly horizontally on
 *    desktop hover (`flex-[1] -> flex-[1.75]` over 500ms ease-in-out).
 * 2) `.cards-cta .cta-overlay`: deep atmospheric overlay fades in while copy
 *    and circular `ArrowLink` glide upward (`translate-y-5 -> translate-y-0`).
 */
function PackagesPreview() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section data-ambient-tone="champagne" aria-labelledby="packages-heading" className="section-pad">
      <div className="container-site">
        <Reveal className="max-w-3xl">
          <Eyebrow>Packages &amp; Services</Eyebrow>
          <SplitHeading
            id="packages-heading"
            as="h2"
            className="display-lg mt-6"
            text="Three ways to make the hall your own"
          />
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-14 flex flex-col gap-5 lg:mt-20 lg:flex-row"
        >
          {packagePillars.map((pillar, idx) => {
            const isExpanded = hoveredIdx === idx;
            return (
              <RevealItem
                as="li"
                key={pillar.title}
                className={`flex min-w-0 transition-[flex-grow] duration-base ease-editorial ${
                  isExpanded ? "lg:flex-[1.75]" : "lg:flex-1"
                }`}
              >
                <article
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onFocus={() => setHoveredIdx(idx)}
                  onBlur={() => setHoveredIdx(null)}
                  className="group relative flex min-h-[25rem] w-full flex-col justify-end overflow-hidden rounded-card bg-olive-deep sm:min-h-[27rem] lg:h-[30rem]"
                >
                  <SmartImage
                    image={pillar.image}
                    useThumb
                    alt=""
                    className="!absolute inset-0 h-full w-full !bg-olive-deep"
                    imgClassName="group-hover:scale-105"
                  />

                  {/* Resting bottom scrim so the bold condensed title always reads cleanly */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/10 transition-opacity duration-base ease-editorial lg:group-hover:opacity-0"
                  />

                  {/* 8na `.cards-cta .cta-overlay` dark olive wash fading in on desktop hover */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-olive-deep/95 via-olive-deep/85 to-olive-deep/55 opacity-90 transition-opacity duration-base ease-editorial lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100"
                  />

                  <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
                    <p className="font-condensed-label inline-flex w-fit rounded-full bg-ink/45 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-gold-champagne backdrop-blur-sm">
                      {pillar.number}
                    </p>

                    <div className="mt-auto">
                      <h3 className="font-condensed text-[2.25rem] leading-[0.98] text-ivory sm:text-[2.75rem]">
                        {pillar.title}
                      </h3>

                      <div className="mt-4 transition-all duration-base ease-editorial lg:max-h-0 lg:translate-y-5 lg:overflow-hidden lg:opacity-0 lg:group-hover:max-h-60 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:max-h-60 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100">
                        <p className="max-w-[26rem] text-[0.9375rem] leading-relaxed text-ivory/85">{pillar.text}</p>
                        <ArrowLink to={pillar.to} tone="light" className="mt-6 after:absolute after:inset-0">
                          {pillar.cta}
                        </ArrowLink>
                      </div>
                    </div>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="card-surface flex flex-col justify-between p-7 hover:-translate-y-1 sm:p-9">
            <div>
              <h3 className="eyebrow text-olive">Catering by {group.kashasEvents.name}</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed">{group.kashasEvents.description}</p>
            </div>
            <ArrowLink to={`${routes.events}#catering`} className="mt-7">
              Discover Our Catering
            </ArrowLink>
          </div>
          <div className="card-surface flex flex-col justify-between p-7 hover:-translate-y-1 sm:p-9">
            <div>
              <h3 className="eyebrow text-olive">Sister Venues in Croydon</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed">{group.sisterVenues.description}</p>
            </div>
            <ArrowLink to={`${routes.events}#sister-venues`} className="mt-7">
              Our South London Venues
            </ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MenuBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "center center"],
  });
  const frameScale = useTransform(scrollYProgress, [0, 1], [0.965, 1]);

  return (
    <section data-ambient-tone="olive-mist" aria-labelledby="menu-banner-heading" className="section-pad">
      <div className="container-site">
        <motion.div
          ref={bannerRef}
          style={reduceMotion ? undefined : { scale: frameScale }}
          className="surface-grain-dark grid overflow-hidden rounded-card bg-olive-deep will-change-transform lg:grid-cols-2"
        >
          <div className="group relative z-10 overflow-hidden">
            <SmartImage
              image={media.catering}
              className="aspect-[4/3] h-full !bg-olive lg:aspect-auto lg:min-h-[38rem]"
              imgClassName="group-hover:scale-105"
            />
          </div>
          <div className="relative z-10 flex flex-col justify-center p-8 sm:p-14 lg:p-16 xl:p-20">
            <Eyebrow tone="light">Sample Menu &amp; Brochure</Eyebrow>
            <SplitHeading
              id="menu-banner-heading"
              as="h2"
              className="display-lg mt-6 text-ivory"
              text="A first taste of the table"
            />
            <p className="mt-6 max-w-md text-ivory/80">
              Signature starters from our in-house kitchen, prepared by Kashas Events. Download the sample menu, then
              join us for a private viewing and consultation.
            </p>
            <ul className="mt-8 overflow-hidden border-b border-hairline-gold">
              {signatureStarters.map((starter) => (
                <li
                  key={starter}
                  className="group border-t border-hairline-gold py-3.5"
                >
                  <div className="flex items-baseline gap-4 transition-transform duration-base ease-editorial lg:-translate-x-6 lg:group-hover:translate-x-0">
                    <span
                      aria-hidden="true"
                      className="text-base text-gold transition-opacity duration-base ease-editorial lg:opacity-0 lg:group-hover:opacity-100"
                    >
                      →
                    </span>
                    <span className="font-condensed text-[1.75rem] leading-tight text-ivory transition-colors duration-base ease-editorial group-hover:text-gold-champagne sm:text-[2rem]">
                      {starter}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Button
                href={venue.menuPdf}
                download
                size="lg"
                icon={<Download size={15} strokeWidth={1.5} />}
                iconPosition="left"
              >
                Download Sample Menu (PDF)
              </Button>
              <Button to={`${routes.enquire}?viewing=1`} variant="outlineLight" size="lg">
                Book a Private Viewing
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustAndReviews() {
  return (
    <section data-ambient-tone="warm-sand" aria-labelledby="trust-heading" className="section-pad">
      <div className="container-site">
        <Reveal>
          <Eyebrow>Trusted &amp; Reviewed</Eyebrow>
          <h2 id="trust-heading" className="sr-only">
            Ratings and client reviews
          </h2>
        </Reveal>
        <div className="mt-10">
          <TrustStrip />
        </div>
        <Reveal className="mt-16 lg:mt-24">
          <ReviewsSlider />
        </Reveal>
      </div>
    </section>
  );
}

const visitFacts = [
  { icon: TrainFront, title: "0.2 miles from Romford Station", text: "Elizabeth line and National Rail" },
  { icon: Accessibility, title: "Step-free ground-floor access", text: "Throughout the entire venue" },
  { icon: Car, title: "Free on-street parking", text: "Available nearby" },
];

function VisitSnapshot() {
  return (
    <section data-ambient-tone="sage-mist" aria-labelledby="visit-snapshot-heading" className="section-pad">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <Eyebrow>Visit Us</Eyebrow>
          <SplitHeading id="visit-snapshot-heading" as="h2" className="display-lg mt-6" text="In the heart of Romford" />
          <address className="lead mt-6 not-italic">{venue.address.oneLine}</address>
          <ul className="mt-9 border-b border-hairline">
            {visitFacts.map((fact) => (
              <li
                key={fact.title}
                className="group flex items-center gap-5 border-t border-hairline py-5 transition-colors duration-base ease-editorial hover:border-gold/60"
              >
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-olive/30 text-olive transition-all duration-base ease-editorial group-hover:border-olive-deep group-hover:bg-olive-deep group-hover:text-gold-champagne"
                >
                  <fact.icon size={19} strokeWidth={1.4} />
                </span>
                <div>
                  <p className="font-condensed text-[1.5rem] leading-snug text-ink sm:text-[1.75rem]">{fact.title}</p>
                  <p className="mt-0.5 text-sm">{fact.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <ArrowLink to={routes.visit} className="mt-9">
            Plan Your Visit
          </ArrowLink>
        </Reveal>
        <Reveal variant="editorial" className="group overflow-hidden rounded-card lg:col-span-5 lg:col-start-8">
          <SmartImage
            image={media.visitSnapshot}
            useThumb
            className="aspect-[4/3] rounded-card lg:aspect-[4/5]"
            imgClassName="group-hover:scale-105"
          />
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta(pageMeta.home);

  return (
    <>
      <Hero />
      <ValuePillars />
      <HallFeature />
      <EventsShowcase />
      <PackagesPreview />
      <MenuBanner />
      <TrustAndReviews />
      <FaqPreview />
      <VisitSnapshot />
    </>
  );
}
