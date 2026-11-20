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
          `relative shrink-0 whitespace-nowrap pb-4 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-base ease-editorial after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-gold-champagne after:transition-transform after:duration-base after:ease-editorial ${
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
                  className="flex items-baseline gap-5 border-b border-hairline-gold py-3.5 font-display text-2xl text-ivory sm:text-[1.75rem]"
                >
                  <span aria-hidden="true" className="w-5 font-sans text-[0.625rem] font-medium tracking-[0.2em] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </TabPanel>
    </div>
  );
}
