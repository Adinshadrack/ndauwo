import { apiFetch, publicEndpoint } from "@/lib/api/client";
import type { Destination } from "@/types/api";

export async function getDestinations(): Promise<Destination[]> {
  return apiFetch<Destination[]>(
    publicEndpoint("destinations"),
    {
      next: {
        revalidate: 300,
        tags: ["destinations"],
      },
    }
  );
}

export async function getDestination(
  slug: string
): Promise<Destination> {
  return apiFetch<Destination>(
    publicEndpoint(
      "destinations",
      `/${encodeURIComponent(slug)}`
    ),
    {
      next: {
        revalidate: 300,
        tags: [`destination-${slug}`],
      },
    }
  );
}