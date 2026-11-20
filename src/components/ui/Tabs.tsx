import { useRef, type KeyboardEvent, type ReactNode } from "react";

export interface TabOption<T extends string> {
  id: T;
  label: string;
}

interface TabListProps<T extends string> {
  /** Unique prefix; tabs get `${idBase}-tab-${id}` and control `${idBase}-panel`. */
  idBase: string;
  label: string;
  tabs: readonly TabOption<T>[];
  activeId: T;
  onChange: (id: T) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
  tabClassName?: (active: boolean) => string;
  renderTab?: (tab: TabOption<T>, active: boolean) => ReactNode;
}

/**
 * WAI-ARIA tab list with roving focus: arrow keys, Home and End move between
 * tabs. Pair it with <TabPanel> using the same `idBase`.
 */
export function TabList<T extends string>({
  idBase,
  label,
  tabs,
  activeId,
  onChange,
  orientation = "horizontal",
  className = "",
  tabClassName,
  renderTab,
}: TabListProps<T>) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const move = (index: number) => {
    const next = tabs[(index + tabs.length) % tabs.length];
    onChange(next.id);
    refs.current[next.id]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const forward = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
    const back = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
    if (event.key === forward || (orientation === "vertical" && event.key === "ArrowRight")) {
      event.preventDefault();
      move(index + 1);
    } else if (event.key === back || (orientation === "vertical" && event.key === "ArrowLeft")) {
      event.preventDefault();
      move(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      move(0);
    } else if (event.key === "End") {
      event.preventDefault();
      move(tabs.length - 1);
    }
  };

  return (
    <div role="tablist" aria-label={label} aria-orientation={orientation} className={className}>
      {tabs.map((tab, index) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            ref={(node) => {
              refs.current[tab.id] = node;
            }}
            type="button"
            role="tab"
            id={`${idBase}-tab-${tab.id}`}
            aria-selected={active}
            aria-controls={`${idBase}-panel`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={tabClassName?.(active)}
          >
            {renderTab ? renderTab(tab, active) : tab.label}
          </button>
        );
      })}
    </div>
  );
}

interface TabPanelProps {
  idBase: string;
  activeId: string;
  children: ReactNode;
  className?: string;
}

export function TabPanel({ idBase, activeId, children, className }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      id={`${idBase}-panel`}
      aria-labelledby={`${idBase}-tab-${activeId}`}
      tabIndex={0}
      className={className}
    >
      {children}
    </div>
  );
}
