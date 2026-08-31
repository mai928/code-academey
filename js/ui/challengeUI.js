// challengeUI.js
// Renders practice levels and individual challenges. Reads state via
// challengeService and never mutates practice data directly.

function esc(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

export function renderLevelCard(level, { unlocked, completionPercent, challengeCount }) {
  return `
    <div class="col-12 col-md-4">
      <div class="cap-card h-100 p-4 ${unlocked ? '' : 'cap-card-locked'}">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h3 class="h5 mb-0">Level ${level}</h3>
          ${unlocked ? '' : '<i class="fa-solid fa-lock cap-muted" aria-hidden="true" title="Locked"></i>'}
        </div>
        <p class="cap-muted small mb-3">${challengeCount} challenge${challengeCount === 1 ? '' : 's'}</p>
        <div class="progress cap-progress mb-3" role="progressbar" aria-valuenow="${completionPercent}" aria-valuemin="0" aria-valuemax="100" aria-label="Level ${level} progress">
          <div class="progress-bar" style="width:${completionPercent}%"></div>
        </div>
        ${
          unlocked
            ? `<button type="button" class="btn cap-btn-primary btn-sm mt-auto" data-open-level="${level}">Open challenges</button>`
            : `<button type="button" class="btn cap-btn-outline btn-sm mt-auto" disabled>Complete previous level</button>`
        }
      </div>
    </div>`;
}

export function renderChallengeList(container, challenges, completedIds) {
  if (challenges.length === 0) {
    container.innerHTML = '<p class="cap-muted">No challenges in this level yet.</p>';
    return;
  }
  container.innerHTML = challenges
    .map((c) => {
      const done = completedIds.includes(c.id);
      return `
      <div class="cap-challenge-item ${done ? 'is-completed' : ''}" data-challenge="${esc(c.id)}">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h4 class="h6 mb-0">${esc(c.title)}</h4>
          <span class="badge ${done ? 'cap-badge-success' : 'cap-badge'}">${done ? 'Completed' : `${c.points} pts`}</span>
        </div>
        <p class="mb-3">${esc(c.prompt)}</p>
        <div class="d-grid gap-2" role="radiogroup" aria-label="Challenge options">
          ${c.options
            .map((opt) => `<button type="button" class="btn cap-quiz-option text-start" data-answer="${esc(opt)}" ${done ? 'disabled' : ''}>${esc(opt)}</button>`)
            .join('')}
        </div>
        <p class="cap-challenge-feedback small mt-2" aria-live="polite"></p>
      </div>`;
    })
    .join('');
}
