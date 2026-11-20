import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostPage } from "@/components/blog/blog-post";
import { getBlogPost, getBlogPosts } from "@/lib/api/blog";
import { getSiteSettings } from "@/lib/api/settings";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getBlogPost(slug);

    return {
      title: post.seo_title || post.title,
      description:
        post.seo_description ||
        post.excerpt ||
        `Read ${post.title} from Ndauwo Safaris.`,
      alternates: {
        canonical: `/blog/${post.slug}`,
      },
      openGraph: {
        title: post.seo_title || post.title,
        description:
          post.seo_description ||
          post.excerpt ||
          `Read ${post.title} from Ndauwo Safaris.`,
        images: post.featured_image
          ? [
              {
                url: post.featured_image,
                width: 1200,
                height: 630,
                alt: post.title,
              },
            ]
          : undefined,
        type: "article",
      },
    };
  } catch {
    return {
      title: "Safari Journal",
    };
  }
}

export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  const { slug } = await params;

  let post;

  try {
    post = await getBlogPost(slug);
  } catch {
    notFound();
  }

  const [posts, settings] = await Promise.all([
    getBlogPosts(),
    getSiteSettings(),
  ]);

  /** Same category first, then the newest of the rest, so the band is never empty. */
  const others = posts.filter((item) => item.slug !== post.slug);
  const inCategory = others.filter(
    (item) => item.category && item.category === post.category
  );
  const relatedPosts = [
    ...inCategory,
    ...others.filter((item) => !inCategory.includes(item)),
  ].slice(0, 3);

  return (
    <BlogPostPage
      post={post}
      relatedPosts={relatedPosts}
      ctaImage={settings.hero_image_url}
      phone={settings.phone}
    />
  );
}
