// flashcards.js
// Renders a set of flashcards from data and wires up the flip interaction.
// One generic implementation is reused for every language rather than
// hardcoding a card set per language page.

function esc(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

export function renderFlashcards(container, cards) {
  if (!cards || cards.length === 0) {
    container.innerHTML = '<p class="cap-muted">No flashcards available yet for this topic.</p>';
    return;
  }

  container.innerHTML = cards
    .map(
      (card) => `
    <div class="col-12 col-sm-6 col-lg-4">
      <div class="cap-flashcard" tabindex="0" role="button" aria-label="Flashcard, press Enter to flip" data-flashcard="${esc(card.id)}">
        <div class="cap-flashcard-inner">
          <div class="cap-flashcard-face cap-flashcard-front">
            <span class="cap-flashcard-label">Term</span>
            <p>${esc(card.front)}</p>
            <span class="cap-flashcard-hint"><i class="fa-solid fa-rotate" aria-hidden="true"></i> Tap to flip</span>
          </div>
          <div class="cap-flashcard-face cap-flashcard-back">
            <span class="cap-flashcard-label">Definition</span>
            <p>${esc(card.back)}</p>
            <span class="cap-flashcard-hint"><i class="fa-solid fa-rotate" aria-hidden="true"></i> Tap to flip back</span>
          </div>
        </div>
      </div>
    </div>`
    )
    .join('');

  container.querySelectorAll('[data-flashcard]').forEach((card) => {
    const flip = () => card.classList.toggle('is-flipped');
    card.addEventListener('click', flip);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flip();
      }
    });
  });
}
