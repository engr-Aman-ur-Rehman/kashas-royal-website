import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { accordion } from "@/config/motion";

export interface AccordionItem {
  id: string;
  question: string;
  answer: string[];
}

interface AccordionProps {
  items: AccordionItem[];
  /** Id of an item to open initially. */
  defaultOpenId?: string;
  /** Heading level for each question, to keep the page outline correct. */
  headingLevel?: "h3" | "h4";
}

/** Accessible single-open accordion (button + region pattern). */
export default function Accordion({ items, defaultOpenId, headingLevel: Heading = "h3" }: AccordionProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className="border-b border-hairline">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div key={item.id} className="border-t border-hairline">
            <Heading className="font-sans">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span
                  className={`font-display text-xl font-medium leading-snug transition-colors duration-base ease-editorial sm:text-2xl ${
                    isOpen ? "text-olive" : "text-ink group-hover:text-olive"
                  }`}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-base ease-editorial ${
                    isOpen
                      ? "rotate-45 border-gold bg-gold text-ink"
                      : "border-olive/35 text-olive group-hover:border-olive"
                  }`}
                >
                  <Plus size={16} strokeWidth={1.5} />
                </span>
              </button>
            </Heading>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  variants={accordion}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="overflow-hidden"
                >
                  <div className="max-w-2xl space-y-3 pb-7 pr-12 text-[0.9375rem] leading-relaxed">
                    {item.answer.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
