// Fauno — Interactions

(function () {
  'use strict';

  // --- Navbar scroll effect ---
  const nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // --- Mobile navigation ---
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  function openMenu() {
    links.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    links.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    if (links.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  // Close mobile menu on link click
  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // --- Menu tabs ---
  var tabs = document.querySelectorAll('.menu-tab');
  var grids = document.querySelectorAll('.menu-grid');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-tab');

      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      grids.forEach(function (g) {
        if (g.id === 'tab-' + target) {
          g.classList.remove('hidden');
        } else {
          g.classList.add('hidden');
        }
      });
    });
  });

  // --- Wine tabs ---
  var wineTabs = document.querySelectorAll('.wine-tab');
  var wineCards = document.querySelectorAll('.wine-card');

  wineTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-wine');

      wineTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      wineCards.forEach(function (card) {
        if (target === 'all' || card.getAttribute('data-category') === target) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --- Wine lightbox ---
  var lightbox = document.getElementById('wine-lightbox');
  var lightboxImg = document.getElementById('wine-lightbox-img');
  var lightboxClose = document.getElementById('wine-lightbox-close');
  var lightboxPrev = document.getElementById('wine-lightbox-prev');
  var lightboxNext = document.getElementById('wine-lightbox-next');
  var currentWineIndex = 0;

  function getVisibleCards() {
    return Array.prototype.filter.call(wineCards, function (c) {
      return !c.classList.contains('hidden');
    });
  }

  function openLightbox(index) {
    var visible = getVisibleCards();
    currentWineIndex = index;
    var img = visible[index].querySelector('.wine-card-img');
    lightboxImg.src = img.getAttribute('data-full') || img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  function navigateLightbox(dir) {
    var visible = getVisibleCards();
    currentWineIndex = (currentWineIndex + dir + visible.length) % visible.length;
    var img = visible[currentWineIndex].querySelector('.wine-card-img');
    lightboxImg.src = img.getAttribute('data-full') || img.src;
    lightboxImg.alt = img.alt;
  }

  wineCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var visible = getVisibleCards();
      var idx = visible.indexOf(card);
      if (idx !== -1) openLightbox(idx);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', function () { navigateLightbox(-1); });
  lightboxNext.addEventListener('click', function () { navigateLightbox(1); });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // --- Scroll fade-in animations ---
  var fadeElements = document.querySelectorAll(
    '.menu-item, .contact-card, .about-text, .about-image, .wine-card'
  );

  fadeElements.forEach(function (el) {
    el.classList.add('fade-in');
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = nav.offsetHeight + 16;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
