const NAMESPACE_KEY = 'ustam-sensin-db';

export function readNamespace() {
  try {
    const raw = localStorage.getItem(NAMESPACE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function writeNamespace(db) {
  localStorage.setItem(NAMESPACE_KEY, JSON.stringify(db));
}


