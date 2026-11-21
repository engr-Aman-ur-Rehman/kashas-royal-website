import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Phone } from "lucide-react";
import { navLinks, routes, venue } from "@/data/venueData";
import { LogoLockup } from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";

/**
 * Sticky header modelled on 8 Northumberland Avenue's `.site-header`:
 * transparent over the hero, transitions over 500ms into deep heritage olive
 * once scrolled, tucks away smoothly when scrolling down past 200px, and glides
 * back into view on upward scroll or when the pointer approaches the top edge.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [pointerNearTop, setPointerNearTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { pathname } = useLocation();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const hideThreshold = window.innerWidth < 768 ? 140 : 220;
        setScrolled(y > 28);
        if (y > hideThreshold && y > lastScrollY.current + 4) {
          setHidden(true);
        } else if (y < lastScrollY.current - 2 || y <= hideThreshold) {
          setHidden(false);
        }
        lastScrollY.current = y;
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (window.innerWidth <= 1024) return;
      setPointerNearTop(event.clientY <= 110);
    };
    const onMouseLeave = () => setPointerNearTop(false);

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setHidden(false);
  }, [pathname]);

  const shouldHide = hidden && !pointerNearTop && !menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-base ease-editorial ${
          shouldHide ? "-translate-y-[120%]" : "translate-y-0"
        } ${
          scrolled
            ? "border-b border-hairline-gold bg-olive-deep/95 shadow-[0_14px_40px_-20px_rgba(0,0,0,0.65)] backdrop-blur-md"
            : "border-b border-transparent bg-gradient-to-b from-ink/65 to-transparent hover:bg-olive-deep/90"
        }`}
      >
        <div
          className={`container-site flex items-center justify-between gap-6 transition-[height] duration-base ease-editorial ${
            scrolled ? "h-[4.25rem]" : "h-[4.75rem] lg:h-[5.5rem]"
          }`}
        >
          <Link to={routes.home} aria-label={`${venue.name} — home`} className="shrink-0">
            <LogoLockup />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-11">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `relative whitespace-nowrap py-2 font-sans text-[0.9375rem] font-normal tracking-[0.01em] transition-colors duration-base ease-editorial after:absolute after:bottom-0.5 after:left-0 after:h-[1.5px] after:bg-gold-champagne after:transition-[width] after:duration-base after:ease-editorial hover:text-gold-champagne hover:after:w-full ${
                        isActive ? "text-gold-champagne after:w-full" : "text-ivory after:w-0"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 xl:gap-6">
            <a
              href={venue.phone.href}
              className="link-sweep hidden items-center gap-2.5 whitespace-nowrap font-sans text-[0.875rem] font-normal tracking-[0.02em] text-ivory transition-colors duration-base ease-editorial hover:text-gold-champagne xl:inline-flex"
            >
              <Phone size={14} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
              <span className="sr-only">Call us on </span>
              {venue.phone.display}
            </a>
            <Button to={routes.enquire} size="sm" className="hidden lg:inline-flex">
              Enquire
            </Button>

            <a
              href={venue.phone.href}
              aria-label={`Call ${venue.name} on ${venue.phone.display}`}
              className="grid h-11 w-11 place-items-center rounded-full border border-gold/55 text-gold-champagne transition-all duration-base ease-editorial hover:border-gold hover:bg-gold hover:text-ink lg:-order-1 xl:hidden"
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
