export type Destination = {
  slug: string;
  name: string;
  region: string;
  shortDescription: string;
  description: string;
  image: string;
  highlights: string[];
  bestFor: string[];
  featured?: boolean;
};

export const destinations: Destination[] = [
  {
    slug: "serengeti",
    name: "Serengeti",
    region: "Northern Tanzania",
    shortDescription:
      "Endless plains, extraordinary wildlife and one of Africa's most iconic safari landscapes.",
    description:
      "The Serengeti is one of Tanzania's defining wilderness destinations. Its vast open plains create exceptional opportunities for wildlife viewing and unforgettable safari experiences.",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=85",
    highlights: [
      "Big Five wildlife",
      "Great Migration",
      "Year-round game viewing",
      "Spectacular landscapes",
    ],
    bestFor: [
      "First-time safari travelers",
      "Wildlife photography",
      "The Great Migration",
      "Couples and families",
    ],
    featured: true,
  },
  {
    slug: "ngorongoro",
    name: "Ngorongoro",
    region: "Northern Tanzania",
    shortDescription:
      "A spectacular natural wonder surrounded by dramatic landscapes and abundant wildlife.",
    description:
      "The Ngorongoro Conservation Area offers a remarkable combination of wildlife, dramatic scenery and cultural experiences in one of Tanzania's most distinctive destinations.",
    image:
      "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=2000&q=85",
    highlights: [
      "Ngorongoro Crater",
      "Exceptional wildlife",
      "Dramatic scenery",
      "Cultural experiences",
    ],
    bestFor: [
      "Wildlife enthusiasts",
      "Scenic photography",
      "Short safari itineraries",
      "First-time visitors",
    ],
    featured: true,
  },
  {
    slug: "tarangire",
    name: "Tarangire",
    region: "Northern Tanzania",
    shortDescription:
      "Ancient baobabs, elephant herds and beautiful landscapes define this unforgettable park.",
    description:
      "Tarangire National Park is known for its distinctive baobab trees, diverse wildlife and beautiful seasonal landscapes. It is an excellent addition to a Northern Tanzania safari.",
    image:
      "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=2000&q=85",
    highlights: [
      "Large elephant populations",
      "Iconic baobabs",
      "Birdlife",
      "Beautiful seasonal landscapes",
    ],
    bestFor: [
      "Elephant lovers",
      "Photography",
      "Birdwatching",
      "Northern circuit safaris",
    ],
    featured: true,
  },
  {
    slug: "zanzibar",
    name: "Zanzibar",
    region: "Tanzania Coast",
    shortDescription:
      "Turquoise waters, white-sand beaches and rich island culture make Zanzibar the perfect safari extension.",
    description:
      "After exploring Tanzania's wilderness, Zanzibar offers a completely different rhythm. Discover beautiful beaches, island culture, historic Stone Town and the warm waters of the Indian Ocean.",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=85",
    highlights: [
      "White-sand beaches",
      "Indian Ocean",
      "Stone Town",
      "Island culture",
    ],
    bestFor: [
      "Beach escapes",
      "Honeymoons",
      "Safari extensions",
      "Relaxation",
    ],
  },
];