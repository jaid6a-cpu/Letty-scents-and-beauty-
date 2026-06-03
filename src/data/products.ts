import { Product, BlogPost } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'l-ombre-dor',
    name: "L'Ombre d'Or",
    tagline: "The Golden Shadow",
    description: "An intoxicating blend of gilded spices, velvet rose, and mineral amber. Inspired by late afternoons in Mediterranean citrus orchards when the sun kisses the red earth.",
    price: 185,
    sizes: [
      { ml: 50, price: 125 },
      { ml: 100, price: 185 },
      { ml: 200, price: 295 }
    ],
    scentFamily: 'Amber',
    concentration: 'Extrait de Parfum',
    volumePercent: 86,
    pyramid: {
      top: ['Calabrian Bergamot', 'Saffron', 'Bitter Orange'],
      heart: ['Damask Rose Absolute', 'Coriander Seed', 'Jasmine Sambac'],
      base: ['Warm Ambergris', 'Haitian Vetiver', 'Vanilla Madagascar', 'White Patchouli']
    },
    primaryColor: 'bg-gold-500',
    secondaryColor: 'from-amber-950 to-gold-950',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800'
    ],
    matchTags: ['oriental', 'rich', 'warm', 'evening', 'intense', 'classic', 'sensual'],
    rating: 4.9,
    reviewsCount: 142,
    reviews: [
      {
        id: 'r1',
        userName: "Eleanora G.",
        rating: 5,
        date: "May 14, 2026",
        comment: "This is pure alchemy. The rose is not overly sweet—it is dark, majestic, and enveloped in a warm amber cloud that lasts for over 12 hours. I feel incredibly confident when wearing it.",
        verified: true
      },
      {
        id: 'r2',
        userName: "Julian V.",
        rating: 5,
        date: "Apr 28, 2026",
        comment: "An absolute masterpiece. The saffron and ambergris interplay beautifully. Truly haute parfumerie.",
        verified: true
      },
      {
        id: 'r3',
        userName: "Sophia K.",
        rating: 4,
        date: "Apr 10, 2026",
        comment: "Stunning evening scent. Extremely heavy projection, so a little goes a very long way! Love the bottle design.",
        verified: true
      }
    ],
    story: "Created by master perfumer Aurelia Vance, L'Ombre d'Or is a celebration of twilight. It captures the fleeting threshold between light and dark, opening with solar, luminous citrus before collapsing into the luxurious, velvet embrace of saffron, night-blooming rose, and ancient ambergris. It does not speak; it whispers authority."
  },
  {
    id: 'santal-sacre',
    name: "Santal Sacré",
    tagline: "The Sacred Sandalwood",
    description: "A serene, linear expression of Mysore sandalwood, dry Papyrus reed, and smooth white leather. A modern olfactory sanctuary in a chaotic world.",
    price: 175,
    sizes: [
      { ml: 50, price: 115 },
      { ml: 100, price: 175 },
      { ml: 200, price: 280 }
    ],
    scentFamily: 'Woody',
    concentration: 'Eau de Parfum',
    volumePercent: 82,
    pyramid: {
      top: ['Cardamom', 'Violet Leaf', 'Australian Eucalyptus'],
      heart: ['Papyrus Extract', 'Virginia Cedarwood', 'Iris Concrete'],
      base: ['Mysore Sandalwood', 'White Leather Accord', 'Amberwood', 'Ambrette Seed']
    },
    primaryColor: 'bg-sand-400',
    secondaryColor: 'from-sand-900 to-amber-950',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800'
    ],
    matchTags: ['woody', 'dry', 'smoky', 'sophisticated', 'unisex', 'clean', 'day', 'office'],
    rating: 4.8,
    reviewsCount: 218,
    reviews: [
      {
        id: 's1',
        userName: "Marcello B.",
        rating: 5,
        date: "May 25, 2026",
        comment: "The cleanest, most comforting sandalwood fragrance I've ever owned. People stop me in the street to ask what I am wearing. Highly recommended for daily wear.",
        verified: true
      },
      {
        id: 's2',
        userName: "Claire M.",
        rating: 5,
        date: "May 19, 2026",
        comment: "Unisex perfection. It's sophisticated, dry, slightly smoky but completely polished. It brings a profound sense of peace.",
        verified: true
      }
    ],
    story: "Santal Sacré is inspired by the ancient, tranquil temples of Karnataka. Combining the creaminess of raw sandalwood with the papery dry warmth of papyrus and the structural depth of Virginia cedar, it evokes an atmosphere of clean linen, fine art, and quiet intellect."
  },
  {
    id: 'reve-de-jasmin',
    name: "Rêve de Jasmin",
    tagline: "The Jasmine Dream",
    description: "A lush, romantic bouquet of Grasse jasmine, luminous gardenia, and fresh pear blossom, grounded by dynamic white moss and musk.",
    price: 190,
    sizes: [
      { ml: 50, price: 130 },
      { ml: 100, price: 190 },
      { ml: 200, price: 310 }
    ],
    scentFamily: 'Floral',
    concentration: 'Eau de Parfum',
    volumePercent: 82,
    pyramid: {
      top: ['Dewy Pear Blossom', 'Calabrian Lemon', 'Green Apple'],
      heart: ['Grasse Jasmine Grandiflorum', 'Royal Gardenia', 'Neroli Essence'],
      base: ['White Oakmoss', 'Cashmeran Wood', 'Warm Skin Musk']
    },
    primaryColor: 'bg-rose-300',
    secondaryColor: 'from-rose-950 to-sand-900',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=800'
    ],
    matchTags: ['floral', 'sweet', 'romantic', 'fresh', 'day', 'delicate', 'feminine'],
    rating: 4.7,
    reviewsCount: 98,
    reviews: [
      {
        id: 'j1',
        userName: "Fiona H.",
        rating: 5,
        date: "Jun 01, 2026",
        comment: "Captures the scent of actual jasmine bushes in bloom at dawn. None of that synthetic chemical sweetness. It is incredibly fresh, dewy, and authentic.",
        verified: true
      }
    ],
    story: "Honoring the legacy of historic flower fields in Grasse, Rêve de Jasmin captures flowers picked by hand at dawn when their absolute concentration is richest. A luminous opening of d dew-kissed green pear evolves into a deeply romantic heart of Royal Gardenia and Jasmine, lingering beautifully on a base of soft skin musk."
  },
  {
    id: 'vetiver-celeste',
    name: "Vétiver Céleste",
    tagline: "The Celestial Vetiver",
    description: "A sparkling, mineral breeze carrying clean coastal ozone, sharp grapefruit juice, salty vetiver roots, and wild maritime sage.",
    price: 165,
    sizes: [
      { ml: 50, price: 110 },
      { ml: 100, price: 165 },
      { ml: 200, price: 260 }
    ],
    scentFamily: 'Fresh',
    concentration: 'Eau de Parfum',
    volumePercent: 80,
    pyramid: {
      top: ['Pink Grapefruit', 'Crisp Mint Leaf', 'Sea Salt Spray'],
      heart: ['Wild Clary Sage', 'Crushed Juniper Berries', 'Ginger Root'],
      base: ['Haitian Vetiver Roots', 'Grey Amberwood', 'Siberian Fir Needle']
    },
    primaryColor: 'bg-teal-600',
    secondaryColor: 'from-teal-950 to-slate-900',
    images: [
      'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800'
    ],
    matchTags: ['fresh', 'clean', 'citric', 'bright', 'sporty', 'vetiver', 'unisex', 'day', 'summer'],
    rating: 4.8,
    reviewsCount: 164,
    reviews: [
      {
        id: 'v1',
        userName: "Thomas P.",
        rating: 5,
        date: "May 29, 2026",
        comment: "The absolute perfect summer signature scent. It starts with a juicy explosion of grapefruit and salt, then dries down to a sharp, mineral-earthy vetiver. Immensely clean and invigorating.",
        verified: true
      }
    ],
    story: "Vétiver Céleste bridges the raw earth with the endless ocean. Inspired by the rugged cliffs of Brittany, this scent harnesses the green, earthy tension of vetiver and frames it with the breezy, ozonic clarity of breaking waves, pink grapefruit, and wet stone."
  },
  {
    id: 'oud-noir',
    name: "Oud Noir",
    tagline: "The Midnight Oud",
    description: "A hypnotic, intense symphony of dark agarwood (oud), spiced clove, dry vetiver, and smoky frankincense. For the nocturnal connoisseur.",
    price: 210,
    sizes: [
      { ml: 50, price: 145 },
      { ml: 100, price: 210 },
      { ml: 200, price: 340 }
    ],
    scentFamily: 'Oriental',
    concentration: 'Oud Intense',
    volumePercent: 88,
    pyramid: {
      top: ['Turkish Saffron', 'Sichuan Black Pepper', 'Clove Bud'],
      heart: ['Assam Agarwood (Oud)', 'Smoked Patchouli Leaves', 'Cistus Labdanum'],
      base: ['Omani Frankincense', 'Smoky Guaiac Wood', 'Castoreum Accord', 'Black Amber']
    },
    primaryColor: 'bg-indigo-950',
    secondaryColor: 'from-stone-950 to-neutral-900',
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528740564264-7a3c68b604d5?auto=format&fit=crop&q=80&w=800'
    ],
    matchTags: ['intense', 'dark', 'wood', 'spicy', 'night', 'oud', 'rich', 'evening'],
    rating: 4.95,
    reviewsCount: 88,
    reviews: [
      {
        id: 'o1',
        userName: "Kamal A.",
        rating: 5,
        date: "May 12, 2026",
        comment: "This is the true royal Oud. Extremely sophisticated, smoky, and warm. Not synthetic like others. Excellent projection and longevity. People respect you when you walk into a room wearing this.",
        verified: true
      }
    ],
    story: "Oud Noir represents the summit of Middle Eastern perfumery expertise. Centering the dark, resinous complexity of genuine sustainably-sourced Assam Oud, it is wrapped in spicy saffron and cold Omani frankincense, resolving in a dense, haunting base of black amber and dry guaiac woods."
  },
  {
    id: 'fleur-de-sel',
    name: "Fleur de Sel",
    tagline: "The Ocean Whisper",
    description: "An elegant, mineral-aquatic translation of breaking shores. Infused with sea kelp, wild coastal jasmine, maritime sage, and driftwood.",
    price: 160,
    sizes: [
      { ml: 50, price: 105 },
      { ml: 100, price: 160 },
      { ml: 200, price: 250 }
    ],
    scentFamily: 'Fresh',
    concentration: 'Eau de Parfum',
    volumePercent: 78,
    pyramid: {
      top: ['Amalfi Lemon', 'Crushed Coriander Leaf', 'Ozone Accord'],
      heart: ['Coastal Wild Jasmine', 'Sea Kelp', 'Pink Peppercorn'],
      base: ['Sun-bleached Driftwood', 'Ambrette Seed Musk', 'Warm Sand Accord']
    },
    primaryColor: 'bg-emerald-300',
    secondaryColor: 'from-slate-100 to-sky-100',
    images: [
      'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'
    ],
    matchTags: ['fresh', 'clean', 'mineral', 'calming', 'unisex', 'beach', 'day', 'office'],
    rating: 4.65,
    reviewsCount: 74,
    reviews: [
      {
        id: 'fs1',
        userName: "Sarah L.",
        rating: 5,
        date: "Jun 02, 2026",
        comment: "Pure seaside bliss. It isn't 'blue shower-gel' fresh—it is real salty air, dry driftwood, and tiny sand-flowers. Incredibly serene.",
        verified: true
      }
    ],
    story: "Fleur de Sel captures the quiet moments of solace by the shore. The scent of salt crystalizing on sun-warmed skin, the clean ozonic hum of sea spray, and the dry, white smell of age-old cedar wood cast upon the dunes. An intimate skin-scent that commands attention through subtlety."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'art-of-layering',
    title: "Olfactory Architecture: The Art of Scent Layering",
    subtitle: "How to craft a bespoke liquid signature",
    excerpt: "Understand how to safely combine top notes and deep woods to manifest an identity that is uniquely yours.",
    category: "Masterclass",
    readTime: "6 min read",
    date: "May 28, 2026",
    author: "Maison d'Aura Lab",
    image: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&q=80&w=800',
    content: [
      "Fragrance is a silent language, yet many of us only speak in a single, pre-blended dialect. Scent layering, or 'olfactory architecture', represents the final frontier of sensory self-expression, allowing you to combine complementary perfumes to build a fully bespoke aura.",
      "The key in layering is understanding weight. You should always apply the heavier, denser scent first (such as Santal Sacré or Oud Noir) to allow its heavy wood or leather molecules to grip the skin. Wait three to five minutes for the alcohol to dissipate and the base notes to settle.",
      "Once established, spray your lighter, dewy fragrance (such as Vétiver Céleste or Rêve de Jasmin) over your pulse points or lightly mist the air and step through. The floral or marine elements will sit like a diaphanous veil over the rich woods, offering a fascinating multi-dimensional projection that evolves unexpectedly throughout the day."
    ]
  },
  {
    id: 'sourcing-grasse',
    title: "Chasing Dawn: In the Jasmine Fields of Grasse",
    subtitle: "A journey to the cradle of haute perfumery",
    excerpt: "We document our annual harvest of Jasmine Grandiflorum, picked by hand at precisely 5:00 AM.",
    category: "Provenance",
    readTime: "8 min read",
    date: "May 15, 2026",
    author: "Marcella Vance, Founder",
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=800',
    content: [
      "Before the heat of the Provencal sun crests the French Maritime Alps, the fields of Grasse hum in silence. It is exactly 5:00 AM, and the night-dew is pristine. This is the only window of time to harvest Jasmine Grandiflorum.",
      "If picked even an hour too late, the solar heat will degrade the delicate indole and ester compounds that give Grasse jasmine its famed creamy, green, and slightly narcotic signature. Our team of second-generation harvesters move with lightning-fast delicacy, picking only open blooms.",
      "It requires approximately eight thousand flowers to produce a single gram of pure jasmine absolute. This hyper-precious elixir forms the radiant core of Rêve de Jasmin, grounding the fragrance with an authentic French lineage that synthetic laboratories simply cannot recreate."
    ]
  }
];
