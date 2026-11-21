import { Accessibility, Car, Clock, MapPin, Navigation, Phone, TrainFront, type LucideIcon } from "lucide-react";
import { pageMeta, routes, travelCards, venue } from "@/data/venueData";
import { media } from "@/data/media";
import { usePageMeta } from "@/hooks/usePageMeta";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import PageHero from "@/components/ui/PageHero";
import SplitHeading from "@/components/ui/SplitHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import SisterVenuesBand from "@/components/sections/SisterVenuesBand";

const travelIcons: Record<(typeof travelCards)[number]["id"], LucideIcon> = {
  train: TrainFront,
  car: Car,
  access: Accessibility,
};

export default function VisitUs() {
  usePageMeta(pageMeta.visit);

  return (
    <>
      <PageHero
        eyebrow="Visit Us"
        title={
          <>
            Effortlessly Connected in the Heart of <em className="text-gold-champagne">Romford</em>
          </>
        }
        intro={`${venue.station.distance} from ${venue.station.name}, with Elizabeth line and National Rail connections to Central London and Essex.`}
        image={media.visitHero}
      />

      {/* Address and map */}
      <section aria-labelledby="find-us-heading" className="section-pad">
        <div className="container-site grid items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="flex flex-col justify-center lg:col-span-5">
            <Eyebrow>Find Us</Eyebrow>
            <h2 id="find-us-heading" className="sr-only">
              Address and map
            </h2>
            <address className="mt-6 not-italic">
              <p className="display-lg">
                {venue.address.street},
                <br />
                {venue.address.town}, {venue.address.postcode}
              </p>
              <p className="mt-3 font-sans text-sm tracking-wide text-slate">{venue.address.region}</p>
            </address>

            <ul className="mt-9 border-b border-hairline">
              <li className="flex items-center gap-4 border-t border-hairline py-4">
                <TrainFront size={20} strokeWidth={1.25} className="shrink-0 text-gold" aria-hidden="true" />
                <span className="text-ink">
                  {venue.station.name}: {venue.station.distance} ({venue.station.walk})
                </span>
              </li>
              <li className="flex items-center gap-4 border-t border-hairline py-4">
                <Phone size={20} strokeWidth={1.25} className="shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={venue.phone.href}
                  className="link-sweep font-condensed text-[1.75rem] leading-none text-ink hover:text-olive"
                >
                  <span className="sr-only">Call </span>
                  {venue.phone.display}
                </a>
              </li>
            </ul>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button
                href={venue.map.directionsUrl}
                external
                size="lg"
                icon={<Navigation size={15} strokeWidth={1.5} />}
                iconPosition="left"
              >
                Get Directions
              </Button>
              <Button
                href={venue.phone.href}
                variant="outlineDark"
                size="lg"
                icon={<Phone size={15} strokeWidth={1.5} />}
                iconPosition="left"
              >
                Call {venue.phone.display}
              </Button>
            </div>
          </Reveal>

          <Reveal variant="editorial" className="lg:col-span-7">
            <div className="relative h-[24rem] overflow-hidden rounded-card border border-hairline bg-stone sm:h-[30rem] lg:h-full lg:min-h-[34rem]">
              <iframe
                title={`Map showing ${venue.name} at ${venue.address.oneLine}`}
                src={venue.map.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.35] transition-[filter] duration-base ease-editorial hover:grayscale-0"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Travel and transport */}
      <section aria-labelledby="travel-heading" className="section-pad bg-stone">
        <div className="container-site">
          <Reveal className="max-w-3xl">
            <Eyebrow>Travel &amp; Transport</Eyebrow>
            <SplitHeading
              id="travel-heading"
              as="h2"
              className="display-lg mt-6"
              text="Simple to reach, however you travel"
            />
          </Reveal>

          <RevealGroup as="ul" className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
            {travelCards.map((card) => {
              const Icon = travelIcons[card.id];
              return (
                <RevealItem
                  as="li"
                  key={card.id}
                  className="card-surface group flex flex-col p-8 hover:-translate-y-1.5 sm:p-10"
                >
                  <span
                    aria-hidden="true"
                    className="grid h-12 w-12 place-items-center rounded-full border border-olive/30 bg-stone/60 text-olive transition-all duration-base ease-editorial group-hover:border-olive-deep group-hover:bg-olive-deep group-hover:text-gold-champagne"
                  >
                    <Icon size={22} strokeWidth={1.35} />
                  </span>
                  <h3 className="display-sm mt-8">{card.title}</h3>
                  <p className="eyebrow mt-3 text-olive">{card.highlight}</p>
                  <p className="mt-5 text-[0.9375rem] leading-relaxed">{card.text}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Opening hours and viewings */}
      <section aria-labelledby="hours-heading" className="section-pad">
        <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-0">
          <Reveal className="lg:border-r lg:border-hairline lg:pr-16">
            <Eyebrow>Opening Hours</Eyebrow>
            <SplitHeading id="hours-heading" as="h2" className="display-lg mt-6" text="Open seven days a week" />
            <dl className="mt-9 border-b border-hairline">
              <div className="flex items-baseline justify-between gap-6 border-t border-hairline py-5">
                <dt className="flex items-center gap-3 text-ink">
                  <Clock size={18} strokeWidth={1.25} className="text-gold" aria-hidden="true" />
                  {venue.hours.days}
                </dt>
                <dd className="font-condensed text-right text-[1.625rem] text-ink">{venue.hours.times}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-t border-hairline py-5">
                <dt>Daytime session</dt>
                <dd className="text-right text-ink">{venue.sessions.daytime}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-t border-hairline py-5">
                <dt>Evening session</dt>
                <dd className="text-right text-ink">{venue.sessions.evening}</dd>
              </div>
            </dl>
            <p className="mt-5 text-sm">Full-day dry hire options are also available.</p>
          </Reveal>

          <Reveal className="lg:pl-16">
            <Eyebrow>Viewing Appointments</Eyebrow>
            <SplitHeading as="h2" className="display-lg mt-6" text="Private viewings, by appointment" />
            <p className="lead mt-6 max-w-lg">
              We arrange every viewing personally, so the hall and our team are ready for you. Tell us when you would
              like to visit and we will confirm a time.
            </p>
            <p className="mt-6 flex items-start gap-3 text-sm">
              <MapPin size={17} strokeWidth={1.25} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              {venue.address.oneLine}
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button to={`${routes.enquire}?viewing=1`} size="lg">
                Book a Viewing
              </Button>
              <Button
                href={venue.phone.href}
                variant="outlineDark"
                size="lg"
                icon={<Phone size={15} strokeWidth={1.5} />}
                iconPosition="left"
              >
                {venue.phone.display}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sister venues */}
      <section aria-label="Our sister venues" className="bg-stone py-16 sm:py-20">
        <div className="container-site">
          <SisterVenuesBand variant="card" />
        </div>
      </section>
    </>
  );
}
