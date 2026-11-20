"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CountChip } from "@/components/ui/pill";
import { cn } from "@/lib/utils";
import type { TourItineraryItem } from "@/types/tour";

/** Shallow dashes so the markers sit on a line rather than a ruler. */
const JOURNEY_PATH =
  "M0 50C31 50 94 40 125 50C156 60 344 60 375 50C406 40 594 40 625 50C656 60 844 60 875 50C906 40 969 50 1000 50";

interface JourneyStripProps {
  itinerary: TourItineraryItem[];
  dayCount: number;
  className?: string;
}

function dayLabel(day: number) {
  return `Day ${String(day).padStart(2, "0")}`;
}

/**
 * The itinerary as a horizontal journey line: every day is a marker on the
 * line, and selecting one swaps the reading panel underneath. Long programmes
 * scroll sideways at a fixed slot width instead of shrinking the dots.
 */
export function JourneyStrip({
  itinerary,
  dayCount,
  className,
}: JourneyStripProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [allDaysOpen, setAllDaysOpen] = useState(false);
  const markerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  if (itinerary.length === 0) return null;

  const days = itinerary.length;
  const active = itinerary[Math.min(activeIndex, days - 1)];

  const select = (index: number) => {
    const next = Math.max(0, Math.min(days - 1, index));
    setActiveIndex(next);
    markerRefs.current[next]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    select(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
  };

  return (
    <section id="itinerary" className={cn("surface-card", className)}>
      <div className="px-6 pb-6 pt-7 sm:px-9 sm:pb-7 sm:pt-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <h2 className="type-section-title">Day by day</h2>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-muted">
              {days === 1 ? "One day" : `${days} days`} on the programme, each
              stored with its own notes.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <CountChip>
              {dayCount} {dayCount === 1 ? "day" : "days"}
            </CountChip>

            <button
              type="button"
              onClick={() => setAllDaysOpen(true)}
              className="pill pill-outline h-10 px-4 text-[12.5px]"
            >
              All days
            </button>
          </div>
        </div>

        {/* Journey line */}
        <div className="scrollbar-hidden -mx-1 overflow-x-auto overflow-y-hidden pb-2">
          <div
            onKeyDown={handleKeyDown}
            className="relative mt-5 h-[122px]"
            style={{ minWidth: Math.max(days * 150, 280) }}
          >
            <svg
              viewBox="0 0 1000 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-[4px] h-[92px] w-full"
            >
              <path
                d={JOURNEY_PATH}
                fill="none"
                stroke="rgba(17,17,15,0.28)"
                strokeWidth={1.4}
                strokeDasharray="5 6"
              />
            </svg>

            {itinerary.map((item, index) => {
              const isActive = index === activeIndex;
              const left = `${((index + 0.5) / days) * 100}%`;

              return (
                <div key={`${item.day}-${item.title}`}>
                  <span
                    className={cn(
                      "type-badge absolute -translate-x-1/2 text-center",
                      isActive ? "text-ember" : "text-ink-soft",
                    )}
                    style={{ left, top: 0, width: 120 }}
                  >
                    {dayLabel(item.day)}
                  </span>

                  <button
                    ref={(node) => {
                      markerRefs.current[index] = node;
                    }}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={isActive}
                    aria-label={`${dayLabel(item.day)}: ${item.title}`}
                    className="absolute z-10 flex h-10 w-[70px] -translate-x-1/2 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
                    style={{ left, top: 30 }}
                  >
                    <span
                      className={cn(
                        "block rounded-full transition-all duration-300",
                        isActive
                          ? "h-[22px] w-[22px] bg-ember shadow-[0_0_0_5px_#fff,0_0_0_6px_rgba(246,122,5,0.35)]"
                          : "h-[11px] w-[11px] bg-[#d9d2c4]",
                      )}
                    />
                  </button>

                  <span
                    className={cn(
                      "absolute -translate-x-1/2 text-center text-[0.75rem] leading-snug",
                      isActive
                        ? "font-bold text-ink"
                        : "font-medium text-ink-muted",
                    )}
                    style={{ left, top: 74, width: 150 }}
                  >
                    {isActive ? (
                      <span className="inline-block rounded-full bg-sand-muted px-3.5 py-1.5">
                        {item.title}
                      </span>
                    ) : (
                      item.title
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected day */}
        <div className="mt-4 grid gap-6 rounded-2xl bg-sand-muted p-6 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div aria-live="polite">
            <div className="flex flex-wrap items-center gap-3">
              <span className="pill pill-primary h-[26px] px-3 text-[10px] uppercase tracking-[0.1em]">
                {dayLabel(active.day)}
              </span>
              <h3 className="text-[1.2rem] font-extrabold leading-snug tracking-[-0.02em] text-ink">
                {active.title}
              </h3>
            </div>

            <p className="mt-3.5 max-w-[66ch] text-[0.875rem] leading-[1.8] text-ink-muted">
              {active.description}
            </p>
          </div>

          <div className="flex gap-2 lg:justify-end">
            <button
              type="button"
              onClick={() => select(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous day"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition-colors hover:border-ink/30 disabled:opacity-40 disabled:hover:border-ink/15"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => select(activeIndex + 1)}
              disabled={activeIndex === days - 1}
              aria-label="Next day"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-forest-900 text-white transition-colors hover:bg-forest-800 disabled:opacity-40 disabled:hover:bg-forest-900"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <Dialog open={allDaysOpen} onOpenChange={setAllDaysOpen}>
        <DialogContent className="max-h-[85vh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="type-section-title">The programme</DialogTitle>
            <DialogDescription className="text-[0.8125rem] text-ink-muted">
              {days === 1 ? "One day" : `${days} days`}, in the order you drive
              them.
            </DialogDescription>
          </DialogHeader>

          <ol className="mt-2 divide-y divide-ink/10">
            {itinerary.map((item) => (
              <li key={`${item.day}-all-${item.title}`} className="py-4">
                <p className="type-badge text-ember">{dayLabel(item.day)}</p>
                <p className="mt-1.5 text-[0.9375rem] font-bold text-ink">
                  {item.title}
                </p>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </DialogContent>
      </Dialog>
    </section>
  );
}
