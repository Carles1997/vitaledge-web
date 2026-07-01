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

  /* ---- Servicios: pinned horizontal-scroll track on desktop (photo left,
         text right). The first panel reveals together with the section
         headline, before the pin engages; the rest reveal as they scroll
         into view. Mobile keeps a vertical reveal. Each reveal: image fades
         with a gentle lens scale while the text rises in a stagger. ---- */
  function revealService(panel, st) {
    const media = panel.querySelector('.service__media');
    const lens = panel.querySelector('.service__lens');
    const bodyKids = panel.querySelectorAll('.service__body > *');
    const tl = gsap.timeline({ scrollTrigger: st });
    tl.from(media, { autoAlpha: 0, duration: 1, ease: 'power2.out' }, 0);
    if (lens) tl.from(lens, { scale: 1.06, duration: 1.3, ease: 'power3.out' }, 0);
    tl.from(bodyKids, { autoAlpha: 0, y: 24, duration: 0.85, ease: 'power3.out', stagger: 0.09 }, 0.15);
  }

  const servicesMM = gsap.matchMedia();

  servicesMM.add('(min-width: 860px)', () => {
    const track = document.querySelector('.services__list');
    const panels = gsap.utils.toArray('.service');
    if (!track || !panels.length) return;

    const distance = () => track.scrollWidth - window.innerWidth;
    const horizontal = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: '.services-viewport',
        start: 'top top',
        end: () => '+=' + distance(),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    // First panel appears elegantly with the headline, before the pin.
    revealService(panels[0], { trigger: '.servicios', start: 'top 70%' });
    // The remaining panels reveal as they slide into view horizontally.
    panels.slice(1).forEach((panel) => {
      revealService(panel, { trigger: panel, containerAnimation: horizontal, start: 'left 78%' });
    });
  });

  servicesMM.add('(max-width: 859px)', () => {
    gsap.utils.toArray('.service').forEach((panel) => {
      revealService(panel, { trigger: panel, start: 'top 82%' });
    });
  });

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
      filter: 'blur(14px)',
      duration: 1.2,
      ease: 'power3.out'
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

  /* ---- Signature parallax — the lab-lens rings drift on scroll ---- */
  gsap.utils.toArray('.signature-rings').forEach((sig) => {
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
