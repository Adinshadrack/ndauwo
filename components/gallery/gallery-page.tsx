import { ImageCta } from "@/components/ui/image-cta";
import { PhotoHero } from "@/components/ui/photo-hero";
import type { GalleryImage } from "@/types/api";
import { GalleryChronicles } from "./gallery-chronicles";

interface GalleryPageProps {
  images: GalleryImage[];
  /** Site hero photography, used behind the closing band. */
  ctaImage?: string;
  phone?: string;
}

export function GalleryPage({ images, ctaImage, phone }: GalleryPageProps) {
  const years = images
    .map((image) => (image.created_at ? new Date(image.created_at) : null))
    .filter((date): date is Date => date !== null && !Number.isNaN(date.getTime()))
    .map((date) => date.getUTCFullYear());

  const newest = years.length ? Math.max(...years) : null;
  const oldest = years.length ? Math.min(...years) : null;

  const yearRange =
    newest === null || oldest === null
      ? undefined
      : oldest === newest
        ? String(newest)
        : `${oldest}\u2013${newest}`;

  return (
    <main className="bg-canvas">
      <PhotoHero
        title="Gallery"
        description={
          <>
            Photographs from Ndauwo journeys across{" "}
            <span className="text-gold">Tanzania</span>.
          </>
        }
        eyebrow="Safari archive"
        align="center"
        backdropImage={images[0]?.image_url}
        meta={
          images.length
            ? [
                `${images.length} ${images.length === 1 ? "photograph" : "photographs"}`,
                ...(yearRange ? [yearRange] : []),
              ]
            : undefined
        }
      />

      <GalleryChronicles images={images} />

      <ImageCta
        imageUrl={ctaImage}
        title="Stand in these photographs"
        description="Tell us which frames caught your eye and how many days you have. We set the route, the lodges and the driving days around them."
        href="/contact"
        ctaLabel="Plan your safari"
        secondary={{ label: "Browse safaris", href: "/tours" }}
        phone={phone}
      />
    </main>
  );
}
