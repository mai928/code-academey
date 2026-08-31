// home.js
// Initializes the homepage: Typed.js hero animation, quick learning portal
// cards, and the instant search bar.

import { LEARNING_PATHS } from '../core/data.js';
import { renderPathCard, renderEmptyState } from '../ui/cards.js';
import { getPathProgress } from '../services/progressService.js';
import { searchAll } from '../services/searchService.js';

function initTypedHeadline() {
  const el = document.getElementById('typedHeadline');
  if (!el || typeof window.Typed === 'undefined') return;
  new window.Typed(el, {
    strings: ['Learn to Code.', 'Build Real Skills.', 'Practice Every Day.', 'Become a Better Developer.'],
    typeSpeed: 45,
    backSpeed: 25,
    backDelay: 1400,
    loop: true,
  });
}

function initPortals() {
  const grid = document.getElementById('portalGrid');
  if (!grid) return;
  grid.innerHTML = LEARNING_PATHS.map((p) =>
    renderPathCard(p, { progress: getPathProgress(p.id), ctaLabel: 'Explore', ctaHref: `curriculum.html#${p.id}` })
  ).join('');
}

function initSearch() {
  const input = document.getElementById('homeSearchInput');
  const results = document.getElementById('homeSearchResults');
  if (!input || !results) return;

  input.addEventListener('input', () => {
    const query = input.value;
    if (!query.trim()) {
      results.innerHTML = '';
      results.classList.add('d-none');
      return;
    }
    const matches = searchAll(query).slice(0, 8);
    results.classList.remove('d-none');
    if (matches.length === 0) {
      results.innerHTML = renderEmptyState('No search results found.', 'Try another keyword.');
      return;
    }
    results.innerHTML = `<ul class="list-unstyled mb-0">${matches
      .map(
        (m) => `<li><a class="cap-search-result" href="${m.href}"><span class="badge cap-badge-alt me-2">${m.type}</span>${m.title}</a></li>`
      )
      .join('')}</ul>`;
  });
}

export function initHomePage() {
  initTypedHeadline();
  initPortals();
  initSearch();
}
