import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, Instagram, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { footerExploreLinks, footerOnlyContact, group, venue } from "@/data/venueData";
import { LogoFull } from "@/components/ui/Logo";
import { usePrivacy } from "@/context/PrivacyContext";
import PreFooterCta from "./PreFooterCta";

const headingClass =
  "font-condensed-label text-[1.125rem] font-bold uppercase tracking-[0.06em] text-gold-champagne";
const linkClass =
  "link-sweep inline-flex text-[0.9375rem] text-ivory/80 transition-colors duration-base ease-editorial hover:text-gold-champagne";

/**
 * Global footer. This is the ONLY component that renders the email address
 * and Instagram handle (business rule: they must not appear elsewhere).
 */
export default function Footer() {
  const { openPrivacy } = usePrivacy();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-olive-deep text-ivory">
      <PreFooterCta />

      <div className="container-site">
        <div className="hairline-t-gold grid gap-x-10 gap-y-14 py-16 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1.15fr_1.15fr] lg:py-20">
          {/* 1. Brand */}
          <div>
            <LogoFull className="-ml-9 -mt-2 w-60" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/75">
              A premier banqueting and event venue in Romford.
            </p>
            <p className="mt-5 flex items-start gap-3 text-sm text-ivory/75">
              <ShieldCheck size={17} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <span>
                <span className="text-ivory">5★ Food Hygiene Rating</span>
                <br />
                Rated “Very Good” by Havering Council
              </span>
            </p>
            <address className="mt-4 flex items-start gap-3 text-sm not-italic text-ivory/75">
              <MapPin size={17} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <span>{venue.address.oneLine}</span>
            </address>
          </div>

          {/* 2. Explore */}
          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className={headingClass}>
              Explore
            </h2>
            <ul className="mt-6 space-y-3">
              {footerExploreLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3. Our Group */}
          <div>
            <h2 className={headingClass}>Our Group</h2>
            <ul className="mt-6 space-y-6">
              <li>
                <a href={group.kashasEvents.url} target="_blank" rel="noopener noreferrer" className="group block">
                  <span className="flex items-center gap-1.5 font-display text-xl text-ivory transition-colors duration-base ease-editorial group-hover:text-gold-champagne">
                    {group.kashasEvents.name}
                    <ArrowUpRight size={15} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
                  </span>
                  <span className="mt-1 block text-sm text-ivory/75">{group.kashasEvents.role}</span>
                  <span className="mt-0.5 block text-xs tracking-wide text-ivory/50">
                    {group.kashasEvents.domain}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={group.sisterVenues.url} target="_blank" rel="noopener noreferrer" className="group block">
                  <span className="flex items-start gap-1.5 font-display text-xl leading-snug text-ivory transition-colors duration-base ease-editorial group-hover:text-gold-champagne">
                    <span>
                      {group.sisterVenues.names[0]} &amp; {group.sisterVenues.names[1]}
                    </span>
                    <ArrowUpRight size={15} strokeWidth={1.5} className="mt-1.5 shrink-0 text-gold" aria-hidden="true" />
                  </span>
                  <span className="mt-1 block text-sm text-ivory/75">Our sister venues in South London</span>
                  <span className="mt-0.5 block text-xs tracking-wide text-ivory/50">
                    {group.sisterVenues.domain}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Contact & Social — the only place the email and Instagram appear */}
          <div>
            <h2 className={headingClass}>Contact &amp; Social</h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href={venue.phone.href} className={`${linkClass} flex items-center gap-3`}>
                  <Phone size={16} strokeWidth={1.5} className="shrink-0 text-gold" aria-hidden="true" />
                  <span>
                    <span className="sr-only">Phone: </span>
                    {venue.phone.display}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${footerOnlyContact.email}`} className={`${linkClass} flex items-center gap-3 break-all`}>
                  <Mail size={16} strokeWidth={1.5} className="shrink-0 text-gold" aria-hidden="true" />
                  <span>
                    <span className="sr-only">Email: </span>
                    {footerOnlyContact.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={footerOnlyContact.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} flex items-center gap-3`}
                >
                  <Instagram size={16} strokeWidth={1.5} className="shrink-0 text-gold" aria-hidden="true" />
                  <span>
                    <span className="sr-only">Instagram: </span>
                    {footerOnlyContact.instagram.handle}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-ivory/75">
                <Clock size={16} strokeWidth={1.5} className="shrink-0 text-gold" aria-hidden="true" />
                <span>
                  <span className="sr-only">Opening hours: </span>
                  {venue.hours.daysShort}: {venue.hours.times}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline-t-gold flex flex-col gap-3 py-7 pb-24 text-xs tracking-wide text-ivory/55 sm:flex-row sm:items-center sm:justify-between lg:pb-7">
          <p>
            © {year} {venue.name}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={openPrivacy}
            className="self-start underline decoration-gold/50 underline-offset-4 transition-colors duration-base ease-editorial hover:text-gold-champagne sm:self-auto"
          >
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
}
