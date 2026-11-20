import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface PhotoHeroLedger {
  /** Real record count; the figure is never padded or derived. */
  value: string | number;
  /** What is being counted, in the accent script: "places", "photographs". */
  label: string;
}

interface PhotoHeroProps {
  /** Plain string, or a span when the name carries an accent phrase. */
  title: ReactNode;
  /** One sentence under the title; the intro below carries the long copy. */
  description?: ReactNode;
  /** Trail printed above the eyebrow, for detail pages. */
  breadcrumb?: ReactNode;
  /** A photograph from the collection itself, held behind the type. */
  backdropImage?: string;
  /** Small uppercase line printed above the title. */
  eyebrow?: string;
  /** Centred is the house opening; left survives only for legacy spots. */
  align?: "left" | "center";
  /** Record count as a gold numeral beside the script label. */
  ledger?: PhotoHeroLedger;
  /** Uppercase facts in the foot rule, hairline-separated. */
  meta?: string[];
  /** Buttons under the copy. */
  actions?: ReactNode;
  className?: string;
}

/**
 * The photographic opening used by every page that is about photographs — the
 * collection fronts and the detail pages alike. Copy is centred over a
 * photograph from the record itself: a breadcrumb trail when the page sits
 * inside a collection, an eyebrow, the name, one sentence and a hairline meta
 * rule. The `main` element already clears the fixed header, so no top offset is
 * repeated here — the image starts at the header's edge and the copy sits on it.
 */
export function PhotoHero({
  title,
  description,
  breadcrumb,
  backdropImage,
  eyebrow,
  align = "left",
  ledger,
  meta,
  actions,
  className,
}: PhotoHeroProps) {
  const centered = align === "center";

  const ledgerBlock = ledger ? (
    <div className="flex items-end gap-3.5 lg:pb-1.5">
      <span className="font-tour text-[3.25rem] font-bold leading-[0.78] tabular-nums text-gold sm:text-[4rem]">
        {ledger.value}
      </span>

      <span className="font-[family-name:var(--font-accent)] text-[2rem] leading-[0.9] text-white">
        {ledger.label}
      </span>
    </div>
  ) : null;

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-charcoal text-white",
        className,
      )}
    >
      {backdropImage && (
        <>
          <Image
            src={backdropImage}
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Dark enough at the foot for the copy, light enough at the top that the photograph reads. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(41,40,36,0.94)_0%,rgba(41,40,36,0.83)_38%,rgba(41,40,36,0.5)_76%,rgba(41,40,36,0.6)_100%)]"
          />

          {/* Left-aligned copy carries an extra wash on its side of the frame. */}
          {!centered && (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(41,40,36,0.62)_0%,rgba(41,40,36,0.16)_56%,transparent_80%)]"
            />
          )}
        </>
      )}

      {/* Warm bloom from the top so the ground does not read as a placeholder. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[380px] bg-[radial-gradient(70%_120%_at_50%_0%,rgba(246,122,5,0.13),transparent_72%)]"
      />

      <div
        className={cn(
          "container-page relative z-10 flex min-h-[420px] flex-col justify-end pb-10 pt-16 sm:min-h-[460px] sm:pb-12 sm:pt-20 lg:min-h-[510px] lg:pb-14 lg:pt-24",
          centered && "items-center",
        )}
      >
        <div className={cn("w-full", centered && "max-w-4xl text-center")}>
          <div
            className={cn(
              ledger &&
                !centered &&
                "grid gap-y-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-x-14",
            )}
          >
            <div>
              {breadcrumb && (
                <div
                  className={cn(
                    "animate-fade mb-6",
                    centered && "flex justify-center",
                  )}
                >
                  {breadcrumb}
                </div>
              )}

              {eyebrow && (
                <p className="type-eyebrow animate-rise text-gold">{eyebrow}</p>
              )}

              <h1
                className={cn(
                  "type-display-xl animate-rise text-white [animation-delay:80ms]",
                  (eyebrow || breadcrumb) && "mt-4",
                )}
              >
                {title}
              </h1>

              {description && (
                <p
                  className={cn(
                    "type-body animate-rise mt-4 text-white/70 [animation-delay:160ms]",
                    centered ? "mx-auto max-w-xl" : "max-w-[54ch]",
                  )}
                >
                  {description}
                </p>
              )}
            </div>

            {ledger && !centered && (
              <div className="animate-rise [animation-delay:200ms] lg:border-l lg:border-white/20 lg:pl-8">
                {ledgerBlock}
              </div>
            )}
          </div>

          {ledger && centered && (
            <div className="mt-7 flex justify-center">{ledgerBlock}</div>
          )}

          {actions && (
            <div
              className={cn(
                "animate-rise mt-8 flex flex-wrap gap-3 [animation-delay:240ms]",
                centered && "justify-center",
              )}
            >
              {actions}
            </div>
          )}

          {meta && meta.length > 0 && (
            <div
              className={cn(
                "animate-fade mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 [animation-delay:320ms]",
                centered ? "justify-center" : "border-t border-white/15 pt-4",
              )}
            >
              {meta.map((item, index) => (
                <span
                  key={item}
                  className="flex items-center gap-x-4 sm:gap-x-5"
                >
                  {/* The rule is dropped on phones, where the row wraps and
                      would otherwise start a line with a separator. */}
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="hidden h-3 w-px bg-white/20 sm:block"
                    />
                  )}

                  <span className="type-meta uppercase text-white/45">{item}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
