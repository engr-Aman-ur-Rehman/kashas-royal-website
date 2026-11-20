import { pageMeta, routes, venue } from "@/data/venueData";
import { usePageMeta } from "@/hooks/usePageMeta";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";

export default function NotFound() {
  usePageMeta(pageMeta.notFound);

  return (
    <PageHero
      compact
      eyebrow="Page Not Found"
      title="This page has left the celebration"
      intro={`The page you were looking for does not exist or has moved. Return home, or call us on ${venue.phone.display}.`}
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button to={routes.home} size="lg">
          Return Home
        </Button>
        <Button to={routes.enquire} variant="outlineLight" size="lg">
          Make an Enquiry
        </Button>
      </div>
    </PageHero>
  );
}
