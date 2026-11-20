import { venue } from "@/data/venueData";
import Modal from "@/components/ui/Modal";

interface PrivacyModalProps {
  open: boolean;
  onClose: () => void;
}

const sections = [
  {
    heading: "What we collect",
    body: "When you send an enquiry we collect the details you choose to give us: your name, email address, phone number and information about your event, such as the date, guest numbers and any preferences you describe.",
  },
  {
    heading: "How we use it",
    body: "We use your details only to respond to your enquiry, arrange viewings, prepare a quote and manage your booking. We do not sell your information or pass it to third parties for their own marketing.",
  },
  {
    heading: "How it is handled",
    body: "Enquiry forms are processed securely by our website hosting provider, Netlify, and delivered to the Kashas Royal team. This website also loads fonts and an embedded map from Google, and displays images hosted by third-party services, which may receive standard technical information such as your IP address.",
  },
  {
    heading: "How long we keep it",
    body: "We keep enquiry details for as long as needed to respond and to manage any booking that follows, and to meet our legal and accounting obligations.",
  },
  {
    heading: "Your rights",
    body: "Under UK data protection law you may ask to see, correct or delete the personal information we hold about you, or ask us to stop contacting you, at any time.",
  },
];

export default function PrivacyModal({ open, onClose }: PrivacyModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Privacy Policy" eyebrow={venue.name}>
      <div className="space-y-6 text-[0.9375rem] leading-relaxed">
        <p>
          {venue.name} respects your privacy. This notice explains what happens to the information you share with us
          through this website.
        </p>
        {sections.map((section) => (
          <section key={section.heading}>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-ink">{section.heading}</h3>
            <p className="mt-2">{section.body}</p>
          </section>
        ))}
        <section>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-ink">Contact us</h3>
          <p className="mt-2">
            For any privacy request, call us on{" "}
            <a href={venue.phone.href} className="font-medium text-olive underline underline-offset-4">
              {venue.phone.display}
            </a>{" "}
            or write to {venue.name}, {venue.address.oneLine}.
          </p>
        </section>
      </div>
    </Modal>
  );
}
