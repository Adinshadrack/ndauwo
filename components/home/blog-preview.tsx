import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { BlogPost } from "@/types/api";

interface BlogPreviewProps {
  posts: BlogPost[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  if (!posts.length) return null;

  const featuredPost = posts[0];
  const secondaryPosts = posts.slice(1, 3);

  return (
    <section className="bg-[#EDE1CF] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <div className="flex flex-col gap-6 border-b border-black/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-label text-black/50">
              Journal
            </p>

            <h2 className="font-display mt-5 text-[2.75rem] leading-[0.95] tracking-[-0.035em] sm:text-5xl lg:text-[4rem]">
              Stories from
              <br />
              Tanzania
            </h2>
          </div>

          <Link
            href="/blog"
            className="group inline-flex items-center gap-3 self-start border-b border-black/30 pb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#11110F] transition-colors hover:border-[#C52A0E] hover:text-[#C52A0E] sm:self-auto"
          >
            Explore the journal

            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.5}
            />
          </Link>
        </div>

        {/* Editorial layout */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-12">
          {/* Featured story */}
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block"
          >
            <div className="image-zoom relative aspect-[16/10] overflow-hidden bg-black/5">
              <Image
                src={featuredPost.featured_image}
                alt={featuredPost.title}
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
              />

              <span className="absolute left-5 top-5 border border-white/40 bg-black/20 px-3 py-2 text-[9px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                Featured story
              </span>
            </div>

            <div className="pt-5">
              {featuredPost.category && (
                <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#C52A0E]">
                  {featuredPost.category}
                </p>
              )}

              <h3 className="font-display mt-3 max-w-3xl text-[2rem] leading-[0.95] tracking-[-0.025em] text-[#11110F] transition-colors duration-300 group-hover:text-[#8A5A3C] sm:text-4xl">
                {featuredPost.title}
              </h3>

              <p className="mt-4 max-w-2xl text-[13px] leading-6 text-black/55">
                {featuredPost.excerpt}
              </p>

              <div className="mt-5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-black/55 transition-colors group-hover:text-[#11110F]">
                Read story

                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </Link>

          {/* Secondary stories */}
          {secondaryPosts.length > 0 && (
            <div className="border-t border-black/15 lg:border-t-0">
              {secondaryPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block border-b border-black/15 py-6 first:pt-0 lg:py-7"
                >
                  <div className="grid grid-cols-[100px_1fr] gap-5 sm:grid-cols-[130px_1fr] lg:block">
                    <div className="image-zoom relative aspect-square overflow-hidden bg-black/5 lg:aspect-[16/9]">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 1024px) 130px, 35vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="pt-0 lg:pt-4">
                      <div className="flex items-center justify-between gap-3">
                        {post.category && (
                          <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#C52A0E]">
                            {post.category}
                          </p>
                        )}

                        <span className="text-[9px] font-medium tracking-[0.14em] text-black/30">
                          0{index + 2}
                        </span>
                      </div>

                      <h3 className="font-display mt-2 text-[1.35rem] leading-[1] tracking-[-0.02em] text-[#11110F] transition-colors duration-300 group-hover:text-[#8A5A3C] sm:text-[1.55rem] lg:text-[1.7rem]">
                        {post.title}
                      </h3>

                      <div className="mt-3 flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.14em] text-black/45 transition-colors group-hover:text-[#11110F]">
                        Read story

                        <ArrowUpRight
                          className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Journal footer */}
        <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-4">
          <span className="text-[9px] uppercase tracking-[0.16em] text-black/35">
            Ndauwo Journal
          </span>

          <span className="text-[9px] uppercase tracking-[0.16em] text-black/35">
            {posts.length} stories
          </span>
        </div>
      </div>
    </section>
  );
}