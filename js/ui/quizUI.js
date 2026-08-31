// quizUI.js
// Renders quiz questions/results and wires up navigation buttons.
// All correctness/scoring logic is delegated to quizService — this file
// only reads the session and updates the DOM.

function esc(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

export function renderQuestion(container, session, question) {
  const total = session.questions.length;
  const num = session.currentIndex + 1;
  const savedAnswer = session.answers[question.id];

  container.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-2">
      <span class="cap-muted small">Question ${num} of ${total}</span>
      <span class="badge cap-badge">${esc(question.difficulty)}</span>
    </div>
    <div class="progress cap-progress mb-4" role="progressbar" aria-valuenow="${Math.round((num / total) * 100)}" aria-valuemin="0" aria-valuemax="100" aria-label="Quiz progress">
      <div class="progress-bar" style="width:${Math.round((num / total) * 100)}%"></div>
    </div>
    <h2 class="h5 mb-4">${esc(question.question)}</h2>
    <div class="d-grid gap-2" role="radiogroup" aria-label="Answer options">
      ${question.options
        .map((opt) => {
          const isSelected = savedAnswer?.selectedOption === opt;
          return `<button type="button" class="btn cap-quiz-option text-start ${isSelected ? 'is-selected' : ''}" role="radio" aria-checked="${isSelected}" data-option="${esc(opt)}">${esc(opt)}</button>`;
        })
        .join('')}
    </div>
    ${savedAnswer ? `<p class="mt-3 small ${savedAnswer.isCorrect ? 'cap-text-success' : 'cap-text-danger'}">${savedAnswer.isCorrect ? 'Correct! ' : 'Not quite. '}${esc(question.explanation)}</p>` : ''}
  `;
}

export function renderResults(container, result) {
  container.innerHTML = `
    <div class="text-center py-4">
      <i class="fa-solid ${result.passed ? 'fa-circle-check cap-text-success' : 'fa-circle-xmark cap-text-danger'} cap-result-icon mb-3" aria-hidden="true"></i>
      <h2 class="h4 mb-2">${result.passed ? 'Quiz passed!' : 'Quiz not passed yet'}</h2>
      <p class="cap-muted mb-1">You scored</p>
      <p class="display-6 fw-bold mb-3">${result.percentage}%</p>
      <p class="cap-muted mb-4">${result.correct} of ${result.total} answered correctly</p>
      ${
        result.passed
          ? `<button type="button" class="btn cap-btn-primary" data-generate-certificate>Generate certificate <i class="fa-solid fa-award ms-1" aria-hidden="true"></i></button>`
          : `<p class="small cap-muted">Score 70% or higher to unlock your certificate.</p>`
      }
      <div class="mt-3">
        <button type="button" class="btn cap-btn-outline btn-sm" data-restart-quiz>Try again</button>
      </div>
    </div>`;
}

export function setNavButtonsState({ prevBtn, nextBtn }, session) {
  prevBtn.disabled = session.currentIndex === 0;
  const answered = Boolean(session.answers[session.questions[session.currentIndex].id]);
  nextBtn.disabled = !answered;
  nextBtn.textContent = session.currentIndex === session.questions.length - 1 ? 'Finish quiz' : 'Next';
}
