"use client";

import { useMemo, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { CompactStory, SectionLabel, StoryCard } from "@/components/blog/story-card";
import { CtaLink } from "@/components/ui/cta";
import { ImageCta } from "@/components/ui/image-cta";
import { PhotoHero } from "@/components/ui/photo-hero";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types/api";

interface BlogPageProps {
  posts: BlogPost[];
  /** Site hero photography, used in the banner and behind the closing band. */
  heroImage?: string;
  ctaImage?: string;
  phone?: string;
}

export function BlogPage({ posts, heroImage, ctaImage, phone }: BlogPageProps) {
  const topics = useMemo(() => {
    const tally = new Map<string, number>();

    posts.forEach((post) => {
      const category = post.category?.trim();

      if (!category) return;

      tally.set(category, (tally.get(category) ?? 0) + 1);
    });

    return Array.from(tally.entries());
  }, [posts]);

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;

    return posts.filter(
      (post) => post.category?.trim().toLowerCase() === activeCategory.toLowerCase(),
    );
  }, [posts, activeCategory]);

  const [lead, ...rest] = filteredPosts;
  const featuredSide = rest.slice(0, 2);
  const latestHref = lead ? `/blog/${lead.slug}` : "/tours";

  return (
    <main className="bg-canvas">
      <PhotoHero
        title="Safari Journal"
        description="Guides, wildlife stories and practical notes from our safaris across Tanzania."
        backdropImage={heroImage}
        eyebrow="Guides & stories"
        align="center"
        meta={
          posts.length
            ? [
                `${posts.length} ${posts.length === 1 ? "story" : "stories"}`,
                ...(topics.length
                  ? [
                      `${topics.length} ${
                        topics.length === 1 ? "topic" : "topics"
                      }`,
                    ]
                  : []),
              ]
            : undefined
        }
        actions={
          <>
            <CtaLink href={latestHref} size="lg" arrow={false}>
              Read the latest
            </CtaLink>

            <CtaLink href="/contact" variant="outline" size="lg" arrow={false}>
              Plan a safari
            </CtaLink>
          </>
        }
      />

      {/* Category tabs, the way the journal splits its subject matter. */}
      <div className="border-b border-ink/12 bg-canvas">
        <div className="container-page">
          <div className="scrollbar-hidden flex items-center gap-7 overflow-x-auto">
            {["All", ...topics.map(([category]) => category)].map((label) => {
              const active = activeCategory === label;

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActiveCategory(label)}
                  aria-pressed={active}
                  className={cn(
                    "relative shrink-0 py-4 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors",
                    active ? "text-ink" : "text-ink/40 hover:text-ink",
                  )}
                >
                  {label}

                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-ink"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {lead ? (
        <section className="bg-canvas pt-11">
          <div className="container-page">
            <SectionLabel>Featured stories</SectionLabel>

            <div className="grid gap-x-10 gap-y-10 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)]">
              <Reveal>
                <StoryCard post={lead} size="lead" />
              </Reveal>

              {featuredSide.length > 0 && (
                <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2 sm:gap-8 lg:flex lg:flex-col lg:gap-6">
                  {featuredSide.map((post, index) => (
                    <Reveal key={post.id} delay={0.12 + index * 0.08}>
                      <CompactStory post={post} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-canvas py-14 lg:py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_264px] lg:gap-16">
          <div>
            {filteredPosts.length > 0 ? (
              <>
                <SectionLabel>Latest stories</SectionLabel>

                <div className="grid gap-x-9 gap-y-10 sm:grid-cols-2">
                  {filteredPosts.map((post, index) => (
                    <Reveal key={post.id} delay={Math.min(index, 6) * 0.07}>
                      <StoryCard post={post} />
                    </Reveal>
                  ))}
                </div>
              </>
            ) : (
              <div className="surface-card px-6 py-16 text-center">
                <h2 className="type-section-title">The journal is being written</h2>

                <p className="mx-auto mt-3 max-w-md text-[0.84375rem] leading-relaxed text-ink-muted">
                  Safari guides and travel notes will appear here as they are
                  published.
                </p>
              </div>
            )}
          </div>

          {topics.length > 0 && (
            <Reveal as="aside" className="lg:pt-1" delay={0.12}>
              <SectionLabel>Topics</SectionLabel>

              <ul className="border-t border-ink/10">
                {topics.map(([category, tally]) => {
                  const active =
                    activeCategory.toLowerCase() === category.toLowerCase();

                  return (
                    <li key={category} className="border-b border-ink/10">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveCategory(active ? "All" : category)
                        }
                        aria-pressed={active}
                        className="group flex w-full items-baseline justify-between gap-3 py-3 text-left"
                      >
                        <span
                          className={cn(
                            "text-[0.84375rem] font-semibold transition-colors",
                            active ? "text-clay" : "text-ink group-hover:text-clay",
                          )}
                        >
                          {category}
                        </span>

                        <span className="font-tour text-[0.8125rem] tabular-nums text-ink-soft">
                          {tally}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          )}
        </div>
      </section>

      <ImageCta
        imageUrl={ctaImage}
        eyebrow="Next step"
        title="Plan a safari like this"
        description="Tell us which stories caught your eye and how many days you have. We set the route, the lodges and the driving days around them."
        href="/contact"
        ctaLabel="Plan your safari"
        secondary={{ label: "Browse safaris", href: "/tours" }}
        phone={phone}
      />
    </main>
  );
}
