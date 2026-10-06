import type { Metadata } from "next";

import { getGallery } from "@/lib/api/gallery";
import { GalleryPage } from "@/components/gallery/gallery-page";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore moments, landscapes and wildlife from Ndauwo Safaris journeys across Tanzania.",
};

export default async function GalleryRoute() {
  const images = await getGallery();

  return <GalleryPage images={images} />;
}