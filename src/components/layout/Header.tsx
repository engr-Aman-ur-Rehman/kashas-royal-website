import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Phone } from "lucide-react";
import { navLinks, routes, venue } from "@/data/venueData";
import { LogoLockup } from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";

/** Sticky header: transparent over the hero, solid deep olive once the page scrolls. */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-base ease-editorial ${
          scrolled
            ? "border-b border-hairline-gold bg-olive-deep/95 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md"
            : "border-b border-transparent bg-gradient-to-b from-ink/60 to-transparent"
        }`}
      >
        <div
          className={`container-site flex items-center justify-between gap-6 transition-[height] duration-base ease-editorial ${
            scrolled ? "h-[4.25rem]" : "h-[4.75rem] lg:h-24"
          }`}
        >
          <Link to={routes.home} aria-label={`${venue.name} — home`} className="shrink-0">
            <LogoLockup />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-10">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `relative whitespace-nowrap py-2 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-base ease-editorial after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-base after:ease-editorial hover:text-gold-champagne hover:after:scale-x-100 ${
                        isActive ? "text-gold-champagne after:scale-x-100" : "text-ivory after:scale-x-0"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 xl:gap-7">
            <a
              href={venue.phone.href}
              className="hidden items-center gap-2.5 whitespace-nowrap font-sans text-[0.8125rem] font-medium tracking-[0.06em] text-ivory transition-colors duration-base ease-editorial hover:text-gold-champagne xl:inline-flex"
            >
              <Phone size={14} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
              <span className="sr-only">Call us on </span>
              {venue.phone.display}
            </a>
            <Button to={routes.enquire} className="hidden lg:inline-flex">
              Make an Enquiry
            </Button>

            <a
              href={venue.phone.href}
              aria-label={`Call ${venue.name} on ${venue.phone.display}`}
              className="grid h-11 w-11 place-items-center rounded-full border border-gold/50 text-gold-champagne transition-colors duration-base ease-editorial hover:bg-gold hover:text-ink lg:-order-1 xl:hidden"
            >
              <Phone size={17} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid h-11 w-11 place-items-center text-ivory transition-colors duration-base ease-editorial hover:text-gold-champagne lg:hidden"
            >
              <Menu size={26} strokeWidth={1.25} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
