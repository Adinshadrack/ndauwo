import { ArrowUpRight, Star } from "lucide-react";

import type { Testimonial } from "@/types/api";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials.length) return null;

  return (
    <section className="bg-[#11110F] py-20 text-white sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div className="flex flex-col gap-6 border-b border-white/15 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
              <span className="h-px w-7 bg-[#F67A05]" />
              Guest Stories
            </p>

            <h2 className="font-display mt-5 max-w-2xl text-[2.75rem] leading-[0.95] tracking-[-0.035em] sm:text-5xl lg:text-[4rem]">
              Memories from
              <br />
              the wild
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-white/45 md:pb-1">
            Stories from travellers who experienced Tanzania with Ndauwo
            Safaris.
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <article
              key={testimonial.id}
              className="group flex flex-col border-b border-white/10 pb-10 lg:min-h-[320px]"
            >
              {/* Meta */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium tracking-[0.16em] text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div
                  className="flex gap-0.5"
                  aria-label={`${testimonial.rating} out of 5 stars`}
                >
                  {Array.from({ length: testimonial.rating }).map(
                    (_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="h-3 w-3 fill-[#F67A05] text-[#F67A05]"
                        strokeWidth={1}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="font-display mt-10 text-[1.65rem] leading-[1.08] tracking-[-0.02em] text-white/90 sm:text-[1.8rem]">
                “{testimonial.content}”
              </blockquote>

              {/* Guest */}
              <div className="mt-auto pt-10">
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <p className="text-[12px] font-medium text-white/85">
                      {testimonial.name}
                    </p>

                    <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-white/35">
                      Ndauwo Safaris guest
                    </p>
                  </div>

                  <ArrowUpRight
                    className="h-4 w-4 text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F67A05]"
                    strokeWidth={1.25}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer */}
        {testimonials.length > 6 && (
          <div className="mt-10 flex justify-end">
            <span className="text-[9px] uppercase tracking-[0.16em] text-white/30">
              {testimonials.length} guest stories
            </span>
          </div>
        )}
      </div>
    </section>
  );
}