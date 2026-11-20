"use client";

import { CtaLink } from "@/components/ui/cta";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import type { FAQ } from "@/types/api";

interface FAQsProps {
  faqs: FAQ[];
}

export function FAQs({ faqs }: FAQsProps) {
  if (!faqs.length) return null;

  return (
    <section className="bg-canvas section-pad">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div className="flex flex-col justify-between">
            <h2 className="type-script text-ink">
              Frequently Asked <br />
              Questions
            </h2>

            <div className="mt-12 lg:mt-0">
              <h3 className="font-[family-name:var(--font-primary)] text-lg font-bold text-ink">
                Still have a question?
              </h3>
              <p className="type-body-sm mt-2 max-w-xs text-ink/60">
                Message us and we will reply as quickly as possible.
              </p>
              <CtaLink href="/contact" className="mt-6">
                Contact Us
              </CtaLink>
            </div>
          </div>

          <FaqAccordion faqs={faqs} limit={5} />
        </div>
      </div>
    </section>
  );
}
