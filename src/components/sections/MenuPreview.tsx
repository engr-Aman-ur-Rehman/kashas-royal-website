import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sampleMenu } from "@/data/venueData";
import { panelSwap } from "@/config/motion";
import { TabList, TabPanel } from "@/components/ui/Tabs";

type MenuGroupId = (typeof sampleMenu)[number]["id"];

const tabs = sampleMenu.map((group) => ({ id: group.id, label: group.label }));

/** Interactive sample starter menu, shown on a dark olive surface. */
export default function MenuPreview() {
  const [activeId, setActiveId] = useState<MenuGroupId>("grill");
  const active = sampleMenu.find((group) => group.id === activeId) ?? sampleMenu[0];

  return (
    <div>
      <TabList
        idBase="menu"
        label="Sample menu sections"
        tabs={tabs}
        activeId={activeId}
        onChange={setActiveId}
        className="no-scrollbar -mx-5 flex gap-7 overflow-x-auto border-b border-hairline-gold px-5 sm:mx-0 sm:px-0"
        tabClassName={(isActive) =>
          `font-condensed-label relative shrink-0 whitespace-nowrap pb-4 text-[0.875rem] font-semibold uppercase tracking-[0.1em] transition-colors duration-base ease-editorial after:absolute after:inset-x-0 after:-bottom-px after:h-[1.5px] after:bg-gold-champagne after:transition-transform after:duration-base after:ease-editorial ${
            isActive ? "text-gold-champagne after:scale-x-100" : "text-ivory/60 after:scale-x-0 hover:text-ivory"
          }`
        }
      />
      <TabPanel idBase="menu" activeId={activeId} className="mt-8 min-h-[19rem] outline-offset-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={active.id} variants={panelSwap} initial="hidden" animate="visible" exit="exit">
            <h3 className="eyebrow text-ivory/60">{active.title}</h3>
            <ul className="mt-4">
              {active.items.map((item, index) => (
                <li
                  key={item}
                  className="group flex items-baseline gap-5 border-b border-hairline-gold py-3.5 transition-colors duration-base ease-editorial hover:border-gold-champagne/60"
                >
                  <span
                    aria-hidden="true"
                    className="font-condensed-label w-6 text-[0.75rem] font-semibold tracking-[0.16em] text-gold transition-transform duration-base ease-editorial group-hover:translate-x-1"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-condensed text-[1.75rem] leading-tight text-ivory transition-transform duration-base ease-editorial group-hover:translate-x-1.5 group-hover:text-gold-champagne sm:text-[2rem]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </TabPanel>
    </div>
  );
}
