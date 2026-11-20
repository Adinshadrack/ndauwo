"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/types/api";
import { GalleryLightbox } from "./gallery-lightbox";

/** How the archive is grouped; "all" drops the period headings entirely. */
type PeriodMode = "years" | "months" | "days" | "all";

const periods: Array<{ value: PeriodMode; label: string }> = [
  { value: "years", label: "Years" },
  { value: "months", label: "Months" },
  { value: "days", label: "Days" },
  { value: "all", label: "All photos" },
];

const MONTH_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface PeriodParts {
  year: number;
  month: number;
  day: number;
}

/**
 * Dates are formatted from UTC parts rather than `toLocaleString`, so the
 * server and the browser cannot disagree about a heading.
 */
function periodParts(image: GalleryImage): PeriodParts | null {
  if (!image.created_at) return null;

  const date = new Date(image.created_at);

  if (Number.isNaN(date.getTime())) return null;

  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth(),
    day: date.getUTCDate(),
  };
}

function periodLabel(parts: PeriodParts, mode: PeriodMode): string {
  if (mode === "years") return String(parts.year);

  if (mode === "months") return `${MONTH_LONG[parts.month]} ${parts.year}`;

  return `${parts.day} ${MONTH_SHORT[parts.month]} ${parts.year}`;
}

interface Entry {
  image: GalleryImage;
  /** Index into the unfiltered array, so the lightbox stays in sync. */
  index: number;
}

interface Group {
  key: string;
  /** Null when the photographs cannot be dated. */
  label: string | null;
  items: Entry[];
}

interface GalleryChroniclesProps {
  images: GalleryImage[];
}

export function GalleryChronicles({ images }: GalleryChroniclesProps) {
  const [mode, setMode] = useState<PeriodMode>("years");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const groups = useMemo<Group[]>(() => {
    const entries: Entry[] = images.map((image, index) => ({ image, index }));

    if (mode === "all") return [{ key: "all", label: null, items: entries }];

    const collected: Group[] = [];
    const byKey = new Map<string, Group>();

    for (const entry of entries) {
      const parts = periodParts(entry.image);
      const key = parts ? periodLabel(parts, mode) : "undated";

      let group = byKey.get(key);

      if (!group) {
        group = { key, label: parts ? key : null, items: [] };
        byKey.set(key, group);
        collected.push(group);
      }

      group.items.push(entry);
    }

    return collected;
  }, [images, mode]);

  const closeLightbox = () => setActiveIndex(null);

  const showPrevious = () =>
    setActiveIndex((current) => {
      if (current === null) return null;

      return current === 0 ? images.length - 1 : current - 1;
    });

  const showNext = () =>
    setActiveIndex((current) => {
      if (current === null) return null;

      return current === images.length - 1 ? 0 : current + 1;
    });

  if (!images.length) {
    return (
      <section className="bg-canvas py-16 lg:py-20">
        <div className="container-page">
          <div className="surface-card px-6 py-16 text-center">
            <h2 className="type-section-title">The archive is being prepared</h2>

            <p className="mx-auto mt-3 max-w-md text-[0.84375rem] leading-relaxed text-ink-muted">
              Photographs from our safaris will appear here as soon as they are
              uploaded.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-canvas py-14 sm:py-16 lg:py-20">
      <div className="container-page">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-ink/10 pb-5">
          <h2 className="type-section-title text-ink">Gallery Chronicles</h2>

          <p className="max-w-[40ch] text-[0.8125rem] leading-relaxed text-ink-muted sm:text-right">
            Wildlife, landscapes and guests from our safaris across Tanzania.
          </p>
        </Reveal>

        <div className="mt-9 flex flex-col gap-11">
          {groups.map((group) => (
            <div key={group.key}>
              {group.label && (
                <div className="mb-5 flex items-baseline justify-between gap-4">
                  <h3 className="text-[0.9375rem] font-extrabold tracking-[-0.01em] text-ink">
                    {group.label}
                  </h3>

                  <span className="type-meta uppercase text-ink-soft">
                    {group.items.length}{" "}
                    {group.items.length === 1 ? "photo" : "photos"}
                  </span>
                </div>
              )}

              <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {group.items.map(({ image, index }, position) => {
                  const caption = image.title?.trim();

                  return (
                    <Reveal
                      as="li"
                      key={image.id}
                      delay={Math.min(position, 6) * 0.06}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Open photograph${caption ? `: ${caption}` : ""}`}
                        className="group relative block aspect-[16/10] w-full overflow-hidden rounded-xl bg-sand text-left"
                      >
                        <Image
                          src={image.image_url}
                          alt={image.alt_text || caption || "Ndauwo Safaris"}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                        />

                        <div
                          aria-hidden="true"
                          className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/40 via-black/10 to-transparent"
                        />

                        {caption && (
                          <span className="type-badge absolute left-3.5 top-3 max-w-[calc(100%-28px)] truncate text-white">
                            {caption}
                          </span>
                        )}

                        <span
                          aria-hidden="true"
                          className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/0 transition-colors duration-300 group-hover:bg-black/10 group-hover:ring-white/25"
                        />
                      </button>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <Reveal className="mt-11 flex justify-center" delay={0.1}>
          <div
            role="group"
            aria-label="Group photographs by period"
            className="inline-flex items-center gap-1 rounded-full border border-ink/10 bg-white p-1 shadow-card"
          >
            {periods.map((period) => {
              const isActive = mode === period.value;

              return (
                <button
                  key={period.value}
                  type="button"
                  onClick={() => setMode(period.value)}
                  aria-pressed={isActive}
                  className={cn(
                    "h-9 rounded-full px-4 text-[12px] font-bold transition-colors duration-300",
                    isActive
                      ? "bg-forest-900 text-white"
                      : "text-ink-muted hover:text-ink",
                  )}
                >
                  {period.label}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      <GalleryLightbox
        images={images}
        activeIndex={activeIndex}
        onClose={closeLightbox}
        onPrevious={showPrevious}
        onNext={showNext}
      />
    </section>
  );
}
