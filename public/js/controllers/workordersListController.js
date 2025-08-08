import { readNamespace } from '../services/storageService.js';
import { getMechanicById } from '../models/mechanicsModel.js';

export function renderWorkordersList() {
  const root = document.getElementById('app');
  const db = readNamespace();
  const workorders = (db.workorders || []).slice().sort((a,b) => b.createdAt - a.createdAt);
  root.innerHTML = `
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5>İş Emirlerim</h5>
      <a href="#/is-emri-yeni" class="btn btn-primary btn-sm">Yeni İş Emri</a>
    </div>
    <div class="list-group">
      ${workorders.map(renderItem).join('') || '<div class="text-muted">Kayıt yok.</div>'}
    </div>
  </div>`;
}

function renderItem(wo) {
  const m = getMechanicById(wo.mechanicId);
  const statusMap = {
    RECEIVED: 'Araç Alındı', DIAGNOSIS: 'Teşhis', PARTS: 'Parça Temini', REPAIR: 'Onarım', TEST: 'Test', DELIVERED: 'Teslim Edildi'
  };
  return `
  <a class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" href="#/is-emri/${wo.id}">
    <div>
      <div class="fw-semibold">${wo.vehicle.brand} ${wo.vehicle.model} ${wo.vehicle.year ? '('+wo.vehicle.year+')' : ''}</div>
      <small class="text-muted">${m ? m.name : '-'} • ${statusMap[wo.status] || wo.status} • ${new Date(wo.createdAt).toLocaleString()}</small>
    </div>
    <span class="badge bg-secondary">${wo.status}</span>
  </a>`;
}


