import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
import { fade, fadeUp, panelSwap, staggerContainer } from "@/config/motion";
import { usePageMeta } from "@/hooks/usePageMeta";
import ArrowLink from "@/components/ui/ArrowLink";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import SmartImage from "@/components/ui/SmartImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TabList, TabPanel } from "@/components/ui/Tabs";
import FaqPreview from "@/components/sections/FaqPreview";
import ReviewsSlider from "@/components/sections/ReviewsSlider";
import TrustStrip from "@/components/sections/TrustStrip";

function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-olive-deep">
      {/* The image frame is taller than the hero so the photo is cropped from the bottom edge. */}
      <SmartImage image={media.hero} priority alt="" className="!absolute inset-x-0 top-0 -z-20 h-[118%] !bg-olive-deep" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-olive-deep via-olive-deep/55 to-ink/50"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/60 via-ink/10 to-transparent" />

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
        <motion.h1 variants={fadeUp} className="display-xl mt-6 max-w-[19ch] text-ivory text-shadow-soft">
          A Royal Canvas for <em className="font-normal italic text-gold-champagne">Extraordinary</em> Celebrations
        </motion.h1>
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
        className="group absolute bottom-7 right-5 hidden items-center gap-3 font-sans text-[0.625rem] font-semibold uppercase tracking-[0.3em] text-ivory/70 transition-colors duration-base ease-editorial hover:text-gold-champagne sm:right-8 sm:flex lg:right-12"
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
    <section id="pillars" aria-labelledby="pillars-heading" className="section-pad">
      <div className="container-site">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Why Kashas Royal</Eyebrow>
            <h2 id="pillars-heading" className="display-lg mt-6">
              Celebrations on a grander scale
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9">
            One hall, one dedicated team and the freedom to host your occasion exactly as you imagine it.
          </p>
        </Reveal>

        <RevealGroup as="ul" className="mt-14 grid border-t border-hairline sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {valuePillars.map((pillar, index) => (
            <RevealItem
              as="li"
              key={pillar.title}
              className={`border-b border-hairline py-9 sm:py-10 lg:border-b-0 lg:pr-8 ${
                index % 2 === 1 ? "sm:border-l sm:pl-8" : "sm:pr-8"
              } ${index > 0 ? "lg:border-l lg:pl-8" : ""}`}
            >
              <span aria-hidden="true" className="font-sans text-2xl leading-none text-gold">
                →
              </span>
              <h3 className="mt-6 font-display text-[1.75rem] font-medium leading-[1.12] text-ink">{pillar.title}</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed">{pillar.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function HallFeature() {
  return (
    <section aria-labelledby="hall-heading" className="section-pad bg-stone">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-7">
          <Reveal variant="editorial">
            <SmartImage image={media.mainHall} className="aspect-[4/3] rounded-media sm:aspect-[5/4]" />
          </Reveal>
          <Reveal
            variant="editorial"
            delay={0.2}
            className="absolute -bottom-10 right-4 hidden w-[38%] border-[6px] border-stone sm:block lg:-right-10"
          >
            <SmartImage image={media.hallLighting} useThumb className="aspect-[4/5] rounded-media" />
          </Reveal>
        </div>

        <Reveal className="lg:col-span-4 lg:col-start-9">
          <Eyebrow>The Main Banqueting Hall</Eyebrow>
          <h2 id="hall-heading" className="display-lg mt-6">
            We build worlds within white walls
          </h2>
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

function EventsShowcase() {
  const [activeId, setActiveId] = useState<EventTypeId>("weddings");
  const active = eventTypes.find((event) => event.id === activeId) ?? eventTypes[0];

  return (
    <section aria-labelledby="events-heading" className="section-pad">
      <div className="container-site">
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Events We Host</Eyebrow>
            <h2 id="events-heading" className="display-lg mt-6 max-w-2xl">
              Every occasion, given its due
            </h2>
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
              className="border-b border-hairline"
              tabClassName={(isActive) =>
                `group flex w-full items-baseline border-t border-hairline py-5 text-left font-display text-[1.75rem] font-medium leading-tight transition-colors duration-base ease-editorial sm:text-4xl ${
                  isActive ? "text-ink" : "text-slate/60 hover:text-ink"
                }`
              }
              renderTab={(tab, isActive) => (
                <>
                  <span
                    aria-hidden="true"
                    className={`overflow-hidden font-sans text-xl text-gold transition-all duration-base ease-editorial ${
                      isActive ? "mr-4 w-6 opacity-100" : "mr-0 w-0 opacity-0 group-hover:mr-4 group-hover:w-6 group-hover:opacity-60"
                    }`}
                  >
                    →
                  </span>
                  {tab.label}
                </>
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-stone lg:aspect-[5/4]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active.id}
                  className="absolute inset-0"
                  variants={fade}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <SmartImage image={eventImages[active.id]} className="h-full w-full" />
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
  },
  {
    number: "02",
    title: "Gold / Diamond / Platinum Décor",
    text: "Three curated tiers of styling, from classic elegance to a full royal transformation of the hall.",
    to: `${routes.events}#decor`,
    cta: "Explore Décor Tiers",
  },
  {
    number: "03",
    title: "Flexible Dry Hire",
    text: "A blank canvas with complete vendor freedom. Bring your own caterers, your own DJ and your own styling.",
    to: `${routes.events}#hire-options`,
    cta: "Request a Bespoke Quote",
  },
];

function PackagesPreview() {
  return (
    <section aria-labelledby="packages-heading" className="section-pad bg-stone">
      <div className="container-site">
        <Reveal className="max-w-3xl">
          <Eyebrow>Packages &amp; Services</Eyebrow>
          <h2 id="packages-heading" className="display-lg mt-6">
            Three ways to make the hall your own
          </h2>
        </Reveal>

        <RevealGroup as="ul" className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
          {packagePillars.map((pillar) => (
            <RevealItem as="li" key={pillar.title} className="flex">
              <article className="group relative flex w-full flex-col border border-hairline bg-ivory p-8 transition-colors duration-base ease-editorial hover:border-gold sm:p-10">
                <p className="font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-gold">{pillar.number}</p>
                <h3 className="mt-8 font-display text-[2rem] font-medium leading-[1.1] text-ink">{pillar.title}</h3>
                <p className="mt-5 flex-1 text-[0.9375rem] leading-relaxed">{pillar.text}</p>
                <ArrowLink to={pillar.to} className="mt-9 after:absolute after:inset-0">
                  {pillar.cta}
                </ArrowLink>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-14 grid gap-10 border-t border-hairline pt-10 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="eyebrow text-olive">Catering by {group.kashasEvents.name}</h3>
            <p className="mt-4 text-[0.9375rem] leading-relaxed">{group.kashasEvents.description}</p>
            <ArrowLink to={`${routes.events}#catering`} className="mt-6">
              Discover Our Catering
            </ArrowLink>
          </div>
          <div>
            <h3 className="eyebrow text-olive">Sister Venues in Croydon</h3>
            <p className="mt-4 text-[0.9375rem] leading-relaxed">{group.sisterVenues.description}</p>
            <ArrowLink to={`${routes.events}#sister-venues`} className="mt-6">
              Our South London Venues
            </ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MenuBanner() {
  return (
    <section aria-labelledby="menu-banner-heading" className="section-pad">
      <div className="container-site">
        <Reveal className="grid overflow-hidden bg-olive-deep lg:grid-cols-2">
          <SmartImage image={media.catering} className="aspect-[4/3] !bg-olive lg:aspect-auto lg:min-h-[38rem]" />
          <div className="flex flex-col justify-center p-8 sm:p-14 lg:p-16 xl:p-20">
            <Eyebrow tone="light">Sample Menu &amp; Brochure</Eyebrow>
            <h2 id="menu-banner-heading" className="display-lg mt-6 text-ivory">
              A first taste of the table
            </h2>
            <p className="mt-6 max-w-md text-ivory/75">
              Signature starters from our in-house kitchen, prepared by Kashas Events. Download the sample menu, then
              join us for a private viewing and consultation.
            </p>
            <ul className="mt-8 border-b border-hairline-gold">
              {signatureStarters.map((starter) => (
                <li
                  key={starter}
                  className="flex items-baseline gap-5 border-t border-hairline-gold py-3.5 font-display text-2xl text-ivory sm:text-[1.75rem]"
                >
                  <span aria-hidden="true" className="text-base text-gold">
                    →
                  </span>
                  {starter}
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
        </Reveal>
      </div>
    </section>
  );
}

function TrustAndReviews() {
  return (
    <section aria-labelledby="trust-heading" className="section-pad bg-stone">
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
    <section aria-labelledby="visit-snapshot-heading" className="section-pad bg-stone">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <Eyebrow>Visit Us</Eyebrow>
          <h2 id="visit-snapshot-heading" className="display-lg mt-6">
            In the heart of Romford
          </h2>
          <address className="lead mt-6 not-italic">{venue.address.oneLine}</address>
          <ul className="mt-9 border-b border-hairline">
            {visitFacts.map((fact) => (
              <li key={fact.title} className="flex items-center gap-5 border-t border-hairline py-5">
                <fact.icon size={24} strokeWidth={1} className="shrink-0 text-gold" aria-hidden="true" />
                <div>
                  <p className="font-display text-xl font-medium leading-snug text-ink sm:text-2xl">{fact.title}</p>
                  <p className="mt-0.5 text-sm">{fact.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <ArrowLink to={routes.visit} className="mt-9">
            Plan Your Visit
          </ArrowLink>
        </Reveal>
        <Reveal variant="editorial" className="lg:col-span-5 lg:col-start-8">
          <SmartImage image={media.visitSnapshot} useThumb className="aspect-[4/3] rounded-media lg:aspect-[4/5]" />
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
