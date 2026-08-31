// languages.js
import { LEARNING_PATHS, FLASHCARDS, RESOURCES } from '../core/data.js';
import { renderFlashcards } from '../ui/flashcards.js';

function esc(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

function renderLanguageSection(lang) {
  const related = RESOURCES.filter((r) => r.category === lang.id).slice(0, 3);
  return `
    <section id="${lang.id}" class="cap-language-section py-5 border-bottom">
      <div class="row g-4 align-items-start">
        <div class="col-lg-4">
          <div class="cap-card-icon mb-3"><i class="${esc(lang.icon)}" aria-hidden="true"></i></div>
          <h2 class="h3">${esc(lang.title)}</h2>
          <p class="cap-card-desc">${esc(lang.description)}</p>
          <span class="badge cap-badge mb-3">${esc(lang.difficulty)}</span>
          <h3 class="h6 mt-3">Main use cases</h3>
          <ul class="cap-plain-list">${lang.useCases.map((u) => `<li>${esc(u)}</li>`).join('')}</ul>
          <h3 class="h6 mt-3">Topics you'll learn</h3>
          <ul class="cap-plain-list">${lang.topics.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          ${
            related.length
              ? `<h3 class="h6 mt-3">Related resources</h3><ul class="cap-plain-list">${related
                  .map((r) => `<li><a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.title)}</a></li>`)
                  .join('')}</ul>`
              : ''
          }
        </div>
        <div class="col-lg-8">
          <h3 class="h6 mb-3">Flashcards</h3>
          <div class="row g-3" data-flashcard-grid="${lang.id}"></div>
        </div>
      </div>
    </section>`;
}

export function initLanguagesPage() {
  const container = document.getElementById('languagesContainer');
  if (!container) return;

  container.innerHTML = LEARNING_PATHS.map(renderLanguageSection).join('');

  LEARNING_PATHS.forEach((lang) => {
    const grid = container.querySelector(`[data-flashcard-grid="${lang.id}"]`);
    if (grid) renderFlashcards(grid, FLASHCARDS[lang.id] || []);
  });

  // Scroll to the language named in the URL hash, if any.
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }
}
