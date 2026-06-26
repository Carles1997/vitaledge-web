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

  const gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);

  /* ---- Lenis smooth scroll, synced to the GSAP ticker ---- */
  if (window.Lenis) {
    const lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', window.ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

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

  /* ---- Generic scroll reveals (rise + fade, staggered for groups) ---- */
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    const isGroup = el.getAttribute('data-reveal') === 'group';
    const targets = isGroup ? el.children : el;
    gsap.from(targets, {
      y: 28,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: isGroup ? 0.08 : 0,
      scrollTrigger: { trigger: el, start: 'top 80%' }
    });
  });

  /* ---- Metodología: draw the sage connector as you scroll ---- */
  const progress = document.querySelector('.method__progress');
  if (progress) {
    gsap.to(progress, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: '.method', start: 'top 70%', end: 'bottom 85%', scrub: true }
    });
  }

  /* ---- Signature parallax — the lab-lens rings drift on scroll ---- */
  gsap.utils.toArray('.hero__signature').forEach((sig) => {
    gsap.to(sig, {
      yPercent: 16,
      ease: 'none',
      scrollTrigger: {
        trigger: sig.closest('section'),
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  /* Recalculate positions once fonts/images settle */
  window.addEventListener('load', () => window.ScrollTrigger.refresh());
})();
