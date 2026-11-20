import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types/api";

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Formatted from UTC parts rather than `toLocaleDateString`, so the server and
 * the browser cannot print two different dates for the same story. The public
 * payload does not carry a date yet, in which case nothing is rendered.
 */
export function publishedLabel(post: BlogPost): string | null {
  const raw = post.published_at || post.created_at;

  if (!raw) return null;

  const date = new Date(raw);

  if (Number.isNaN(date.getTime())) return null;

  return `${date.getUTCDate()} ${MONTHS_SHORT[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

interface SectionLabelProps {
  children: string;
}

/** Journal section heading: a short bold label with a 44px rule under it. */
export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="mb-7">
      <h2 className="text-[0.9375rem] font-extrabold tracking-[-0.01em] text-ink">
        {children}
      </h2>

      <span aria-hidden="true" className="mt-2.5 block h-0.5 w-11 bg-ink" />
    </div>
  );
}

interface StoryCardProps {
  post: BlogPost;
  /** "lead" is the featured story; "default" is the feed card. */
  size?: "lead" | "default";
}

export function StoryCard({ post, size = "default" }: StoryCardProps) {
  const date = publishedLabel(post);
  const isLead = size === "lead";

  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl bg-sand",
          isLead ? "aspect-[16/9]" : "aspect-[16/10]",
        )}
      >
        {post.featured_image && (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            sizes={
              isLead
                ? "(max-width: 1024px) 100vw, 640px"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
            }
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
          />
        )}
      </div>

      <h3
        className={cn(
          "mt-4 font-extrabold leading-[1.25] tracking-[-0.02em] text-ink group-hover:underline group-hover:decoration-ink/30 group-hover:underline-offset-4",
          isLead ? "text-[1.25rem] sm:text-[1.5rem]" : "text-[1.0313rem]",
        )}
      >
        {post.title}
      </h3>

      {post.excerpt && (
        <p className="mt-2 line-clamp-2 text-[0.84375rem] leading-[1.65] text-ink-muted">
          {post.excerpt}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.75rem] text-ink-muted">
        {post.author && <span>{post.author}</span>}

        {date && (
          <>
            <span aria-hidden="true" className="h-2.5 w-px bg-ink/20" />
            <span>{date}</span>
          </>
        )}
      </div>
    </Link>
  );
}

/** Thumbnail-left row used beside the lead story, as in a contents column. */
export function CompactStory({ post }: { post: BlogPost }) {
  const date = publishedLabel(post);

  return (
    <Link href={`/blog/${post.slug}`} className="group flex gap-4">
      <div className="relative h-[86px] w-[124px] flex-none overflow-hidden rounded-lg bg-sand">
        {post.featured_image && (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            sizes="124px"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
      </div>

      <div className="min-w-0">
        <h3 className="line-clamp-2 text-[0.9688rem] font-extrabold leading-[1.3] tracking-[-0.015em] text-ink group-hover:underline group-hover:decoration-ink/30 group-hover:underline-offset-4">
          {post.title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.71875rem] text-ink-muted">
          {post.author && <span className="truncate">{post.author}</span>}

          {date && (
            <>
              <span aria-hidden="true" className="h-2.5 w-px bg-ink/20" />
              <span>{date}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
