// cards.js
// Reusable DOM-building functions for cards used across Home, Curriculum,
// Languages, and Resources pages. Keeping card markup in one place is what
// stops the project from ending up with six near-identical implementations.

/** Escape text before inserting into innerHTML to avoid markup injection from data. */
function esc(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

export function renderPathCard(path, { progress = 0, ctaLabel = 'Start Learning', ctaHref = null } = {}) {
  const href = ctaHref || `curriculum.html#${path.id}`;
  return `
    <div class="col-12 col-sm-6 col-lg-4">
      <div class="cap-card h-100 p-4">
        <div class="cap-card-icon mb-3"><i class="${esc(path.icon)}" aria-hidden="true"></i></div>
        <h3 class="h5 mb-1">${esc(path.title)}</h3>
        <p class="cap-card-desc mb-3">${esc(path.description)}</p>
        <div class="d-flex align-items-center gap-2 mb-3">
          <span class="badge cap-badge">${esc(path.difficulty)}</span>
          <span class="cap-muted small">${path.lessons} lessons</span>
        </div>
        ${progress > 0 ? `
        <div class="progress cap-progress mb-3" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" aria-label="${esc(path.title)} progress">
          <div class="progress-bar" style="width:${progress}%"></div>
        </div>` : ''}
        <a href="${esc(href)}" class="btn cap-btn-primary btn-sm mt-auto">${esc(ctaLabel)}</a>
      </div>
    </div>`;
}

export function renderResourceCard(resource, { isFavorite = false } = {}) {
  return `
    <div class="col-12 col-sm-6 col-lg-4" data-resource-card="${esc(resource.id)}">
      <div class="cap-card h-100 p-4">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <span class="badge cap-badge-alt">${esc(resource.type)}</span>
          <button type="button" class="btn btn-sm cap-fav-btn" data-favorite-toggle="${esc(resource.id)}" aria-pressed="${isFavorite}" aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
            <i class="${isFavorite ? 'fa-solid' : 'fa-regular'} fa-heart" aria-hidden="true"></i>
          </button>
        </div>
        <h3 class="h6 mb-1">${esc(resource.title)}</h3>
        <p class="cap-card-desc mb-3">${esc(resource.description)}</p>
        <a href="${esc(resource.url)}" target="_blank" rel="noopener noreferrer" class="btn cap-btn-outline btn-sm mt-auto">
          Visit resource <i class="fa-solid fa-arrow-up-right-from-square small ms-1" aria-hidden="true"></i>
        </a>
      </div>
    </div>`;
}

export function renderEmptyState(message, subtext) {
  return `
    <div class="cap-empty-state text-center py-5">
      <i class="fa-regular fa-face-smile mb-3" aria-hidden="true"></i>
      <p class="fw-semibold mb-1">${esc(message)}</p>
      ${subtext ? `<p class="cap-muted small mb-0">${esc(subtext)}</p>` : ''}
    </div>`;
}
