import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { reviews, REVIEWS_ARE_PLACEHOLDERS } from "@/data/venueData";

/**
 * Horizontally scrolling client reviews modelled on 8 Northumberland Avenue's
 * `.testimonials-relation`: rounded 10px editorial quote cards, large condensed
 * light pull-quotes, subtle hover lift, and circular 38px nav buttons that
 * invert on hover over 300ms ease-in-out.
 */
export default function ReviewsSlider() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
  };

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector("li");
    if (!track || !card) return;
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + 20), behavior: "smooth" });
  };

  const controlClass =
    "grid h-[42px] w-[42px] place-items-center rounded-full border-2 border-olive-deep bg-olive-deep text-ivory transition-all duration-fast ease-editorial hover:border-gold hover:bg-gold hover:text-ink disabled:cursor-not-allowed disabled:border-olive/30 disabled:bg-transparent disabled:text-olive/35 disabled:hover:border-olive/30 disabled:hover:bg-transparent disabled:hover:text-olive/35";

  return (
    <section aria-label="Client reviews" aria-roledescription="carousel">
      <div className="flex items-end justify-between gap-6">
        <h3 className="display-md max-w-xl">Words from our hosts</h3>
        <div className="flex shrink-0 gap-2.5">
          <button
            type="button"
            className={controlClass}
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label="Previous review"
          >
            <ArrowLeft size={16} strokeWidth={1.6} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={controlClass}
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label="Next review"
          >
            <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        onScroll={updateEdges}
        tabIndex={0}
        aria-label="Reviews"
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 pt-1 scroll-smooth"
      >
        {reviews.map((review, index) => (
          <li
            key={review.quote}
            aria-roledescription="slide"
            aria-label={`Review ${index + 1} of ${reviews.length}`}
            className="card-surface group flex min-h-[22rem] w-[86%] shrink-0 snap-start flex-col justify-between p-7 hover:-translate-y-1.5 sm:min-h-[25rem] sm:w-[27rem] sm:p-9"
          >
            <figure className="flex h-full flex-col">
              <Quote
                size={28}
                strokeWidth={1.15}
                className="text-gold transition-transform duration-base ease-editorial group-hover:scale-110"
                aria-hidden="true"
              />
              <blockquote className="font-condensed mt-6 flex-1 text-[1.75rem] leading-[1.06] text-ink sm:text-[2.125rem]">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-8 border-t border-hairline pt-5">
                <p className="eyebrow text-ink">{review.attribution}</p>
                <p className="mt-1.5 text-sm text-slate">{review.occasion}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {REVIEWS_ARE_PLACEHOLDERS ? (
        <p className="mt-4 text-xs text-slate/80">
          Sample wording shown for illustration. Verified client reviews will appear here.
        </p>
      ) : null}
    </section>
  );
}
