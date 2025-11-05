import iphone16 from "../assets/iphone16.png";
import macbookairm2 from "../assets/macbookairm2.png";
import ipadpro from "../assets/ipadpro.png";
import tvsony from "../assets/tvsony.png";
import ps5 from "../assets/ps5.png";

export const PRODUCTS = [
  {
    id: "1",
    title: "iPhone 16 Pro Max 256 GB",
    price: 1800,
    stock: 5,
    category: "celulares",
    description:
      "El iPhone 16 Pro Max destaca por su resistente cuerpo de titanio, pantalla Super Retina XDR de 6.3”, cámara Fusion de 48 MP con grabación 4K Dolby Vision a 120 cps y nuevo control de cámara. Ofrece una experiencia fotográfica profesional con estilos personalizables y una batería que dura hasta 33 horas de video.",

    image: iphone16,
  },
  {
    id: "2",
    title: "MacBook Air M2",
    price: 1600,
    stock: 3,
    category: "notebooks",
    description:
      "Portátil ultraligera con chip M2, gran rendimiento y batería de larga duración.",
    image: macbookairm2,
  },
  {
    id: "3",
    title: "iPad Pro 12.9",
    price: 1400,
    stock: 4,
    category: "tablets",
    description:
      "Pantalla Liquid Retina XDR y chip M2 para potencia profesional y gráficos excepcionales.",
    image: ipadpro,
  },
  {
    id: "4",
    title: "Televisor Sony 55'' 4K",
    price: 1200,
    stock: 3,
    category: "audiovisual",
    description:
      "Pantalla Ultra HD con colores vibrantes y sonido envolvente para una experiencia cinematográfica.",
    image: tvsony,
  },
  {
    id: "5",
    title: "PlayStation 5",
    price: 900,
    stock: 1,
    category: "gaming",
    description:
      "Consola de última generación con gráficos 4K, velocidad ultra rápida y mando DualSense inmersivo.",
    image: ps5,
  },
];
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getProducts() {
  await delay(600);
  return PRODUCTS;
}

export async function getProductById(id) {
  await delay(600);
  return PRODUCTS.find((p) => String(p.id) === String(id)) ?? null;
}

export async function getProductsByCategory(categoryId) {
  await delay(600);
  return PRODUCTS.filter((p) => p.category === categoryId);
}

export const CATEGORIES = Array.from(new Set(PRODUCTS.map((p) => p.category)));
