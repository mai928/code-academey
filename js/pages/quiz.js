// quiz.js
import {
  createQuizSession,
  getCurrentQuestion,
  answerQuestion,
  goToNext,
  goToPrevious,
  isLastQuestion,
  finishQuiz,
} from '../services/quizService.js';
import { renderQuestion, renderResults, setNavButtonsState } from '../ui/quizUI.js';
import { showModal, hideModal, showToast } from '../ui/modal.js';
import { generateCertificate } from '../services/certificateService.js';
import { renderCertificate } from '../ui/certificateUI.js';
import { LEARNING_PATHS } from '../core/data.js';
import { PAYMENT_URL, WHATSAPP_NUMBER } from '../core/constants.js';

function wireOfficialCertLinks() {
  const payLink = document.getElementById('officialCertPayLink');
  const waLink = document.getElementById('officialCertWhatsappLink');
  if (payLink) payLink.href = PAYMENT_URL;
  if (waLink) waLink.href = `https://wa.me/${WHATSAPP_NUMBER}`;
}

let session = null;

function fireConfetti() {
  if (typeof window.confetti === 'function') {
    window.confetti({ particleCount: 140, spread: 80, origin: { y: 0.6 } });
  }
}

function renderCurrent() {
  const container = document.getElementById('quizContainer');
  const question = getCurrentQuestion(session);
  renderQuestion(container, session, question);

  container.querySelectorAll('[data-option]').forEach((btn) => {
    btn.addEventListener('click', () => {
      answerQuestion(session, question.id, btn.dataset.option);
      renderCurrent();
    });
  });

  setNavButtonsState(
    { prevBtn: document.getElementById('quizPrevBtn'), nextBtn: document.getElementById('quizNextBtn') },
    session
  );
}

function finish() {
  const result = finishQuiz(session);
  const container = document.getElementById('quizContainer');
  document.getElementById('quizNavRow')?.classList.add('d-none');
  renderResults(container, result);

  if (result.passed) fireConfetti();

  container.querySelector('[data-generate-certificate]')?.addEventListener('click', () => {
    window.__capCertificateCategory = session.category;
    showModal('certificateModal');
  });

  container.querySelector('[data-restart-quiz]')?.addEventListener('click', () => {
    startSession(session.category !== 'general' ? session.category : null);
    document.getElementById('quizNavRow')?.classList.remove('d-none');
  });
}

function startSession(category) {
  session = createQuizSession(category);
  renderCurrent();
}

function initCertificateForm() {
  const form = document.getElementById('certificateForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('certificateNameInput');
    const name = nameInput.value.trim();
    const category = window.__capCertificateCategory || 'general';
    const path = LEARNING_PATHS.find((p) => p.id === category);
    const courseTitle = path ? path.title : 'General Programming';

    if (!name) {
      showToast('Please enter your name to generate a certificate.', 'danger');
      return;
    }

    const certificate = generateCertificate(name, category, courseTitle);
    if (!certificate) {
      showToast('You need a passing quiz score first.', 'danger');
      return;
    }

    hideModal('certificateModal');
    renderCertificate(document.getElementById('certificateOutput'), certificate);
    document.getElementById('certificateSection')?.classList.remove('d-none');
    document.getElementById('certificateSection')?.scrollIntoView({ behavior: 'smooth' });
    nameInput.value = '';
  });
}

export function initQuizPage() {
  startSession(null);
  initCertificateForm();
  wireOfficialCertLinks();

  document.getElementById('quizPrevBtn')?.addEventListener('click', () => {
    goToPrevious(session);
    renderCurrent();
  });

  document.getElementById('quizNextBtn')?.addEventListener('click', () => {
    if (isLastQuestion(session)) {
      finish();
    } else {
      goToNext(session);
      renderCurrent();
    }
  });

  document.querySelectorAll('[data-quiz-category]').forEach((btn) => {
    btn.addEventListener('click', () => {
      startSession(btn.dataset.quizCategory === 'all' ? null : btn.dataset.quizCategory);
      document.getElementById('quizNavRow')?.classList.remove('d-none');
      document.querySelectorAll('[data-quiz-category]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}
