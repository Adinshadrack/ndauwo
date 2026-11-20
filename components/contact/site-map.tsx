"use client";

import { useState } from "react";
import { ExternalLink, Minus, Navigation, Plus } from "lucide-react";

import {
  project,
  tilesForView,
  type LatLng,
  type MapView,
} from "@/lib/map/geo";
import { ARUSHA_ORIGIN, openStreetMapLink } from "@/lib/map/places";

const OFFICE: LatLng = ARUSHA_ORIGIN;
const BASE_ZOOM = 13;
const MIN_ZOOM = 10;
const MAX_ZOOM = 16;
/** World pixels framed left-to-right; the browser crops to the real box. */
const FRAME_WIDTH = 1440;
const FRAME_ASPECT = 1440 / 460;

interface SiteMapProps {
  /** Office address as entered in site settings. */
  address: string;
  /** Google Maps link from site settings, used by the directions action. */
  directionsHref?: string;
}

/**
 * The office on a slippy map, run edge to edge as a band. The view is always
 * centred on the office, so the pin is a plain marker at the frame's centre and
 * stays crisp at any width while the tiles rebuild as the zoom changes.
 */
export function SiteMap({ address, directionsHref }: SiteMapProps) {
  const [zoom, setZoom] = useState(BASE_ZOOM);

  const center = project(OFFICE, zoom);
  const view: MapView = {
    zoom,
    x: center.x - FRAME_WIDTH / 2,
    y: center.y - FRAME_WIDTH / FRAME_ASPECT / 2,
    width: FRAME_WIDTH,
    height: FRAME_WIDTH / FRAME_ASPECT,
  };

  const tiles = tilesForView(view);

  return (
    <section className="relative isolate h-[360px] w-full overflow-hidden bg-[#e9e5dc] sm:h-[440px] lg:h-[500px]">
      <svg
        viewBox={`${view.x} ${view.y} ${view.width} ${view.height}`}
        preserveAspectRatio="xMidYMid slice"
        className="animate-fade absolute inset-0 h-full w-full"
        role="img"
        aria-label="Map centred on the Ndauwo Safaris office in Arusha, Tanzania"
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
      </svg>

      {/* The office itself: a soft halo, the pin, and its label. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/15 ring-1 ring-ember/30"
        />

        {/* Slow halo so the pin reads as live rather than printed. */}
        <span
          aria-hidden="true"
          className="map-pulse absolute left-1/2 top-1/2 -ml-10 -mt-10 h-20 w-20 rounded-full bg-ember/30"
        />

        <span className="relative flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-white bg-ember shadow-[0_10px_24px_-8px_rgba(17,17,15,0.65)]">
          <Navigation
            className="h-4 w-4 text-white"
            strokeWidth={2.2}
            aria-hidden="true"
          />
        </span>

        <span className="absolute left-1/2 top-full mt-3 w-max -translate-x-1/2 rounded-full bg-ink px-3.5 py-1.5 text-[11px] font-bold tracking-[-0.01em] text-white shadow-card">
          Ndauwo Safaris office
        </span>
      </div>

      {/* Place card, printed over the ground the way a map product does. */}
      <div className="absolute left-3 top-3 max-w-[19rem] rounded-xl border border-ink/8 bg-white/95 p-4 shadow-card backdrop-blur-sm sm:left-5 sm:top-5">
        <p className="text-[0.875rem] font-extrabold leading-snug tracking-[-0.01em] text-ink">
          Ndauwo Safaris
        </p>

        <p className="mt-1.5 text-[0.75rem] leading-[1.6] text-ink-muted">
          {address}
        </p>

        <div className="mt-3 flex items-center gap-4">
          {directionsHref && (
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-clay transition-colors hover:text-ember"
            >
              Directions
              <ExternalLink className="h-3 w-3" strokeWidth={2.2} aria-hidden="true" />
            </a>
          )}

          <a
            href={openStreetMapLink([OFFICE])}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.6875rem] font-semibold text-ink-soft underline underline-offset-2 transition-colors hover:text-ink"
          >
            Larger map
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 right-4 flex flex-col gap-1.5">
        <button
          type="button"
          onClick={() => setZoom((value) => Math.min(MAX_ZOOM, value + 1))}
          disabled={zoom >= MAX_ZOOM}
          aria-label="Zoom in"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink shadow-[0_4px_12px_-5px_rgba(17,17,15,0.5)] transition-colors hover:bg-canvas disabled:opacity-40"
        >
          <Plus className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => setZoom((value) => Math.max(MIN_ZOOM, value - 1))}
          disabled={zoom <= MIN_ZOOM}
          aria-label="Zoom out"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink shadow-[0_4px_12px_-5px_rgba(17,17,15,0.5)] transition-colors hover:bg-canvas disabled:opacity-40"
        >
          <Minus className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
        </button>
      </div>

      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 left-3 rounded bg-white/85 px-1.5 py-0.5 text-[9px] text-ink-soft transition-colors hover:text-ink"
      >
        © OpenStreetMap contributors
      </a>
    </section>
  );
}
