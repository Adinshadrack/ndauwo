import { CheckChip } from "@/components/ui/chip";
import { CountChip } from "@/components/ui/pill";

interface TourHighlightsCardProps {
  highlights: string[];
}

/** Highlights as rounded tags rather than a numbered list. */
export function TourHighlightsCard({ highlights }: TourHighlightsCardProps) {
  if (highlights.length === 0) return null;

  return (
    <section className="surface-card px-6 py-7 sm:px-[34px] sm:py-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="type-section-title">Highlights</h2>
        <CountChip>{highlights.length}</CountChip>
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {highlights.map((highlight) => (
          <CheckChip key={highlight}>{highlight}</CheckChip>
        ))}
      </div>
    </section>
  );
}
