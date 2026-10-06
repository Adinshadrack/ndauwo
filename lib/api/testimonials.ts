import {
  apiFetch,
  publicEndpoint,
} from "./client";

import type {
  Testimonial,
} from "@/types/api";

export async function getTestimonials(): Promise<
  Testimonial[]
> {
  return apiFetch<Testimonial[]>(
    publicEndpoint("testimonials"),
    {
      next: {
        revalidate: 60,
        tags: ["testimonials"],
      },
    },
  );
}