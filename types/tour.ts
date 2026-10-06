// types/tours.ts

export interface TourDestination {
  id: number;
  name: string;
  slug: string;
}

export interface TourItineraryItem {
  day: number;
  title: string;
  description: string;
}

export interface Tour {
  id: number;
  name: string;
  slug: string;

  short_description: string;
  description: string;

  price: string;
  currency: string;

  duration_days: number | null;
  duration_nights: number | null;

  destination: TourDestination | null;

  category: string;
  difficulty: string;

  highlights: string[];
  itinerary: TourItineraryItem[];
  included: string[];
  excluded: string[];
  price_note: string;

  featured_image: string;

  is_featured: boolean;
  is_published: boolean;

  created_at?: string;
  updated_at?: string;
}