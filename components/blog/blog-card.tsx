import Image from "next/image";
import Link from "next/link";

import type { BlogPost } from "@/types/api";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <article className="group border-b border-black/10 md:border-r lg:nth-[3n]:border-r-0">
      <Link href={`/blog/${post.slug}`} className="block p-0 md:p-7 lg:p-8">
        <div className="image-zoom relative aspect-[16/10] overflow-hidden bg-[#EDE1CF]">
          {post.featured_image ? (
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#EDE1CF] text-xs uppercase tracking-[0.16em] text-black/35">
              Ndauwo Safaris
            </div>
          )}

          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

          <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center border border-white/0 text-white opacity-0 transition-all duration-300 group-hover:border-white/70 group-hover:opacity-100">
            ↗
          </div>
        </div>

        <div className="pt-5">
          <div className="flex items-center justify-between gap-4 text-[0.6rem] uppercase tracking-[0.16em] text-black/40">
            <span>
              {post.created_at
                ? new Date(post.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Safari Journal"}
            </span>

            <span className="text-black/20">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {post.category && (
            <p className="mt-4 text-[0.65rem] uppercase tracking-[0.16em] text-[#C52A0E]">
              {post.category}
            </p>
          )}

          <h2 className="font-display mt-3 text-2xl leading-[1.05] tracking-[-0.02em] text-[#11110F] transition-colors duration-300 group-hover:text-[#C52A0E] sm:text-[1.7rem]">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="mt-4 line-clamp-3 text-sm leading-7 text-black/55">
              {post.excerpt}
            </p>
          )}

          <div className="mt-6 flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[#11110F]">
            Read article
            <span className="h-px w-5 bg-[#F67A05] transition-all duration-300 group-hover:w-8" />
          </div>
        </div>
      </Link>
    </article>
  );
}