import { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Phone, X } from "lucide-react";
import { navLinks, routes, venue } from "@/data/venueData";
import { drawer, fadeUp, staggerContainer } from "@/config/motion";
import { LogoLockup } from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const drawerLinks = [{ label: "Home", to: routes.home }, ...navLinks];

/** Full-screen editorial menu for tablet and mobile. */
export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useLockBodyScroll(open);
  useFocusTrap(panelRef, { active: open, onEscape: onClose, initialFocus: closeRef });

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          variants={drawer}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-olive-deep lg:hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgb(var(--color-olive)/0.85),transparent_55%)]"
          />

          <div className="container-site relative flex h-[4.75rem] shrink-0 items-center justify-between">
            <Link to={routes.home} onClick={onClose} aria-label={`${venue.name} — home`}>
              <LogoLockup />
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-gold/55 text-gold-champagne transition-all duration-base ease-editorial hover:rotate-90 hover:border-gold hover:bg-gold hover:text-ink"
            >
              <X size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <motion.nav
            aria-label="Mobile"
            className="container-site relative flex flex-1 flex-col justify-center py-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <ul className="border-b border-hairline-gold">
              {drawerLinks.map((link, index) => (
                <motion.li key={link.to} variants={fadeUp} className="border-t border-hairline-gold">
                  <NavLink
                    to={link.to}
                    end
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex items-center justify-between gap-4 py-4 font-condensed text-[2.25rem] leading-[1.02] transition-colors duration-base ease-editorial xs:text-[2.75rem] sm:py-5 sm:text-[3.5rem] ${
                        isActive ? "text-gold-champagne" : "text-ivory hover:text-gold-champagne"
                      }`
                    }
                  >
                    <span className="flex items-baseline gap-5">
                      <span aria-hidden="true" className="font-condensed-label w-6 text-xs font-semibold tracking-[0.18em] text-gold">
                        0{index + 1}
                      </span>
                      {link.label}
                    </span>
                    <ArrowRight
                      size={20}
                      strokeWidth={1.35}
                      aria-hidden="true"
                      className="shrink-0 text-gold transition-transform duration-base ease-editorial group-hover:translate-x-1.5"
                    />
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          <div className="container-site relative shrink-0 pb-[max(2rem,env(safe-area-inset-bottom))]">
            <div className="grid gap-3 sm:grid-cols-2">
              <Button to={routes.enquire} size="lg" onClick={onClose} className="w-full">
                Make an Enquiry
              </Button>
              <Button
                href={venue.phone.href}
                variant="outlineLight"
                size="lg"
                className="w-full"
                icon={<Phone size={15} strokeWidth={1.5} />}
                iconPosition="left"
              >
                Call {venue.phone.display}
              </Button>
            </div>
            <p className="mt-6 font-sans text-xs leading-relaxed tracking-wide text-ivory/60">
              {venue.address.oneLine}
              <br />
              {venue.hours.daysShort}: {venue.hours.times}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
