import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "gold" | "outlineLight" | "outlineDark" | "ink";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  "aria-label"?: string;
}

type ButtonProps =
  | (BaseProps & { to: string; href?: never; onClick?: () => void })
  | (BaseProps & { href: string; to?: never; download?: boolean | string; external?: boolean; onClick?: () => void })
  | (BaseProps & {
      to?: never;
      href?: never;
      type?: "button" | "submit";
      onClick?: () => void;
      disabled?: boolean;
    });

/**
 * 8 Northumberland Avenue `.btn` geometry: crisp 2px corners, condensed
 * Bricolage Grotesque uppercase tracking (`font-condensed-label`), and velvety
 * 500ms ease-in-out hover fills.
 */
const base =
  "group/btn font-condensed-label inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-btn border font-medium uppercase tracking-[0.08em] transition-all duration-base ease-editorial disabled:cursor-not-allowed disabled:opacity-60";

const sizes: Record<Size, string> = {
  sm: "min-h-[2.625rem] px-4 text-[0.875rem]",
  md: "min-h-[3rem] px-6 text-[0.9375rem]",
  lg: "min-h-[3.375rem] px-8 text-[1rem]",
};

const variants: Record<Variant, string> = {
  gold: "border-gold bg-gold text-ink hover:-translate-y-0.5 hover:border-gold-champagne hover:bg-gold-champagne hover:shadow-[0_14px_30px_-14px_rgb(var(--color-gold)/0.65)]",
  ink: "border-olive-deep bg-olive-deep text-ivory hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-ink",
  outlineLight:
    "border-ivory/50 bg-transparent text-ivory hover:-translate-y-0.5 hover:border-ivory hover:bg-ivory hover:text-olive-deep",
  outlineDark:
    "border-olive-deep/40 bg-transparent text-ink hover:-translate-y-0.5 hover:border-olive-deep hover:bg-olive-deep hover:text-ivory",
};

export default function Button(props: ButtonProps) {
  const { children, variant = "gold", size = "md", className = "", icon, iconPosition = "right" } = props;
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const content = (
    <>
      {icon && iconPosition === "left" ? (
        <span aria-hidden="true" className="transition-transform duration-base ease-editorial group-hover/btn:-translate-x-0.5">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? (
        <span aria-hidden="true" className="transition-transform duration-base ease-editorial group-hover/btn:translate-x-1">
          {icon}
        </span>
      ) : null}
    </>
  );

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={classes} aria-label={props["aria-label"]} onClick={props.onClick}>
        {content}
      </Link>
    );
  }

  if ("href" in props && props.href) {
    return (
      <a
        href={props.href}
        className={classes}
        aria-label={props["aria-label"]}
        onClick={props.onClick}
        download={props.download}
        {...(props.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  const buttonProps = props as Extract<ButtonProps, { type?: "button" | "submit" }>;
  return (
    <button
      type={buttonProps.type ?? "button"}
      className={classes}
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
      aria-label={props["aria-label"]}
    >
      {content}
    </button>
  );
}
