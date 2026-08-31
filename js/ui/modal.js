// modal.js
// Thin helpers around Bootstrap's modal and toast components so pages don't
// each reimplement "show this modal" / "show this toast" boilerplate.

export function showModal(modalId) {
  const el = document.getElementById(modalId);
  if (!el || !window.bootstrap) return null;
  const modal = window.bootstrap.Modal.getOrCreateInstance(el);
  modal.show();
  return modal;
}

export function hideModal(modalId) {
  const el = document.getElementById(modalId);
  if (!el || !window.bootstrap) return;
  const modal = window.bootstrap.Modal.getInstance(el);
  if (modal) modal.hide();
}

/** Show a small toast message. Expects a #capToastContainer in the page. */
export function showToast(message, variant = 'success') {
  const container = document.getElementById('capToastContainer');
  if (!container) return;

  const toastEl = document.createElement('div');
  toastEl.className = `toast align-items-center text-bg-${variant} border-0`;
  toastEl.setAttribute('role', 'status');
  toastEl.setAttribute('aria-live', 'polite');
  toastEl.setAttribute('aria-atomic', 'true');
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>`;
  container.appendChild(toastEl);

  if (window.bootstrap) {
    const toast = new window.bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
  } else {
    setTimeout(() => toastEl.remove(), 3000);
  }
}
