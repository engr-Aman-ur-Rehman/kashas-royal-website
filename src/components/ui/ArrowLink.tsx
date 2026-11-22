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

/**
 * Editorial action link modelled on 8 Northumberland Avenue's `.all-items-link`:
 * a 38px circular badge that performs a smooth 500ms ease-in-out solid-to-outline
 * inversion on hover alongside a subtle arrow glide and sweeping underline.
 */
export default function ArrowLink({ children, to, href, external, tone = "dark", className = "" }: ArrowLinkProps) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const circle =
    tone === "dark"
      ? "border-olive-deep bg-olive-deep text-ivory group-hover/arrow:bg-transparent group-hover/arrow:text-olive-deep group-hover/arrow:border-olive-deep"
      : "border-ivory bg-ivory text-olive-deep group-hover/arrow:border-gold-champagne group-hover/arrow:bg-gold-champagne/15 group-hover/arrow:text-gold-champagne";
  const text = tone === "dark" ? "text-ink" : "text-ivory";
  const classes = `group/arrow inline-flex items-center gap-3.5 font-sans text-[1.0625rem] font-normal leading-snug tracking-[-0.005em] ${text} ${className}`;

  const content = (
    <>
      <span
        aria-hidden="true"
        className={`relative grid h-[38px] w-[38px] shrink-0 place-items-center overflow-hidden rounded-full border transition-all duration-base ease-editorial ${circle}`}
      >
        <Icon
          size={16}
          strokeWidth={1.6}
          className={`transition-transform duration-base ease-editorial ${
            external
              ? "group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5"
              : "group-hover/arrow:translate-x-0.5"
          }`}
        />
      </span>
      <span className="link-sweep transition-colors duration-base ease-editorial group-hover/arrow:text-current">
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
