import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToElementSmooth, scrollToTopImmediate, useSmoothScroll } from "@/hooks/useSmoothScroll";

/**
 * Initialises desktop smooth scrolling (Lenis) and scrolls cleanly on every
 * route or #hash navigation.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  useSmoothScroll();

  useEffect(() => {
    if (!hash) {
      scrollToTopImmediate();
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    const timer = window.setTimeout(() => {
      const target = document.getElementById(id);
      if (target) scrollToElementSmooth(target);
    }, 90);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
