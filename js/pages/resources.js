// resources.js
import { LEARNING_PATHS, RESOURCES } from '../core/data.js';
import { filterResources } from '../services/searchService.js';
import { renderResourceCard, renderEmptyState } from '../ui/cards.js';
import { getUser, updateUser } from '../core/state.js';
import { showToast } from '../ui/modal.js';

const state = { query: '', category: 'all', type: 'all', favoritesOnly: false };

function getFavorites() {
  return getUser().favorites;
}

function toggleFavorite(resourceId) {
  const favorites = getFavorites();
  const isFav = favorites.includes(resourceId);
  const updated = isFav ? favorites.filter((id) => id !== resourceId) : [...favorites, resourceId];
  updateUser({ favorites: updated });
  showToast(isFav ? 'Removed from favorites.' : 'Added to favorites.', isFav ? 'secondary' : 'success');
  return !isFav;
}

function render() {
  const grid = document.getElementById('resourcesGrid');
  if (!grid) return;

  let results = filterResources(state);
  const favorites = getFavorites();

  if (state.favoritesOnly) {
    results = results.filter((r) => favorites.includes(r.id));
  }

  if (results.length === 0) {
    grid.innerHTML = state.favoritesOnly
      ? renderEmptyState('No favorites yet.', 'Start saving useful resources to build your personal library.')
      : renderEmptyState('No search results found.', 'Try another keyword or filter.');
    return;
  }

  grid.innerHTML = results.map((r) => renderResourceCard(r, { isFavorite: favorites.includes(r.id) })).join('');

  grid.querySelectorAll('[data-favorite-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      toggleFavorite(btn.dataset.favoriteToggle);
      render();
    });
  });
}

function initFilterControls() {
  const searchInput = document.getElementById('resourceSearchInput');
  const categorySelect = document.getElementById('resourceCategoryFilter');
  const typeSelect = document.getElementById('resourceTypeFilter');
  const favToggle = document.getElementById('resourceFavoritesToggle');

  if (categorySelect) {
    categorySelect.innerHTML =
      '<option value="all">All languages</option>' +
      LEARNING_PATHS.map((p) => `<option value="${p.id}">${p.title}</option>`).join('');
  }

  if (typeSelect) {
    const types = [...new Set(RESOURCES.map((r) => r.type))];
    typeSelect.innerHTML = '<option value="all">All types</option>' + types.map((t) => `<option value="${t}">${t}</option>`).join('');
  }

  searchInput?.addEventListener('input', () => {
    state.query = searchInput.value;
    render();
  });
  categorySelect?.addEventListener('change', () => {
    state.category = categorySelect.value;
    render();
  });
  typeSelect?.addEventListener('change', () => {
    state.type = typeSelect.value;
    render();
  });
  favToggle?.addEventListener('change', () => {
    state.favoritesOnly = favToggle.checked;
    render();
  });
}

export function initResourcesPage() {
  initFilterControls();
  render();
}
