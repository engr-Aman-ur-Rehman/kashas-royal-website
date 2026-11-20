import { homeFaqs, routes } from "@/data/venueData";
import Accordion from "@/components/ui/Accordion";
import ArrowLink from "@/components/ui/ArrowLink";
import Eyebrow from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** Home page FAQ preview: the five questions hosts ask first. */
export default function FaqPreview() {
  return (
    <section aria-labelledby="faq-preview-heading" className="section-pad">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <Eyebrow>Frequently Asked</Eyebrow>
          <h2 id="faq-preview-heading" className="display-lg mt-6">
            Proactive, never reactive.
          </h2>
          <p className="mt-6 max-w-sm">
            We believe in answering the important questions before you need to ask them. Here are the five our hosts
            raise first.
          </p>
          <ArrowLink to={`${routes.enquire}#faqs`} className="mt-9">
            View All FAQs
          </ArrowLink>
        </Reveal>
        <Reveal className="lg:col-span-7 lg:col-start-6">
          <Accordion items={homeFaqs} defaultOpenId={homeFaqs[0].id} />
        </Reveal>
      </div>
    </section>
  );
}
