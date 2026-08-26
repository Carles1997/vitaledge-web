/* ============================================================
   VitalEdge Lab — animations.js
   GSAP + ScrollTrigger reveals, hero load sequence, the metodología
   connector draw, and signature parallax. Lenis drives smooth scroll.
   All motion is gated behind prefers-reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  // Respect reduced motion and bail if libraries didn't load — content
  // stays fully visible either way (progressive enhancement).
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !window.gsap || !window.ScrollTrigger) return;
  if (document.documentElement.dataset.animationsReady === 'true') return;
  document.documentElement.dataset.animationsReady = 'true';

  const gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);

  /* ---- Lenis smooth scroll, synced to the GSAP ticker ---- */
  if (window.Lenis) {
    const lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });
    window.VELLenis = lenis;
    lenis.on('scroll', window.ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ---- Navbar eases in on load ---- */
  gsap.from('[data-nav]', { y: -18, autoAlpha: 0, duration: 0.9, ease: 'power3.out' });

  /* ---- Hero load sequence — eyebrow, masked headline lines, sub, CTA ---- */
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    const lines = heroTitle.innerHTML.split(/<br\s*\/?>/i);
    heroTitle.innerHTML = lines
      .map((l) => `<span class="line-mask"><span class="line-inner">${l.trim()}</span></span>`)
      .join('');

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.hero__eyebrow', { y: 16, opacity: 0, duration: 0.8 })
      .from('.hero__title .line-inner', { yPercent: 115, duration: 0.9, stagger: 0.12 }, '-=0.3')
      .from('.hero__sub', { y: 20, opacity: 0, duration: 0.8 }, '-=0.45')
      .from('.hero__actions', { y: 20, opacity: 0, duration: 0.8 }, '-=0.5');
  }

  /* ---- Generic scroll reveals — a refined rise + fade, staggered for
         groups. Drives section headers, copy, cards and footer site-wide. ---- */
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    const isGroup = el.getAttribute('data-reveal') === 'group';
    const targets = isGroup ? el.children : el;
    // data-reveal-nostagger: rise as one block, for grids where the offset
    // between staggered items reads as broken alignment.
    const stagger = isGroup && !el.hasAttribute('data-reveal-nostagger') ? 0.08 : 0;
    gsap.from(targets, {
      y: 28,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger,
      scrollTrigger: { trigger: el, start: 'top 80%', once: true }
    });
  });

  /* ---- Servicios: one visible panel at a time.
         The section keeps the normal vertical document flow.
         Switching panels is handled in main.js. ---- */

  function revealService(panel, st) {
    const media = panel.querySelector('.service__media');
    const lens = panel.querySelector('.service__lens');

    const bodyKids = panel.querySelectorAll(
      '.service__body > *'
    );

    const tl = gsap.timeline({
      scrollTrigger: st
    });

    tl.from(
      media,
      {
        autoAlpha: 0,
        duration: 1,
        ease: 'power2.out'
      },
      0
    );

    if (lens) {
      tl.from(
        lens,
        {
          scale: 1.04,
          duration: 1.2,
          ease: 'power3.out'
        },
        0
      );
    }

    tl.from(
      bodyKids,
      {
        autoAlpha: 0,
        y: 22,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08
      },
      0.12
    );
  }

  const serviceTabs = gsap.utils.toArray(
    '[data-service-tab]'
  );

  if (serviceTabs.length) {
    gsap.from(serviceTabs, {
      y: 18,
      autoAlpha: 0,
      duration: 0.65,
      ease: 'power3.out',
      stagger: 0.06,

      scrollTrigger: {
        trigger: '.services__index',
        start: 'top 84%',
        once: true
      }
    });
  }

  const firstService = document.querySelector(
    '[data-service-panel]:not([hidden])'
  );

  if (firstService) {
    revealService(firstService, {
      trigger: firstService,
      start: 'top 82%',
      once: true
    });
  }

  /* ---- Metodología: draw the sage connector, and reveal each row as it
         scrolls into view so the titles appear one after another ---- */
  const progress = document.querySelector('.method__progress');
  if (progress) {
    gsap.to(progress, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: '.method', start: 'top 70%', end: 'bottom 85%', scrub: true }
    });
  }

  // Numbers stay put with their drawing line; each title+description is
  // tied to scroll (scrub) so it fades in on the way down and back out on
  // the way up, right as the line reaches that number.
  gsap.utils.toArray('.method__step').forEach((step) => {
    const content = step.querySelector('.method__content');
    gsap.from(content, {
      y: 24,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: step, start: 'top 80%', end: 'top 48%', scrub: true }
    });
  });

  /* ---- Cifras: each glass card eases in (rise + fade + scale + de-blur),
         then its number counts up from 0. Cards stagger for a sequence,
         plays once when the grid reaches the viewport. The +/% affixes are
         separate elements, so only the digits animate. ---- */
  gsap.utils.toArray('.stat').forEach((stat, i) => {
    const value = stat.querySelector('.stat__value');
    const end = value ? (parseInt(value.dataset.count, 10) || 0) : 0;
    const counter = { n: 0 };
    if (value) value.textContent = '0';

    const tl = gsap.timeline({
      delay: i * 0.15,
      scrollTrigger: { trigger: '.stats__grid', start: 'top 80%', once: true }
    });

    tl.from(stat, {
      y: 48,
      autoAlpha: 0,
      scale: 0.92,
      filter: 'blur(6px)',
      duration: 1.2,
      ease: 'power3.out',
      clearProps: 'transform,filter'
    });

    if (value) {
      tl.to(counter, {
        n: end,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => { value.textContent = Math.round(counter.n); }
      }, '-=0.8');
    }
  });

  /* Recalculate positions after critical assets and web fonts settle. */
  const refresh = () => window.ScrollTrigger.refresh();
  window.addEventListener('load', refresh, { once: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
})();
