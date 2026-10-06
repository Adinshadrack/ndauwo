import { apiFetch, publicEndpoint } from "@/lib/api/client";
import type { BlogPost } from "@/types/api";

export async function getBlogPosts(): Promise<BlogPost[]> {
  return apiFetch<BlogPost[]>(
    publicEndpoint("blog"),
    {
      next: {
        revalidate: 300,
        tags: ["blog"],
      },
    }
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  return apiFetch<BlogPost>(
    publicEndpoint("blog", `/${encodeURIComponent(slug)}`),
    {
      next: {
        revalidate: 300,
        tags: [`blog-${slug}`],
      },
    }
  );
}