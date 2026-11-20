import type { ReactNode } from "react";
import { Clock, Gauge, MapPin } from "lucide-react";

import type { Tour } from "@/types/tour";

interface TourOverviewCardProps {
  tour: Tour;
  durationLabel: string;
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-sand-muted text-forest-900">
        {icon}
      </span>
      <div>
        <p className="type-badge text-ink-soft">{label}</p>
        <p className="mt-1 text-[13px] font-bold text-ink">{value}</p>
      </div>
    </div>
  );
}

/** Overview copy plus the three facts that repeat in the rail. */
export function TourOverviewCard({ tour, durationLabel }: TourOverviewCardProps) {
  const paragraphs = tour.description
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <section className="surface-card px-6 py-7 sm:px-[34px] sm:py-8">
      <h2 className="type-section-title">About this trip</h2>

      {paragraphs.length > 0 && (
        <div className="mt-4 flex max-w-[64ch] flex-col gap-3.5">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-[0.90625rem] leading-[1.8] text-ink-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-x-7 gap-y-4 border-t border-ink/10 pt-5">
        <Fact
          icon={<MapPin className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />}
          label="Destination"
          value={tour.destination?.name ?? "Tanzania"}
        />

        <Fact
          icon={<Clock className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />}
          label="Duration"
          value={durationLabel}
        />

        {tour.difficulty?.trim() && (
          <Fact
            icon={<Gauge className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />}
            label="Difficulty"
            value={tour.difficulty}
          />
        )}
      </div>
    </section>
  );
}
