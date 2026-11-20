import { ArrowRight, Phone } from "lucide-react";
import { routes, venue } from "@/data/venueData";
import Button from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** Closing call-to-action band shown above the footer on every page. */
export default function PreFooterCta() {
  return (
    <section aria-labelledby="prefooter-heading" className="relative overflow-hidden bg-olive-deep">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgb(var(--color-olive)/0.9),transparent_65%)]"
      />
      <Reveal className="container-site relative py-24 text-center sm:py-28 lg:py-36">
        <p className="eyebrow text-gold-champagne">Begin the Conversation</p>
        <h2 id="prefooter-heading" className="display-xl mx-auto mt-6 max-w-4xl text-ivory">
          Let’s Create Something <em className="font-normal italic text-gold-champagne">Unforgettable</em>
        </h2>
        <p className="lead mx-auto mt-7 max-w-xl text-ivory/75">
          Share your date and your vision. We will respond personally with availability, ideas and a bespoke quote for
          your occasion.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button to={routes.enquire} size="lg" icon={<ArrowRight size={16} strokeWidth={1.5} />} className="w-full sm:w-auto">
            Enquire Now
          </Button>
          <Button
            href={venue.phone.href}
            variant="outlineLight"
            size="lg"
            icon={<Phone size={15} strokeWidth={1.5} />}
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Call {venue.phone.display}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
