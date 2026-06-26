// ─── Molecular network animation ───
const canvas = document.getElementById('molecular-canvas');
const ctx = canvas.getContext('2d');
let nodes = [];
const NODE_COUNT = 55;
const MAX_DIST = 140;
const AR = 91, AG = 184, AB = 212; // #5BB8D4

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function initNodes() {
  nodes = Array.from({ length: NODE_COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28,
    r: Math.random() * 1.5 + 0.5
  }));
}

function drawFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const n of nodes) {
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
    if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < MAX_DIST) {
        const a = (1 - dist / MAX_DIST) * 0.13;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${AR},${AG},${AB},${a})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
    ctx.beginPath();
    ctx.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${AR},${AG},${AB},0.28)`;
    ctx.fill();
  }

  requestAnimationFrame(drawFrame);
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  window.addEventListener('resize', () => { resize(); initNodes(); });
  resize();
  initNodes();
  drawFrame();
}

// ─── Scroll reveal for service cards ───
const cards = document.querySelectorAll('.service-card');

cards.forEach((card, i) => {
  if (prefersReducedMotion) return;
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(() => card.classList.add('visible'), i * 110);
      obs.unobserve(card);
    }
  }, { threshold: 0.15 });
  obs.observe(card);
});

// ─── Contact form ───
const form = document.getElementById('contact-form');
const confirm = document.getElementById('form-confirm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  confirm.textContent = 'Missatge enviat. Ens posarem en contacte aviat.';
  form.reset();
  setTimeout(() => { confirm.textContent = ''; }, 6000);
});
