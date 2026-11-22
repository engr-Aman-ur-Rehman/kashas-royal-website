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

/**
 * Accessible single-open accordion styled after 8 Northumberland Avenue's
 * `.accordion-single`: clean hairline rules, Bricolage Grotesque questions,
 * and a circular `+` trigger that fills dark & inverts on hover (500ms
 * ease-in-out) and rotates 45° when expanded.
 */
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
            <Heading className="font-sans font-body-width">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="group flex w-full items-center justify-between gap-6 py-7 text-left"
              >
                <span
                  className={`font-sans font-body-width text-[1.0625rem] font-medium leading-[1.35] transition-colors duration-base ease-editorial sm:text-[1.25rem] ${
                    isOpen ? "text-olive-deep" : "text-ink group-hover:text-olive"
                  }`}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-base ease-editorial ${
                    isOpen
                      ? "rotate-45 border-olive-deep bg-olive-deep text-ivory"
                      : "border-olive-deep/60 bg-transparent text-olive-deep group-hover:border-olive-deep group-hover:bg-olive-deep group-hover:text-ivory"
                  }`}
                >
                  <Plus size={15} strokeWidth={1.6} />
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
                  <div className="max-w-[34rem] space-y-3 pb-8 pr-10 text-[1rem] leading-[1.55] text-slate">
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
