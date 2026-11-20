"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface LegalContentsProps {
  sections: ReadonlyArray<{ id: string; title: string }>;
}

/**
 * Contents rail for the legal documents. The section currently being read is
 * marked as the reader scrolls, so a long document always says where you are.
 * Purely additive: every row is a working anchor without JavaScript.
 */
export function LegalContents({ sections }: LegalContentsProps) {
  const key = sections.map((section) => section.id).join("|");
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const elements = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // A section counts as "being read" once it crosses into the top third.
      { rootMargin: "-130px 0px -62% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [key]);

  return (
    <nav aria-label="Contents" className="mt-4">
      <ol className="border-t border-ink/12">
        {sections.map((section, index) => {
          const active = section.id === activeId;

          return (
            <li key={section.id} className="border-b border-ink/12">
              <a
                href={`#${section.id}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "group relative flex gap-3 py-3 pl-4 text-[0.8125rem] font-semibold leading-snug transition-colors",
                  active ? "text-clay" : "text-ink-muted hover:text-clay",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 bg-clay transition-opacity",
                    active ? "opacity-100" : "opacity-0",
                  )}
                />

                <span className="type-meta w-4 shrink-0 tabular-nums text-ink-soft">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span>{section.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
