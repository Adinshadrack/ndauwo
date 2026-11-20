import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** "dark" renders for dark green sections. */
  tone?: "light" | "dark";
  /** Shows the orange brush stroke under the title, as used in the hero and destinations. */
  brush?: boolean;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  brush = false,
  align = "center",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        align === "center" ? "flex flex-col items-center text-center" : "flex flex-col items-start text-left",
        className,
      )}
    >
      <p className="type-eyebrow text-gold">{eyebrow}</p>

      <div className={cn("mt-3", align === "center" && "flex flex-col items-center")}>
        <Heading className={cn("type-script", isDark ? "text-white" : "text-ink")}>
          {title}
        </Heading>

        {brush && (
          <svg
            viewBox="0 0 200 14"
            aria-hidden="true"
            preserveAspectRatio="none"
            className="mt-2 h-[10px] w-[220px] text-ember sm:w-[300px]"
          >
            <path
              d="M2 4.4C45 1.3 100 0.7 198 2.7l0 .9C120 7 60 9 2 11.4Z"
              fill="currentColor"
            />
          </svg>
        )}
      </div>

      {description && (
        <div
          className={cn(
            "type-body-sm mt-4 max-w-2xl",
            isDark ? "text-white/70" : "text-ink/65",
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
}
