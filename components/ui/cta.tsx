import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type CtaVariant = "primary" | "outline" | "cream" | "dark";
export type CtaSize = "md" | "lg";
/** Square is the house shape; pill is used by the detail pages. */
export type CtaShape = "square" | "pill";

const base =
  "group inline-flex shrink-0 items-center justify-center gap-2.5 font-[family-name:var(--font-primary)] font-bold uppercase tracking-[0.14em] transition-colors duration-300 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F67A05] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<CtaVariant, string> = {
  primary: "bg-ember text-white hover:bg-clay",
  outline: "border border-white/45 text-white hover:border-white hover:bg-white/10",
  cream: "bg-canvas text-forest-800 hover:bg-white",
  dark: "bg-forest-900 text-white hover:bg-forest-800",
};

const sizes: Record<CtaSize, string> = {
  md: "h-11 px-6 text-[11px]",
  lg: "h-12 px-8 text-[12px]",
};

/* Pill shape: sentence case, rounded, tighter tracking. */
const pillVariants: Record<CtaVariant, string> = {
  primary: "pill-primary",
  outline: "pill-outline-light",
  cream: "pill-cream",
  dark: "pill-dark",
};

const pillSizes: Record<CtaSize, string> = {
  md: "h-11 px-6 text-[13px]",
  lg: "h-[52px] px-7 text-[14.5px]",
};

interface CtaClassNameOptions {
  variant?: CtaVariant;
  size?: CtaSize;
  shape?: CtaShape;
  className?: string;
}

/** Shared CTA styling, for the rare case a plain element is needed. */
export function ctaClassName({
  variant = "primary",
  size = "md",
  shape = "square",
  className,
}: CtaClassNameOptions = {}) {
  if (shape === "pill") {
    return cn("pill", pillVariants[variant], pillSizes[size], className);
  }

  return cn(base, variants[variant], sizes[size], className);
}

function CtaArrow() {
  return (
    <ArrowRight
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      strokeWidth={2}
      aria-hidden="true"
    />
  );
}

interface CtaLinkProps extends CtaClassNameOptions {
  href: string;
  children: ReactNode;
  arrow?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export function CtaLink({
  href,
  children,
  variant = "primary",
  size = "md",
  shape = "square",
  className,
  arrow = true,
  target,
  rel,
  ariaLabel,
}: CtaLinkProps) {
  const classes = ctaClassName({ variant, size, shape, className });

  if (target) {
    return (
      <a
        href={href}
        target={target}
        rel={rel ?? "noopener noreferrer"}
        aria-label={ariaLabel}
        className={classes}
      >
        {children}
        {arrow && <CtaArrow />}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={classes}>
      {children}
      {arrow && <CtaArrow />}
    </Link>
  );
}

interface CtaButtonProps extends CtaClassNameOptions {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  arrow?: boolean;
  ariaLabel?: string;
}

export function CtaButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  shape = "square",
  className,
  type = "button",
  disabled,
  arrow = false,
  ariaLabel,
}: CtaButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={ctaClassName({ variant, size, shape, className })}
    >
      {children}
      {arrow && <CtaArrow />}
    </button>
  );
}
