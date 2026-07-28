/* ============================================================
   VitalEdge Lab — main.js
   Navigation, accessible mobile menu, contact form and project dots.
   ============================================================ */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tr = (key, fallback) => {
    if (window.VELi18n && typeof window.VELi18n.get === 'function') {
      return window.VELi18n.get(key) || fallback;
    }
    return fallback;
  };

  /* ---- Navbar: update its compact state at most once per frame ---- */
  const header = document.querySelector('[data-nav]');
  const SCROLL_THRESHOLD = 40;
  let headerFrame = 0;

  function syncHeader() {
    headerFrame = 0;
    if (header) header.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
  }

  function requestHeaderSync() {
    if (!headerFrame) headerFrame = window.requestAnimationFrame(syncHeader);
  }

  syncHeader();
  window.addEventListener('scroll', requestHeaderSync, { passive: true });

  /* ---- Same-page anchors: keep Lenis and the URL hash in sync ---- */
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const anchor = event.target.closest('a[href*="#"]');
    if (!anchor) return;

    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;

    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;

    event.preventDefault();
    if (window.location.hash !== url.hash) window.history.pushState(null, '', url.hash);

    const headerOffset = header ? Math.ceil(header.getBoundingClientRect().bottom + 16) : 0;
    if (!reduceMotion && window.VELLenis && typeof window.VELLenis.scrollTo === 'function') {
      window.VELLenis.scrollTo(target, { offset: -headerOffset, duration: 1.1 });
    } else {
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  });

  /* ---- Mobile menu: animated dialog, inert background and focus loop ---- */
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('mobile-menu');
  const inertTargets = [
    document.querySelector('.skip-link'),
    document.querySelector('main'),
    document.querySelector('.site-footer')
  ].filter(Boolean);
  let closeTimer = 0;

  function setBackgroundInert(inert) {
    inertTargets.forEach((el) => {
      if (inert) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });
  }

  function menuIsOpen() {
    return Boolean(toggle && toggle.getAttribute('aria-expanded') === 'true');
  }

  function syncToggleLabel() {
    if (!toggle) return;
    toggle.setAttribute(
      'aria-label',
      menuIsOpen() ? tr('a11y.closeMenu', 'Cerrar menú') : tr('a11y.openMenu', 'Abrir menú')
    );
  }

  function getMenuFocusables() {
    return [...document.querySelectorAll(
      '.site-header a, .site-header button, #mobile-menu a, #mobile-menu button'
    )].filter((el) => (
      !el.disabled &&
      el.getAttribute('tabindex') !== '-1' &&
      !el.closest('[hidden]') &&
      el.getClientRects().length > 0
    ));
  }

  function setMenu(open, restoreFocus) {
    if (!toggle || !menu) return;
    window.clearTimeout(closeTimer);
    toggle.setAttribute('aria-expanded', String(open));
    syncToggleLabel();
    setBackgroundInert(open);
    document.body.classList.toggle('menu-open', open);

    if (window.VELLenis) {
      if (open && typeof window.VELLenis.stop === 'function') window.VELLenis.stop();
      if (!open && typeof window.VELLenis.start === 'function') window.VELLenis.start();
    }

    if (open) {
      menu.hidden = false;
      menu.removeAttribute('inert');
      window.requestAnimationFrame(() => {
        menu.classList.add('is-open');
        const firstLink = menu.querySelector('a');
        if (firstLink) firstLink.focus();
      });
      return;
    }

    menu.classList.remove('is-open');
    menu.setAttribute('inert', '');
    closeTimer = window.setTimeout(() => { menu.hidden = true; }, reduceMotion ? 0 : 400);
    if (restoreFocus) toggle.focus();
  }

  if (toggle && menu) {
    menu.setAttribute('inert', '');
    syncToggleLabel();

    toggle.addEventListener('click', () => setMenu(!menuIsOpen(), false));

    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenu(false, false);
    });

    document.addEventListener('keydown', (event) => {
      if (!menuIsOpen()) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        setMenu(false, true);
        return;
      }

      if (event.key !== 'Tab') return;
      const focusables = getMenuFocusables();
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!focusables.includes(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    });

    const desktop = window.matchMedia('(min-width: 1061px)');
    desktop.addEventListener('change', (event) => {
      if (event.matches && menuIsOpen()) setMenu(false, true);
    });

    document.addEventListener('vel:languagechange', syncToggleLabel);
  }

  /* ---- Contact form: Vercel function + Resend ---- */
  const form = document.querySelector('.contact-form');
  const status = form && form.querySelector('.form-status');

  if (form && status) {
    function setFormStatus(key, fallback, isError) {
      status.classList.toggle('is-error', Boolean(isError));
      status.setAttribute('role', isError ? 'alert' : 'status');
      status.textContent = tr(key, fallback);
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      form.setAttribute('aria-busy', 'true');
      setFormStatus('form.sending', 'Enviando…', false);

      try {
        const data = Object.fromEntries(new FormData(form).entries());
        const response = await fetch(form.getAttribute('action'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Bad response');
        form.reset();
        setFormStatus('form.success', 'Gracias. Te responderemos en breve.', false);
        status.focus({ preventScroll: true });
      } catch (error) {
        setFormStatus(
          'form.error',
          'No hemos podido enviar el formulario. Escríbenos a info@vitaledge-lab.com.',
          true
        );
        status.focus({ preventScroll: true });
      } finally {
        submitBtn.disabled = false;
        form.removeAttribute('aria-busy');
      }
    });
  }

  /* ---- Proyectos: mobile carousel scroll-position dots ---- */
  const projects = document.querySelector('.projects');
  const dotsWrap = document.querySelector('.projects__dots');

  if (projects && dotsWrap && !dotsWrap.dataset.ready) {
    dotsWrap.dataset.ready = 'true';
    const cards = [...projects.querySelectorAll('.project')];

    cards.forEach((card, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'projects__dot';
      dot.setAttribute(
        'aria-label',
        tr('a11y.projectDot', 'Ir al proyecto {current} de {total}')
          .replace('{current}', String(index + 1))
          .replace('{total}', String(cards.length))
      );
      dot.addEventListener('click', () => {
        card.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      });
      dotsWrap.appendChild(dot);
    });

    const dots = [...dotsWrap.children];
    const setActive = (activeIndex) => dots.forEach((dot, index) => {
      const active = index === activeIndex;
      dot.classList.toggle('is-active', active);
      if (active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    setActive(0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(cards.indexOf(entry.target));
      });
    }, { root: projects, threshold: 0.6 });

    cards.forEach((card) => observer.observe(card));
    window.addEventListener('pagehide', () => observer.disconnect(), { once: true });
  }
})();
