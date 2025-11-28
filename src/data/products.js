import iphone16 from "../assets/iphone16.png";
import macbookairm2 from "../assets/macbookairm2.png";
import ipadpro from "../assets/ipadpro.png";
import tvsony from "../assets/tvsony.png";
import ps5 from "../assets/ps5.png";

import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const IMAGE_MAP = {
  1: iphone16,
  2: macbookairm2,
  3: ipadpro,
  4: tvsony,
  5: ps5,
};

function mapDocToProduct(d) {
  const data = d.data();
  const id = d.id;

  return {
    id,
    ...data,
    category: data.category?.trim().toLowerCase() ?? "",
    image: IMAGE_MAP[id] ?? null,
  };
}

export async function getProducts() {
  const ref = collection(db, "products");
  const snap = await getDocs(ref);
  return snap.docs.map(mapDocToProduct);
}

export async function getProductById(id) {
  const ref = doc(db, "products", String(id));
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return mapDocToProduct(snap);
}

export async function getProductsByCategory(categoryId) {
  const all = await getProducts();
  const cat = categoryId.trim().toLowerCase();

  return all.filter((p) => p.category === cat);
}

export const CATEGORIES = [
  "celulares",
  "notebooks",
  "tablets",
  "audiovisual",
  "gaming",
];
