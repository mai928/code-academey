// curriculum.js
import { LEARNING_PATHS } from '../core/data.js';
import { renderPathCard } from '../ui/cards.js';
import { getPathProgress } from '../services/progressService.js';

export function initCurriculumPage() {
  const grid = document.getElementById('curriculumGrid');
  if (!grid) return;

  grid.innerHTML = LEARNING_PATHS.map((path) => {
    const progress = getPathProgress(path.id);
    return renderPathCard(path, {
      progress,
      ctaLabel: progress > 0 ? 'Continue' : 'Start',
      ctaHref: `languages.html#${path.id}`,
    });
  }).join('');
}
