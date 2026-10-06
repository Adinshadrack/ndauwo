export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  content: {
    heading?: string;
    paragraphs: string[];
  }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "best-time-to-visit-tanzania",
    title: "When Is the Best Time to Visit Tanzania?",
    excerpt:
      "A practical guide to Tanzania's seasons, wildlife and what to expect throughout the year.",
    category: "Travel Guide",
    date: "June 12, 2026",
    readTime: "7 min read",
    author: "Ndauwo Safaris",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=2000&q=85",
    content: [
      {
        paragraphs: [
          "Tanzania is a year-round destination, but different seasons can create very different travel experiences. Understanding the seasons can help you choose the right time for the kind of safari you have in mind.",
          "Rather than focusing on a single perfect month, it is useful to think about wildlife, weather, landscapes and your personal travel priorities together.",
        ],
      },
      {
        heading: "The dry season",
        paragraphs: [
          "The dry months are popular with safari travelers because wildlife can be easier to spot around water sources and roads are generally easier to navigate.",
          "The landscapes can also have a distinctive golden appearance that creates excellent conditions for photography.",
        ],
      },
      {
        heading: "The green season",
        paragraphs: [
          "The wetter months bring renewed vegetation, dramatic skies and fewer visitors in many areas. This can be a beautiful time for travelers who enjoy landscapes and photography.",
          "Wildlife viewing can still be rewarding, and the changing scenery gives Tanzania a completely different atmosphere.",
        ],
      },
      {
        heading: "When should you go?",
        paragraphs: [
          "The best time ultimately depends on what you want to experience. If wildlife viewing is your priority, we can help you choose destinations and dates that match your interests.",
          "The most important thing is not simply choosing a date, but creating an itinerary that makes the most of the conditions during your trip.",
        ],
      },
    ],
  },

  {
    slug: "first-time-serengeti-guide",
    title: "A First-Timer's Guide to the Serengeti",
    excerpt:
      "Everything you need to know before experiencing one of Africa's most iconic safari destinations.",
    category: "Safari Guide",
    date: "May 28, 2026",
    readTime: "8 min read",
    author: "Ndauwo Safaris",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=85",
    content: [
      {
        paragraphs: [
          "For many travelers, the Serengeti represents the classic African safari. Its enormous plains, wildlife and changing landscapes create an experience that is difficult to replicate anywhere else.",
          "For first-time visitors, however, knowing what to expect can make the journey even more enjoyable.",
        ],
      },
      {
        heading: "Expect early mornings",
        paragraphs: [
          "Some of the most rewarding wildlife viewing happens early in the day. The cooler temperatures and morning light can create excellent conditions for game drives.",
        ],
      },
      {
        heading: "Bring patience",
        paragraphs: [
          "Safari is not a zoo visit. Wildlife moves according to its own rhythm, which means patience is part of the experience.",
          "Your guide's knowledge and ability to read the landscape can make a major difference.",
        ],
      },
      {
        heading: "Leave room for the unexpected",
        paragraphs: [
          "Some of the most memorable safari moments are not the ones you planned. A quiet landscape, an unexpected animal encounter or a spectacular sunset can become the story you remember most.",
        ],
      },
    ],
  },

  {
    slug: "beyond-the-safari-tanzania-culture",
    title: "Beyond the Safari: Discovering Tanzania's Culture",
    excerpt:
      "Tanzania's story goes far beyond its wildlife. Discover the people, traditions and experiences that give the country its character.",
    category: "Experiences",
    date: "May 10, 2026",
    readTime: "6 min read",
    author: "Ndauwo Safaris",
    image:
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=2000&q=85",
    content: [
      {
        paragraphs: [
          "Tanzania's landscapes are extraordinary, but its people and cultures are equally important to understanding the country.",
          "A thoughtfully planned journey can include experiences that allow travelers to learn about communities, traditions, food and everyday life.",
        ],
      },
      {
        heading: "Travel beyond the game drive",
        paragraphs: [
          "Adding cultural experiences to a safari can create a more complete picture of Tanzania.",
          "Depending on your itinerary, you might visit local communities, markets, cultural centers or meet people whose connection to the land goes back generations.",
        ],
      },
      {
        heading: "Travel with respect",
        paragraphs: [
          "Meaningful cultural travel begins with respect. Experiences should create genuine interaction rather than treating communities as attractions.",
          "Working with local people and listening to their stories can make these experiences both more authentic and more rewarding.",
        ],
      },
    ],
  },

  {
    slug: "what-to-pack-for-tanzania-safari",
    title: "What to Pack for a Tanzania Safari",
    excerpt:
      "A practical packing guide covering clothing, photography gear, essentials and the little things travelers often forget.",
    category: "Travel Tips",
    date: "April 22, 2026",
    readTime: "5 min read",
    author: "Ndauwo Safaris",
    image:
      "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=2000&q=85",
    content: [
      {
        paragraphs: [
          "Packing for a safari does not need to be complicated. The key is choosing comfortable, practical items that work well for changing temperatures and long days outdoors.",
        ],
      },
      {
        heading: "Clothing",
        paragraphs: [
          "Lightweight, comfortable clothing is generally useful during the day. A warmer layer can be valuable for early mornings and evenings.",
          "Neutral and earthy colors can also be practical when spending time outdoors.",
        ],
      },
      {
        heading: "Photography",
        paragraphs: [
          "If wildlife photography is important to you, bring the camera equipment you are comfortable using. Extra batteries and memory cards are always useful.",
        ],
      },
      {
        heading: "The essentials",
        paragraphs: [
          "Remember travel documents, personal medication, sun protection, comfortable shoes and any personal items you rely on throughout the day.",
        ],
      },
    ],
  },
];