import { apiFetch, publicEndpoint } from "@/lib/api/client";
import type { SiteSettings } from "@/types/api";

export async function getSiteSettings(): Promise<SiteSettings> {
  return apiFetch<SiteSettings>(
    publicEndpoint("settings"),
    {
      next: {
        revalidate: 300,
        tags: ["site-settings"],
      },
    }
  );
}