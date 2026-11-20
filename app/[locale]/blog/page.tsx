import type { Metadata } from "next";

import { getBlogPosts } from "@/lib/api/blog";
import { getSiteSettings } from "@/lib/api/settings";
import { BlogPage } from "@/components/blog/blog-page";

export const metadata: Metadata = {
  title: "Safari Journal",
  description:
    "Discover safari guides, travel inspiration, wildlife stories and Tanzania travel tips from Ndauwo Safaris.",
};

export default async function BlogRoute() {
  const [posts, settings] = await Promise.all([getBlogPosts(), getSiteSettings()]);

  return (
    <BlogPage
      posts={posts}
      heroImage={settings.hero_image_url}
      ctaImage={settings.hero_image_url}
      phone={settings.phone}
    />
  );
}
