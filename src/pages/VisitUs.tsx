import { Accessibility, Car, Clock, MapPin, Navigation, Phone, TrainFront, type LucideIcon } from "lucide-react";
import { pageMeta, routes, travelCards, venue } from "@/data/venueData";
import { media } from "@/data/media";
import { usePageMeta } from "@/hooks/usePageMeta";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import PageHero from "@/components/ui/PageHero";
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
            Effortlessly Connected in the Heart of <em className="font-normal italic text-gold-champagne">Romford</em>
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
                <TrainFront size={20} strokeWidth={1} className="shrink-0 text-gold" aria-hidden="true" />
                <span className="text-ink">
                  {venue.station.name}: {venue.station.distance} ({venue.station.walk})
                </span>
              </li>
              <li className="flex items-center gap-4 border-t border-hairline py-4">
                <Phone size={20} strokeWidth={1} className="shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={venue.phone.href}
                  className="font-display text-2xl text-ink underline decoration-gold/60 underline-offset-[6px] transition-colors duration-base ease-editorial hover:text-olive"
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
            <div className="relative h-[24rem] overflow-hidden rounded-media border border-hairline bg-stone sm:h-[30rem] lg:h-full lg:min-h-[34rem]">
              <iframe
                title={`Map showing ${venue.name} at ${venue.address.oneLine}`}
                src={venue.map.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.35]"
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
            <h2 id="travel-heading" className="display-lg mt-6">
              Simple to reach, however you travel
            </h2>
          </Reveal>

          <RevealGroup as="ul" className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
            {travelCards.map((card) => {
              const Icon = travelIcons[card.id];
              return (
                <RevealItem as="li" key={card.id} className="flex flex-col border border-hairline bg-ivory p-8 sm:p-10">
                  <Icon size={32} strokeWidth={1} className="text-gold" aria-hidden="true" />
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
            <h2 id="hours-heading" className="display-lg mt-6">
              Open seven days a week
            </h2>
            <dl className="mt-9 border-b border-hairline">
              <div className="flex items-baseline justify-between gap-6 border-t border-hairline py-5">
                <dt className="flex items-center gap-3 text-ink">
                  <Clock size={18} strokeWidth={1} className="text-gold" aria-hidden="true" />
                  {venue.hours.days}
                </dt>
                <dd className="text-right font-display text-2xl text-ink">{venue.hours.times}</dd>
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
            <h2 className="display-lg mt-6">Private viewings, by appointment</h2>
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
