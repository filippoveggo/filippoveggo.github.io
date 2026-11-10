/**
 * Apple Liquid Glass & VisionOS Interactive Behaviors
 * Developed for Filippo Veggo Portfolio
 */

(function () {
  'use strict';

  // 1. Dynamic Navbar Scroll Elevation (rAF throttled to prevent forced reflow)
  const navContainer = document.querySelector('.liquid-nav-container');
  let ticking = false;

  const updateNavScroll = () => {
    if (!navContainer) return;
    if (window.scrollY > 24) {
      navContainer.classList.add('nav-scrolled');
    } else {
      navContainer.classList.remove('nav-scrolled');
    }
    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavScroll);
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavScroll);
  } else {
    window.requestAnimationFrame(updateNavScroll);
  }

  // 2. Interactive Specular Light Sheen on Glass Cards
  const cards = document.querySelectorAll('.glass-card');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.removeProperty('--mouse-x');
        card.style.removeProperty('--mouse-y');
      });
    });
  }

  // 3. Smooth Back-to-Top Button
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

  // 4. Smooth Anchor Link Navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      try {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      } catch (err) {
        // Fallback for non-standard selector or malformed hash
      }
    });
  });

  // 5. Active Link Highlight on Mobile Tab Bar
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
