export interface Sauce {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  scoville: number;
  flavorProfile: string[];
  price: number;
  heatCategory: 'Mild Breeze' | 'Warm Embers' | 'Glowing Coals' | 'Searing Heat' | 'Jozi Fire' | 'Spices';
}

export const SAUCES: Sauce[] = [
  {
    id: '1',
    name: "Durban Style Hot & Spicy",
    description: "Authentic South African fire. A traditional blend of sun-ripened chillies.",
    longDescription: "Our Durban Style sauce is a tribute to the legendary heat of KwaZulu-Natal. We use a proprietary blend of local chillies fermented for 12 weeks to develop a deep, complex heat that hits immediately and lingers beautifully. Perfect for curries, stews, and braaied meats.",
    scoville: 15000,
    flavorProfile: ["Spicy", "Traditional", "Bold"],
    price: 135,
    heatCategory: 'Warm Embers'
  },
  {
    id: '2',
    name: "Cape Malay Aromatic",
    description: "Mild & Aromatic. A complex blend of cloves, star anise, and cardamom.",
    longDescription: "Inspired by the vibrant flavors of the Bo-Kaap, this sauce focuses on fragrance over raw heat. It features a rich bouquet of traditional Cape Malay spices balanced with a gentle warmth. Ideal for bobotie, seafood, or as a sophisticated dipping sauce.",
    scoville: 1500,
    flavorProfile: ["Aromatic", "Spiced", "Sweet Heat"],
    price: 145,
    heatCategory: 'Mild Breeze'
  },
  {
    id: '3',
    name: "Jozi Fire",
    description: "The signature Mzansi Fire experience. A robust culinary pepper sauce.",
    longDescription: "Jozi Fire is the heartbeat of our collection. Named after the bustling energy of Johannesburg, this sauce packs a significant punch using high-altitude grown habaneros. It is thick, savory, and incredibly versatile for those who crave serious heat without sacrificing flavor.",
    scoville: 250000,
    flavorProfile: ["Traditional", "Intense", "Spicy"],
    price: 210,
    heatCategory: 'Jozi Fire'
  },
  {
    id: '4',
    name: "Pure Extract Sting",
    description: "Concentrated extraction of high-heat peppers. For the extreme spice enthusiast.",
    longDescription: "This is a professional-grade extraction designed for those who have reached the limits of standard sauces. It is bright and sharp, intended to be used one drop at a time. It provides a clean, volcanic heat that doesn't mask the underlying flavor of your dish.",
    scoville: 850000,
    flavorProfile: ["Bright", "Sharp", "Intense"],
    price: 175,
    heatCategory: 'Searing Heat'
  },
  {
    id: '6',
    name: "Savory Pepper Relish",
    description: "A chunky, savory condiment packed with sautéed peppers and aromatics.",
    longDescription: "More than just a sauce, this is a textured relish. We sauté fresh bell peppers, onions, and garlic with a medium-heat chili blend to create a chunky, umami-rich condiment. It is the ultimate topping for burgers, hot dogs, and breakfast eggs.",
    scoville: 12000,
    flavorProfile: ["Savory", "Onion", "Textured"],
    price: 150,
    heatCategory: 'Warm Embers'
  },
  {
    id: 's1',
    name: "Braai Master Rub",
    description: "The ultimate BBQ seasoning. Smoky blend of coriander and cumin.",
    longDescription: "No South African braai is complete without our signature dry rub. We combine high-quality sea salt with toasted coriander, cumin, and a hint of smoked paprika. It creates a beautiful crust on steaks and lamb chops while infusing them with authentic open-fire flavor.",
    scoville: 500,
    flavorProfile: ["Smoky", "Earthy", "Savory"],
    price: 95,
    heatCategory: 'Spices'
  },
  {
    id: 's2',
    name: "Chakalaka Dry Mix",
    description: "Authentic dry spice blend for traditional spicy vegetable relish.",
    longDescription: "Create perfect Chakalaka every time. This dry mix contains the optimal ratio of curry powder, turmeric, and dried chilies. Just add fresh carrots, onions, and beans to recreate the iconic South African side dish with consistent, professional results.",
    scoville: 8000,
    flavorProfile: ["Curry", "Aromatic", "Spicy"],
    price: 85,
    heatCategory: 'Spices'
  },
  {
    id: 's3',
    name: "Peri-Peri Salt",
    description: "Fine sea salt infused with bird's eye chili and zesty citrus.",
    longDescription: "Our most popular seasoning. We infuse fine-grain salt with sun-dried Peri-Peri peppers and dehydrated lemon zest. It provides an instant pop of flavor and a controlled sting. Perfect for seasoning chips, popcorn, or finishing grilled chicken.",
    scoville: 12000,
    flavorProfile: ["Zesty", "Salty", "Spicy"],
    price: 75,
    heatCategory: 'Spices'
  }
];

export const getHeatCategory = (shu: number): Sauce['heatCategory'] => {
  if (shu < 2000) return 'Mild Breeze';
  if (shu < 20000) return 'Warm Embers';
  if (shu < 60000) return 'Glowing Coals';
  if (shu < 150000) return 'Searing Heat';
  return 'Jozi Fire';
};