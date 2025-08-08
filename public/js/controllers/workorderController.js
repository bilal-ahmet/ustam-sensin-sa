import { createWorkorder, getWorkorderById, advanceWorkorderStatus } from '../models/workordersModel.js';
import { getMechanicById } from '../models/mechanicsModel.js';
import { getLookups } from '../models/lookupModel.js';
import { isValidPhone, applyBootstrapValidation } from '../utils/validation.js';
import { renderTemplate } from '../services/templateService.js';

export function renderWorkorderNew() {
  const root = document.getElementById('app');
  const lookups = getLookups();
  const params = new URLSearchParams((window.location.hash.split('?')[1] || ''));
  const mechanicId = params.get('mechanicId') || '';
  const mechanic = mechanicId ? getMechanicById(mechanicId) : null;

  root.innerHTML = `
  <div class="container py-4">
    <div class="row g-4">
      <div class="col-12 col-lg-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="mb-3">İş Emri Oluştur</h5>
            <form id="workorderForm" novalidate>
              <div class="row g-3">
                <div class="col-12 col-md-6">
                  <label class="form-label">Ad Soyad</label>
                  <input type="text" class="form-control" id="customerName" required />
                  <div class="invalid-feedback">Lütfen ad soyad girin.</div>
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label">Telefon</label>
                  <input type="tel" class="form-control" id="customerPhone" required placeholder="05xx xxx xx xx" />
                  <div class="invalid-feedback">Lütfen geçerli bir telefon numarası girin.</div>
                </div>
                <div class="col-12 col-md-4">
                  <label class="form-label">Marka</label>
                  <select id="brandSelect" class="form-select" required>
                    <option value="">Seçiniz</option>
                    ${lookups.brands.map(b => `<option value="${b}">${b}</option>`).join('')}
                  </select>
                  <div class="invalid-feedback">Lütfen marka seçin.</div>
                </div>
                <div class="col-12 col-md-4">
                  <label class="form-label">Model</label>
                  <select id="modelSelect" class="form-select" required>
                    <option value="">Önce marka</option>
                  </select>
                  <div class="invalid-feedback">Lütfen model seçin.</div>
                </div>
                <div class="col-12 col-md-4">
                  <label class="form-label">Yıl</label>
                  <input type="number" class="form-control" id="vehicleYear" min="1990" max="2025" />
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label">Arıza Kategorisi</label>
                  <select id="categorySelect" class="form-select" required>
                    <option value="">Seçiniz</option>
                    ${lookups.categories.map(c => `<option value="${c}">${c}</option>`).join('')}
                  </select>
                  <div class="invalid-feedback">Lütfen arıza kategorisi seçin.</div>
                </div>
                <div class="col-12">
                  <label class="form-label">Açıklama</label>
                  <textarea id="issueDesc" class="form-control" rows="3"></textarea>
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label">Randevu Tarihi (opsiyonel)</label>
                  <input type="date" id="appointmentDate" class="form-control" />
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label">Randevu Saati (opsiyonel)</label>
                  <input type="time" id="appointmentTime" class="form-control" />
                </div>
              </div>
              <div class="mt-4 d-flex gap-2">
                <button type="submit" class="btn btn-primary">Oluştur</button>
                <a href="#/ustalar" class="btn btn-outline-secondary">İptal</a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h6 class="mb-2">Seçilen Usta</h6>
            ${mechanic ? selectedMechanic(mechanic) : '<div class="text-muted">Henüz seçilmedi. Usta seçmek için <a href=\"#/ustalar\">Ustalar</a> sayfasına gidin.</div>'}
            <hr/>
            <h6 class="mb-2">Devam Eden İş Emirleri</h6>
            <div id="ongoingList"></div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  const brandSelect = document.getElementById('brandSelect');
  const modelSelect = document.getElementById('modelSelect');
  brandSelect.addEventListener('change', () => {
    const brand = brandSelect.value;
    modelSelect.innerHTML = '<option value="">Seçiniz</option>' + (lookups.models[brand] || []).map(m => `<option value="${m}">${m}</option>`).join('');
  });

  const form = document.getElementById('workorderForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // HTML5 + ek telefon doğrulaması
    const phoneInput = document.getElementById('customerPhone');
    const phoneValid = isValidPhone(phoneInput.value.trim());
    if (!phoneValid) {
      phoneInput.setCustomValidity('invalid');
    } else {
      phoneInput.setCustomValidity('');
    }
    if (!form.checkValidity()) {
      applyBootstrapValidation(form);
      return;
    }
    const payload = {
      customer: { name: document.getElementById('customerName').value.trim(), phone: document.getElementById('customerPhone').value.trim() },
      vehicle: { brand: brandSelect.value, model: modelSelect.value, year: Number(document.getElementById('vehicleYear').value) || null },
      issue: { category: document.getElementById('categorySelect').value, description: document.getElementById('issueDesc').value.trim() },
      mechanicId: mechanic ? mechanic.id : null,
      appointment: buildAppointment(),
    };
    const wo = createWorkorder(payload);
    window.location.hash = `#/is-emri/${wo.id}`;
  });

  function buildAppointment() {
    const d = document.getElementById('appointmentDate').value;
    const t = document.getElementById('appointmentTime').value;
    if (!d && !t) return null;
    return { date: d || null, time: t || null };
  }

  // Ongoing workorders aside
  renderOngoing();
  function renderOngoing() {
    try {
      const db = JSON.parse(localStorage.getItem('ustam-sensin-db')) || {};
      const list = (db.workorders || []).filter(w => w.status !== 'DELIVERED').sort((a,b) => b.createdAt - a.createdAt).slice(0,5);
      const container = document.getElementById('ongoingList');
      if (!container) return;
      container.innerHTML = list.length ? list.map(w => `<div class=\"d-flex justify-content-between align-items-center mb-2\"><a href=\"#/is-emri/${w.id}\" class=\"small\">${w.vehicle.brand} ${w.vehicle.model}</a><span class=\"badge bg-secondary\">${w.status}</span></div>`).join('') : '<div class="text-muted small">Kayıt yok.</div>';
    } catch {}
  }
}

export function renderWorkorderTrack() {
  const root = document.getElementById('app');
  const id = (window.location.hash.split('#/is-emri/')[1] || '').split('?')[0];
  const wo = getWorkorderById(id);
  if (!wo) {
    root.innerHTML = '<div class="container py-5"><div class="alert alert-warning">İş emri bulunamadı.</div></div>';
    return;
  }
  const mechanic = getMechanicById(wo.mechanicId);
  const steps = ['RECEIVED','DIAGNOSIS','PARTS','REPAIR','TEST','DELIVERED'];
  const currentIndex = steps.indexOf(wo.status);
  root.innerHTML = `
  <div class="container py-4">
    <div class="row g-4">
      <div class="col-12 col-lg-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="mb-3">İş Emri Takip</h5>
            <div id="stepperContainer"></div>
            <h6>Geçmiş</h6>
            <ul class="mb-0">
              ${wo.history.map(h => `<li><strong>${translateStatus(h.status)}</strong> - ${new Date(h.at).toLocaleString()} ${h.note ? ' - ' + h.note : ''}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div class="mt-3 d-flex gap-2">
          ${wo.status !== 'DELIVERED' ? '<button id="nextStepBtn" class="btn btn-primary">Bir Sonraki Adım</button>' : ''}
          <a href="#/" class="btn btn-outline-secondary">Ana Sayfa</a>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h6 class="mb-2">Usta</h6>
            ${mechanic ? selectedMechanic(mechanic) : '<div class="text-muted">-</div>'}
            <hr/>
            <h6>Araç</h6>
            <div>${wo.vehicle.brand} ${wo.vehicle.model} ${wo.vehicle.year ? '('+wo.vehicle.year+')' : ''}</div>
            <div class="text-muted">Kategori: ${wo.issue.category}</div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  // Render stepper via client-side EJS partial
  (async () => {
    const html = await renderTemplate('stepper', { steps, currentIndex, translateStatus });
    const stepperEl = document.getElementById('stepperContainer');
    if (stepperEl) stepperEl.innerHTML = html;
  })();

  const nextBtn = document.getElementById('nextStepBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      advanceWorkorderStatus(wo.id);
      renderWorkorderTrack();
    });
  }
}

function selectedMechanic(mechanic) {
  return `
    <div>
      <div class="d-flex align-items-start justify-content-between">
        <div>
          <div class="fw-semibold">${mechanic.name}</div>
          <div class="rating-stars">${'★'.repeat(Math.round(mechanic.rating))}${'☆'.repeat(5 - Math.round(mechanic.rating))} <small>(${mechanic.reviewsCount})</small></div>
          <div class="mt-1">${mechanic.specialties.map(s => `<span class=\"chip\">${s}</span>`).join('')}</div>
        </div>
      </div>
    </div>`;
}

function translateStatus(s) {
  const map = {
    RECEIVED: 'Araç Alındı',
    DIAGNOSIS: 'Teşhis',
    PARTS: 'Parça Temini',
    REPAIR: 'Onarım',
    TEST: 'Test',
    DELIVERED: 'Teslim Edildi'
  };
  return map[s] || s;
}


