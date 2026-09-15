export type MenuItem = {
  name: string;
  price: string;
  pick?: boolean;
  note?: string;
  kj?: string;
};

export const sushiBoat = {
  title: "The Sushi Boat",
  eyebrow: "Signature",
  blurb:
    "Six rolls, composed for the table — a shared voyage for four to six guests. The house signature that defines an evening at Yōkoso.",
  price: "৳2,345",
  perHead: "From ৳391 a guest",
  rolls: [
    {
      no: "01",
      name: "Red Dragon Roll",
      kj: "紅龍",
      blurb: "The roll the boat is built around — vivid, composed, unforgettable.",
      price: "—",
    },
    {
      no: "02",
      name: "Crab Ebi Uramaki",
      kj: "蟹海老",
      blurb: "Torched crab and prawn, rolled inside out.",
      price: "৳445 / 870",
    },
    {
      no: "03",
      name: "Hot Night Roll",
      kj: "熱夜",
      blurb: "Prawn and roasted seaweed, crispy chips, elegantly torched.",
      price: "৳440 / 860",
    },
    {
      no: "04",
      name: "Spicy Lava Roll",
      kj: "溶岩",
      blurb: "Chicken, mayo and Sichuan sauce, crowned with nori crisps.",
      price: "৳520 / 1,020",
    },
    {
      no: "05",
      name: "Alaska Roll",
      kj: "阿拉斯加",
      blurb: "Deep-fried, sriracha, crispy chips, torch-seared finish.",
      price: "৳470 / 920",
    },
    {
      no: "06",
      name: "Ebi Tempura Roll",
      kj: "海老天",
      blurb: "Tempura shrimp coated in tempura powder. Crisp on crisp.",
      price: "৳440 / 860",
    },
  ],
} as const;

export const menuHighlights = [
  {
    id: "sushi",
    title: "Sushi",
    jp: "寿司",
    count: "Eighteen · ৳280 — 1,370",
    more: "All eighteen",
    items: [
      { name: "Golden Sakura", price: "650 / 1,280", pick: true },
      { name: "Yōkoso Spider Roll", price: "695 / 1,370" },
      { name: "Smoked Salmon Roll", price: "685 / 1,350" },
      { name: "The Forbidden Crab", price: "595 / 1,170" },
      { name: "Volcano Roll", price: "550 / 1,080" },
      { name: "Sushi Moriawase", price: "1,350", pick: true },
    ] as MenuItem[],
  },
  {
    id: "dimsum",
    title: "Dim Sum",
    jp: "点心",
    count: "Fifteen · ৳350 — 510",
    more: "All fifteen",
    items: [
      { name: "Prawn Hargao", price: "485" },
      { name: "Naga Siu Mai", price: "430", pick: true },
      { name: "Soy-Sesame Beef Dumpling", price: "480" },
      { name: "Sichuan Wonton in Red Oil", price: "440", pick: true },
      { name: "Chicken Prawn Siu Mai", price: "475" },
      { name: "Assorted Dim Sum", price: "490 — 510" },
    ] as MenuItem[],
  },
  {
    id: "wok",
    title: "From the Wok",
    jp: "炒め物",
    count: "Twenty-nine · ৳295 — 1,950",
    more: "All twenty-nine",
    items: [
      { name: "Steamed Sea Bass", price: "1,950", pick: true },
      { name: "Singaporean Chili Crab", price: "750" },
      { name: "Sliced Beef with XO", price: "775" },
      { name: "Chicken Cashew Nut, XO", price: "560", pick: true },
      { name: "Naga Prawn", price: "495" },
      { name: "Stir-fried Morning Glory", price: "295" },
    ] as MenuItem[],
  },
] as const;

export const chefsPicks = [
  {
    name: "Golden Sakura",
    detail: "Torched salmon, gold tempura flakes",
    price: "৳650",
  },
  {
    name: "Sushi Moriawase",
    detail: "Six rolls, chef's selection",
    price: "৳1,350",
  },
  {
    name: "Khao Soi Gai",
    detail: "Thai curry noodle, coconut broth",
    price: "৳680",
  },
  {
    name: "Crab & Cream Cheese Rangoon",
    detail: "Golden-fried wonton shells",
    price: "৳890",
  },
  {
    name: "Naga Prawn",
    detail: "Deep-fried, naga sauce, numbing",
    price: "৳495",
  },
  {
    name: "Steamed Sea Bass",
    detail: "Whole fish, house lemon sauce",
    price: "৳1,950",
  },
] as const;

export const privateDining = {
  seats: "8 — 20",
  anchor: "Sushi Voyage",
  and: "Whole Sea Bass",
  notice: "24 hours",
} as const;
