const THEME_KEY = 'ustam-sensin-theme';

function setTheme(theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  try { localStorage.setItem(THEME_KEY, theme); } catch {}
}

function getSavedTheme() {
  try { return localStorage.getItem(THEME_KEY); } catch { return null; }
}

function getSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

export function initializeTheme() {
  const initial = getSavedTheme() || getSystemTheme();
  setTheme(initial);
  const btn = document.getElementById('themeToggle');
  updateToggleLabel(btn, initial);
  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      setTheme(next);
      updateToggleLabel(btn, next);
    });
  }
}

function updateToggleLabel(btn, theme) {
  if (!btn) return;
  btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  btn.setAttribute('aria-pressed', String(theme === 'dark'));
}


