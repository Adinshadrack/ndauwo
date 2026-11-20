import Image from "next/image";
import { Star } from "lucide-react";
import { FaGoogle } from "react-icons/fa6";
import { FaTripadvisor } from "react-icons/fa";

import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/api";

const PLATFORM_LABEL: Record<string, string> = {
  tripadvisor: "TripAdvisor",
  safaribookings: "SafariBookings",
  google: "Google",
};

export function formatReviewDate(dateString?: string | null) {
  if (!dateString) return null;

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function PlatformIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "tripadvisor":
      return (
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-tripadvisor text-black">
          <FaTripadvisor className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      );
    case "google":
      return (
        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-ink/10 bg-white">
          <FaGoogle className="h-3.5 w-3.5 text-[#4285F4]" aria-hidden="true" />
        </span>
      );
    case "safaribookings":
      return (
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ember text-[9px] font-bold text-white">
          SB
        </span>
      );
    default:
      return null;
  }
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  /** When provided the card becomes a button that opens the full review. */
  onOpen?: () => void;
  className?: string;
}

export function TestimonialCard({
  testimonial,
  onOpen,
  className,
}: TestimonialCardProps) {
  const reviewDate = formatReviewDate(testimonial.review_date);

  const content = (
    <>
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm">
        {testimonial.avatar_url ? (
          <Image
            src={testimonial.avatar_url}
            alt={testimonial.name}
            fill
            sizes="80px"
            className="object-cover"
            unoptimized
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-gold text-2xl font-bold text-white">
            {testimonial.name.charAt(0)}
          </span>
        )}
      </div>

      <h3 className="mt-5 text-center font-[family-name:var(--font-primary)] text-lg font-bold text-ink">
        {testimonial.name}
      </h3>

      {testimonial.reviewer_title && (
        <p className="type-meta mt-1 text-center uppercase text-ink/45">
          {testimonial.reviewer_title}
        </p>
      )}

      {reviewDate && (
        <p className="mt-1.5 text-center text-[13px] text-ink/50">{reviewDate}</p>
      )}

      <div className="mt-4 flex items-center justify-center gap-1">
        {Array.from({ length: 5 }).map((_, starIndex) => (
          <Star
            key={starIndex}
            aria-hidden="true"
            className={cn(
              "h-4 w-4",
              starIndex < testimonial.rating
                ? "fill-ember text-ember"
                : "fill-ink/15 text-ink/15",
            )}
          />
        ))}
        <span className="ml-2 font-[family-name:var(--font-primary)] text-sm font-bold text-ink">
          {testimonial.rating.toFixed(1)}
        </span>
      </div>

      <p className="mt-5 line-clamp-6 text-center text-sm font-medium leading-[1.7] text-ink/70">
        {testimonial.content}
      </p>

      <span className="mt-auto pt-7">
        <span className="flex items-center gap-2 text-[13px] text-ink/70">
          <PlatformIcon platform={testimonial.platform} />
          View on {PLATFORM_LABEL[testimonial.platform] ?? "the web"}
        </span>
      </span>
    </>
  );

  const sharedClassName = cn(
    "flex w-full flex-col items-center rounded-xl bg-white px-6 py-9",
    onOpen &&
      "cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(17,17,15,0.45)]",
    className,
  );

  if (onOpen) {
    return (
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Read the full review from ${testimonial.name}`}
        className={sharedClassName}
      >
        {content}
      </button>
    );
  }

  return <div className={sharedClassName}>{content}</div>;
}
