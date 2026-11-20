import type { ReactNode } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface CheckChipProps {
  children: ReactNode;
  className?: string;
}

/** Rounded tag with an ember tick, used for tour highlights. */
export function CheckChip({ children, className }: CheckChipProps) {
  return (
    <span className={cn("chip", className)}>
      <span className="chip-mark" aria-hidden="true">
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
      {children}
    </span>
  );
}
