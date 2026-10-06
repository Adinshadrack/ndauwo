import { apiFetch, publicEndpoint } from "@/lib/api/client";
import type { GalleryImage } from "@/types/api";

export async function getGallery(): Promise<GalleryImage[]> {
  return apiFetch<GalleryImage[]>(
    publicEndpoint("gallery"),
    {
      next: {
        revalidate: 300,
        tags: ["gallery"],
      },
    }
  );
}