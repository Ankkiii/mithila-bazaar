export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  weight: string;
  weightOptions?: string[];
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  badge?: "Best Seller" | "New" | "Limited";
  flavour?: string;
  shortDescription: string;
  description: string;
  ingredients: string;
  nutritionalInfo: string;
  inStock: boolean;
}

export const categories = [
  { name: "Makhana", slug: "makhana", icon: "🌰", description: "Premium fox nuts from Mithila" },
  { name: "Pickles & Achaar", slug: "pickles", icon: "🫙", description: "Traditional handmade pickles" },
  { name: "Sweets & Mithai", slug: "sweets", icon: "🍬", description: "Authentic Mithila sweets" },
  { name: "Handloom & Crafts", slug: "crafts", icon: "🧶", description: "Madhubani art & handloom" },
  { name: "Spices & Masala", slug: "spices", icon: "🌶️", description: "Pure ground spices" },
  { name: "Papad & Fryums", slug: "papad", icon: "🫓", description: "Sun-dried traditional papad" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Roasted Makhana - Classic Salted",
    slug: "roasted-makhana-classic-salted",
    category: "makhana",
    price: 149,
    weight: "100g",
    weightOptions: ["50g", "100g", "250g", "500g"],
    image: "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&h=600&fit=crop",
    ],
    rating: 4.8,
    reviews: 234,
    badge: "Best Seller",
    flavour: "Classic Salted",
    shortDescription: "Crunchy roasted makhana with a perfect pinch of Himalayan salt. Light, healthy, and irresistibly addictive.",
    description: "Our Classic Salted Makhana is carefully hand-roasted in small batches to achieve the perfect crunch. Sourced directly from the ponds of Darbhanga, these premium fox nuts are seasoned with Himalayan pink salt for a clean, addictive flavour. Zero oil, zero preservatives — just pure, shuddh makhana goodness.",
    ingredients: "Fox Nuts (Makhana), Himalayan Pink Salt, Cold-pressed Mustard Oil (trace)",
    nutritionalInfo: "Per 30g serving: Calories 110, Protein 3g, Carbs 18g, Fat 0.5g, Fiber 1.5g",
    inStock: true,
  },
  {
    id: "2",
    name: "Roasted Makhana - Peri Peri",
    slug: "roasted-makhana-peri-peri",
    category: "makhana",
    price: 159,
    weight: "100g",
    weightOptions: ["50g", "100g", "250g"],
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&h=600&fit=crop",
    rating: 4.6,
    reviews: 189,
    badge: "New",
    flavour: "Peri Peri",
    shortDescription: "Fiery peri peri spiced makhana for those who love a kick. Bold flavor meets healthy snacking.",
    description: "Turn up the heat with our Peri Peri Makhana! These crunchy fox nuts are coated in our signature peri peri seasoning — a vibrant blend of red chilli, garlic, and tangy herbs. Perfect for movie nights or mid-day cravings.",
    ingredients: "Fox Nuts (Makhana), Peri Peri Seasoning (Red Chilli, Garlic, Onion, Herbs, Citric Acid), Salt, Cold-pressed Oil (trace)",
    nutritionalInfo: "Per 30g serving: Calories 115, Protein 3g, Carbs 18g, Fat 0.8g, Fiber 1.5g",
    inStock: true,
  },
  {
    id: "3",
    name: "Roasted Makhana - Pudina Lime",
    slug: "roasted-makhana-pudina-lime",
    category: "makhana",
    price: 159,
    weight: "100g",
    weightOptions: ["50g", "100g", "250g"],
    image: "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?w=600&h=600&fit=crop",
    rating: 4.5,
    reviews: 145,
    flavour: "Pudina Lime",
    shortDescription: "Refreshing mint and zesty lime on crunchy makhana. A desi twist on healthy snacking.",
    description: "Fresh pudina meets tangy lime in this refreshing makhana variant. Inspired by the classic Indian chaat flavours, each bite delivers a cool, zesty punch that keeps you reaching for more.",
    ingredients: "Fox Nuts (Makhana), Pudina Seasoning (Dried Mint, Lime Powder, Green Chilli), Salt, Cold-pressed Oil (trace)",
    nutritionalInfo: "Per 30g serving: Calories 112, Protein 3g, Carbs 18g, Fat 0.6g, Fiber 1.5g",
    inStock: true,
  },
  {
    id: "4",
    name: "Raw Premium Makhana",
    slug: "raw-premium-makhana",
    category: "makhana",
    price: 349,
    originalPrice: 449,
    weight: "500g",
    weightOptions: ["250g", "500g", "1kg"],
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&h=600&fit=crop",
    rating: 4.9,
    reviews: 412,
    badge: "Best Seller",
    shortDescription: "Premium grade 4-suta raw makhana, handpicked from Darbhanga. Perfect for cooking, roasting, or kheer.",
    description: "Our finest 4-suta grade raw makhana — the largest and most premium variety. Sourced directly from farmers in Darbhanga district, these pristine white fox nuts are perfect for making makhana kheer, sabzi, or roasting at home with your favourite spices. Each lot is quality-checked for size, colour, and freshness.",
    ingredients: "100% Natural Fox Nuts (Euryale Ferox)",
    nutritionalInfo: "Per 100g: Calories 350, Protein 9.7g, Carbs 77g, Fat 0.1g, Fiber 7.6g, Iron 1.4mg",
    inStock: true,
  },
  {
    id: "5",
    name: "Mithila Achar - Mango Pickle",
    slug: "mithila-achar-mango",
    category: "pickles",
    price: 129,
    weight: "200g",
    weightOptions: ["200g", "400g"],
    image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=600&h=600&fit=crop",
    rating: 4.7,
    reviews: 198,
    badge: "Best Seller",
    shortDescription: "Tangy raw mango pickle made in traditional Mithila style with mustard oil and secret family spices.",
    description: "This aam ka achar is made the old-fashioned way — raw mangoes sun-dried and mixed with freshly ground spices in pure kachi ghani mustard oil. Every jar carries the authentic taste of a Mithila kitchen. No vinegar, no artificial preservatives.",
    ingredients: "Raw Mango, Mustard Oil, Fenugreek Seeds, Mustard Seeds, Turmeric, Red Chilli, Salt, Asafoetida",
    nutritionalInfo: "Per 15g serving: Calories 25, Fat 2g, Carbs 1.5g, Sodium 380mg",
    inStock: true,
  },
  {
    id: "6",
    name: "Tilkut - Sesame Sweet",
    slug: "tilkut-sesame-sweet",
    category: "sweets",
    price: 199,
    weight: "250g",
    weightOptions: ["250g", "500g"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop",
    rating: 4.8,
    reviews: 167,
    shortDescription: "Traditional Gaya-style tilkut made with roasted sesame and jaggery. A winter favourite from Bihar.",
    description: "Tilkut is a beloved sweet from Bihar, traditionally made during Makar Sankranti. Our tilkut uses premium white sesame seeds roasted to perfection and bound with pure desi jaggery. Each piece crumbles with a nutty, caramel sweetness.",
    ingredients: "White Sesame Seeds, Jaggery (Gur), Cardamom",
    nutritionalInfo: "Per 30g serving: Calories 145, Protein 4g, Fat 9g, Carbs 12g, Calcium 280mg",
    inStock: true,
  },
  {
    id: "7",
    name: "Madhubani Handmade Pickle Set",
    slug: "madhubani-pickle-set",
    category: "pickles",
    price: 399,
    originalPrice: 499,
    weight: "3 x 150g",
    image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=600&h=600&fit=crop",
    rating: 4.6,
    reviews: 89,
    badge: "New",
    shortDescription: "A curated set of 3 handmade pickles — Mango, Lemon, and Mixed Vegetable — in a Madhubani-painted gift box.",
    description: "The perfect gift from Mithila! This beautifully packaged set includes three of our most popular handmade pickles — Aam ka Achar, Nimbu ka Achar, and Mixed Sabzi Achar. Each jar is made by local women artisans using recipes passed down through generations. The gift box features authentic Madhubani paintings.",
    ingredients: "Varies by pickle. All-natural ingredients with mustard oil base.",
    nutritionalInfo: "See individual jar labels for details.",
    inStock: true,
  },
  {
    id: "8",
    name: "Sattu Powder",
    slug: "sattu-powder",
    category: "spices",
    price: 179,
    weight: "500g",
    weightOptions: ["250g", "500g", "1kg"],
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=600&fit=crop",
    rating: 4.7,
    reviews: 256,
    shortDescription: "Pure roasted chana sattu — Bihar's superfood. Perfect for sattu sharbat, litti, or paratha filling.",
    description: "Sattu is Bihar's original protein shake! Made from slow-roasted desi chana (Bengal gram), our sattu powder is stone-ground for a smooth, authentic texture. Mix with water, salt, and lemon for an instant energy drink, or use it to stuff your littis and parathas.",
    ingredients: "100% Roasted Bengal Gram (Chana)",
    nutritionalInfo: "Per 30g serving: Calories 115, Protein 6g, Carbs 18g, Fat 2g, Fiber 4g, Iron 2mg",
    inStock: true,
  },
];

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getProductsByCategory = (cat: string) => products.filter(p => p.category === cat);
export const getBestsellers = () => products.filter(p => p.badge === "Best Seller" || p.rating >= 4.7);
