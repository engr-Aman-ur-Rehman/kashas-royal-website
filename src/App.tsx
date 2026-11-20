import { Route, Routes } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import TheVenue from "@/pages/TheVenue";
import EventsPackages from "@/pages/EventsPackages";
import Gallery from "@/pages/Gallery";
import VisitUs from "@/pages/VisitUs";
import Enquire from "@/pages/Enquire";
import NotFound from "@/pages/NotFound";
import { routes } from "@/data/venueData";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.venue} element={<TheVenue />} />
        <Route path={routes.events} element={<EventsPackages />} />
        <Route path={routes.gallery} element={<Gallery />} />
        <Route path={routes.visit} element={<VisitUs />} />
        <Route path={routes.enquire} element={<Enquire />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
