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

  // --- Scroll fade-in animations ---
  var fadeElements = document.querySelectorAll(
    '.menu-item, .contact-card, .about-text, .about-image'
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
