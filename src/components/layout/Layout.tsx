import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { PrivacyContext } from "@/context/PrivacyContext";
import Header from "./Header";
import Footer from "./Footer";
import FloatingEnquireButton from "./FloatingEnquireButton";
import MobileStickyBar from "./MobileStickyBar";
import PrivacyModal from "./PrivacyModal";
import ScrollManager from "./ScrollManager";
import { LogoKeyFilter } from "@/components/ui/Logo";

export default function Layout() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const privacy = useMemo(() => ({ openPrivacy: () => setPrivacyOpen(true) }), []);

  return (
    <PrivacyContext.Provider value={privacy}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-btn focus:bg-gold focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.14em] focus:text-ink"
      >
        Skip to content
      </a>
      <LogoKeyFilter />
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <FloatingEnquireButton />
      <MobileStickyBar />
      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </PrivacyContext.Provider>
  );
}
