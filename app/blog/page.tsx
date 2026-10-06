import type { Metadata } from "next";

import { getBlogPosts } from "@/lib/api/blog";
import { BlogPage } from "@/components/blog/blog-page";

export const metadata: Metadata = {
  title: "Safari Journal",
  description:
    "Discover safari guides, travel inspiration, wildlife stories and Tanzania travel tips from Ndauwo Safaris.",
};

export default async function BlogRoute() {
  const posts = await getBlogPosts();

  return <BlogPage posts={posts} />;
}