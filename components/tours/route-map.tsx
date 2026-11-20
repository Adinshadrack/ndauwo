"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import {
  fitView,
  project,
  tilesForView,
  type LatLng,
  type MapView,
} from "@/lib/map/geo";
import { cn } from "@/lib/utils";

const FRAME_ASPECT = 350 / 240;
const MIN_ZOOM_OFFSET = -2;
const MAX_ZOOM_OFFSET = 3;

interface NamedPlace extends LatLng {
  name: string;
}

interface RouteMapProps {
  origin: NamedPlace;
  destination: NamedPlace | null;
  /** Shown in the card footer, e.g. "Arusha to Serengeti". */
  caption: string;
  largerMapHref: string;
  className?: string;
}

/** Drops "National Park" and friends so the pin label fits on the map. */
function shortPlaceName(name: string): string {
  return name
    .replace(/\s*(national park|national reserve|conservation area|game reserve)$/i, "")
    .trim();
}

/** A gently bowed line between the two pins, in view pixels. */
function routePath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  return `M${from.x} ${from.y} Q ${midX - dy * 0.16} ${midY + dx * 0.16} ${to.x} ${to.y}`;
}

/**
 * A small slippy map showing the drive from the departure city to the tour's
 * destination. Tiles and pins are positioned from real coordinates, so the
 * only thing the caller supplies is the two places.
 */
export function RouteMap({
  origin,
  destination,
  caption,
  largerMapHref,
  className,
}: RouteMapProps) {
  const [zoomOffset, setZoomOffset] = useState(0);

  const points = destination ? [origin, destination] : [origin];
  // A wider frame makes fitView pick a closer zoom, which is what the
  // zoom buttons change.
  const view: MapView | null = fitView(points, {
    aspect: FRAME_ASPECT,
    frameWidth: 350 * 2 ** zoomOffset,
  });

  if (!view) return null;

  const unit = view.width / 350;
  const originPoint = project(origin, view.zoom);
  const destinationPoint = destination ? project(destination, view.zoom) : null;
  const tiles = tilesForView(view);
  const destinationLabel = destination ? shortPlaceName(destination.name) : null;

  const label = destination
    ? `Map of Tanzania showing the drive from ${origin.name} to ${destination.name}`
    : `Map of Tanzania centred on ${origin.name}`;

  return (
    <div
      className={cn(
        "surface-card overflow-hidden",
        className,
      )}
    >
      <div className="relative h-60 overflow-hidden bg-[#eef1e8]">
        <svg
          viewBox={`${view.x} ${view.y} ${view.width} ${view.height}`}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label={label}
        >
          {tiles.map((tile) => (
            <image
              key={tile.key}
              href={tile.url}
              x={tile.left}
              y={tile.top}
              width={256}
              height={256}
              preserveAspectRatio="none"
            />
          ))}

          {destinationPoint && (
            <path
              d={routePath(originPoint, destinationPoint)}
              fill="none"
              stroke="rgba(197,42,14,0.65)"
              strokeWidth={1.6 * unit}
              strokeDasharray={`${4 * unit} ${5 * unit}`}
              strokeLinecap="round"
            />
          )}

          {destinationPoint && (
            <>
              <circle
                cx={destinationPoint.x}
                cy={destinationPoint.y}
                r={34 * unit}
                fill="rgba(197,42,14,0.08)"
                stroke="rgba(197,42,14,0.45)"
                strokeWidth={1 * unit}
              />
              <circle
                cx={destinationPoint.x}
                cy={destinationPoint.y}
                r={7 * unit}
                fill="#f67a05"
                stroke="#ffffff"
                strokeWidth={3 * unit}
              />
              <text
                x={destinationPoint.x}
                y={destinationPoint.y - 42 * unit}
                textAnchor="middle"
                fontSize={9.5 * unit}
                fontWeight={700}
                letterSpacing={0.4 * unit}
                fill="#11110f"
                stroke="#ffffff"
                strokeWidth={3 * unit}
                paintOrder="stroke"
                style={{ textTransform: "uppercase" }}
              >
                {destinationLabel}
              </text>
            </>
          )}

          <circle
            cx={originPoint.x}
            cy={originPoint.y}
            r={5 * unit}
            fill="#1b291e"
            stroke="#ffffff"
            strokeWidth={3 * unit}
          />
          <text
            x={originPoint.x}
            y={originPoint.y + 20 * unit}
            textAnchor="middle"
            fontSize={9.5 * unit}
            fontWeight={700}
            letterSpacing={0.4 * unit}
            fill="#11110f"
            stroke="#ffffff"
            strokeWidth={3 * unit}
            paintOrder="stroke"
            style={{ textTransform: "uppercase" }}
          >
            {origin.name}
          </text>
        </svg>

        <div className="absolute right-3 top-3 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => setZoomOffset((value) => Math.min(MAX_ZOOM_OFFSET, value + 1))}
            disabled={zoomOffset >= MAX_ZOOM_OFFSET}
            aria-label="Zoom in"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink shadow-[0_4px_12px_-5px_rgba(17,17,15,0.5)] transition-colors hover:bg-canvas disabled:opacity-40"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setZoomOffset((value) => Math.max(MIN_ZOOM_OFFSET, value - 1))}
            disabled={zoomOffset <= MIN_ZOOM_OFFSET}
            aria-label="Zoom out"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink shadow-[0_4px_12px_-5px_rgba(17,17,15,0.5)] transition-colors hover:bg-canvas disabled:opacity-40"
          >
            <Minus className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="px-5 pb-4 pt-3.5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[0.75rem] font-bold text-ink">{caption}</span>

          <a
            href={largerMapHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10.5px] font-semibold text-ink-soft underline underline-offset-2 hover:text-ink"
          >
            Larger map
          </a>
        </div>

        <p className="mt-1.5 text-[9px] text-ink-soft">
          Map data{" "}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            © OpenStreetMap contributors
          </a>
        </p>
      </div>
    </div>
  );
}
