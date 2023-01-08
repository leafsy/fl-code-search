import { ref, push, onValue } from "firebase/database";
import { database } from "./database";

const brandsRef = ref(database, "brands");

export function writeBrand(name, codes, logoUrl) {
  push(brandsRef, { name, codes, logoUrl });
}

export function getAllBrands(callback) {
  return onValue(brandsRef, (snapshot) => {
    const brands = Object.entries(snapshot.val())
      .map(([k, v]) => ({
        id: k,
        ...v,
      }))
      .sort((b1, b2) => b1.name.localeCompare(b2.name));
    callback(brands);
  });
}
