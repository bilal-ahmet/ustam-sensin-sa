import { readNamespace, writeNamespace } from './storageService.js';

function ensureFavorites(db) {
  if (!db.favorites) db.favorites = [];
}

export function getFavorites() {
  const db = readNamespace();
  ensureFavorites(db);
  return db.favorites;
}

export function isFavorite(mechanicId) {
  return getFavorites().includes(mechanicId);
}

export function setFavorite(mechanicId, value) {
  const db = readNamespace();
  ensureFavorites(db);
  const set = new Set(db.favorites);
  if (value) set.add(mechanicId); else set.delete(mechanicId);
  db.favorites = Array.from(set);
  writeNamespace(db);
}

export function toggleFavorite(mechanicId) {
  const current = isFavorite(mechanicId);
  setFavorite(mechanicId, !current);
  return !current;
}


