import { homeFaqs, routes } from "@/data/venueData";
import Accordion from "@/components/ui/Accordion";
import ArrowLink from "@/components/ui/ArrowLink";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitHeading from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Home page FAQ preview modelled on 8 Northumberland Avenue's `.accordion-block`. */
export default function FaqPreview() {
  return (
    <section data-ambient-tone="ivory" aria-labelledby="faq-preview-heading" className="section-pad">
      <div className="container-site">
        <div className="grid gap-12 border-t border-hairline pt-12 lg:grid-cols-12 lg:gap-16 lg:pt-16">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Frequently Asked</Eyebrow>
              <SplitHeading id="faq-preview-heading" as="h2" className="display-lg mt-6" text="Proactive, never reactive." />
              <p className="mt-6 max-w-sm">
                We believe in answering the important questions before you need to ask them. Here are the five our hosts
                raise first.
              </p>
              <ArrowLink to={`${routes.enquire}#faqs`} className="mt-9">
                View All FAQs
              </ArrowLink>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <Accordion items={homeFaqs} defaultOpenId={homeFaqs[0].id} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
