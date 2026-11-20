"use client";

import { motion } from "motion/react";

import { CtaLink } from "@/components/ui/cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { TourCard } from "@/components/tours/tour-card";
import type { Tour } from "@/types/tour";

interface FeaturedToursProps {
  tours: Tour[];
}

export function FeaturedTours({ tours }: FeaturedToursProps) {
  if (!tours.length) return null;

  return (
    <section className="relative z-10 bg-sand-muted section-pad">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionHeading
            eyebrow="Safari Collection"
            title="Journeys made for the wild"
            description="At Ndauwo Safaris, we believe every journey should be extraordinary. Rooted in the beauty and spirit of Tanzania, we create authentic, unforgettable experiences."
            className="mb-12"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {tours.slice(0, 3).map((tour) => (
            <TourCard key={tour.id} tour={tour} variant="showcase" />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex justify-center md:mt-14"
        >
          <CtaLink href="/tours" size="lg" arrow={false}>
            View All Safaris
          </CtaLink>
        </motion.div>
      </div>
    </section>
  );
}
