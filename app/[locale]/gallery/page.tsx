import type { Metadata } from "next";

import { getGallery } from "@/lib/api/gallery";
import { getSiteSettings } from "@/lib/api/settings";
import { GalleryPage } from "@/components/gallery/gallery-page";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore moments, landscapes and wildlife from Ndauwo Safaris journeys across Tanzania.",
};

export default async function GalleryRoute() {
  const [images, settings] = await Promise.all([getGallery(), getSiteSettings()]);

  return (
    <GalleryPage
      images={images}
      ctaImage={settings.hero_image_url}
      phone={settings.phone}
    />
  );
}
