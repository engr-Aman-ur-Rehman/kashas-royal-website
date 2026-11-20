import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  tone?: "dark" | "light";
  /** Shows a short gold rule before the label. */
  rule?: boolean;
  className?: string;
}

export default function Eyebrow({ children, tone = "dark", rule = true, className = "" }: EyebrowProps) {
  return (
    <p className={`eyebrow flex items-center gap-4 ${tone === "dark" ? "text-olive" : "text-gold-champagne"} ${className}`}>
      {rule ? <span aria-hidden="true" className="h-px w-10 shrink-0 bg-gold" /> : null}
      <span>{children}</span>
    </p>
  );
}
