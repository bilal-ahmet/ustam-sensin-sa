import { readNamespace, writeNamespace } from '../services/storageService.js';

const STATUS_FLOW = ['RECEIVED','DIAGNOSIS','PARTS','REPAIR','TEST','DELIVERED'];

export function createWorkorder({ customer, vehicle, issue, mechanicId, appointment = null }) {
  const db = readNamespace();
  const id = 'wo_' + Math.random().toString(36).slice(2, 9);
  const now = Date.now();
  const workorder = {
    id,
    customer,
    vehicle,
    issue,
    mechanicId,
    appointment,
    status: 'RECEIVED',
    history: [{ status: 'RECEIVED', at: now, note: 'İş emri oluşturuldu' }],
    createdAt: now,
  };
  db.workorders = db.workorders || [];
  db.workorders.push(workorder);
  writeNamespace(db);
  return workorder;
}

export function getWorkorderById(id) {
  const db = readNamespace();
  return (db.workorders || []).find(w => w.id === id) || null;
}

export function advanceWorkorderStatus(id) {
  const db = readNamespace();
  const wo = (db.workorders || []).find(w => w.id === id);
  if (!wo) return null;
  const idx = STATUS_FLOW.indexOf(wo.status);
  if (idx < STATUS_FLOW.length - 1) {
    const next = STATUS_FLOW[idx + 1];
    wo.status = next;
    wo.history.push({ status: next, at: Date.now() });
    writeNamespace(db);
  }
  return wo;
}


