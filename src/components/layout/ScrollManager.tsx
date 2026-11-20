import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the top on every route change. If the URL carries a #hash, the
 * matching section is scrolled into view instead.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
