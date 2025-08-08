import { readNamespace, writeNamespace } from './storageService.js';

const SEED_VERSION = 2;

export function initializeMockData() {
  const db = readNamespace();
  if (db.__seedVersion === SEED_VERSION && db.__seeded) return;

  const lookups = createMockLookups();
  const mechanics = createMockMechanics(lookups);

  // Preserve existing workorders if any
  const workorders = Array.isArray(db.workorders) ? db.workorders : [];
  writeNamespace({ __seeded: true, __seedVersion: SEED_VERSION, mechanics, lookups, workorders });
}

function createMockMechanics(lookups) {
  const specialties = ['motor','fren','elektrik','şanzıman','elektronik','klima','yürüyen aksam','kaporta','egzoz'];
  const interestsPool = ['OBD teşhis','Performans tuning','Elektrik tesisatı','Fren sistemleri','Şanzıman revizyon','Yağ bakım','Klima gaz dolumu','Balans & Rot ayarı','Enjektör temizliği','Turbo bakımı'];
  const names = ['Usta Ahmet','Usta Mehmet','Usta Ali','Usta Hasan','Usta Cem','Usta Murat','Usta Hakan','Usta Burak','Usta Emre','Usta Mustafa','Usta İbrahim','Usta Ömer','Usta Yusuf','Usta Kemal','Usta Serkan'];
  const portfolios = ['Triger değişimi','Fren balata değişimi','Elektrik arıza teşhisi','Yağ ve filtre bakımı','Debriyaj seti değişimi','Klima kompresör tamiri','Şanzıman yağı değişimi','Disk taşlama','Amortisör değişimi','Bujiler ve bobin değişimi','Turbo hortum onarımı','EGR temizliği'];
  return names.map((name, idx) => ({
    id: 'm' + (idx + 1),
    name,
    location: { city: 'Kocaeli', district: 'İzmit' },
    specialties: shuffle(specialties).slice(0, 2 + (idx % 2)),
    brandExpertise: shuffle(lookups.brands).slice(0, 1 + (idx % 3)), // 1–3 marka
    interests: shuffle(interestsPool).slice(0, 3 + (idx % 2)),
    rating: +(3.5 + Math.random() * 1.5).toFixed(1),
    reviewsCount: Math.floor(50 + Math.random() * 300),
    portfolio: shuffle(portfolios).slice(0, 3 + (idx % 3)),
    etaMinutes: 30 + Math.floor(Math.random() * 180),
    isFeatured: idx < 6,
  }));
}

function createMockLookups() {
  return {
    categories: ['motor','fren','elektrik','şanzıman','elektronik','klima','yürüyen aksam','kaporta','egzoz'],
    brands: ['Renault','Fiat','Ford','Volkswagen','Toyota','Hyundai','Peugeot','Opel','BMW','Mercedes','Audi','Dacia','Citroën','Seat','Skoda'],
    models: {
      Renault: ['Clio','Megane','Symbol','Captur'],
      Fiat: ['Egea','Linea','Punto','Doblo'],
      Ford: ['Focus','Fiesta','Mondeo','Kuga'],
      Volkswagen: ['Golf','Polo','Passat','Tiguan'],
      Toyota: ['Corolla','Yaris','Auris','C-HR'],
      Hyundai: ['i20','i30','Accent','Elantra'],
      Peugeot: ['208','308','301','2008'],
      Opel: ['Corsa','Astra','Insignia','Mokka'],
      BMW: ['1 Series','3 Series','5 Series','X1'],
      Mercedes: ['A-Class','C-Class','E-Class','GLA'],
      Audi: ['A3','A4','A6','Q3'],
      Dacia: ['Sandero','Duster','Logan','Jogger'],
      Citroën: ['C3','C4','C-Elysée','C5 Aircross'],
      Seat: ['Ibiza','Leon','Toledo','Arona'],
      Skoda: ['Fabia','Octavia','Superb','Karoq']
    }
  };
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}


