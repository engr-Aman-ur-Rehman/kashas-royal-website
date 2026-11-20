import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "gold" | "outlineLight" | "outlineDark" | "ink";
type Size = "md" | "lg";

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
  | (BaseProps & { href: string; to?: never; download?: boolean; external?: boolean; onClick?: () => void })
  | (BaseProps & {
      to?: never;
      href?: never;
      type?: "button" | "submit";
      onClick?: () => void;
      disabled?: boolean;
    });

const base =
  "group/btn inline-flex items-center justify-center gap-3 whitespace-nowrap font-sans font-semibold uppercase tracking-[0.16em] transition-colors duration-base ease-editorial disabled:cursor-not-allowed disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "min-h-[2.875rem] px-6 text-[0.6875rem]",
  lg: "min-h-[3.375rem] px-8 text-xs",
};

const variants: Record<Variant, string> = {
  gold: "bg-gold text-ink hover:bg-gold-champagne",
  ink: "bg-olive-deep text-ivory hover:bg-olive",
  outlineLight: "border border-ivory/45 text-ivory hover:border-gold-champagne hover:bg-ivory/5 hover:text-gold-champagne",
  outlineDark: "border border-olive/40 text-ink hover:border-olive hover:bg-olive hover:text-ivory",
};

export default function Button(props: ButtonProps) {
  const { children, variant = "gold", size = "md", className = "", icon, iconPosition = "right" } = props;
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const content = (
    <>
      {icon && iconPosition === "left" ? <span aria-hidden="true">{icon}</span> : null}
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
