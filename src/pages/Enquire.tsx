import { Link } from "react-router-dom";
import { Clock, MapPin, Phone } from "lucide-react";
import { consultationSteps, faqCategories, pageMeta, venue } from "@/data/venueData";
import { usePageMeta } from "@/hooks/usePageMeta";
import Accordion from "@/components/ui/Accordion";
import Eyebrow from "@/components/ui/Eyebrow";
import PageHero from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import EnquiryForm from "@/components/enquire/EnquiryForm";

export default function Enquire() {
  usePageMeta(pageMeta.enquire);

  return (
    <>
      <PageHero
        compact
        eyebrow="Enquire & FAQs"
        title={
          <>
            Let’s Begin Planning Your <em className="font-normal italic text-gold-champagne">Occasion</em>
          </>
        }
        intro="Tell us a little about your event and we will respond personally with availability and a bespoke quote."
      />

      {/* Split layout: reassurance and contact details beside the enquiry form */}
      <section aria-label="Make an enquiry" className="section-pad">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>With You Throughout</Eyebrow>
              <p className="mt-6 font-display text-[2rem] font-medium leading-[1.15] text-ink sm:text-[2.5rem]">
                “From your first consultation to the final guest farewell, our team guides every detail.”
              </p>

              <a
                href={venue.phone.href}
                className="group mt-10 flex items-center gap-5 border border-hairline bg-stone/60 p-6 transition-colors duration-base ease-editorial hover:border-gold"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-olive-deep text-gold-champagne transition-colors duration-base ease-editorial group-hover:bg-gold group-hover:text-ink">
                  <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span>
                  <span className="eyebrow block text-olive">Speak to our team</span>
                  <span className="mt-1.5 block font-display text-3xl leading-none text-ink">{venue.phone.display}</span>
                </span>
              </a>

              <dl className="mt-8 border-b border-hairline text-[0.9375rem]">
                <div className="flex gap-4 border-t border-hairline py-4">
                  <dt className="flex w-32 shrink-0 items-center gap-3 text-ink">
                    <MapPin size={17} strokeWidth={1.25} className="text-gold" aria-hidden="true" />
                    Address
                  </dt>
                  <dd>
                    <address className="not-italic">{venue.address.oneLine}</address>
                  </dd>
                </div>
                <div className="flex gap-4 border-t border-hairline py-4">
                  <dt className="flex w-32 shrink-0 items-center gap-3 text-ink">
                    <Clock size={17} strokeWidth={1.25} className="text-gold" aria-hidden="true" />
                    Hours
                  </dt>
                  <dd>
                    {venue.hours.days}
                    <br />
                    {venue.hours.times}
                  </dd>
                </div>
              </dl>

              <h2 className="eyebrow mt-12 text-olive">What happens next</h2>
              <ol className="mt-5">
                {consultationSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-5 border-t border-hairline py-5 last:border-b">
                    <span aria-hidden="true" className="font-display text-3xl leading-none text-gold">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-medium leading-snug text-ink">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <div id="enquiry-form" className="scroll-mt-28">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Full FAQ accordion, grouped by policy area */}
      <section id="faqs" aria-labelledby="faqs-heading" className="section-pad scroll-mt-16 bg-stone">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Frequently Asked Questions</Eyebrow>
              <h2 id="faqs-heading" className="display-lg mt-6">
                Clear answers, before you ask
              </h2>
              <p className="mt-6 max-w-sm">
                Our venue policies in full, so you can plan with confidence. If your question is not answered here, call
                us on{" "}
                <a href={venue.phone.href} className="font-semibold text-ink underline decoration-gold underline-offset-4">
                  {venue.phone.display}
                </a>
                .
              </p>
              <nav aria-label="FAQ categories" className="mt-9 hidden lg:block">
                <ul className="border-b border-hairline">
                  {faqCategories.map((category) => (
                    <li key={category.id} className="border-t border-hairline">
                      <Link
                        to={`#faq-${category.id}`}
                        className="group flex items-baseline gap-4 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-slate transition-colors duration-base ease-editorial hover:text-ink"
                      >
                        <span aria-hidden="true" className="text-gold transition-transform duration-base ease-editorial group-hover:translate-x-1">
                          →
                        </span>
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </Reveal>

          <div className="space-y-14 lg:col-span-7 lg:col-start-6 lg:space-y-20">
            {faqCategories.map((category, index) => (
              <Reveal key={category.id}>
                <section id={`faq-${category.id}`} aria-labelledby={`faq-${category.id}-heading`} className="scroll-mt-28">
                  <p className="font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-gold">0{index + 1}</p>
                  <h3 id={`faq-${category.id}-heading`} className="display-md mb-7 mt-3">
                    {category.title}
                  </h3>
                  <Accordion items={category.faqs} headingLevel="h4" />
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
