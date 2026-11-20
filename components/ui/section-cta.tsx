import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui/cta";
import { cn } from "@/lib/utils";

interface CtaSpec {
  label: string;
  href: string;
  /** Renders an anchor with target/rel instead of an in-app link. */
  external?: boolean;
}

interface SectionCtaProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** "forest" is the house closing band; "sand" is the quieter one. */
  tone?: "forest" | "sand";
  primary?: CtaSpec;
  secondary?: CtaSpec;
  className?: string;
}

/**
 * Closing call-to-action band shared by every page, so no page grows its own
 * burnt-orange or sand variant again.
 */
export function SectionCta({
  eyebrow,
  title,
  description,
  tone = "forest",
  primary,
  secondary,
  className,
}: SectionCtaProps) {
  const isForest = tone === "forest";

  return (
    <section
      className={cn(isForest ? "bg-forest-900 text-white" : "bg-sand text-ink", className)}
    >
      <div className="container-page section-pad">
        <Reveal className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className={cn("type-eyebrow", isForest ? "text-ember" : "text-gold")}>
              {eyebrow}
            </p>

            <h2
              className={cn(
                "type-script mt-4 max-w-2xl",
                isForest ? "text-white" : "text-ink",
              )}
            >
              {title}
            </h2>

            {description && (
              <p
                className={cn(
                  "type-body-sm mt-4 max-w-xl",
                  isForest ? "text-white/70" : "text-ink/65",
                )}
              >
                {description}
              </p>
            )}
          </div>

          {(primary || secondary) && (
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              {primary && (
                <CtaLink
                  href={primary.href}
                  size="lg"
                  arrow={false}
                  target={primary.external ? "_blank" : undefined}
                >
                  {primary.label}
                </CtaLink>
              )}

              {secondary && (
                <CtaLink
                  href={secondary.href}
                  size="lg"
                  arrow={false}
                  variant={isForest ? "cream" : "dark"}
                  target={secondary.external ? "_blank" : undefined}
                >
                  {secondary.label}
                </CtaLink>
              )}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
