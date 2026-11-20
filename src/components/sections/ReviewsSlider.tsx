import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { reviews, REVIEWS_ARE_PLACEHOLDERS } from "@/data/venueData";

/** Horizontally scrolling client reviews with previous / next controls. */
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
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + 24), behavior: "smooth" });
  };

  const controlClass =
    "grid h-11 w-11 place-items-center rounded-full border border-olive/40 text-olive transition-colors duration-base ease-editorial hover:bg-olive hover:text-ivory disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-olive";

  return (
    <section aria-label="Client reviews" aria-roledescription="carousel">
      <div className="flex items-end justify-between gap-6">
        <h3 className="display-md max-w-xl">Words from our hosts</h3>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            className={controlClass}
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label="Previous review"
          >
            <ArrowLeft size={17} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={controlClass}
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label="Next review"
          >
            <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        onScroll={updateEdges}
        tabIndex={0}
        aria-label="Reviews"
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth"
      >
        {reviews.map((review, index) => (
          <li
            key={review.quote}
            aria-roledescription="slide"
            aria-label={`Review ${index + 1} of ${reviews.length}`}
            className="flex w-[85%] shrink-0 snap-start flex-col justify-between border border-hairline bg-ivory p-8 sm:w-[26rem] sm:p-10"
          >
            <figure className="flex h-full flex-col">
              <Quote size={28} strokeWidth={1} className="text-gold" aria-hidden="true" />
              <blockquote className="mt-6 flex-1 font-display text-[1.375rem] leading-snug text-ink sm:text-2xl">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-8 border-t border-hairline pt-5">
                <p className="eyebrow text-ink">{review.attribution}</p>
                <p className="mt-1.5 text-xs text-slate">{review.occasion}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {REVIEWS_ARE_PLACEHOLDERS ? (
        <p className="mt-6 text-xs italic text-slate/80">
          Sample wording shown for illustration. Verified client reviews will appear here.
        </p>
      ) : null}
    </section>
  );
}
