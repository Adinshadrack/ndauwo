export type Tour = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;

  destination: string;
  duration: string;
  category: string;
  difficulty: string;

  price: string;
  priceNote?: string;

  image: string;

  highlights: string[];
  included: string[];
  excluded: string[];

  itinerary: {
    day: string;
    title: string;
    description: string;
  }[];

  featured?: boolean;
};

export const tours: Tour[] = [
  {
    slug: "serengeti-wildlife-safari",
    title: "Serengeti Wildlife Safari",
    shortDescription:
      "Experience Tanzania's legendary wildlife landscapes on an unforgettable safari through the Serengeti.",
    description:
      "A carefully crafted safari experience designed for travelers who want to experience Tanzania's incredible wildlife and landscapes.",
    destination: "Serengeti National Park",
    duration: "5 Days",
    category: "Wildlife Safari",
    difficulty: "Easy",
    price: "From $1,250",
    priceNote: "Final pricing depends on travel dates and preferences.",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1800&q=85",
    highlights: [
      "Game drives across the Serengeti",
      "Wildlife viewing",
      "Professional local guide",
      "Scenic African landscapes",
    ],
    included: [
      "Safari transportation",
      "Professional safari guide",
      "Game drives",
      "Accommodation",
    ],
    excluded: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips and gratuities",
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Arrival & Safari Preparation",
        description:
          "Begin your Tanzania adventure with arrival and preparation for your safari journey.",
      },
      {
        day: "Day 02",
        title: "Into the Serengeti",
        description:
          "Enter the Serengeti and begin exploring its extraordinary wildlife and landscapes.",
      },
      {
        day: "Day 03",
        title: "Full Day Game Drive",
        description:
          "Spend the day exploring the Serengeti with opportunities to encounter a variety of wildlife.",
      },
      {
        day: "Day 04",
        title: "Serengeti Exploration",
        description:
          "Continue your safari adventure with another day among the plains and wildlife.",
      },
      {
        day: "Day 05",
        title: "Departure",
        description:
          "Enjoy your final moments in Tanzania before beginning your journey home.",
      },
    ],
    featured: true,
  },

  {
    slug: "northern-tanzania-adventure",
    title: "Northern Tanzania Adventure",
    shortDescription:
      "Discover some of Northern Tanzania's most iconic landscapes and wildlife destinations.",
    description:
      "An adventure through Northern Tanzania combining spectacular landscapes and unforgettable wildlife experiences.",
    destination: "Tarangire · Ngorongoro · Serengeti",
    duration: "7 Days",
    category: "Classic Safari",
    difficulty: "Easy",
    price: "From $1,850",
    priceNote: "Final pricing depends on travel dates and preferences.",
    image:
      "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1800&q=85",
    highlights: [
      "Tarangire National Park",
      "Ngorongoro Conservation Area",
      "Serengeti National Park",
      "Multiple game drives",
    ],
    included: [
      "Safari transportation",
      "Professional safari guide",
      "Game drives",
      "Accommodation",
    ],
    excluded: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips and gratuities",
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Arrival in Tanzania",
        description:
          "Arrive in Tanzania and prepare for your Northern Tanzania adventure.",
      },
      {
        day: "Day 02",
        title: "Tarangire National Park",
        description:
          "Explore Tarangire and experience its distinctive landscapes and wildlife.",
      },
      {
        day: "Day 03",
        title: "Ngorongoro",
        description:
          "Travel toward the Ngorongoro Conservation Area and experience its spectacular surroundings.",
      },
      {
        day: "Day 04",
        title: "Ngorongoro Crater",
        description:
          "Explore the crater and look for some of Tanzania's most remarkable wildlife.",
      },
      {
        day: "Day 05",
        title: "Serengeti",
        description:
          "Continue toward the Serengeti for another chapter of your safari.",
      },
      {
        day: "Day 06",
        title: "Serengeti Game Drive",
        description:
          "Spend a full day exploring the Serengeti.",
      },
      {
        day: "Day 07",
        title: "Departure",
        description:
          "Complete your adventure and begin your journey home.",
      },
    ],
    featured: true,
  },

  {
    slug: "ultimate-tanzania-safari",
    title: "Ultimate Tanzania Safari",
    shortDescription:
      "A longer Tanzania safari designed to give you more time to explore, observe and experience the wild.",
    description:
      "An extended safari experience across Northern Tanzania, giving travelers more time to discover the country's iconic wildlife destinations.",
    destination: "Northern Tanzania",
    duration: "10 Days",
    category: "Luxury Safari",
    difficulty: "Easy",
    price: "From $2,600",
    priceNote: "Final pricing depends on travel dates and preferences.",
    image:
      "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1800&q=85",
    highlights: [
      "Extended safari experience",
      "Northern Tanzania",
      "Multiple wildlife destinations",
      "Flexible exploration",
    ],
    included: [
      "Safari transportation",
      "Professional safari guide",
      "Game drives",
      "Accommodation",
    ],
    excluded: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips and gratuities",
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Arrival",
        description:
          "Arrive in Tanzania and prepare for your extended safari.",
      },
      {
        day: "Day 02",
        title: "Safari Begins",
        description:
          "Begin exploring Northern Tanzania's remarkable landscapes.",
      },
      {
        day: "Day 03",
        title: "Wildlife Exploration",
        description:
          "Continue your wildlife adventure with guided game viewing.",
      },
      {
        day: "Day 04",
        title: "Into the Wild",
        description:
          "Discover another side of Tanzania's spectacular wilderness.",
      },
      {
        day: "Day 05",
        title: "Ngorongoro",
        description:
          "Explore the extraordinary Ngorongoro landscape.",
      },
      {
        day: "Day 06",
        title: "Serengeti",
        description:
          "Continue into the Serengeti.",
      },
      {
        day: "Day 07",
        title: "Full Day Safari",
        description:
          "Enjoy a full day of wildlife exploration.",
      },
      {
        day: "Day 08",
        title: "Serengeti Adventure",
        description:
          "Continue discovering the Serengeti.",
      },
      {
        day: "Day 09",
        title: "Final Safari",
        description:
          "Enjoy your final full day in Tanzania's wilderness.",
      },
      {
        day: "Day 10",
        title: "Departure",
        description:
          "Complete your safari and begin your journey home.",
      },
    ],
    featured: true,
  },
];

export const tourCategories = [
  "All",
  "Wildlife Safari",
  "Classic Safari",
  "Luxury Safari",
];

export const tourDestinations = [
  "All",
  "Serengeti National Park",
  "Tarangire · Ngorongoro · Serengeti",
  "Northern Tanzania",
];