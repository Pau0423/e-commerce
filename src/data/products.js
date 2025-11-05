// src/data/products.js
export const PRODUCTS = [
  {
    id: "1",
    title: "iPhone 16 Pro Max 256 GB",
    price: 1800,
    stock: 5,
    category: "celulares",
    description: "Último modelo, 256 GB.",
  },
  {
    id: "2",
    title: "MacBook Air M2",
    price: 1600,
    stock: 3,
    category: "notebooks",
    description: "Liviana y potente.",
  },
  {
    id: "3",
    title: "iPad Pro 12.9",
    price: 1400,
    stock: 4,
    category: "tablets",
    description: "Pantalla Retina, M2.",
  },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getProducts() {
  await delay(600);
  return PRODUCTS;
}
export async function getProductById(id) {
  await delay(600);
  return PRODUCTS.find((p) => p.id === id) ?? null;
}
export async function getProductsByCategory(categoryId) {
  await delay(600);
  return PRODUCTS.filter((p) => p.category === categoryId);
}

export const CATEGORIES = Array.from(new Set(PRODUCTS.map((p) => p.category)));
