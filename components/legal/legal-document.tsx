import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { LegalContents } from "@/components/legal/legal-contents";
import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui/cta";

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: readonly string[];
}

interface LegalDocumentProps {
  sections: readonly LegalSection[];
  /** Month and year the document was last revised, printed above it. */
  updated?: string;
  /** Card under the contents rail — the "questions" block for each page. */
  aside?: ReactNode;
  /** The paired document, so the two legal pages link to each other. */
  crossLink?: { label: string; href: string };
}

/**
 * One legal document: a contents rail on the left and numbered sections on the
 * right, both on the canvas. The rail becomes the questions card on small
 * screens, so the document itself starts first.
 */
export function LegalDocument({
  sections,
  updated,
  aside,
  crossLink,
}: LegalDocumentProps) {
  return (
    <section className="bg-canvas section-pad">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[268px_minmax(0,1fr)] lg:gap-16 xl:gap-20">
          <Reveal
            as="aside"
            className="order-2 lg:order-1 lg:sticky lg:top-[124px] lg:self-start"
          >
            <div className="hidden lg:block">
              <p className="type-eyebrow text-gold">Contents</p>

              <LegalContents sections={sections} />
            </div>

            {aside}

            {crossLink && (
              <Link
                href={crossLink.href}
                className="type-meta group mt-5 inline-flex items-center gap-2.5 border-b border-ink/20 pb-1.5 uppercase text-ink-muted transition-colors hover:border-ember hover:text-clay"
              >
                {crossLink.label}

                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </Link>
            )}
          </Reveal>

          <Reveal className="order-1 lg:order-2" delay={0.08}>
            <article className="max-w-[68ch]">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-ink/12 pb-4">
                {updated && (
                  <>
                    <span className="type-meta uppercase text-ink-soft">
                      Last updated {updated}
                    </span>

                    <span aria-hidden="true" className="h-3 w-px bg-ink/15" />
                  </>
                )}

                <span className="type-meta uppercase text-ink-soft">
                  {sections.length} sections
                </span>
              </div>

              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-32 border-b border-ink/10 py-8 last:border-b-0"
                >
                  <p className="type-meta tabular-nums text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h2 className="type-section-title mt-2 text-ink">
                    {section.title}
                  </h2>

                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="type-body text-ink-muted">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

interface LegalAsideCardProps {
  eyebrow: string;
  title: string;
  children: ReactNode;
  action?: { label: string; href: string };
}

/** The white card under the contents rail. */
export function LegalAsideCard({
  eyebrow,
  title,
  children,
  action,
}: LegalAsideCardProps) {
  return (
    <div className="surface-card mt-7 px-5 py-5">
      <p className="type-eyebrow text-gold">{eyebrow}</p>

      <h2 className="mt-2.5 text-[1.0625rem] font-extrabold leading-snug tracking-[-0.01em] text-ink">
        {title}
      </h2>

      <div className="type-body-sm mt-2 text-ink-muted">{children}</div>

      {action && (
        <CtaLink
          href={action.href}
          size="md"
          className="mt-4 w-full justify-center"
        >
          {action.label}
        </CtaLink>
      )}
    </div>
  );
}
