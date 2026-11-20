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
  // The story photograph below the hero is the site's signature shot, so the
  // hero takes a different frame from the gallery rather than repeating it.
  const [settings, testimonials, gallery] = await Promise.all([
    getSiteSettings(),
    getTestimonials(),
    getGallery().catch(() => []),
  ]);

  const backdropImage =
    gallery.find((photo) => photo.image_url)?.image_url ||
    settings.hero_image_url ||
    undefined;

  return (
    <AboutPage
      settings={settings}
      testimonials={testimonials}
      backdropImage={backdropImage}
    />
  );
}
