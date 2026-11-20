const TILE_SIZE = 256;
const MIN_ZOOM = 3;
const MAX_ZOOM = 12;

export interface LatLng {
  lat: number;
  lng: number;
}

/** A window on the Web Mercator world, expressed in pixels at `zoom`. */
export interface MapView {
  zoom: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MapTile {
  key: string;
  url: string;
  x: number;
  y: number;
  /** World pixel position of the tile's top-left corner at the view zoom. */
  left: number;
  top: number;
}

/**
 * Tile source. Swap `NEXT_PUBLIC_MAP_TILE_URL` for a hosted provider
 * (MapTiler, Mapbox, Stadia) before traffic grows — the public OSM tiles are
 * rate-limited and not intended for production traffic.
 */
export const DEFAULT_TILE_TEMPLATE =
  process.env.NEXT_PUBLIC_MAP_TILE_URL ??
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

export function tileUrl(
  template: string,
  zoom: number,
  x: number,
  y: number,
): string {
  return template
    .replace("{z}", String(zoom))
    .replace("{x}", String(x))
    .replace("{y}", String(y));
}

/** Projects a coordinate into world pixels (Web Mercator, EPSG:3857). */
export function project(point: { lat: number; lng: number }, zoom: number) {
  const scale = 256 * 2 ** zoom;
  const lat = Math.max(-85.05112878, Math.min(85.05112878, point.lat));
  const latRad = (lat * Math.PI) / 180;

  return {
    x: ((point.lng + 180) / 360) * scale,
    y:
      ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) *
      scale,
  };
}

/**
 * Frames the given points so they span roughly `fill` of the frame, at the
 * sharpest zoom that still fits. Returns null when there is nothing to show.
 */
export function fitView(
  points: { lat: number; lng: number }[],
  options: { aspect: number; frameWidth?: number; fill?: number } = {
    aspect: 350 / 240,
  },
): MapView | null {
  if (points.length === 0) return null;

  const { aspect, frameWidth = 350, fill = 0.52 } = options;
  const atZero = points.map((point) => project(point, 0));
  const spanX = Math.max(...atZero.map((p) => p.x)) - Math.min(...atZero.map((p) => p.x));
  const spanY = Math.max(...atZero.map((p) => p.y)) - Math.min(...atZero.map((p) => p.y));

  // One world pixel at zoom 0 doubles per zoom level, so the zoom that makes
  // the pair span `fill` of the frame is a single log2 step.
  const zoomX = spanX > 0 ? Math.log2((fill * frameWidth) / spanX) : MAX_ZOOM;
  const zoomY = spanY > 0 ? Math.log2((fill * (frameWidth / aspect)) / spanY) : MAX_ZOOM;
  const zoom = Math.max(
    MIN_ZOOM,
    Math.min(MAX_ZOOM, Math.round(Math.min(zoomX, zoomY))),
  );

  const projected = points.map((point) => project(point, zoom));
  const xs = projected.map((p) => p.x);
  const ys = projected.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const width = Math.max(
    (maxX - minX) / fill,
    ((maxY - minY) * aspect) / fill,
    TILE_SIZE,
  );
  const height = width / aspect;
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  return {
    zoom,
    x: centerX - width / 2,
    y: centerY - height / 2,
    width,
    height,
  };
}

/** Tiles covering the view, plus one ring of margin so edges never show gaps. */
export function tilesForView(
  view: MapView,
  template: string = DEFAULT_TILE_TEMPLATE,
): MapTile[] {
  const tileCount = 2 ** view.zoom;
  const firstX = Math.floor(view.x / TILE_SIZE) - 1;
  const lastX = Math.floor((view.x + view.width) / TILE_SIZE) + 1;
  const firstY = Math.floor(view.y / TILE_SIZE) - 1;
  const lastY = Math.floor((view.y + view.height) / TILE_SIZE) + 1;

  const tiles: MapTile[] = [];

  for (let x = firstX; x <= lastX; x += 1) {
    for (let y = firstY; y <= lastY; y += 1) {
      if (y < 0 || y >= tileCount) continue;

      const wrappedX = ((x % tileCount) + tileCount) % tileCount;

      tiles.push({
        key: `${view.zoom}-${x}-${y}`,
        url: tileUrl(template, view.zoom, wrappedX, y),
        x: wrappedX,
        y,
        left: x * TILE_SIZE,
        top: y * TILE_SIZE,
      });
    }
  }

  return tiles;
}
