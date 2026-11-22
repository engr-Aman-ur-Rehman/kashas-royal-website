import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { routes } from "@/data/venueData";

/**
 * Floating circular enquiry trigger on desktop, directly inspired by
 * 8 Northumberland Avenue's `.open-slide-out--rounded` (fixed bottom-right
 * circle that switches tone after scrolling past the hero and warms to gold
 * with a gentle scale on hover over 300ms ease-in-out). Hidden on `/enquire`.
 */
export default function FloatingEnquireButton() {
  const { pathname } = useLocation();
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === routes.enquire) return null;

  return (
    <Link
      to={routes.enquire}
      aria-label="Make an enquiry"
      className={`font-condensed fixed bottom-6 right-6 z-40 hidden h-[88px] w-[88px] flex-col items-center justify-center rounded-full border text-center text-[1.125rem] leading-[1.02] shadow-[0_18px_40px_-16px_rgba(26,28,22,0.45)] transition-all duration-fast ease-editorial hover:scale-105 hover:border-gold hover:bg-gold hover:text-ink 2xl:bottom-8 2xl:right-8 2xl:h-[104px] 2xl:w-[104px] 2xl:text-[1.25rem] xl:flex ${
        pastHero
          ? "border-gold/40 bg-olive-deep text-ivory"
          : "border-ivory/80 bg-ivory text-ink"
      }`}
    >
      <span>Make an</span>
      <span>enquiry</span>
    </Link>
  );
}
