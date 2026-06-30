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
        const data = Object.fromEntries(new FormData(form).entries());
        const res = await fetch(form.getAttribute('action'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
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

  /* ---- Proyectos: mobile carousel scroll-position dots ---- */
  const projects = document.querySelector('.projects');
  const dotsWrap = document.querySelector('.projects__dots');

  if (projects && dotsWrap) {
    const cards = [...projects.querySelectorAll('.project')];

    cards.forEach((card, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'projects__dot';
      dot.setAttribute('aria-label', `Ir al proyecto ${i + 1} de ${cards.length}`);
      dot.addEventListener('click', () => {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
      dotsWrap.appendChild(dot);
    });

    const dots = [...dotsWrap.children];
    const setActive = (idx) => dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
    setActive(0);

    // Highlight the dot of whichever card is centred in the scroller.
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(cards.indexOf(e.target));
      });
    }, { root: projects, threshold: 0.6 });
    cards.forEach((c) => io.observe(c));
  }
})();
