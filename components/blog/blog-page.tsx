"use client";

import { useMemo, useState } from "react";

import type { BlogPost } from "@/types/api";
import { BlogCard } from "./blog-card";
import { HeroVideo } from "@/components/media/hero-video";

interface BlogPageProps {
  posts: BlogPost[];
}

export function BlogPage({ posts }: BlogPageProps) {
  const categories = useMemo(() => {
    const values = posts
      .map((post) => post.category?.trim())
      .filter(Boolean) as string[];

    return ["All", ...Array.from(new Set(values))];
  }, [posts]);

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter(
          (post) =>
            post.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  const featuredPost = posts[0];

  return (
    <main className="bg-[#FCFAF4]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#11110F] text-white">
        <HeroVideo />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-8 lg:pb-32 lg:pt-44">
          <div className="max-w-5xl">
            <p className="eyebrow text-[#F67A05]">Safari Journal</p>

            <h1 className="font-display mt-6 max-w-5xl text-5xl leading-[0.92] tracking-[-0.035em] sm:text-6xl lg:text-[7rem]">
              Stories from
              <br />
              the <span className="text-[#F67A05]">wild.</span>
            </h1>

            <div className="mt-9 flex max-w-2xl items-start gap-5">
              <span className="mt-3 hidden h-px w-12 shrink-0 bg-white/30 sm:block" />

              <p className="text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                Safari guides, Tanzania travel inspiration, wildlife stories
                and practical ideas for your journey.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </section>

      {/* FEATURED ARTICLE */}
      {featuredPost && (
        <section className="bg-[#FCFAF4] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between border-b border-black/10 pb-5">
              <p className="section-label">Featured story</p>

              <span className="text-[0.65rem] uppercase tracking-[0.16em] text-black/35">
                From the journal
              </span>
            </div>

            <article className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <a
                href={`/blog/${featuredPost.slug}`}
                className="group image-zoom relative block min-h-[380px] overflow-hidden bg-[#EDE1CF] lg:min-h-[620px]"
              >
                {featuredPost.featured_image ? (
                  <img
                    src={featuredPost.featured_image}
                    alt={featuredPost.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#C52A0E]" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white lg:bottom-8 lg:left-8 lg:right-8">
                  <span className="text-[0.65rem] uppercase tracking-[0.18em] text-white/75">
                    Read story
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center border border-white/40 text-lg transition-colors group-hover:border-white group-hover:bg-white group-hover:text-[#11110F]">
                    ↗
                  </span>
                </div>
              </a>

              <div className="flex flex-col justify-center border-x border-b border-black/10 bg-[#EDE1CF] p-7 sm:p-10 lg:border-b-0 lg:border-l-0 lg:p-14">
                {featuredPost.category && (
                  <p className="eyebrow text-[#C52A0E]">
                    {featuredPost.category}
                  </p>
                )}

                <h2 className="font-display mt-5 text-4xl leading-[1] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
                  {featuredPost.title}
                </h2>

                {featuredPost.excerpt && (
                  <p className="mt-6 max-w-xl text-base leading-8 text-black/60">
                    {featuredPost.excerpt}
                  </p>
                )}

                <a
                  href={`/blog/${featuredPost.slug}`}
                  className="group mt-8 inline-flex w-fit items-center gap-3 border-b border-black/25 pb-2 text-xs font-medium uppercase tracking-[0.16em] text-[#11110F] transition-colors hover:border-[#C52A0E] hover:text-[#C52A0E]"
                >
                  Read the story
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* CATEGORY FILTER */}
      <section className="border-y border-black/10 bg-[#FCFAF4]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto">
            <span className="shrink-0 py-5 text-[0.65rem] uppercase tracking-[0.16em] text-black/35">
              Filter
            </span>

            <div className="flex min-w-max">
              {categories.map((category) => {
                const active = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`relative px-4 py-5 text-xs uppercase tracking-[0.14em] transition-colors ${
                      active
                        ? "text-[#11110F]"
                        : "text-black/40 hover:text-[#11110F]"
                    }`}
                  >
                    {category}

                    {active && (
                      <span className="absolute bottom-0 left-4 right-4 h-px bg-[#F67A05]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="bg-[#FCFAF4] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <>
              <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-5">
                <p className="section-label">Latest stories</p>

                <span className="text-[0.65rem] uppercase tracking-[0.16em] text-black/35">
                  {filteredPosts.length}{" "}
                  {filteredPosts.length === 1 ? "story" : "stories"}
                </span>
              </div>

              <div className="grid border-t border-black/10 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
            </>
          ) : (
            <div className="border-y border-black/10 py-20 text-center">
              <p className="section-label justify-center">
                Safari Journal
              </p>

              <h2 className="font-display mt-5 text-3xl text-[#11110F] sm:text-4xl">
                No stories found
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-black/50">
                Check another category or come back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#11110F] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow text-[#F67A05]">
                Beyond the journal
              </p>

              <h2 className="font-display mt-6 max-w-3xl text-4xl leading-[0.98] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
                Turn inspiration into an unforgettable safari.
              </h2>
            </div>

            <div className="border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-10">
              <p className="max-w-xl text-base leading-7 text-white/55">
                The best stories are the ones you experience yourself.
                Explore our journeys and start planning yours.
              </p>

              <a
                href="/tours"
                className="group mt-8 inline-flex items-center gap-3 border-b border-white/30 pb-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors hover:border-white"
              >
                Explore safari packages
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}