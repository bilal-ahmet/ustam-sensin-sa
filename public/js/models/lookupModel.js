import { readNamespace } from '../services/storageService.js';

export function getLookups() {
  const db = readNamespace();
  return db.lookups || { brands: [], models: {}, categories: [] };
}


