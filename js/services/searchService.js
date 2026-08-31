// searchService.js
// Simple client-side substring search over the flattened content index.
// Kept separate from UI so both the homepage search bar and the resources
// page filter can reuse identical matching rules.

import { getSearchIndex, RESOURCES } from '../core/data.js';

export function searchAll(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return getSearchIndex().filter(
    (item) => item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
  );
}

/** Filter resources by free-text query plus optional category/type facets. */
export function filterResources({ query = '', category = 'all', type = 'all' } = {}) {
  const q = query.trim().toLowerCase();
  return RESOURCES.filter((r) => {
    const matchesQuery =
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q));
    const matchesCategory = category === 'all' || r.category === category;
    const matchesType = type === 'all' || r.type === type;
    return matchesQuery && matchesCategory && matchesType;
  });
}
