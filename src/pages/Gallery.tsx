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
            Moments Framed in Light &amp; <em className="font-normal italic text-gold-champagne">Grandeur</em>
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
                `relative shrink-0 whitespace-nowrap pb-5 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-base ease-editorial after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-gold after:transition-transform after:duration-base after:ease-editorial ${
                  active ? "text-ink after:scale-x-100" : "text-slate/70 after:scale-x-0 hover:text-ink"
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
              className="grid grid-flow-dense auto-rows-[38vw] grid-cols-2 gap-3 sm:auto-rows-[26vw] sm:gap-4 lg:auto-rows-[17.5rem] lg:grid-cols-4"
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
                      className="group relative block h-full w-full overflow-hidden rounded-media text-left"
                    >
                      <SmartImage
                        image={image}
                        useThumb
                        className="h-full w-full"
                        imgClassName="group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-0 transition-opacity duration-base ease-editorial group-hover:opacity-100 group-focus-visible:opacity-100"
                      />
                      <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 p-4 opacity-0 transition-all duration-base ease-editorial group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-5">
                        <span>
                          <span className="block font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-gold-champagne">
                            {categoryLabel(image)}
                          </span>
                          <span className="mt-1 block font-display text-lg leading-tight text-ivory sm:text-xl">
                            {image.caption}
                          </span>
                        </span>
                        <Expand size={18} strokeWidth={1.5} className="shrink-0 text-gold-champagne" aria-hidden="true" />
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
