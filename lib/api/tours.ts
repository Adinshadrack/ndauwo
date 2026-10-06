// lib/api/tours.ts

import { apiFetch, publicEndpoint } from "@/lib/api/client";
import type { Tour } from "@/types/tour";

export async function getTours(): Promise<Tour[]> {
  return apiFetch<Tour[]>(
    publicEndpoint("tours"),
    {
      next: {
        revalidate: 300,
        tags: ["tours"],
      },
    }
  );
}

export async function getTour(slug: string): Promise<Tour> {
  return apiFetch<Tour>(
    publicEndpoint("tours", `/${encodeURIComponent(slug)}`),
    {
      next: {
        revalidate: 300,
        tags: [`tour-${slug}`],
      },
    }
  );
}