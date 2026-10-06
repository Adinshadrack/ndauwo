import {
  apiFetch,
  publicEndpoint,
} from "./client";

import type {
  FAQ,
} from "@/types/api";

export async function getFAQs(): Promise<FAQ[]> {
  return apiFetch<FAQ[]>(
    publicEndpoint("faqs"),
    {
      next: {
        revalidate: 60,
        tags: ["faqs"],
      },
    },
  );
}