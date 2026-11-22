import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { FALLBACK_IMAGE, type GalleryImage } from "@/data/media";
import { fade, panelSwap } from "@/config/motion";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

interface LightboxProps {
  images: GalleryImage[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  categoryLabel: (image: GalleryImage) => string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const SWIPE_THRESHOLD = 60;

/** Full-screen image viewer. Keyboard: ← / → to navigate, Esc to close. */
export default function Lightbox({ images, index, categoryLabel, onClose, onNavigate }: LightboxProps) {
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const image = open ? images[index] : null;
  const total = images.length;

  useLockBodyScroll(open);
  useFocusTrap(dialogRef, { active: open, onEscape: onClose, initialFocus: closeRef });

  useEffect(() => {
    if (index === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNavigate((index + 1) % total);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onNavigate((index - 1 + total) % total);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [index, total, onNavigate]);

  // Warm the cache for the neighbouring images so navigation feels instant.
  useEffect(() => {
    if (index === null) return;
    [images[(index + 1) % total], images[(index - 1 + total) % total]].forEach((neighbour) => {
      if (neighbour) new Image().src = neighbour.src;
    });
  }, [index, images, total]);

  const controlClass =
    "grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-gold/60 text-gold-champagne transition-all duration-fast ease-editorial hover:scale-105 hover:border-gold hover:bg-gold hover:text-ink sm:h-12 sm:w-12";

  return createPortal(
    <AnimatePresence>
      {image && index !== null ? (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer: ${image.caption}`}
          className="fixed inset-0 z-[80] flex flex-col bg-ink/[0.97]"
          variants={fade}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex shrink-0 items-center justify-between px-5 py-4 sm:px-8">
            <p className="font-sans text-xs font-medium tabular-nums tracking-[0.2em] text-ivory/70" aria-live="polite">
              <span className="sr-only">Image </span>
              {String(index + 1).padStart(2, "0")} <span className="text-gold">/</span> {String(total).padStart(2, "0")}
            </p>
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Close image viewer" className={controlClass}>
              <X size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center gap-3 px-3 sm:gap-6 sm:px-8">
            <button
              type="button"
              onClick={() => onNavigate((index - 1 + total) % total)}
              aria-label="Previous image"
              className={`${controlClass} absolute left-3 z-10 bg-ink/60 sm:static sm:bg-transparent`}
            >
              <ChevronLeft size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>

            <div className="flex h-full min-w-0 flex-1 items-center justify-center" onClick={onClose}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={image.id}
                  src={image.src}
                  alt={image.alt}
                  variants={panelSwap}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -SWIPE_THRESHOLD) onNavigate((index + 1) % total);
                    else if (info.offset.x > SWIPE_THRESHOLD) onNavigate((index - 1 + total) % total);
                  }}
                  onClick={(event) => event.stopPropagation()}
                  onError={(event) => {
                    if (!event.currentTarget.src.endsWith(FALLBACK_IMAGE)) event.currentTarget.src = FALLBACK_IMAGE;
                  }}
                  draggable={false}
                  className="max-h-full max-w-full cursor-grab touch-pan-y select-none rounded-card object-contain active:cursor-grabbing"
                />
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => onNavigate((index + 1) % total)}
              aria-label="Next image"
              className={`${controlClass} absolute right-3 z-10 bg-ink/60 sm:static sm:bg-transparent`}
            >
              <ChevronRight size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <div className="shrink-0 px-5 pb-6 pt-5 text-center sm:px-8 sm:pb-8">
            <p className="font-condensed text-2xl text-ivory sm:text-3xl">{image.caption}</p>
            <ul className="mt-3 flex flex-wrap justify-center gap-2" aria-label="Tags">
              {[categoryLabel(image), ...image.tags].map((tag, tagIndex) => (
                <li
                  key={tag}
                  className={`font-condensed-label rounded-full border px-3.5 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.12em] ${
                    tagIndex === 0 ? "border-gold bg-gold text-ink" : "border-gold/45 text-gold-champagne"
                  }`}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
