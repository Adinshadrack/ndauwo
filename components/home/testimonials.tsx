"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { Link } from "@/i18n/navigation";
import { CtaLink } from "@/components/ui/cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import type { Testimonial } from "@/types/api";
import { TestimonialModal } from "./testimonial-modal";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [selectedReview, setSelectedReview] = useState<Testimonial | null>(null);

  if (!testimonials.length) return null;

  const displayedReviews = testimonials.slice(0, 3);

  return (
    <>
      <section className="bg-canvas section-pad">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SectionHeading
              eyebrow="Guest Reviews"
              title="Memories from the wild"
              description={
                <>
                  Independent reviews from TripAdvisor, Google and SafariBookings.{" "}
                  <Link
                    href="/reviews"
                    className="underline decoration-ink/30 underline-offset-4 transition-colors hover:text-forest-800"
                  >
                    Read all reviews
                  </Link>
                </>
              }
              className="mb-12"
            />
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {displayedReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <TestimonialCard
                  testimonial={review}
                  onOpen={() => setSelectedReview(review)}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex justify-center"
          >
            <CtaLink href="/reviews" size="lg" arrow={false}>
              Write a Review on SafariBookings
            </CtaLink>
          </motion.div>
        </div>
      </section>

      <TestimonialModal
        testimonial={selectedReview}
        onClose={() => setSelectedReview(null)}
      />
    </>
  );
}
