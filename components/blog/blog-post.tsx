import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { ReadingProgress } from "@/components/blog/reading-progress";
import {
  SectionLabel,
  StoryCard,
  publishedLabel,
} from "@/components/blog/story-card";
import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui/cta";
import { ImageCta } from "@/components/ui/image-cta";
import { PhotoHero } from "@/components/ui/photo-hero";
import type { BlogPost } from "@/types/api";

/** Words per minute used by most long-form desks. */
const READING_PACE = 220;

/** Word count of the story body, so the byline can carry a real time to read. */
function readingMinutes(html: string): number {
  const words = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / READING_PACE));
}

const BLOCK_TAG =
  /<(p|div|h[1-6]|ul|ol|li|blockquote|figure|table|pre|img)\b/i;

function escapeText(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const HEADING_MAX_WORDS = 8;
const HEADING_MAX_CHARS = 60;

/**
 * Section titles in the stored copy are short lines with no closing
 * punctuation ("Serengeti: The Endless Plains"), so they can be lifted to a
 * heading. Anything that reads as a sentence stays a paragraph — the rule is
 * deliberately narrow so body copy is never promoted by accident.
 */
function isHeadingLine(line: string): boolean {
  if (line.length > HEADING_MAX_CHARS) return false;
  if (/[.,;:!?]$/.test(line)) return false;
  if (line.split(/\s+/).filter(Boolean).length > HEADING_MAX_WORDS) return false;

  return /^[A-Z0-9"'“]/.test(line);
}

/**
 * The CMS keeps most stories as plain text with one block per line rather than
 * HTML, and stored line breaks arrive double-escaped as a literal `\n`. Split
 * those into paragraphs and headings so the body carries the type scale instead
 * of arriving as one unbroken run. Content that already has block markup is
 * passed through untouched.
 */
function toArticleHtml(content: string): string {
  if (BLOCK_TAG.test(content)) return content;

  return content
    .replace(/\\r\\n|\\n|\\r/g, "\n")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) =>
      isHeadingLine(line)
        ? `<h2>${escapeText(line)}</h2>`
        : `<p>${escapeText(line)}</p>`,
    )
    .join("");
}

interface BlogPostPageProps {
  post: BlogPost;
  /** Other stories in the same category, or the newest if none match. */
  relatedPosts: BlogPost[];
  ctaImage?: string;
  phone?: string;
}

/**
 * A single journal story. It opens the way the journal front page does: the
 * story's own photograph held behind centred copy, with the byline and read
 * time in the meta rule. The body follows on the canvas.
 */
export function BlogPostPage({
  post,
  relatedPosts,
  ctaImage,
  phone,
}: BlogPostPageProps) {
  const published = publishedLabel(post);
  // The API now returns a sanitised rich-text body; the plain-text transform
  // stays as the fallback for a post saved before that field existed.
  const bodyHtml =
    post.content_html && post.content_html.trim()
      ? post.content_html
      : toArticleHtml(post.content);
  const minutes = post.reading_minutes ?? readingMinutes(bodyHtml);

  const meta = [
    post.author ? `By ${post.author}` : null,
    published,
    `${minutes} min read`,
  ].filter((item): item is string => Boolean(item));

  const shareUrl = `https://ndauwosafaris.com/blog/${post.slug}`;

  const shareLinks = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl,
      )}&text=${encodeURIComponent(post.title)}`,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${post.title} — ${shareUrl}`)}`,
    },
  ];

  return (
    <main className="bg-canvas">
      <ReadingProgress />

      <PhotoHero
        align="center"
        title={post.title}
        description={post.excerpt || undefined}
        backdropImage={post.featured_image || undefined}
        eyebrow={post.category || "Safari Journal"}
        breadcrumb={
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-white/55 transition-colors hover:text-white"
          >
            <ArrowLeft
              className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-1"
              strokeWidth={2.2}
              aria-hidden="true"
            />
            Safari Journal
          </Link>
        }
        meta={meta}
      />


      {/* Story body and the rail that carries the next step */}
      <section className="bg-canvas pb-16 pt-12 lg:pb-20 lg:pt-16">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 xl:gap-20">
          <Reveal as="article" className="min-w-0">
            <div
              className="
                prose max-w-[68ch]
                prose-headings:font-[family-name:var(--font-primary)]
                prose-headings:text-ink
                prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-[1.75rem] prose-h2:font-extrabold
                prose-h2:leading-[1.15] prose-h2:tracking-[-0.025em]
                prose-h3:mt-9 prose-h3:mb-3 prose-h3:text-[1.3125rem] prose-h3:font-bold
                prose-h3:leading-[1.25] prose-h3:tracking-[-0.015em]
                prose-p:my-5 prose-p:text-ink-muted prose-p:leading-[1.8]
                prose-a:font-semibold prose-a:text-clay prose-a:no-underline hover:prose-a:underline
                prose-strong:text-ink
                prose-li:my-1.5 prose-li:text-ink-muted prose-li:leading-[1.75]
                prose-blockquote:border-l-2 prose-blockquote:border-ember prose-blockquote:pl-6
                prose-blockquote:text-[1.25rem] prose-blockquote:font-semibold
                prose-blockquote:leading-[1.5] prose-blockquote:text-ink prose-blockquote:not-italic
                prose-img:my-10 prose-img:rounded-xl
                prose-figcaption:text-ink-soft
                [&>p:first-of-type]:mt-0 [&>p:first-of-type]:text-[1.0625rem]
                [&>p:first-of-type]:leading-[1.8] [&>p:first-of-type]:text-ink
                sm:[&>p:first-of-type]:text-[1.125rem]
              "
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          </Reveal>

          <Reveal
            as="aside"
            className="lg:sticky lg:top-[132px] lg:self-start"
            delay={0.1}
          >
            <div className="surface-card px-6 py-6">
              <p className="type-eyebrow text-gold">Next step</p>

              <h2 className="type-section-title mt-3 text-ink">
                Plan a safari like this
              </h2>

              <p className="type-body-sm mt-3 text-ink-muted">
                Tell us the parks you want to see and when you can travel. The
                planner who has driven the route replies with a programme and a
                final quotation.
              </p>

              <CtaLink
                href="/contact"
                size="md"
                className="mt-5 w-full justify-center"
              >
                Start an inquiry
              </CtaLink>
            </div>

            {post.category && (
              <div className="mt-6 border-t border-ink/12 pt-4">
                <p className="type-badge uppercase text-ink-soft">Filed under</p>

                <p className="mt-1.5 text-[0.84375rem] font-semibold text-clay">
                  {post.category}
                </p>
              </div>
            )}

            <div className="mt-6 border-t border-ink/12 pt-4">
              <p className="type-badge uppercase text-ink-soft">
                Share this story
              </p>

              <ul className="mt-2">
                {shareLinks.map((link) => (
                  <li key={link.label} className="border-b border-ink/10">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-3 py-2.5 text-[0.8125rem] font-semibold text-ink-muted transition-colors hover:text-clay"
                    >
                      {link.label}

                      <ArrowUpRight
                        className="h-3.5 w-3.5 text-ink-soft transition-colors group-hover:text-clay"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/blog"
              className="type-meta group mt-6 inline-flex items-center gap-2.5 uppercase text-ink-muted transition-colors hover:text-clay"
            >
              All stories
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2.2}
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* What to read next */}
      {relatedPosts.length > 0 && (
        <section className="bg-sand-muted section-pad">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionLabel>More from the journal</SectionLabel>

              <Link
                href="/blog"
                className="type-meta group mb-7 inline-flex items-center gap-2.5 uppercase text-ink-muted transition-colors hover:text-clay"
              >
                View all stories
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="grid gap-x-9 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related, index) => (
                <Reveal key={related.id} delay={index * 0.07}>
                  <StoryCard post={related} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ImageCta
        imageUrl={ctaImage}
        eyebrow="Next step"
        title="Plan the trip behind this story"
        description="Send the parks you want to see and the dates you can travel. We reply with a programme, the driving days and a final quotation."
        href="/contact"
        ctaLabel="Plan your safari"
        secondary={{ label: "Browse safaris", href: "/tours" }}
        phone={phone}
      />
    </main>
  );
}
