import { useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { fade, modalPanel } from "@/config/motion";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: ReactNode;
}

/** Accessible dialog: focus is trapped, Escape and the backdrop close it. */
export default function Modal({ open, onClose, title, eyebrow, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useLockBodyScroll(open);
  useFocusTrap(panelRef, { active: open, onEscape: onClose, initialFocus: closeRef });

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          variants={fade}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            variants={modalPanel}
            className="relative flex max-h-[90svh] w-full max-w-2xl flex-col bg-ivory shadow-2xl"
          >
            <div className="flex items-start justify-between gap-6 border-b border-hairline px-6 py-5 sm:px-10 sm:py-7">
              <div>
                {eyebrow ? <p className="eyebrow mb-2 text-olive">{eyebrow}</p> : null}
                <h2 id={titleId} className="display-sm">
                  {title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-olive/35 text-olive transition-colors duration-base ease-editorial hover:bg-olive hover:text-ivory"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            <div className="overflow-y-auto px-6 py-6 sm:px-10 sm:py-8">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
