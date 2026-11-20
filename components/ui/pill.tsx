import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PillTone = "glass" | "ember" | "sand";

const tones: Record<PillTone, string> = {
  glass: "pill-outline-light",
  ember: "pill-ember-glass",
  sand: "bg-sand-muted text-ink",
};

interface PillProps {
  children: ReactNode;
  /** Glass sits on photography, ember marks the one highlighted fact. */
  tone?: PillTone;
  className?: string;
}

/** Compact metadata pill, used over photography and in card headers. */
export function Pill({ children, tone = "glass", className }: PillProps) {
  return <span className={cn("pill pill-sm", tones[tone], className)}>{children}</span>;
}

interface CountChipProps {
  children: ReactNode;
  className?: string;
}

/** Small tally beside a heading: "6 items", "4 days". */
export function CountChip({ children, className }: CountChipProps) {
  return <span className={cn("count-chip", className)}>{children}</span>;
}
