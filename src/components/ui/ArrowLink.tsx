import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface ArrowLinkProps {
  children: ReactNode;
  to?: string;
  href?: string;
  /** Opens `href` in a new tab and shows a diagonal arrow. */
  external?: boolean;
  tone?: "dark" | "light";
  className?: string;
}

/** Editorial text link with a circled arrow, used for secondary navigation. */
export default function ArrowLink({ children, to, href, external, tone = "dark", className = "" }: ArrowLinkProps) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const circle =
    tone === "dark"
      ? "border-olive/40 text-olive group-hover/arrow:border-olive group-hover/arrow:bg-olive group-hover/arrow:text-ivory"
      : "border-gold/60 text-gold-champagne group-hover/arrow:border-gold-champagne group-hover/arrow:bg-gold-champagne group-hover/arrow:text-ink";
  const text = tone === "dark" ? "text-ink" : "text-ivory";
  const classes = `group/arrow inline-flex items-center gap-4 font-sans text-xs font-semibold uppercase tracking-[0.16em] ${text} ${className}`;

  const content = (
    <>
      <span
        aria-hidden="true"
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-base ease-editorial ${circle}`}
      >
        <Icon size={16} strokeWidth={1.5} />
      </span>
      <span className="border-b border-transparent pb-0.5 transition-colors duration-base ease-editorial group-hover/arrow:border-current">
        {children}
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {content}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
