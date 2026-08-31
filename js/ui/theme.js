// theme.js
// Applies and toggles the light/dark theme. The initial theme class is set
// as early as possible by an inline snippet in each page's <head> (to avoid
// a flash of the wrong theme); this module wires up the toggle button and
// keeps localStorage in sync afterward.

import { getTheme, saveTheme } from '../core/state.js';

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.querySelector('[data-theme-icon]');
  if (icon) {
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
  const label = document.querySelector('[data-theme-label]');
  if (label) {
    label.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  }
}

export function initTheme() {
  const theme = getTheme();
  applyTheme(theme);

  const toggleBtn = document.querySelector('[data-theme-toggle]');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    saveTheme(next);
  });
}
