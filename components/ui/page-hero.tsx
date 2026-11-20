import type { ReactNode } from "react";

import { HeroVideo } from "@/components/media/hero-video";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Poster shown before the hero video loads. */
  poster?: string;
  /** Renders the looping safari video behind the copy. */
  video?: boolean;
  className?: string;
}

/**
 * The dark band that opens every inner page. One implementation keeps the
 * eyebrow, display scale and gutters identical across the site.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  poster,
  video = false,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-forest-900 text-white",
        className,
      )}
    >
      {video && (
        <>
          <HeroVideo poster={poster} />
          <div aria-hidden="true" className="absolute inset-0 bg-forest-900/50" />
        </>
      )}

      <div className="container-page relative z-10 pb-20 pt-32 sm:pb-24 sm:pt-36 lg:pb-24 lg:pt-40">
        <div className="max-w-4xl">
          <p className="type-eyebrow animate-rise text-ember">{eyebrow}</p>

          <h1 className="type-display-xl animate-rise mt-5 text-white [animation-delay:90ms]">
            {title}
          </h1>

          {description && (
            <div className="animate-rise mt-7 flex max-w-2xl items-start gap-5 [animation-delay:180ms]">
              <span
                aria-hidden="true"
                className="mt-3 hidden h-px w-12 shrink-0 bg-white/30 sm:block"
              />
              <p className="type-body text-white/60">{description}</p>
            </div>
          )}
        </div>
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
    </section>
  );
}
