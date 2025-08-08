import { searchMechanics, getMechanicById } from '../models/mechanicsModel.js';
import { isFavorite, toggleFavorite, getFavorites } from '../services/favoritesService.js';
import { renderTemplate } from '../services/templateService.js';

export function renderMechanicsList() {
  const root = document.getElementById('app');
  const params = new URLSearchParams((window.location.hash.split('?')[1] || ''));
  const category = params.get('category') || '';
  const minRating = Number(params.get('minRating') || 0);
  const brand = params.get('brand') || '';
  const model = params.get('model') || '';

  const mechanics = searchMechanics({ category, minRating, brand, model });

  root.innerHTML = `
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5>Usta Listesi</h5>
      <div>
        <select id="sortSelect" class="form-select form-select-sm" style="width:200px">
          <option value="rating">Puan (yüksek)</option>
          <option value="eta">ETA (düşük)</option>
        </select>
      </div>
    </div>
    <div class="form-check form-switch mb-3">
      <input class="form-check-input" type="checkbox" role="switch" id="onlyFavsSwitch">
      <label class="form-check-label" for="onlyFavsSwitch">Sadece favoriler</label>
    </div>
    <div class="row" id="mechanicsRow"></div>
  </div>`;

  const mechanicsRow = document.getElementById('mechanicsRow');

  async function renderList(list) {
    const cards = await Promise.all(list.map(m => renderTemplate('mechanicCard', { mechanic: m, isFav: isFavorite(m.id) })));
    mechanicsRow.innerHTML = cards.join('');
  }

  renderList(mechanics);

  // Basit filtre paneli ekle (kategori/min puan)
  const filtersBar = document.createElement('div');
  filtersBar.className = 'mb-3 d-flex gap-2 align-items-center';
  filtersBar.innerHTML = `
    <select id="filterCategory" class="form-select form-select-sm" style="width:180px">
      <option value="">Kategori (hepsi)</option>
      <option value="motor">motor</option>
      <option value="fren">fren</option>
      <option value="elektrik">elektrik</option>
      <option value="şanzıman">şanzıman</option>
      <option value="elektronik">elektronik</option>
      <option value="klima">klima</option>
      <option value="yürüyen aksam">yürüyen aksam</option>
      <option value="kaporta">kaporta</option>
      <option value="egzoz">egzoz</option>
    </select>
    <input id="filterBrand" class="form-control form-control-sm" style="width:200px" placeholder="Marka ara (örn. Renault)" />
    <select id="filterRating" class="form-select form-select-sm" style="width:180px">
      <option value="0">Min. puan (0)</option>
      <option value="3">3+</option>
      <option value="4">4+</option>
      <option value="4.5">4.5+</option>
    </select>`;
  const container = root.querySelector('.container');
  container.insertBefore(filtersBar, container.children[1]);

  const catEl = document.getElementById('filterCategory');
  const rateEl = document.getElementById('filterRating');
  const brandEl = document.getElementById('filterBrand');
  if (category) catEl.value = category;
  if (minRating) rateEl.value = String(minRating);

  function applyFilters() {
    const c = catEl.value || '';
    const r = Number(rateEl.value || 0);
    const b = (brandEl.value || '').toLowerCase().trim();
    const filtered = mechanics.filter(m => (c ? m.specialties.includes(c) : true)
      && m.rating >= r
      && (b ? (m.brandExpertise || []).some(x => x.toLowerCase().includes(b)) : true));
    renderList(filtered);
  }
  catEl.addEventListener('change', applyFilters);
  rateEl.addEventListener('change', applyFilters);
  brandEl.addEventListener('input', applyFilters);

  document.getElementById('sortSelect').addEventListener('change', async (e) => {
    const value = e.target.value;
    const sorted = [...mechanics].sort((a,b) => value === 'rating' ? b.rating - a.rating : a.etaMinutes - b.etaMinutes);
    await renderList(sorted);
  });

  document.getElementById('onlyFavsSwitch').addEventListener('change', (e) => {
    const favSet = new Set(getFavorites());
    const filtered = e.target.checked ? mechanics.filter(m => favSet.has(m.id)) : mechanics;
    renderList(filtered);
  });

  document.getElementById('mechanicsRow').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-fav-id]');
    if (!btn) return;
    const id = btn.getAttribute('data-fav-id');
    const nowFav = toggleFavorite(id);
    btn.classList.toggle('active', nowFav);
    btn.setAttribute('aria-pressed', String(nowFav));
    btn.textContent = nowFav ? '♥' : '♡';
  });
}

export function renderMechanicDetail() {
  const root = document.getElementById('app');
  const id = (window.location.hash.split('#/usta/')[1] || '').split('?')[0];
  const mechanic = getMechanicById(id);
  if (!mechanic) {
    root.innerHTML = '<div class="container py-5"><div class="alert alert-warning">Usta bulunamadı.</div></div>';
    return;
  }
  root.innerHTML = `
  <div class="container py-4">
    <div class="row g-4">
      <div class="col-12 col-lg-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <h4 class="mb-1">${mechanic.name}</h4>
            <div class="rating-stars mb-2">${'★'.repeat(Math.round(mechanic.rating))}${'☆'.repeat(5 - Math.round(mechanic.rating))} <small>(${mechanic.reviewsCount})</small></div>
            <div class="mb-3">${mechanic.specialties.map(s => `<span class=\"chip\">${s}</span>`).join('')}</div>
            <p class="text-muted">Konum: ${mechanic.location.city} / ${mechanic.location.district}</p>
            <div class="mb-3">
              <h6 class="mb-1">Uzman Olduğu Markalar</h6>
              ${(mechanic.brandExpertise || []).map(b => `<span class=\"badge bg-light text-dark border me-1\">${b}</span>`).join('') || '<span class=\"text-muted\">-</span>'}
            </div>
            ${(mechanic.interests && mechanic.interests.length) ? `
            <div class=\"mb-3\">
              <h6 class=\"mb-1\">İlgi Alanları</h6>
              ${mechanic.interests.map(i => `<span class=\"badge bg-secondary-subtle text-dark border me-1\">${i}</span>`).join('')}
            </div>` : ''}
            <h6>Önceki İşler</h6>
            <ul class="mb-0">
              ${mechanic.portfolio.map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="eta">Tahmini başlangıç: ${mechanic.etaMinutes} dk</div>
              <button class="favorite-btn ${isFavorite(mechanic.id) ? 'active' : ''}" data-fav-id="${mechanic.id}" aria-label="Favoriye ekle/kaldır" aria-pressed="${isFavorite(mechanic.id)}">${isFavorite(mechanic.id) ? '♥' : '♡'}</button>
            </div>
            <button class="btn btn-primary w-100 mb-2" id="selectMechanicBtn">Bu Ustayı Seç</button>
            <a class="btn btn-outline-secondary w-100" href="#/ustalar">Listeye Dön</a>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  document.getElementById('selectMechanicBtn').addEventListener('click', () => {
    window.location.hash = `#/is-emri-yeni?mechanicId=${encodeURIComponent(mechanic.id)}`;
  });

  const favBtn = document.querySelector('[data-fav-id]');
  if (favBtn) {
    favBtn.addEventListener('click', () => {
      const nowFav = toggleFavorite(mechanic.id);
      favBtn.classList.toggle('active', nowFav);
      favBtn.setAttribute('aria-pressed', String(nowFav));
      favBtn.textContent = nowFav ? '♥' : '♡';
    });
  }
}

// kartlar EJS partial üzerinden render ediliyor


