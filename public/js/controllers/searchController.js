import { getFeaturedMechanics } from '../models/mechanicsModel.js';
import { getLookups } from '../models/lookupModel.js';
import { isFavorite, toggleFavorite } from '../services/favoritesService.js';
import { renderTemplate } from '../services/templateService.js';

export function renderHome() {
  const root = document.getElementById('app');
  const lookups = getLookups();
  const featured = getFeaturedMechanics();

  root.innerHTML = `
  <div class="container py-4">
    <div class="row g-4">
             <div class="col-12 col-lg-5">
         <div class="card shadow-sm hero">
           <div class="card-body">
             <h5 class="card-title mb-3 section-title">Doğru Ustayı Bul</h5>
            <form id="searchForm">
              <div class="mb-3">
                <label class="form-label">Marka</label>
                <select class="form-select" id="brandSelect" required>
                  <option value="" selected>Seçiniz</option>
                  ${lookups.brands.map(b => `<option value="${b}">${b}</option>`).join('')}
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Model</label>
                <select class="form-select" id="modelSelect" required>
                  <option value="" selected>Önce marka seçiniz</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Arıza Kategorisi</label>
                <select class="form-select" id="categorySelect" required>
                  <option value="" selected>Seçiniz</option>
                  ${lookups.categories.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Açıklama</label>
                <textarea class="form-control" id="descInput" rows="3" placeholder="Kısa açıklama"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Usta Bul</button>
            </form>
          </div>
        </div>
      </div>
             <div class="col-12 col-lg-7">
         <h6 class="mb-3 section-title">Öne Çıkan Ustalar</h6>
        <div class="row" id="featuredRow"></div>
      </div>
    </div>
  </div>`;

  const brandSelect = document.getElementById('brandSelect');
  const modelSelect = document.getElementById('modelSelect');
  brandSelect.addEventListener('change', () => {
    const brand = brandSelect.value;
    modelSelect.innerHTML = '<option value="">Seçiniz</option>' + (lookups.models[brand] || []).map(m => `<option value="${m}">${m}</option>`).join('');
  });

  document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const brand = brandSelect.value;
    const model = modelSelect.value;
    const category = document.getElementById('categorySelect').value;
    const desc = document.getElementById('descInput').value.trim();
    const params = new URLSearchParams();
    if (brand) params.set('brand', brand);
    if (model) params.set('model', model);
    if (category) params.set('category', category);
    if (desc) params.set('q', desc);
    window.location.hash = `#/ustalar?${params.toString()}`;
  });

  // Öne çıkan ustalar: EJS partial ile render
  (async () => {
    const row = document.getElementById('featuredRow');
    const cards = await Promise.all(featured.map(m => renderTemplate('mechanicCard', { mechanic: m, isFav: isFavorite(m.id) })));
    row.innerHTML = cards.join('');
  })();

  // Favorite toggle delegation
  document.getElementById('featuredRow').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-fav-id]');
    if (!btn) return;
    const id = btn.getAttribute('data-fav-id');
    const nowFav = toggleFavorite(id);
    btn.classList.toggle('active', nowFav);
    btn.setAttribute('aria-pressed', String(nowFav));
    btn.textContent = nowFav ? '♥' : '♡';
  });
}



