// navbar.js
// Highlights the active page in the shared navbar. The navbar markup itself
// lives in each HTML file (kept simple rather than injected, since this is
// a static, no-build project) but its *behavior* is centralized here.

export function initNavbar() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Close the mobile menu automatically after a link is tapped.
  const collapseEl = document.getElementById('mainNavbar');
  if (collapseEl && window.bootstrap) {
    collapseEl.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        const instance = window.bootstrap.Collapse.getInstance(collapseEl);
        if (instance && collapseEl.classList.contains('show')) instance.hide();
      });
    });
  }
}
