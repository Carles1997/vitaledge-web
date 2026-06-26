/* ============================================================
   VitalEdge Lab — main.js
   Initialisation, nav behaviour, mobile menu, contact form.
   (Lenis smooth scroll added in Phase 7.)
   ============================================================ */
(function () {
  'use strict';

  /* ---- Navbar: transparent over hero → ivory glass on scroll ---- */
  const header = document.querySelector('[data-nav]');
  const SCROLL_THRESHOLD = 40;

  function syncHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
  }
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  /* ---- Mobile menu: hamburger toggles a full-screen overlay ---- */
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('mobile-menu');

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    menu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  }

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    // Close when a link is tapped, or on Escape.
    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
  }
})();
