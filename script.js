/* ============================================================
   VS SISTEMOS — script.js  |  Full Mobile + Desktop Support
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════════════════
     HAMBURGER / MOBILE DRAWER
  ══════════════════════════════════════════════════ */
  const hamburgerBtn  = document.getElementById('hamburgerBtn');
  const mobileDrawer  = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  function openDrawer() {
    mobileDrawer?.classList.add('is-open');
    drawerOverlay?.classList.add('is-open');
    hamburgerBtn?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    mobileDrawer?.classList.remove('is-open');
    drawerOverlay?.classList.remove('is-open');
    hamburgerBtn?.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  hamburgerBtn?.addEventListener('click', () =>
    mobileDrawer?.classList.contains('is-open') ? closeDrawer() : openDrawer()
  );

  const headerSearchIcon = document.querySelector('.search-icon-mobile');
  headerSearchIcon?.addEventListener('click', (e) => {
    e.preventDefault();
    openDrawer();
    setTimeout(() => {
      document.getElementById('mobileSearchInput')?.focus();
    }, 300);
  });

  drawerOverlay?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDrawer(); closeCatFinal(); closeDropdown(); } });
  window.addEventListener('resize', () => { if (window.innerWidth > 768) closeDrawer(); });

  /* Clone categories for mobile drawer */
  const drawerCatBtn = document.querySelector('.drawer-cat-btn');
  const catList = document.getElementById('catList');
  if (drawerCatBtn && catList) {
    const mobileCatList = catList.cloneNode(true);
    mobileCatList.id = 'mobileCatList';
    mobileCatList.className = 'mobile-cat-list';
    mobileCatList.style.display = 'none';
    drawerCatBtn.after(mobileCatList);

    drawerCatBtn.addEventListener('click', () => {
      const isHidden = mobileCatList.style.display === 'none';
      mobileCatList.style.display = isHidden ? 'block' : 'none';
      drawerCatBtn.classList.toggle('active', isHidden);
    });
  }

  /* ══════════════════════════════════════════════════
     PVM TOGGLE
  ══════════════════════════════════════════════════ */
  const pvmToggle    = document.getElementById('pvmToggle');
  const pvmToggleMob = document.getElementById('pvmToggleMobile');
  const pvmLabels    = document.querySelectorAll('.pvm-label');

  function syncPvm(checked) {
    pvmLabels.forEach(el => {
      el.style.color      = checked ? '#7BC143' : '#555';
      el.style.fontWeight = checked ? '700' : '500';
    });
    if (pvmToggle)    pvmToggle.checked    = checked;
    if (pvmToggleMob) pvmToggleMob.checked = checked;
  }
  pvmToggle?.addEventListener('change',    () => syncPvm(pvmToggle.checked));
  pvmToggleMob?.addEventListener('change', () => syncPvm(pvmToggleMob.checked));

  /* ══════════════════════════════════════════════════
     SEARCH DROPDOWN
  ══════════════════════════════════════════════════ */
  const searchWrap        = document.getElementById('searchWrap');
  const searchDropdown    = document.getElementById('searchDropdown');
  const searchInput       = document.querySelector('.search-input');
  const searchBtn         = document.querySelector('.search-btn');
  const searchClearAll    = document.getElementById('searchClearAll');
  const searchHistoryList = document.getElementById('searchHistoryList');

  function openDropdown() {
    searchDropdown?.classList.add('is-open');
    showOverlay();
  }
  function closeDropdown() {
    searchDropdown?.classList.remove('is-open');
    if (!document.getElementById('catDropdown')?.classList.contains('is-open')) hideOverlay();
  }

  searchInput?.addEventListener('focus', openDropdown);
  // also open on tap for mobile
  searchInput?.addEventListener('touchstart', openDropdown, { passive: true });

  document.addEventListener('click', e => {
    if (!searchWrap?.contains(e.target)) closeDropdown();
  });

  searchHistoryList?.addEventListener('click', e => {
    const btn = e.target.closest('.search-remove-btn');
    if (btn) {
      e.stopPropagation();
      btn.closest('.search-history-item')?.remove();
      if (!searchHistoryList.querySelector('.search-history-item')) closeDropdown();
    }
  });

  searchClearAll?.addEventListener('click', () => {
    if (searchHistoryList) searchHistoryList.innerHTML = '';
    closeDropdown();
  });

  function doSearch(inputEl) {
    const q = inputEl?.value.trim();
    if (!q) return;
    const li = document.createElement('li');
    li.className = 'search-history-item';
    li.innerHTML = `<i class="fa-regular fa-clock search-history-icon"></i><span class="search-history-text">${q}</span><button class="search-remove-btn">×</button>`;
    searchHistoryList?.prepend(li);
    closeDropdown();
    inputEl.value = ''; // clear after search
  }
  searchBtn?.addEventListener('click', (e) => { e.preventDefault(); doSearch(searchInput); });
  searchInput?.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); doSearch(searchInput); } });

  const mobileSearchBtn = document.getElementById('mobileSearchBtn');
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  mobileSearchBtn?.addEventListener('click', () => { doSearch(mobileSearchInput); closeDrawer(); });
  mobileSearchInput?.addEventListener('keydown', e => { if (e.key === 'Enter') { doSearch(mobileSearchInput); closeDrawer(); } });

  /* ══════════════════════════════════════════════════
     PAGE OVERLAY HELPERS
  ══════════════════════════════════════════════════ */
  function showOverlay() {
    const overlay = document.getElementById('pageOverlay');
    if (overlay) { overlay.style.opacity = '1'; overlay.style.visibility = 'visible'; }
  }
  function hideOverlay() {
    const overlay = document.getElementById('pageOverlay');
    if (overlay) { overlay.style.opacity = '0'; overlay.style.visibility = 'hidden'; }
  }

  /* ══════════════════════════════════════════════════
     STICKY HEADER SHADOW
  ══════════════════════════════════════════════════ */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 4
      ? '0 4px 16px rgba(0,0,0,0.13)'
      : '0px 1px 3px 0px rgba(0,0,0,.10), 0px 1px 2px -1px rgba(0,0,0,.10)';
  }, { passive: true });

  /* ══════════════════════════════════════════════════
     CONTACT DROPDOWN (hover desktop, tap mobile)
  ══════════════════════════════════════════════════ */
  const contactWrap     = document.getElementById('contactDropdownWrap');
  const contactDropdown = document.getElementById('contactDropdown');

  if (contactWrap && contactDropdown) {
    contactWrap.addEventListener('mouseenter', () => contactDropdown.classList.add('is-open'));
    contactWrap.addEventListener('mouseleave', () => contactDropdown.classList.remove('is-open'));
    contactWrap.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      contactDropdown.classList.toggle('is-open');
    });
    document.addEventListener('click', e => {
      if (!contactWrap.contains(e.target)) contactDropdown.classList.remove('is-open');
    });
  }

  /* ══════════════════════════════════════════════════
     CART DROPDOWN (hover desktop, tap mobile)
  ══════════════════════════════════════════════════ */
  const cartWrap     = document.getElementById('cartDropdownWrap');
  const cartDropdown = document.getElementById('cartDropdown');

  if (cartWrap && cartDropdown) {
    cartWrap.addEventListener('mouseenter', () => cartDropdown.classList.add('is-open'));
    cartWrap.addEventListener('mouseleave', () => cartDropdown.classList.remove('is-open'));
    cartWrap.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      cartDropdown.classList.toggle('is-open');
    });
    document.addEventListener('click', e => {
      if (!cartWrap.contains(e.target)) cartDropdown.classList.remove('is-open');
    });
  }

  /* ══════════════════════════════════════════════════
     CATEGORIES MEGA DROPDOWN
  ══════════════════════════════════════════════════ */
  const catBtn      = document.getElementById('catBtn');
  const catDropdown = document.getElementById('catDropdown');
  const catWrap     = document.getElementById('catWrap');
  const catItems    = document.querySelectorAll('.cat-item');
  const catSubLists = document.querySelectorAll('.cat-sub-list');

  function positionCatDropdown() {
    if (!catBtn || !catDropdown) return;
    const rect = catBtn.getBoundingClientRect();
    catDropdown.style.top = (rect.bottom + 8) + 'px';
    if (window.innerWidth > 768) {
      catDropdown.style.left = rect.left + 'px';
    } else {
      catDropdown.style.left = '16px';
      catDropdown.style.right = '16px';
      catDropdown.style.width = 'auto';
    }
  }

  function openCatFinal() {
    positionCatDropdown();
    catDropdown?.classList.add('is-open');
    catBtn?.classList.add('is-active');
    showOverlay();
  }
  function closeCatFinal() {
    catDropdown?.classList.remove('is-open');
    catBtn?.classList.remove('is-active');
    if (!document.getElementById('searchDropdown')?.classList.contains('is-open')) hideOverlay();
  }

  catBtn?.addEventListener('click', e => {
    e.stopPropagation();
    catDropdown?.classList.contains('is-open') ? closeCatFinal() : openCatFinal();
  });

  document.addEventListener('click', e => {
    if (!catWrap?.contains(e.target) && !catDropdown?.contains(e.target)) closeCatFinal();
  });

  const pageOverlayEl = document.getElementById('pageOverlay');
  pageOverlayEl?.addEventListener('click', () => { closeCatFinal(); closeDropdown(); });
  window.addEventListener('scroll', positionCatDropdown, { passive: true });
  window.addEventListener('resize', () => { positionCatDropdown(); if (catDropdown?.classList.contains('is-open')) closeCatFinal(); });

  catItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      catItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const cat = item.dataset.cat;
      catSubLists.forEach(s => s.classList.remove('active'));
      document.querySelector(`.cat-sub-list[data-sub="${cat}"]`)?.classList.add('active');
    });
    // also support tap on mobile
    item.addEventListener('click', () => {
      catItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const cat = item.dataset.cat;
      catSubLists.forEach(s => s.classList.remove('active'));
      document.querySelector(`.cat-sub-list[data-sub="${cat}"]`)?.classList.add('active');
    });
  });

  /* ══════════════════════════════════════════════════
     HERO SLIDER — with touch/swipe
  ══════════════════════════════════════════════════ */
  const track   = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const dots    = document.querySelectorAll('.slider-dots .dot');
  const total   = dots.length;
  let current   = 0;
  let autoTimer = null;
  let isTransitioning = false;
  let numSlides = 0;

  if (track && track.children.length > 0) {
    const firstClone = track.children[0].cloneNode(true);
    const lastClone  = track.children[track.children.length - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, track.children[0]);

    numSlides = track.children.length;
    track.style.width = `${numSlides * 100}%`;
    Array.from(track.children).forEach(slide => {
      slide.style.width    = `${100 / numSlides}%`;
      slide.style.minWidth = '0';
      slide.style.flexShrink = '0';
    });

    track.style.transition = 'none';
    track.style.transform  = `translateX(-${100 / numSlides}%)`;
  }

  function goTo(index) {
    if (isTransitioning || !numSlides) return;
    isTransitioning = true;
    current = index;
    track.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
    track.style.transform  = `translateX(-${(current + 1) * (100 / numSlides)}%)`;

    let dotIndex = current;
    if (current === total)  dotIndex = 0;
    if (current === -1)     dotIndex = total - 1;
    dots.forEach((d, i) => d.classList.toggle('active', i === dotIndex));

    setTimeout(() => {
      isTransitioning = false;
      if (current === total) {
        track.style.transition = 'none';
        current = 0;
        track.style.transform = `translateX(-${100 / numSlides}%)`;
      } else if (current === -1) {
        track.style.transition = 'none';
        current = total - 1;
        track.style.transform = `translateX(-${total * (100 / numSlides)}%)`;
      }
    }, 510);
  }

  function startAuto() { stopAuto(); autoTimer = setInterval(() => { if (!isTransitioning) goTo(current + 1); }, 5000); }
  function stopAuto()  { clearInterval(autoTimer); }

  prevBtn?.addEventListener('click', () => { if (!isTransitioning) { goTo(current - 1); startAuto(); } });
  nextBtn?.addEventListener('click', () => { if (!isTransitioning) { goTo(current + 1); startAuto(); } });
  dots.forEach(d => d.addEventListener('click', () => { if (!isTransitioning) { goTo(+d.dataset.index); startAuto(); } }));

  /* Touch/swipe for hero slider */
  let heroTouchX = 0;
  track?.addEventListener('touchstart', e => { heroTouchX = e.touches[0].clientX; stopAuto(); }, { passive: true });
  track?.addEventListener('touchend', e => {
    const diff = heroTouchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40 && !isTransitioning) goTo(diff > 0 ? current + 1 : current - 1);
    startAuto();
  }, { passive: true });

  startAuto();

  /* ══════════════════════════════════════════════════
     HELPER: build a touch-swipeable carousel for
     any { wrap, grid, prevBtn, nextBtn, dotsEl }
  ══════════════════════════════════════════════════ */
  function makeCarousel({ wrap, grid, prev, next }) {
    if (!wrap || !grid) return;

    let isDragging   = false;
    let startX       = 0;
    let scrollLeft   = 0;

    /* Mouse drag (desktop) */
    grid.addEventListener('mousedown', e => {
      isDragging = true;
      startX     = e.pageX - grid.offsetLeft;
      scrollLeft = grid.scrollLeft;
      grid.style.cursor = 'grabbing';
    });
    grid.addEventListener('mouseleave', () => { isDragging = false; grid.style.cursor = ''; });
    grid.addEventListener('mouseup',    () => { isDragging = false; grid.style.cursor = ''; });
    grid.addEventListener('mousemove', e => {
      if (!isDragging) return;
      e.preventDefault();
      const x    = e.pageX - grid.offsetLeft;
      const walk = (x - startX) * 1.5;
      grid.scrollLeft = scrollLeft - walk;
    });

    /* Arrow buttons scroll one card width */
    function scrollByCard(dir) {
      const card = grid.querySelector('[class*="-card"]');
      const cardW = card ? card.offsetWidth + 24 : 300;
      grid.scrollBy({ left: dir * cardW, behavior: 'smooth' });
    }

    prev?.addEventListener('click', () => scrollByCard(-1));
    next?.addEventListener('click', () => scrollByCard(1));

    /* Ensure grid is scrollable natively */
    grid.style.overflowX  = 'auto';
    grid.style.scrollBehavior = 'smooth';
    grid.style.scrollbarWidth = 'none';
    grid.style.cursor = 'grab';
  }

  /* Apply to all product/discount/reviews/blog/stats carousels */
  const carousels = [
    {
      wrap: document.querySelector('.products-carousel-wrap'),
      grid: document.querySelector('.products-section .products-grid'),
      prev: document.querySelector('.products-section .prod-prev'),
      next: document.querySelector('.products-section .prod-next'),
    },
    {
      wrap: document.querySelector('.discount-section .products-carousel-wrap'),
      grid: document.querySelector('.discount-section .products-grid'),
      prev: document.querySelector('.discount-section .prod-prev'),
      next: document.querySelector('.discount-section .prod-next'),
    },
    {
      wrap: document.querySelector('.reviews-carousel-wrap'),
      grid: document.querySelector('.reviews-grid'),
      prev: document.querySelector('.reviews-section .prod-prev'),
      next: document.querySelector('.reviews-section .prod-next'),
    },
    {
      wrap: document.querySelector('.blog-carousel-wrap'),
      grid: document.querySelector('.blog-grid'),
      prev: document.querySelector('.blog-section .prod-prev'),
      next: document.querySelector('.blog-section .prod-next'),
    },
  ];

  carousels.forEach(makeCarousel);

});
