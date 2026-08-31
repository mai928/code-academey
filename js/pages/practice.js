// practice.js
import {
  getLevels,
  getChallengesForLevel,
  isLevelUnlocked,
  getLevelCompletionPercent,
  submitChallengeAnswer,
  getTotalScore,
} from '../services/challengeService.js';
import { getPracticeState } from '../core/state.js';
import { renderLevelCard, renderChallengeList } from '../ui/challengeUI.js';
import { showModal, showToast } from '../ui/modal.js';

function renderLevels() {
  const grid = document.getElementById('levelsGrid');
  if (!grid) return;
  grid.innerHTML = getLevels()
    .map((level) =>
      renderLevelCard(level, {
        unlocked: isLevelUnlocked(level),
        completionPercent: getLevelCompletionPercent(level),
        challengeCount: getChallengesForLevel(level).length,
      })
    )
    .join('');

  grid.querySelectorAll('[data-open-level]').forEach((btn) => {
    btn.addEventListener('click', () => openLevelModal(Number(btn.dataset.openLevel)));
  });

  const scoreEl = document.getElementById('totalScore');
  if (scoreEl) scoreEl.textContent = getTotalScore();
}

function openLevelModal(level) {
  const title = document.getElementById('challengeModalLabel');
  const list = document.getElementById('challengeList');
  if (title) title.textContent = `Level ${level} Challenges`;

  const { completedChallenges } = getPracticeState();
  renderChallengeList(list, getChallengesForLevel(level), completedChallenges);

  list.querySelectorAll('[data-challenge]').forEach((item) => {
    const challengeId = item.dataset.challenge;
    item.querySelectorAll('[data-answer]').forEach((optBtn) => {
      optBtn.addEventListener('click', () => {
        const result = submitChallengeAnswer(challengeId, optBtn.dataset.answer);
        const feedback = item.querySelector('.cap-challenge-feedback');

        if (result.error) return;

        if (result.correct) {
          item.classList.add('is-completed');
          item.querySelectorAll('[data-answer]').forEach((b) => (b.disabled = true));
          feedback.textContent = result.alreadyCompleted ? 'Already completed.' : 'Correct! Challenge complete.';
          feedback.classList.add('cap-text-success');
          renderLevels();
          if (result.unlockedNextLevel) {
            showToast('New level unlocked! 🎉', 'success');
          }
        } else {
          feedback.textContent = 'Not quite — try another option.';
          feedback.classList.add('cap-text-danger');
        }
      });
    });
  });

  showModal('challengeModal');
}

export function initPracticePage() {
  renderLevels();
}
