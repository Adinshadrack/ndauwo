import type { ReactNode } from "react";
import Image from "next/image";
import { Clock, Gauge, MapPin, Tag } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Tour } from "@/types/tour";

interface TourHeroProps {
  tour: Tour;
  durationLabel: string;
}

interface Fact {
  label: string;
  value: string;
  icon: ReactNode;
}

/**
 * Photographic tour hero: breadcrumb, category badge, title and the summary
 * line, with the trip facts sitting in a strip that straddles the hero edge.
 */
export function TourHero({ tour, durationLabel }: TourHeroProps) {
  const facts: Fact[] = [
    {
      label: "Duration",
      value: durationLabel,
      icon: <Clock className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />,
    },
    {
      label: "Location",
      value: tour.destination?.name ?? "Tanzania",
      icon: <MapPin className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />,
    },
  ];

  if (tour.difficulty?.trim()) {
    facts.push({
      label: "Difficulty",
      value: tour.difficulty,
      icon: <Gauge className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />,
    });
  }

  if (tour.category?.trim()) {
    facts.push({
      label: "Trip type",
      value: tour.category,
      icon: <Tag className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />,
    });
  }

  return (
    <>
      <section className="relative isolate flex min-h-[520px] items-end overflow-hidden bg-forest-900 text-white sm:min-h-[560px]">
        {tour.featured_image ? (
          <Image
            src={tour.featured_image}
            alt={tour.name}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <div aria-hidden="true" className="absolute inset-0 bg-forest" />
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,18,13,0.94)_0%,rgba(16,26,19,0.55)_46%,rgba(16,26,19,0.22)_100%)]"
        />

        <div className="container-page relative pb-28 pt-32 sm:pb-32">
          <div className="max-w-[900px]">
            <p className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-white/60">
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <span aria-hidden="true" className="opacity-50">
                &gt;
              </span>
              <Link href="/tours" className="transition-colors hover:text-white">
                Safaris
              </Link>
              <span aria-hidden="true" className="opacity-50">
                &gt;
              </span>
              <span className="text-white/85">{tour.name}</span>
            </p>

            {tour.category?.trim() && (
              <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-ink shadow-[0_4px_12px_-6px_rgba(0,0,0,0.5)]">
                <Tag className="h-3 w-3 text-ember" strokeWidth={2.2} aria-hidden="true" />
                {tour.category}
              </span>
            )}

            <h1 className="type-hero-title mt-4 max-w-[15ch] text-white">
              {tour.name}
            </h1>

            {tour.short_description && (
              <p className="mt-5 max-w-[56ch] text-[0.9375rem] leading-[1.7] text-white/80">
                {tour.short_description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Facts strip: pulls itself over the hero edge. */}
      <div className="container-page relative z-10 -mt-14">
        <dl
          className={cn(
            "surface-card grid grid-cols-2 gap-px overflow-hidden bg-ink/10",
            facts.length >= 4 ? "sm:grid-cols-4" : "sm:grid-cols-3",
          )}
        >
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex items-center gap-3 bg-white px-5 py-4 sm:px-6"
            >
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-sand-muted text-forest-900">
                {fact.icon}
              </span>

              <div className="min-w-0">
                <dt className="type-badge text-ink-soft">{fact.label}</dt>
                <dd className="mt-1 text-[12.5px] font-bold leading-tight text-ink">
                  {fact.value}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
