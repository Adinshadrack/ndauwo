"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

import { CtaLink } from "@/components/ui/cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { DestinationCard } from "@/components/destinations/destination-card";
import type { Destination } from "@/types/api";
import type { Tour } from "@/types/tour";

interface DestinationsProps {
  destinations: Destination[];
  tours: Tour[];
}

export function Destinations({ destinations, tours }: DestinationsProps) {
  /** Real trip counts per destination — never a decorative placeholder number. */
  const tripCounts = useMemo(() => {
    const counts = new Map<string, number>();

    tours.forEach((tour) => {
      const key = tour.destination?.slug || tour.destination?.name;

      if (!key) return;

      counts.set(key, (counts.get(key) ?? 0) + 1);
    });

    return counts;
  }, [tours]);

  if (!destinations.length) return null;

  return (
    <section className="bg-forest-900 section-pad">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionHeading
            eyebrow="Explore Tanzania"
            title="Places that stay with you"
            description="From legendary wildlife destinations to spectacular landscapes, discover the places that make Tanzania unforgettable."
            tone="dark"
            brush
            className="mb-12"
          />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destinations.slice(0, 3).map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            >
              <DestinationCard
                destination={destination}
                tripCount={
                  tripCounts.get(destination.slug) ??
                  tripCounts.get(destination.name) ??
                  0
                }
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="mt-12 flex justify-center"
        >
          <CtaLink href="/destinations" variant="cream" size="lg" arrow={false}>
            Explore Destinations
          </CtaLink>
        </motion.div>
      </div>
    </section>
  );
}
