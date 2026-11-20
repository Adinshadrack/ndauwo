import type { Metadata } from "next";

import { getSiteSettings } from "@/lib/api/settings";
import { getTestimonials } from "@/lib/api/testimonials";
import { AboutPage } from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Ndauwo Safaris, our values, approach and passion for creating unforgettable safari experiences in Tanzania.",
};

export default async function AboutRoute() {
  const [settings, testimonials] = await Promise.all([
    getSiteSettings(),
    getTestimonials(),
  ]);

  return (
    <AboutPage
      settings={settings}
      testimonials={testimonials}
    />
  );
}