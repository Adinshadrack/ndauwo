import { Check, Minus } from "lucide-react";

import { CountChip } from "@/components/ui/pill";

interface TourScopeProps {
  included: string[];
  excluded: string[];
}

function ScopeList({
  items,
  tone,
}: {
  items: string[];
  tone: "included" | "excluded";
}) {
  const Icon = tone === "included" ? Check : Minus;

  return (
    <ul className="mt-4 grid gap-x-6 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className={
            tone === "included"
              ? "flex gap-2.5 pb-3 text-[0.84375rem] leading-snug text-ink"
              : "flex gap-2.5 pb-3 text-[0.84375rem] leading-snug text-ink-muted"
          }
        >
          <Icon
            className={
              tone === "included"
                ? "mt-0.5 h-3.5 w-3.5 flex-none text-forest-900"
                : "mt-0.5 h-3.5 w-3.5 flex-none text-ink/35"
            }
            strokeWidth={2.6}
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Two surfaces for one question: what the price includes, and where it stops.
 * Counts come from the arrays, so the header can never disagree with the list.
 */
export function TourScope({ included, excluded }: TourScopeProps) {
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
            <div className="surface-card px-6 py-7 sm:px-[30px]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-ember/12 text-ember">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
                  </span>
                  <h3 className="text-[1.05rem] font-extrabold tracking-[-0.02em] text-ink">
                    Included
                  </h3>
                </div>
                <CountChip>
                  {included.length} {included.length === 1 ? "item" : "items"}
                </CountChip>
              </div>

              <ScopeList items={included} tone="included" />
            </div>
          )}

          {excluded.length > 0 && (
            <div className="surface-card-muted px-6 py-7 sm:px-[26px]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-ink/8 text-ink/55">
                    <Minus className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
                  </span>
                  <h3 className="text-[1.05rem] font-extrabold tracking-[-0.02em] text-ink">
                    Not included
                  </h3>
                </div>
                <CountChip className="bg-white/60">
                  {excluded.length} {excluded.length === 1 ? "item" : "items"}
                </CountChip>
              </div>

              <ScopeList items={excluded} tone="excluded" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
