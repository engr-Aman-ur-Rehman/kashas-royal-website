import { useEffect, useRef, useState } from "react";
import { animate, AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { capacityLayouts, type LayoutId } from "@/data/venueData";
import { durations, easings, panelSwap } from "@/config/motion";
import { TabList, TabPanel } from "@/components/ui/Tabs";
import LayoutDiagram from "./LayoutDiagram";

/** Counts from the previous capacity to the new one whenever `value` changes. */
function AnimatedNumber({ value }: { value: number }) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const previous = useRef(value);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      previous.current = value;
      return;
    }
    const controls = animate(previous.current, value, {
      duration: durations.slow,
      ease: easings.editorial,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    previous.current = value;
    return () => controls.stop();
  }, [value, reduceMotion]);

  return <span data-testid="capacity-number">{display}</span>;
}

const tabs = capacityLayouts.map((layout) => ({ id: layout.id, label: layout.label }));

/** Signature feature: switch between the seven official layouts. */
export default function CapacitySwitcher() {
  const [activeId, setActiveId] = useState<LayoutId>("standing");
  const active = capacityLayouts.find((layout) => layout.id === activeId) ?? capacityLayouts[0];

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-4">
        <TabList
          idBase="capacity"
          label="Room layouts"
          tabs={tabs}
          activeId={activeId}
          onChange={setActiveId}
          orientation="vertical"
          className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:block lg:overflow-visible lg:border-b lg:border-hairline lg:px-0 lg:pb-0"
          tabClassName={(isActive) =>
            `group shrink-0 border px-5 py-3 text-left transition-colors duration-base ease-editorial lg:flex lg:w-full lg:items-baseline lg:justify-between lg:border-0 lg:border-t lg:border-hairline lg:px-0 lg:py-5 ${
              isActive
                ? "border-olive bg-olive text-ivory lg:bg-transparent lg:text-ink"
                : "border-olive/25 text-slate hover:border-olive hover:text-ink"
            }`
          }
          renderTab={(tab, isActive) => {
            const layout = capacityLayouts.find((item) => item.id === tab.id)!;
            return (
              <>
                <span className="flex items-baseline">
                  <span
                    aria-hidden="true"
                    className={`hidden overflow-hidden font-sans text-sm text-gold transition-all duration-base ease-editorial lg:inline-block ${
                      isActive ? "mr-4 w-5 opacity-100" : "mr-0 w-0 opacity-0 group-hover:mr-4 group-hover:w-5 group-hover:opacity-60"
                    }`}
                  >
                    →
                  </span>
                  <span className="whitespace-nowrap font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.16em] lg:font-display lg:text-[1.75rem] lg:font-medium lg:normal-case lg:leading-none lg:tracking-normal">
                    {tab.label}
                  </span>
                </span>
                <span
                  className={`ml-2 font-sans text-[0.6875rem] font-medium tabular-nums tracking-[0.1em] lg:ml-0 lg:text-xs ${
                    isActive ? "text-gold-champagne lg:text-olive" : "text-slate/70"
                  }`}
                >
                  {layout.capacity}
                </span>
              </>
            );
          }}
        />
        <p className="mt-6 hidden text-sm leading-relaxed lg:block">
          Select a layout to see its capacity and the occasions it suits best. Our team will advise on the right
          arrangement for your guest list.
        </p>
      </div>

      <TabPanel idBase="capacity" activeId={activeId} className="lg:col-span-8">
        <div className="grid overflow-hidden border border-hairline bg-ivory md:grid-cols-2">
          <div className="flex flex-col justify-between gap-10 p-7 sm:p-10">
            <div>
              <p className="eyebrow text-olive">Capacity</p>
              <p className="mt-5 flex items-end gap-4 text-ink" aria-hidden="true">
                <span className="pb-3 font-sans text-[0.6875rem] font-semibold uppercase tracking-eyebrow text-slate">
                  Up to
                </span>
                <span className="font-display text-[5.5rem] font-medium leading-[0.8] tabular-nums sm:text-[7rem]">
                  <AnimatedNumber value={active.capacity} />
                </span>
                <span className="pb-3 font-sans text-[0.6875rem] font-semibold uppercase tracking-eyebrow text-slate">
                  guests
                </span>
              </p>
              <p className="sr-only" aria-live="polite">
                {active.name}: up to {active.capacity} guests.
              </p>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active.id} variants={panelSwap} initial="hidden" animate="visible" exit="exit">
                <h3 className="display-sm">{active.name}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed">{active.summary}</p>
                <p className="eyebrow mt-7 text-olive">Ideal for</p>
                <ul className="mt-3 space-y-2">
                  {active.idealFor.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-ink">
                      <Check size={14} strokeWidth={2} className="shrink-0 text-gold" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-center border-t border-hairline bg-stone/60 p-6 sm:p-8 md:border-l md:border-t-0">
            <LayoutDiagram layout={active.id} name={active.name} />
            <p className="mt-4 text-center font-sans text-[0.625rem] font-medium uppercase tracking-[0.18em] text-slate/80">
              Illustrative layout · Not to scale
            </p>
          </div>
        </div>
      </TabPanel>
    </div>
  );
}
