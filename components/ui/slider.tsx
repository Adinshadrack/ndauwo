"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "cn";

interface SliderProps {
  className?: string;
  min: number;
  max: number;
  step: number;
  value: number[];
  onValueChange: (value: number[]) => void;
}

function Slider({
  className,
  min,
  max,
  step,
  value,
  onValueChange,
}: SliderProps) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      min={min}
      max={max}
      step={step}
      value={value}
      onValueChange={(nextValue) => onValueChange(Array.from(nextValue as readonly number[]))}
    >
      <SliderPrimitive.Control className="relative flex h-5 w-full items-center">
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-200">
          <SliderPrimitive.Indicator className="absolute h-full bg-[#F67A05]" />
        </SliderPrimitive.Track>
        {value.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            index={index}
            getAriaLabel={(thumbIndex) =>
              thumbIndex === 0 ? "Minimum price in USD" : "Maximum price in USD"
            }
            getAriaValueText={(formattedValue) => formattedValue + " US dollars"}
            className="absolute block size-4 rounded-full border-2 border-[#F67A05] bg-white shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-[#F67A05] focus-visible:ring-offset-2"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
