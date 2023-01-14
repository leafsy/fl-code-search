import { ref, push, onValue, set, remove, update } from "firebase/database";
import { database } from "./database";

export function addBrand(name, codes, logoUrl) {
  push(ref(database, "brands"), { name, codes, logoUrl });
}

export function updateBrand(id, name, codes, logoUrl) {
  update(ref(database, `brands/${id}`), { name, codes, logoUrl });
}

export function removeBrand(id) {
  remove(ref(database, `brands/${id}`));
}

export function getAllBrands(callback) {
  return onValue(ref(database, "brands"), (snapshot) => {
    const brands = Object.entries(snapshot.val())
      .map(([k, v]) => ({
        id: k,
        ...v,
      }))
      .sort((b1, b2) => b1.name.localeCompare(b2.name));
    callback(brands);
  });
}

export function addEntry(brandId, section, keywords, description, photoUrl) {
  push(ref(database, `brands/${brandId}/entries`), {
    section,
    keywords,
    description,
    photoUrl,
  });
}

export function updateEntry(
  id,
  brandId,
  section,
  keywords,
  description,
  photoUrl
) {
  set(ref(database, `brands/${brandId}/entries/${id}`), {
    section,
    keywords,
    description,
    photoUrl,
  });
}

export function removeEntry(id, brandId) {
  remove(ref(database, `brands/${brandId}/entries/${id}`));
}
