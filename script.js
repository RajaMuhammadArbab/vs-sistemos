/* ============================================================
   HEADER + SLIDER — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Header Elements ───────────────────────────────── */
  const header        = document.querySelector('.header');
  const hamburgerBtn  = document.getElementById('hamburgerBtn');
  const mobileDrawer  = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const pvmToggle     = document.getElementById('pvmToggle');
  const pvmToggleMob  = document.getElementById('pvmToggleMobile');
  const pvmLabels     = document.querySelectorAll('.pvm-label');
  const searchInput   = document.querySelector('.search-input');
  const searchBtn     = document.querySelector('.search-btn');

  /* ── Hamburger / Drawer ───────────────────────────── */
  function openDrawer() {
    mobileDrawer.classList.add('is-open');
    drawerOverlay.classList.add('is-open');
    hamburgerBtn.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    mobileDrawer.classList.remove('is-open');
    drawerOverlay.classList.remove('is-open');
    hamburgerBtn.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  hamburgerBtn?.addEventListener('click', () =>
    mobileDrawer.classList.contains('is-open') ? closeDrawer() : openDrawer()
  );
  drawerOverlay?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
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

  /* ── PVM Toggle ───────────────────────────────────── */
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

  /* ── Search Dropdown ─────────────────────────────── */
  const searchWrap     = document.getElementById('searchWrap');
  const searchDropdown = document.getElementById('searchDropdown');
  const searchClearAll = document.getElementById('searchClearAll');
  const searchHistoryList = document.getElementById('searchHistoryList');

  function openDropdown()  { 
    searchDropdown?.classList.add('is-open'); 
    const overlay = document.getElementById('pageOverlay');
    if (overlay) { overlay.style.opacity = '1'; overlay.style.visibility = 'visible'; }
  }
  function closeDropdown() { 
    searchDropdown?.classList.remove('is-open'); 
    if (!document.getElementById('catDropdown')?.classList.contains('is-open')) {
      const overlay = document.getElementById('pageOverlay');
      if (overlay) { overlay.style.opacity = '0'; overlay.style.visibility = 'hidden'; }
    }
  }

  searchInput?.addEventListener('focus', openDropdown);

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
    searchHistoryList.innerHTML = '';
    closeDropdown();
  });

  function doSearch() {
    const q = searchInput?.value.trim();
    if (!q) return;
    const li = document.createElement('li');
    li.className = 'search-history-item';
    li.innerHTML = `<i class="fa-regular fa-clock search-history-icon"></i><span class="search-history-text">${q}</span><button class="search-remove-btn">×</button>`;
    searchHistoryList?.prepend(li);
    closeDropdown();
  }
  searchBtn?.addEventListener('click', doSearch);
  searchInput?.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

  /* ── Sticky shadow ────────────────────────────────── */
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 4
      ? '0 4px 16px rgba(0,0,0,0.13)'
      : '0px 1px 3px 0px rgba(0,0,0,.10), 0px 1px 2px -1px rgba(0,0,0,.10)';
  }, { passive: true });


  /* ── Contact Dropdown ─────────────────────────────── */
  const contactWrap = document.getElementById('contactDropdownWrap');
  const contactDropdown = document.getElementById('contactDropdown');
  
  if (contactWrap && contactDropdown) {
    contactWrap.addEventListener('mouseenter', () => contactDropdown.classList.add('is-open'));
    contactWrap.addEventListener('mouseleave', () => contactDropdown.classList.remove('is-open'));
  }

  /* ── Cart Dropdown ────────────────────────────────── */
  const cartWrap = document.getElementById('cartDropdownWrap');
  const cartDropdown = document.getElementById('cartDropdown');
  
  if (cartWrap && cartDropdown) {
    cartWrap.addEventListener('mouseenter', () => cartDropdown.classList.add('is-open'));
    cartWrap.addEventListener('mouseleave', () => cartDropdown.classList.remove('is-open'));
  }

  /* ── Categories Mega Dropdown ─────────────────────── */
  const catBtn      = document.getElementById('catBtn');
  const catDropdown = document.getElementById('catDropdown');
  const catWrap     = document.getElementById('catWrap');
  const catItems    = document.querySelectorAll('.cat-item');
  const catSubLists = document.querySelectorAll('.cat-sub-list');

  function positionCatDropdown() {
    if (!catBtn || !catDropdown) return;
    const rect = catBtn.getBoundingClientRect();
    catDropdown.style.top  = (rect.bottom + 8) + 'px';
    if (window.innerWidth > 768) {
      catDropdown.style.left = rect.left + 'px';
    } else {
      catDropdown.style.left = '16px';
    }
  }

  function openCat()  {
    positionCatDropdown();
    catDropdown?.classList.add('is-open');
    catBtn?.classList.add('is-active');
  }
  function closeCat() { catDropdown?.classList.remove('is-open'); catBtn?.classList.remove('is-active'); }
  function toggleCat() { catDropdown?.classList.contains('is-open') ? closeCat() : openCat(); }

  function openCatFinal()  {
    positionCatDropdown();
    catDropdown?.classList.add('is-open');
    catBtn?.classList.add('is-active');
    const overlay = document.getElementById('pageOverlay');
    if (overlay) { overlay.style.opacity = '1'; overlay.style.visibility = 'visible'; }
  }
  function closeCatFinal() {
    catDropdown?.classList.remove('is-open');
    catBtn?.classList.remove('is-active');
    if (!document.getElementById('searchDropdown')?.classList.contains('is-open')) {
      const overlay = document.getElementById('pageOverlay');
      if (overlay) { overlay.style.opacity = '0'; overlay.style.visibility = 'hidden'; }
    }
  }

  catBtn?.addEventListener('click', e => { e.stopPropagation(); catDropdown?.classList.contains('is-open') ? closeCatFinal() : openCatFinal(); });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!catWrap?.contains(e.target) && !catDropdown?.contains(e.target)) closeCatFinal();
  });
  const pageOverlayEl = document.getElementById('pageOverlay');
  pageOverlayEl?.addEventListener('click', () => { closeCatFinal(); closeDropdown(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeCatFinal(); closeDropdown(); } });
  window.addEventListener('scroll', positionCatDropdown);
  window.addEventListener('resize', () => { positionCatDropdown(); if (catDropdown?.classList.contains('is-open')) closeCatFinal(); });

  // Hover on category item — show subcategory
  catItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      catItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const cat = item.dataset.cat;
      catSubLists.forEach(s => s.classList.remove('active'));
      const target = document.querySelector(`.cat-sub-list[data-sub="${cat}"]`);
      if (target) target.classList.add('active');
    });
  });

  /* ══════════════════════════════════════════════════
     HERO SLIDER
  ══════════════════════════════════════════════════ */
  const track    = document.getElementById('sliderTrack');
  const prevBtn  = document.getElementById('sliderPrev');
  const nextBtn  = document.getElementById('sliderNext');
  const dots     = document.querySelectorAll('.slider-dots .dot');
  const total    = dots.length; // 8
  let current    = 0;
  let autoTimer  = null;
  let isTransitioning = false;

  let numSlides = 0;

  // Clone first and last slide for infinite loop
  if (track && track.children.length > 0) {
    const firstClone = track.children[0].cloneNode(true);
    const lastClone = track.children[track.children.length - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, track.children[0]);
    
    numSlides = track.children.length; // 10
    track.style.width = `${numSlides * 100}%`;
    Array.from(track.children).forEach(slide => {
      slide.style.width = `${100 / numSlides}%`;
      slide.style.minWidth = '0'; // override CSS min-width
      slide.style.flexShrink = '0';
    });

    // The visual slides are now 1 to total (indices 1 to total)
    // Adjust track transform to start at original first slide
    track.style.transition = 'none';
    track.style.transform = `translateX(-${100 / numSlides}%)`;
  }

  function goTo(index) {
    if (isTransitioning || !numSlides) return;
    isTransitioning = true;
    current = index;
    track.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
    track.style.transform = `translateX(-${(current + 1) * (100 / numSlides)}%)`;
    
    // Update dots (handle out of bounds visually)
    let dotIndex = current;
    if (current === total) dotIndex = 0;
    if (current === -1) dotIndex = total - 1;
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
    }, 500);
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => {
      if (!isTransitioning) goTo(current + 1);
    }, 5000);
  }
  function stopAuto() {
    clearInterval(autoTimer);
  }

  prevBtn?.addEventListener('click', () => { if (!isTransitioning) { goTo(current - 1); startAuto(); } });
  nextBtn?.addEventListener('click', () => { if (!isTransitioning) { goTo(current + 1); startAuto(); } });
  dots.forEach(d => d.addEventListener('click', () => { if (!isTransitioning) { goTo(+d.dataset.index); startAuto(); } }));

  /* Touch / swipe support */
  let touchStartX = 0;
  track?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; stopAuto(); }, { passive: true });
  track?.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40 && !isTransitioning) { 
      goTo(diff > 0 ? current + 1 : current - 1); 
    }
    startAuto();
  }, { passive: true });

  startAuto();

});
