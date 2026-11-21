import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Expand } from "lucide-react";
import { pageMeta } from "@/data/venueData";
import { galleryCategories, media, type GalleryCategory, type GalleryImage } from "@/data/media";
import { transitions } from "@/config/motion";
import { usePageMeta } from "@/hooks/usePageMeta";
import PageHero from "@/components/ui/PageHero";
import SmartImage from "@/components/ui/SmartImage";
import { TabList, TabPanel } from "@/components/ui/Tabs";
import Lightbox from "@/components/gallery/Lightbox";

type Filter = GalleryCategory | "all";

const shapeClass: Record<GalleryImage["shape"], string> = {
  landscape: "",
  portrait: "row-span-2",
  wide: "col-span-2",
};

const categoryLabel = (image: GalleryImage) =>
  galleryCategories.find((category) => category.id === image.category)?.label ?? "";

export default function Gallery() {
  usePageMeta(pageMeta.gallery);

  const [filter, setFilter] = useState<Filter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const images = useMemo(
    () => (filter === "all" ? media.gallery : media.gallery.filter((image) => image.category === filter)),
    [filter],
  );

  const closeLightbox = useCallback(() => setOpenIndex(null), []);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Moments Framed in Light &amp; <em className="text-gold-champagne">Grandeur</em>
          </>
        }
        intro="Weddings, décor, private celebrations and dining at Kashas Royal. Select any image to view it full screen."
        image={media.galleryHero}
      />

      <section aria-label="Photo gallery" className="section-pad">
        <div className="container-site">
          <div className="flex flex-col gap-5 border-b border-hairline sm:flex-row sm:items-end sm:justify-between">
            <TabList
              idBase="gallery"
              label="Filter gallery by category"
              tabs={galleryCategories}
              activeId={filter}
              onChange={setFilter}
              className="no-scrollbar -mx-5 flex gap-7 overflow-x-auto px-5 sm:mx-0 sm:gap-9 sm:px-0"
              tabClassName={(active) =>
                `font-condensed-label relative shrink-0 whitespace-nowrap pb-5 text-[0.875rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-base ease-editorial after:absolute after:inset-x-0 after:-bottom-px after:h-[2px] after:bg-gold after:transition-transform after:duration-base after:ease-editorial ${
                  active ? "text-ink after:scale-x-100" : "text-slate/65 after:scale-x-0 hover:text-ink"
                }`
              }
            />
            <p className="hidden pb-5 font-sans text-xs tabular-nums tracking-[0.12em] text-slate sm:block" aria-live="polite">
              {images.length} {images.length === 1 ? "image" : "images"}
            </p>
          </div>

          <TabPanel idBase="gallery" activeId={filter} className="mt-8 outline-offset-8 sm:mt-10">
            <motion.ul
              layout
              className="grid grid-flow-dense auto-rows-[38vw] grid-cols-2 gap-4 sm:auto-rows-[26vw] sm:gap-5 lg:auto-rows-[18rem] lg:grid-cols-4"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {images.map((image, index) => (
                  <motion.li
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={transitions.layout}
                    className={shapeClass[image.shape]}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(index)}
                      aria-label={`View image: ${image.caption}`}
                      className="group relative block h-full w-full overflow-hidden rounded-card text-left"
                    >
                      <SmartImage
                        image={image}
                        useThumb
                        className="h-full w-full"
                        imgClassName="group-hover:scale-105 group-focus-visible:scale-105"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-olive-deep/90 via-olive-deep/30 to-transparent opacity-0 transition-opacity duration-base ease-editorial group-hover:opacity-100 group-focus-visible:opacity-100"
                      />
                      <span className="absolute inset-x-0 bottom-0 flex translate-y-5 items-end justify-between gap-3 p-4 opacity-0 transition-all duration-base ease-editorial group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-5">
                        <span>
                          <span className="font-condensed-label block text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-gold-champagne">
                            {categoryLabel(image)}
                          </span>
                          <span className="font-condensed mt-1 block text-xl leading-[1.06] text-ivory sm:text-2xl">
                            {image.caption}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full border border-ivory/80 bg-ivory text-olive-deep transition-all duration-base ease-editorial group-hover:border-gold group-hover:bg-gold group-hover:text-ink"
                        >
                          <Expand size={15} strokeWidth={1.6} />
                        </span>
                      </span>
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </TabPanel>
        </div>
      </section>

      <Lightbox
        images={images}
        index={openIndex}
        categoryLabel={categoryLabel}
        onClose={closeLightbox}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
