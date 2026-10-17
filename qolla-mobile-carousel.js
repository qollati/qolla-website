/* Accessible indexed screenshot carousel for Qolla on narrow screens.
   Desktop gallery remains unchanged and the existing fullscreen buttons still work. */
(() => {
  'use strict';
  function ready() {
    const gallery = document.querySelector('.glimpse-gallery');
    if (!gallery) return;
    const shots = Array.from(gallery.querySelectorAll(':scope > .glimpse-shot'));
    if (shots.length < 2) return;
    const mobile = window.matchMedia('(max-width: 767px)');
    let index = 0;
    let nav = gallery.nextElementSibling;
    if (!nav || !nav.classList.contains('qolla-mobile-gallery-nav')) {
      nav = document.createElement('div');
      nav.className = 'qolla-mobile-gallery-nav';
      nav.setAttribute('role', 'group');
      nav.setAttribute('aria-label', 'Qolla screenshots');
      nav.innerHTML = '<button type="button" data-gallery-prev>← Back</button><span class="qolla-mobile-gallery-count" role="status" aria-live="polite"></span><button type="button" data-gallery-next>Next →</button>';
      gallery.insertAdjacentElement('afterend', nav);
    }
    const prev = nav.querySelector('[data-gallery-prev]');
    const next = nav.querySelector('[data-gallery-next]');
    const counter = nav.querySelector('.qolla-mobile-gallery-count');
    function render() {
      shots.forEach((shot, i) => {
        shot.dataset.qollaCurrent = i === index ? 'true' : 'false';
        // No duplicate tabs when navigating only by keyboard.
        const button = shot.querySelector('.shot-open');
        if (button) button.tabIndex = !mobile.matches || i === index ? 0 : -1;
      });
      counter.textContent = `${index + 1} of ${shots.length}`;
      prev.disabled = index === 0;
      next.disabled = index === shots.length - 1;
      nav.hidden = !mobile.matches;
    }
    function show(i) {
      const newIndex = Math.max(0, Math.min(shots.length - 1, i));
      if (newIndex === index) return;
      index = newIndex;
      render();
      // After tapping Next, show the start of the next image, not its lower edge.
      if (mobile.matches) gallery.scrollIntoView({block:'start', behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    }
    prev.addEventListener('click', () => show(index - 1));
    next.addEventListener('click', () => show(index + 1));
    let startX = null;
    let startY = null;
    gallery.addEventListener('touchstart', e => {
      if (!mobile.matches || e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, {passive:true});
    gallery.addEventListener('touchend', e => {
      if (!mobile.matches || startX === null || !e.changedTouches.length) return;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      startX = startY = null;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.35) show(index + (dx < 0 ? 1 : -1));
    }, {passive:true});
    if (mobile.addEventListener) mobile.addEventListener('change', render);
    else if (mobile.addListener) mobile.addListener(render);
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, {once:true});
  else ready();
})();
