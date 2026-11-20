import Image from "next/image";

interface ContactHeroProps {
  /** Site photography behind the copy. */
  imageUrl?: string;
}

/**
 * Photographic opening: the photograph runs full bleed under a forest gradient,
 * and the panel below is cut on a diagonal so a wedge of the picture stays
 * visible behind it.
 */
export function ContactHero({ imageUrl }: ContactHeroProps) {
  return (
    <section className="relative isolate flex min-h-[360px] items-center justify-center overflow-hidden bg-forest-900 py-16 text-center text-white sm:min-h-[400px] sm:py-20 lg:min-h-[430px]">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      )}

      {/* Dark at the top for contrast, deepest at the foot where the panel cuts in. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,42,26,0.82)_0%,rgba(14,45,28,0.55)_38%,rgba(11,42,26,0.88)_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_top,rgba(11,42,26,0.9),transparent)]"
      />

      <div className="container-page relative z-10">
        <h1 className="type-display animate-rise text-white">Contact us</h1>

        <p className="animate-rise mx-auto mt-4 max-w-[48ch] text-[0.9375rem] leading-[1.75] text-white/75 [animation-delay:110ms]">
          Tell us which parks you want to see and when. The planner who has
          driven the route replies.
        </p>
      </div>
    </section>
  );
}
