import type { ReactNode } from "react";
import Image from "next/image";
import { Compass, Map, Phone, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui/cta";
import { cn } from "@/lib/utils";

interface ImageCtaSecondary {
  label: string;
  href: string;
  /** Renders an anchor with target/rel instead of an in-app link. */
  external?: boolean;
}

interface ImageCtaProps {
  imageUrl?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  href?: string;
  ctaLabel?: string;
  /** Second, quieter action such as WhatsApp. */
  secondary?: ImageCtaSecondary;
  phone?: string;
  /** Section ground; "sand" is used where the band follows a card section. */
  tone?: "canvas" | "sand";
  className?: string;
}

const features: Array<{ icon: ReactNode; title: string; note: string }> = [
  {
    icon: <Compass className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />,
    title: "Arusha-based team",
    note: "Local guides",
  },
  {
    icon: <Map className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />,
    title: "Tailor made",
    note: "Built around your dates",
  },
  {
    icon: <ShieldCheck className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />,
    title: "No online payment",
    note: "Enquire, then confirm",
  },
];

/**
 * Closing band with photography behind it, used where a plain CTA section
 * would sit against the footer's own forest block.
 */
export function ImageCta({
  imageUrl,
  eyebrow = "Here to help",
  title = "Not sure which safari?",
  description = "Tell us your dates and what you want to see. We reply with the programme that fits and a final quotation.",
  href = "/contact",
  ctaLabel = "Contact us",
  secondary,
  phone,
  tone = "canvas",
  className,
}: ImageCtaProps) {
  return (
    <section
      className={cn(
        tone === "sand" ? "bg-sand-muted" : "bg-canvas",
        "py-16 lg:py-20",
        className,
      )}
    >
      <div className="container-page">
        <Reveal>
        <div className="relative isolate overflow-hidden rounded-[24px] bg-forest-900 px-7 py-10 text-white sm:px-10 lg:px-12 lg:py-11">
          {imageUrl && (
            <>
              <Image
                src={imageUrl}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 1024px) 100vw, 1340px"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,40,24,0.97)_0%,rgba(18,42,25,0.9)_46%,rgba(18,42,25,0.62)_100%)]"
              />
            </>
          )}

          <div className="relative grid gap-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
            <div>
              <p className="type-badge text-white/60">{eyebrow}</p>

              <h2 className="mt-3 max-w-[22ch] text-[1.6rem] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-[1.95rem]">
                {title}
              </h2>

              <p className="mt-3 max-w-[48ch] text-[0.84375rem] leading-[1.7] text-white/72">
                {description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <CtaLink href={href} shape="pill" size="lg">
                  {ctaLabel}
                </CtaLink>

                {secondary && (
                  <CtaLink
                    href={secondary.href}
                    variant="cream"
                    shape="pill"
                    size="lg"
                    arrow={false}
                    target={secondary.external ? "_blank" : undefined}
                  >
                    {secondary.label}
                  </CtaLink>
                )}

                {phone && (
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-[0.8125rem] font-bold text-white transition-colors hover:text-ember"
                  >
                    <Phone className="h-4 w-4 text-ember" strokeWidth={1.9} aria-hidden="true" />
                    {phone}
                  </a>
                )}
              </div>
            </div>

            <ul className="grid gap-5 sm:grid-cols-3 lg:gap-7">
              {features.map((feature) => (
                <li key={feature.title} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-[2px]">
                    {feature.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.75rem] font-bold leading-snug text-white">
                      {feature.title}
                    </span>
                    <span className="mt-0.5 block text-[0.6875rem] leading-snug text-white/60">
                      {feature.note}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
