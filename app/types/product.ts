export const products = [
  {
    id: 1,
    name: "Stylish Pot",
    slug: "stylish-pot",
    price: 10,
    description:
      "A beautifully designed pot perfect for home decor or indoor plants.",
    img: "/images/img1.jpg",
    category: "Showpiece",
    createdAt: "2024-01-12",
  },
  {
    id: 2,
    name: "Art Table",
    slug: "art-table",
    price: 20,
    description:
      "A small, elegant table with artistic designs, ideal for display or functional use.",
    img: "/images/img2.jpg",
    category: "Showpiece",
  },
  {
    id: 3,
    name: "Dual Vase",
    slug: "dual-Vase",
    price: 30,
    description:
      "A fantastically designed dual vase, ideal for giving gifts to loved Ones.",
    img: "/images/img4.jpg",
    category: "Showpiece",
  },
];

export type Product = {
  id: number;
  name: string;
  slug?: string;
  price: number;
  img: string;
  category?: string;
  createdAt?: string;
  description?: string;
};
