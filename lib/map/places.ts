import type { LatLng } from "@/lib/map/geo";

/** Every tour departs from Arusha, so it doubles as the map origin. */
export const ARUSHA_ORIGIN: LatLng & { name: string } = {
  name: "Arusha",
  lat: -3.3869,
  lng: 36.683,
};

/**
 * Coordinates for the places we sell. The API does not expose latitude and
 * longitude yet — once `Destination` carries them, this table goes away and
 * the map reads straight off the destination record.
 */
const PLACES: Record<string, LatLng> = {
  arusha: { lat: -3.3869, lng: 36.683 },
  "serengeti national park": { lat: -2.3333, lng: 34.8333 },
  serengeti: { lat: -2.3333, lng: 34.8333 },
  "ngorongoro crater": { lat: -3.1667, lng: 35.5833 },
  "ngorongoro conservation area": { lat: -3.1667, lng: 35.5833 },
  ngorongoro: { lat: -3.1667, lng: 35.5833 },
  "tarangire national park": { lat: -3.8333, lng: 36 },
  tarangire: { lat: -3.8333, lng: 36 },
  "lake manyara national park": { lat: -3.5, lng: 35.75 },
  "lake manyara": { lat: -3.5, lng: 35.75 },
  "mount kilimanjaro": { lat: -3.0674, lng: 37.3556 },
  kilimanjaro: { lat: -3.0674, lng: 37.3556 },
  moshi: { lat: -3.3599, lng: 37.3296 },
  "mikumi national park": { lat: -7.3, lng: 37.15 },
  "ruaha national park": { lat: -7.6667, lng: 34.9167 },
  "nyerere national park": { lat: -7.75, lng: 37.5 },
  "selous game reserve": { lat: -7.75, lng: 37.5 },
  "stone town": { lat: -6.1622, lng: 39.1921 },
  zanzibar: { lat: -6.1659, lng: 39.2026 },
  mafia: { lat: -7.85, lng: 39.79 },
};

function normalize(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

export function coordinatesForPlace(name?: string | null): LatLng | null {
  if (!name) return null;

  const key = normalize(name);

  if (PLACES[key]) return PLACES[key];

  // Looser match so "Serengeti National Park, Tanzania" still resolves.
  const match = Object.keys(PLACES).find(
    (candidate) => key.includes(candidate) || candidate.includes(key),
  );

  return match ? PLACES[match] : null;
}

/** The view the map falls back to when the destination has no coordinates. */
export const TANZANIA_CENTER: LatLng = { lat: -6.369, lng: 34.8888 };

export function openStreetMapLink(
  points: { lat: number; lng: number }[],
): string {
  if (points.length === 0) {
    return "https://www.openstreetmap.org/#map=6/-6.369/34.889";
  }

  const lats = points.map((point) => point.lat);
  const lngs = points.map((point) => point.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const padding = 0.35;

  return `https://www.openstreetmap.org/?mlat=${(lats.reduce((a, b) => a + b, 0) / lats.length).toFixed(
    4,
  )}&mlon=${(lngs.reduce((a, b) => a + b, 0) / lngs.length).toFixed(4)}#map=7/${(
    (minLat + maxLat) / 2
  ).toFixed(4)}/${((minLng + maxLng) / 2).toFixed(4)}&bbox=${(minLng - padding).toFixed(
    4,
  )},${(minLat - padding).toFixed(4)},${(maxLng + padding).toFixed(4)},${(maxLat + padding).toFixed(4)}`;
}
