import Image from "next/image";
import { Check, Minus } from "lucide-react";

import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";

interface TourScopeProps {
  included: string[];
  excluded: string[];
  /** The programme's own photograph, cut into the Included card. */
  photo?: string;
  /** A second photograph, desaturated, for where the price stops. */
  asidePhoto?: string;
}

type ScopeTone = "included" | "excluded";

function ScopeList({ items, tone }: { items: string[]; tone: ScopeTone }) {
  const Icon = tone === "included" ? Check : Minus;

  return (
    <ul className="grid gap-x-6 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "flex gap-2.5 pb-3 text-[0.84375rem] leading-snug",
            tone === "included" ? "text-ink" : "text-ink-muted",
          )}
        >
          <Icon
            className={cn(
              "mt-0.5 h-3.5 w-3.5 flex-none",
              tone === "included" ? "text-forest-900" : "text-ink/35",
            )}
            strokeWidth={2.6}
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

interface ScopeCardProps {
  tone: ScopeTone;
  title: string;
  items: string[];
  photo?: string;
  className?: string;
}

/**
 * One side of the price. The heading sits on a photograph of the safari cut
 * across its foot, so the section reads as part of the trip rather than a
 * spreadsheet: warm and photographic where the price carries you, desaturated
 * and colder where it stops.
 */
function ScopeCard({ tone, title, items, photo, className }: ScopeCardProps) {
  const included = tone === "included";

  return (
    <article
      className={cn(
        "overflow-hidden",
        included ? "surface-card" : "surface-card-muted",
        className,
      )}
    >
      <div className="relative">
        <div
          className={cn(
            "image-zoom relative isolate overflow-hidden",
            included
              ? "h-[124px] [clip-path:polygon(0_0,100%_0,100%_100%,0_74%)] sm:h-[136px]"
              : "h-[104px] [clip-path:polygon(0_0,100%_0,100%_74%,0_100%)] sm:h-[112px]",
            !photo && (included ? "bg-forest-900" : "bg-charcoal"),
          )}
        >
          {photo && (
            <>
              <Image
                src={photo}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className={cn(
                  "object-cover object-center",
                  !included && "saturate-[0.45]",
                )}
              />

              <div
                aria-hidden="true"
                className={cn(
                  "absolute inset-0",
                  included
                    ? "bg-[linear-gradient(to_right,rgba(20,35,24,0.88)_0%,rgba(20,35,24,0.5)_55%,rgba(20,35,24,0.28)_100%)]"
                    : "bg-[linear-gradient(to_right,rgba(41,40,36,0.86)_0%,rgba(41,40,36,0.58)_60%,rgba(41,40,36,0.42)_100%)]",
                )}
              />
            </>
          )}
        </div>

        <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 px-6 pt-5 sm:px-[30px]">
          <div className="flex items-center gap-2.5">
            <span
              className={cn(
                "flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full",
                included
                  ? "bg-white/16 text-white backdrop-blur-[2px]"
                  : "bg-white/16 text-white/85 backdrop-blur-[2px]",
              )}
            >
              {included ? (
                <Check className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
              ) : (
                <Minus className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
              )}
            </span>

            <h3 className="text-[1.05rem] font-extrabold tracking-[-0.02em] text-white">
              {title}
            </h3>
          </div>

          <Pill tone="glass">
            {items.length} {items.length === 1 ? "item" : "items"}
          </Pill>
        </div>
      </div>

      <div className="px-6 pb-7 pt-5 sm:px-[26px]">
        <ScopeList items={items} tone={tone} />
      </div>
    </article>
  );
}

/**
 * Two surfaces for one question: what the price includes, and where it stops.
 * Counts come from the arrays, so the heading can never disagree with the list.
 */
export function TourScope({
  included,
  excluded,
  photo,
  asidePhoto,
}: TourScopeProps) {
  if (included.length === 0 && excluded.length === 0) return null;

  return (
    <section id="included" className="bg-sand-muted py-16 lg:py-[72px]">
      <div className="container-page">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h2 className="type-section-title">What the price covers</h2>

          <p className="max-w-[46ch] text-[0.8125rem] leading-relaxed text-ink-muted">
            Anything outside these two lists is quoted separately before you
            confirm.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1.35fr_1fr]">
          {included.length > 0 && (
            <ScopeCard
              tone="included"
              title="Included"
              items={included}
              photo={photo}
            />
          )}

          {excluded.length > 0 && (
            <ScopeCard
              tone="excluded"
              title="Not included"
              items={excluded}
              photo={asidePhoto}
            />
          )}
        </div>
      </div>
    </section>
  );
}
