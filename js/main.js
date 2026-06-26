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

  /* ---- Contact form: Netlify AJAX submit + brand-voice feedback ---- */
  const form = document.querySelector('.contact-form');
  const status = form && form.querySelector('.form-status');

  if (form && status) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      status.classList.remove('is-error');
      status.textContent = 'Enviando…';

      try {
        const body = new URLSearchParams(new FormData(form)).toString();
        const res = await fetch(form.getAttribute('action') || '/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body
        });
        if (!res.ok) throw new Error('Bad response');
        form.reset();
        status.textContent = 'Gracias. Te responderemos en breve.';
      } catch (err) {
        status.classList.add('is-error');
        status.textContent = 'No hemos podido enviar el formulario. Escríbenos a hola@vitaledgelab.com.';
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
})();
