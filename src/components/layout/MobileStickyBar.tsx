import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { routes, venue } from "@/data/venueData";
import { transitions } from "@/config/motion";

/** Mobile-only action bar that appears once the visitor scrolls past the hero. */
export default function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={transitions.base}
          className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-hairline-gold bg-olive-deep/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
        >
          <a
            href={venue.phone.href}
            className="flex min-h-[3.5rem] items-center justify-center gap-2.5 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ivory"
          >
            <Phone size={15} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
            <span>
              <span className="sr-only">Call </span>
              {venue.phone.display}
            </span>
          </a>
          <Link
            to={routes.enquire}
            className="flex min-h-[3.5rem] items-center justify-center bg-gold font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink"
          >
            Make an Enquiry
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
