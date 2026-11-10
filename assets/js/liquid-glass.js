/**
 * Apple Pro Bento Grid & Liquid Glass Interactive Behaviors
 * Developed for Filippo Veggo Portfolio
 */

(function () {
  'use strict';

  // 1. Dynamic Navbar Scroll Elevation
  const navContainer = document.querySelector('.liquid-nav-container');
  const handleScroll = () => {
    if (!navContainer) return;
    if (window.scrollY > 24) {
      navContainer.classList.add('nav-scrolled');
    } else {
      navContainer.classList.remove('nav-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Interactive Specular Light Sheen on Glass & Bento Cards
  const cards = document.querySelectorAll('.glass-card, .bento-card');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        card.style.removeProperty('--mouse-x');
        card.style.removeProperty('--mouse-y');
      });
    });
  }

  // 3. Bento Grid Category Filter System
  const filterPills = document.querySelectorAll('.bento-filter-pill');
  const projectBentoCards = document.querySelectorAll('.bento-card[data-type]');

  if (filterPills.length > 0 && projectBentoCards.length > 0) {
    filterPills.forEach((pill) => {
      pill.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');

        // Update active tab state
        filterPills.forEach((p) => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');

        // Filter only cards with data-type (keeping static identity/contact tiles visible)
        projectBentoCards.forEach((card) => {
          const cardType = card.getAttribute('data-type');
          if (filter === 'all' || cardType === filter) {
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.style.filter = 'none';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. Smooth Back-to-Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 5. Smooth Anchor Link Navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 6. Active Link Highlight on Mobile Tab Bar
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const tabLinks = document.querySelectorAll('.mobile-liquid-tabbar .tab-item');
  tabLinks.forEach((tab) => {
    const href = tab.getAttribute('href');
    if (!href) return;
    const tabPath = href.replace(/\/$/, '') || '/';
    if (tabPath === currentPath) {
      tab.classList.add('active');
    }
  });

})();
