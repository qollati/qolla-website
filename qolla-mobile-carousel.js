/* Qolla website: accessible mobile controls, no impact on the desktop gallery. */
(() => {
  'use strict';
  const gallery = document.querySelector('.glimpse-gallery');
  if (!gallery || gallery.nextElementSibling?.classList.contains('qolla-mobile-gallery-nav')) return;
  const shots = Array.from(gallery.querySelectorAll('.glimpse-shot'));
  if (shots.length < 2) return;
  const nav = document.createElement('div');
  nav.className = 'qolla-mobile-gallery-nav';
  nav.setAttribute('aria-label', 'App screenshots navigation');
  nav.innerHTML = '<button type="button" data-gallery-prev>← Back</button><span class="qolla-mobile-gallery-count" role="status" aria-live="polite">1 of ' + shots.length + '</span><button type="button" data-gallery-next>Next →</button>';
  gallery.insertAdjacentElement('afterend', nav);
  const previous = nav.querySelector('[data-gallery-prev]');
  const next = nav.querySelector('[data-gallery-next]');
  const count = nav.querySelector('.qolla-mobile-gallery-count');
  const mobile = window.matchMedia('(max-width: 767px)');
  const currentIndex = () => Math.max(0, Math.min(shots.length - 1, Math.round(gallery.scrollLeft / Math.max(gallery.clientWidth, 1))));
  const update = () => {
    const index = mobile.matches ? currentIndex() : 0;
    count.textContent = `${index + 1} of ${shots.length}`;
    previous.disabled = index === 0;
    next.disabled = index === shots.length - 1;
  };
  const go = (step) => {
    const index = Math.max(0, Math.min(shots.length - 1, currentIndex() + step));
    const target = shots[index];
    gallery.scrollTo({left: index * gallery.clientWidth, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    count.textContent = `${index + 1} of ${shots.length}`;
    previous.disabled = index === 0;
    next.disabled = index === shots.length - 1;
  };
  previous.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  gallery.addEventListener('scroll', () => window.requestAnimationFrame(update), {passive: true});
  window.addEventListener('resize', update);
  update();
})();
