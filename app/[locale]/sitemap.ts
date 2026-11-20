import type { MetadataRoute } from "next";

import { getTours } from "@/lib/api/tours";
import { getDestinations } from "@/lib/api/destinations";
import { getBlogPosts } from "@/lib/api/blog";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ndauwosafaris.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tours, destinations, posts] = await Promise.all([
    getTours(),
    getDestinations(),
    getBlogPosts(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/tours`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/destinations`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/gallery`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const tourPages: MetadataRoute.Sitemap = tours
    .filter((tour) => tour.is_published)
    .map((tour) => ({
      url: `${SITE_URL}/tours/${tour.slug}`,
      lastModified: tour.updated_at
        ? new Date(tour.updated_at)
        : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const destinationPages: MetadataRoute.Sitemap = destinations.map(
    (destination) => ({
      url: `${SITE_URL}/destinations/${destination.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  const blogPages: MetadataRoute.Sitemap = posts
    .filter((post) => post.is_published)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updated_at
        ? new Date(post.updated_at)
        : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [
    ...staticPages,
    ...tourPages,
    ...destinationPages,
    ...blogPages,
  ];
}