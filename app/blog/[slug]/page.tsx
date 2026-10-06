import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getBlogPost, getBlogPosts } from "@/lib/api/blog";

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

  const posts = await getBlogPosts();

  const relatedPosts = posts
    .filter(
      (item) =>
        item.slug !== post.slug &&
        item.category &&
        item.category === post.category
    )
    .slice(0, 3);

  const shareUrl = `https://ndauwosafaris.com/blog/${post.slug}`;

  return (
    <main className="bg-[#FCFAF4]">
      {/* HERO */}
      <section className="bg-[#11110F] text-white">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-8 lg:pb-24 lg:pt-40">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.16em] text-white/45 transition-colors hover:text-white"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Safari Journal
          </Link>

          <div className="mt-12 max-w-5xl">
            {post.category && (
              <p className="eyebrow text-[#F67A05]">
                {post.category}
              </p>
            )}

            <h1 className="font-display mt-6 max-w-5xl text-4xl leading-[0.95] tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-[5.8rem]">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-8 max-w-3xl text-base leading-8 text-white/55 sm:text-lg sm:leading-8">
                {post.excerpt}
              </p>
            )}

            <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-white/10 pt-5 text-[0.65rem] uppercase tracking-[0.16em] text-white/40">
              {post.author && <span>By {post.author}</span>}

              {post.author && post.created_at && (
                <span className="h-px w-5 bg-white/20" />
              )}

              {post.created_at && (
                <span>
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED IMAGE */}
      {post.featured_image && (
        <section className="bg-[#11110F] pb-0">
          <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
            <div className="image-zoom relative aspect-[16/9] overflow-hidden bg-[#EDE1CF] sm:aspect-[16/8]">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 1200px"
              />
            </div>
          </div>
        </section>
      )}

      {/* ARTICLE */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-8">
          <article className="min-w-0">
            <div
              className="
                prose prose-lg max-w-3xl
                prose-headings:font-normal
                prose-headings:tracking-[-0.025em]
                prose-headings:text-[#11110F]
                prose-h2:font-display
                prose-h2:text-4xl
                prose-h2:leading-tight
                prose-h3:font-display
                prose-h3:text-3xl
                prose-p:text-black/65
                prose-p:leading-8
                prose-p:my-6
                prose-a:text-[#C52A0E]
                prose-a:no-underline
                hover:prose-a:underline
                prose-strong:text-[#11110F]
                prose-li:text-black/65
                prose-li:leading-7
                prose-blockquote:border-l-[#F67A05]
                prose-blockquote:font-display
                prose-blockquote:text-2xl
                prose-blockquote:leading-[1.4]
                prose-blockquote:text-black/70
                prose-img:my-10
              "
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />

            {/* SHARE */}
            <div className="mt-16 max-w-3xl border-t border-black/10 pt-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-black/40">
                  Share this story
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      shareUrl
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.65rem] uppercase tracking-[0.14em] text-black/50 transition-colors hover:text-[#C52A0E]"
                  >
                    Facebook
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      shareUrl
                    )}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.65rem] uppercase tracking-[0.14em] text-black/50 transition-colors hover:text-[#C52A0E]"
                  >
                    X
                  </a>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `${post.title} — ${shareUrl}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.65rem] uppercase tracking-[0.14em] text-black/50 transition-colors hover:text-[#C52A0E]"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-10 lg:self-start">
            <div className="border-t border-black/15 pt-5">
              <p className="eyebrow text-[#C52A0E]">
                Plan your adventure
              </p>

              <h2 className="font-display mt-5 text-3xl leading-[1.05] tracking-[-0.02em]">
                Ready to experience Tanzania?
              </h2>

              <p className="mt-5 text-sm leading-7 text-black/55">
                Explore our safari journeys and find the experience that fits
                your adventure.
              </p>

              <Link
                href="/tours"
                className="group mt-7 inline-flex items-center gap-3 border-b border-black/25 pb-2 text-[0.65rem] font-medium uppercase tracking-[0.16em] transition-colors hover:border-[#C52A0E] hover:text-[#C52A0E]"
              >
                Explore safaris
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-black/10 bg-[#EDE1CF] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-5 border-b border-black/10 pb-6 md:flex-row md:items-end">
              <div>
                <p className="section-label">
                  Keep exploring
                </p>

                <h2 className="font-display mt-5 text-4xl leading-none tracking-[-0.025em] sm:text-5xl">
                  More from the journal.
                </h2>
              </div>

              <Link
                href="/blog"
                className="text-[0.65rem] uppercase tracking-[0.16em] text-black/45 transition-colors hover:text-[#C52A0E]"
              >
                View all stories →
              </Link>
            </div>

            <div className="mt-10 grid border-t border-black/10 md:grid-cols-3">
              {relatedPosts.map((related, index) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className={`group py-7 md:px-7 ${
                    index > 0
                      ? "border-t border-black/10 md:border-l md:border-t-0"
                      : ""
                  }`}
                >
                  <div className="image-zoom relative aspect-[16/10] overflow-hidden bg-[#D8C9B2]">
                    {related.featured_image ? (
                      <Image
                        src={related.featured_image}
                        alt={related.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="h-full bg-[#D8C9B2]" />
                    )}
                  </div>

                  <div className="pt-5">
                    <div className="flex items-center justify-between">
                      {related.category && (
                        <p className="text-[0.6rem] uppercase tracking-[0.16em] text-[#C52A0E]">
                          {related.category}
                        </p>
                      )}

                      <span className="text-[0.6rem] uppercase tracking-[0.16em] text-black/25">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="font-display mt-3 text-2xl leading-[1.05] tracking-[-0.02em] text-[#11110F] transition-colors group-hover:text-[#C52A0E]">
                      {related.title}
                    </h3>

                    <span className="mt-5 inline-flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.16em] text-black/50">
                      Read article
                      <span className="h-px w-5 bg-[#F67A05] transition-all duration-300 group-hover:w-8" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="bg-[#C52A0E] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <div>
              <p className="eyebrow text-white/60">
                Your story awaits
              </p>

              <h2 className="font-display mt-6 max-w-3xl text-4xl leading-[0.98] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
                Your Tanzania adventure starts here.
              </h2>
            </div>

            <div className="border-t border-white/20 pt-6 lg:border-l lg:border-t-0 lg:pl-10">
              <p className="max-w-xl text-base leading-7 text-white/75">
                Explore our safari packages and start planning your journey
                with Ndauwo Safaris.
              </p>

              <Link
                href="/tours"
                className="group mt-8 inline-flex items-center gap-3 border-b border-white/40 pb-2 text-[0.65rem] font-medium uppercase tracking-[0.16em] transition-colors hover:border-white"
              >
                View safari packages
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}