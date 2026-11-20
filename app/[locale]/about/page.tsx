import type { Metadata } from "next";

import { getGallery } from "@/lib/api/gallery";
import { getSiteSettings } from "@/lib/api/settings";
import { getTestimonials } from "@/lib/api/testimonials";
import { AboutPage } from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Ndauwo Safaris, our values, approach and passion for creating unforgettable safari experiences in Tanzania.",
};

export default async function AboutRoute() {
  const [settings, testimonials, gallery] = await Promise.all([
    getSiteSettings(),
    getTestimonials(),
    getGallery().catch(() => []),
  ]);

  return (
    <AboutPage
      settings={settings}
      testimonials={testimonials}
      gallery={gallery}
    />
  );
}
