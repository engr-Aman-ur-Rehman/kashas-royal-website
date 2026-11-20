import { useState } from "react";
import {
  Camera,
  Car,
  Check,
  Crown,
  Disc3,
  Download,
  Gem,
  ShieldCheck,
  Sparkles,
  SprayCan,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import {
  addOns,
  decorTiers,
  eventTypes,
  group,
  hireOptions,
  pageMeta,
  routes,
  venue,
  type EventTypeId,
} from "@/data/venueData";
import { media, type MediaImage } from "@/data/media";
import { usePageMeta } from "@/hooks/usePageMeta";
import ArrowLink from "@/components/ui/ArrowLink";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import PageHero from "@/components/ui/PageHero";
import SmartImage from "@/components/ui/SmartImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import MenuPreview from "@/components/sections/MenuPreview";
import SisterVenuesBand from "@/components/sections/SisterVenuesBand";

const eventImages: Record<EventTypeId, MediaImage> = {
  weddings: media.weddings,
  private: media.privateParties,
  corporate: media.corporate,
};

function EventExperiences() {
  return (
    <section aria-labelledby="experiences-heading" className="section-pad">
      <div className="container-site">
        <Reveal className="max-w-3xl">
          <Eyebrow>Event Experiences</Eyebrow>
          <h2 id="experiences-heading" className="display-lg mt-6">
            Hosted with the care each occasion deserves
          </h2>
        </Reveal>

        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-32">
          {eventTypes.map((event, index) => {
            const imageFirst = index % 2 === 0;
            return (
              <article
                key={event.id}
                id={event.id}
                className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-12 lg:gap-16"
              >
                <Reveal
                  variant="editorial"
                  className={`lg:col-span-6 ${imageFirst ? "" : "lg:order-2 lg:col-start-7"}`}
                >
                  <SmartImage image={eventImages[event.id]} className="aspect-[4/3] rounded-media lg:aspect-[5/4]" />
                </Reveal>
                <Reveal className={`lg:col-span-5 ${imageFirst ? "lg:col-start-8" : "lg:order-1"}`}>
                  <p className="flex items-center gap-4">
                    <span className="font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-gold">
                      0{index + 1}
                    </span>
                    <span className="eyebrow text-olive">{event.eyebrow}</span>
                  </p>
                  <h3 className="display-md mt-5">{event.title}</h3>
                  {event.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraph} className={paragraphIndex === 0 ? "mt-6" : "mt-4"}>
                      {paragraph}
                    </p>
                  ))}
                  <ul className="mt-7 flex flex-wrap gap-2" aria-label={`${event.title}: occasions we host`}>
                    {event.occasions.map((occasion) => (
                      <li
                        key={occasion}
                        className="border border-hairline px-3.5 py-1.5 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-ink"
                      >
                        {occasion}
                      </li>
                    ))}
                  </ul>
                  <ArrowLink to={event.cta.to} className="mt-9">
                    {event.cta.label}
                  </ArrowLink>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const hireImages = { "wedding-full": media.weddingPackage, "dry-hire": media.dryHire } as const;

function HireOptions() {
  return (
    <section id="hire-options" aria-labelledby="hire-heading" className="section-pad scroll-mt-20 bg-stone">
      <div className="container-site">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Hire Options</Eyebrow>
            <h2 id="hire-heading" className="display-lg mt-6">
              All-inclusive, or entirely your own
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9">
            Two ways to hire the hall. Every proposal is tailored to your date, guest numbers and occasion, so please
            enquire for pricing.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2">
          {hireOptions.map((option) => (
            <RevealItem key={option.id} as="article" className="flex flex-col border border-hairline bg-ivory">
              <SmartImage image={hireImages[option.id]} useThumb className="aspect-[16/9]" />
              <div className="flex flex-1 flex-col p-8 sm:p-12">
                <p className="eyebrow text-olive">{option.eyebrow}</p>
                <h3 className="display-md mt-4">{option.title}</h3>
                <p className="mt-5">{option.summary}</p>
                <ul className="mt-8 flex-1 border-b border-hairline">
                  {option.inclusions.map((inclusion) => (
                    <li
                      key={inclusion}
                      className="flex gap-4 border-t border-hairline py-3.5 text-[0.9375rem] leading-relaxed text-ink"
                    >
                      <Check size={15} strokeWidth={1.75} className="mt-1.5 shrink-0 text-gold" aria-hidden="true" />
                      {inclusion}
                    </li>
                  ))}
                </ul>
                <div className="mt-9">
                  <Button to={option.cta.to} size="lg" className="w-full sm:w-auto">
                    {option.cta.label}
                  </Button>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-8 text-sm">
          Planning dry hire? Please note that on-site kitchen facilities are not available for external caterers, and no
          in-house PA system or speakers are provided.
        </Reveal>
      </div>
    </section>
  );
}

type TierId = (typeof decorTiers)[number]["id"];

const tierStyle: Record<TierId, { icon: LucideIcon; bar: string; iconColor: string; image: MediaImage }> = {
  gold: { icon: Crown, bar: "bg-tier-gold", iconColor: "text-tier-gold", image: media.decorGold },
  diamond: { icon: Gem, bar: "bg-tier-diamond", iconColor: "text-tier-platinum", image: media.decorDiamond },
  platinum: { icon: Sparkles, bar: "bg-tier-platinum", iconColor: "text-ink", image: media.decorPlatinum },
};

function DecorTiers() {
  const [activeId, setActiveId] = useState<TierId>("diamond");

  return (
    <section id="decor" aria-labelledby="decor-heading" className="section-pad scroll-mt-20">
      <div className="container-site">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow rule={false} className="justify-center">
            Signature Décor
          </Eyebrow>
          <h2 id="decor-heading" className="display-lg mt-6">
            Three curated tiers of transformation
          </h2>
          <p className="lead mx-auto mt-6 max-w-2xl">
            Each package is styled by our in-house décor team and refined with you in consultation. Request the lookbook
            and a bespoke quote for your date.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3 lg:items-stretch">
          {decorTiers.map((tier, index) => {
            const style = tierStyle[tier.id];
            const active = activeId === tier.id;
            const Icon = style.icon;
            return (
              <RevealItem key={tier.id} className="flex">
                <article
                  data-active={active}
                  onMouseEnter={() => setActiveId(tier.id)}
                  onFocus={() => setActiveId(tier.id)}
                  className={`group relative flex w-full flex-col border bg-ivory transition-[transform,box-shadow,border-color] duration-slow ease-editorial ${
                    active
                      ? "border-gold shadow-[0_30px_60px_-30px_rgba(43,51,25,0.45)] lg:-translate-y-3"
                      : "border-hairline"
                  }`}
                >
                  <span aria-hidden="true" className={`absolute inset-x-0 top-0 z-10 h-1 ${style.bar}`} />
                  <SmartImage
                    image={style.image}
                    useThumb
                    className="aspect-[4/3]"
                    imgClassName={active ? "scale-105" : "scale-100"}
                  />
                  <div className="flex flex-1 flex-col p-8 sm:p-10">
                    <div className="flex items-center justify-between">
                      <p className="font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-gold">
                        Tier 0{index + 1}
                      </p>
                      <Icon size={24} strokeWidth={1} className={style.iconColor} aria-hidden="true" />
                    </div>
                    <h3 className="display-md mt-6">{tier.name}</h3>
                    <p className="eyebrow mt-3 text-olive">{tier.character}</p>
                    <p className="mt-5 text-[0.9375rem] leading-relaxed">{tier.summary}</p>
                    <ul className="mt-7 flex-1 border-b border-hairline">
                      {tier.inclusions.map((inclusion) => (
                        <li
                          key={inclusion}
                          className="flex gap-4 border-t border-hairline py-3.5 text-[0.9375rem] leading-relaxed text-ink"
                        >
                          <Check size={15} strokeWidth={1.75} className="mt-1.5 shrink-0 text-gold" aria-hidden="true" />
                          {inclusion}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Button
                        to={`${routes.enquire}?package=${tier.enquiryValue}`}
                        variant={active ? "gold" : "outlineDark"}
                        className="w-full !whitespace-normal py-3 text-center"
                        aria-label={`Request décor lookbook and quote for the ${tier.name}`}
                      >
                        Request Décor Lookbook &amp; Quote
                      </Button>
                    </div>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

function Culinary() {
  return (
    <section id="catering" aria-labelledby="catering-heading" className="section-pad scroll-mt-20 bg-olive-deep text-ivory">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <Eyebrow tone="light">Culinary Excellence</Eyebrow>
          <h2 id="catering-heading" className="display-lg mt-6 text-ivory">
            Catering by Kashas Events
          </h2>
          <p className="lead mt-6 max-w-xl text-ivory/85">{group.kashasEvents.description}</p>

          <div className="mt-9 flex items-center gap-5 border-y border-hairline-gold py-6">
            <ShieldCheck size={36} strokeWidth={1} className="shrink-0 text-gold" aria-hidden="true" />
            <div>
              <p className="font-display text-3xl leading-none text-ivory">5 / 5 Food Hygiene Rating</p>
              <p className="mt-2 text-sm text-ivory/70">Officially rated “Very Good” by Havering Council</p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <SmartImage image={media.catering} useThumb className="aspect-[4/5] rounded-media !bg-olive" />
            <SmartImage image={media.cateringChaat} useThumb className="mt-10 aspect-[4/5] rounded-media !bg-olive" />
          </div>

          <ArrowLink href={group.kashasEvents.url} external tone="light" className="mt-10">
            Visit {group.kashasEvents.domain}
          </ArrowLink>
        </Reveal>

        <Reveal className="lg:col-span-5 lg:col-start-8">
          <p className="eyebrow text-gold-champagne">Sample Starter Menu</p>
          <p className="mt-4 text-ivory/75">
            A preview of our in-house starters. Full 3-course bespoke menus are available in the downloadable menu and
            through a private tasting and consultation.
          </p>
          <div className="mt-9">
            <MenuPreview />
          </div>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Button
              href={venue.menuPdf}
              download
              size="lg"
              icon={<Download size={15} strokeWidth={1.5} />}
              iconPosition="left"
            >
              Download Full Menu PDF
            </Button>
            <Button to={`${routes.enquire}?package=catering`} variant="outlineLight" size="lg">
              Enquire About Catering
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const addOnIcons: Record<(typeof addOns)[number]["id"], LucideIcon> = {
  backdrops: Camera,
  "dance-floor": Disc3,
  catering: UtensilsCrossed,
  parking: Car,
  cleaning: SprayCan,
};

function AddOns() {
  return (
    <section id="add-ons" aria-labelledby="addons-heading" className="section-pad scroll-mt-20">
      <div className="container-site">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Bespoke Optional Add-Ons</Eyebrow>
            <h2 id="addons-heading" className="display-lg mt-6">
              The finishing touches
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9">
            Add any of these to your booking. All are available on enquiry and quoted as part of your proposal.
          </p>
        </Reveal>

        <RevealGroup as="ul" className="mt-14 grid border-t border-hairline sm:grid-cols-2 lg:mt-20 lg:grid-cols-5">
          {addOns.map((addOn, index) => {
            const Icon = addOnIcons[addOn.id];
            return (
              <RevealItem
                as="li"
                key={addOn.id}
                className={`border-b border-hairline py-9 lg:border-b-0 lg:px-7 lg:first:pl-0 lg:last:pr-0 ${
                  index % 2 === 1 ? "sm:border-l sm:pl-8 lg:pl-7" : "sm:pr-8 lg:pr-7"
                } ${index > 0 ? "lg:border-l" : ""}`}
              >
                <Icon size={28} strokeWidth={1} className="text-gold" aria-hidden="true" />
                <h3 className="mt-6 font-display text-2xl font-medium leading-tight text-ink">{addOn.title}</h3>
                <p className="mt-3 text-sm leading-relaxed">{addOn.text}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="mt-12">
          <Button to={routes.enquire} variant="outlineDark" size="lg">
            Request a Bespoke Quote
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

export default function EventsPackages() {
  usePageMeta(pageMeta.events);

  return (
    <>
      <PageHero
        eyebrow="Events & Packages"
        title={
          <>
            Tailored Hospitality, <em className="font-normal italic text-gold-champagne">Seamless</em> Execution
          </>
        }
        intro="Weddings, private celebrations and corporate occasions, each hosted with the same composure. Choose an all-inclusive package, a signature décor tier or a blank canvas."
        image={media.eventsHero}
      />
      <EventExperiences />
      <HireOptions />
      <DecorTiers />
      <Culinary />
      <AddOns />
      <div id="sister-venues" className="scroll-mt-20">
        <SisterVenuesBand />
      </div>
    </>
  );
}
