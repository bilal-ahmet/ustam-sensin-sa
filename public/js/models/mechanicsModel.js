import { readNamespace } from '../services/storageService.js';

export function getAllMechanics() {
  const db = readNamespace();
  return db.mechanics || [];
}

export function getFeaturedMechanics() {
  return getAllMechanics().filter(m => m.isFeatured).slice(0, 6);
}

export function getMechanicById(id) {
  return getAllMechanics().find(m => m.id === id) || null;
}

export function searchMechanics({ category = '', minRating = 0, brand = '', model = '' } = {}) {
  return getAllMechanics().filter(m => {
    const matchesCategory = category ? m.specialties.includes(category) : true;
    const matchesRating = m.rating >= minRating;
    const matchesBrand = brand ? (m.brandExpertise || []).includes(brand) : true;
    // model bazlı filtreyi gerçekçi yapmak için markaya göre eşleşme yeterli; demo
    const matchesVehicle = matchesBrand;
    return matchesCategory && matchesRating && matchesVehicle;
  }).sort((a,b) => b.rating - a.rating);
}


