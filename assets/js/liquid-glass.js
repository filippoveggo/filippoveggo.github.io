/**
 * Apple Liquid Glass & VisionOS Interactive Behaviors
 * Developed for Filippo Veggo Portfolio
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Bilingual Translation Dictionary (EN / IT)
     ========================================================================== */
  const TRANSLATIONS = {
    // Navigation
    'nav.home': {
      en: 'Home',
      it: 'Home'
    },
    'nav.about': {
      en: 'About',
      it: 'Chi Sono'
    },
    'nav.contact': {
      en: 'Contact',
      it: 'Contatti'
    },
    'nav.theme': {
      en: 'Theme',
      it: 'Tema'
    },

    // Hero Section
    'hero.status': {
      en: 'Available for UI/UX & Web Development',
      it: 'Disponibile per progetti UI/UX & Sviluppo Web'
    },
    'hero.tagline': {
      en: 'Front-End Developer & UI/UX Designer crafting sleek web platforms, responsive experiences, and mobile apps with Apple-grade polish.',
      it: 'Front-End Developer & UI/UX Designer specializzato nella creazione di piattaforme web e app con interfaccia ispirata agli standard Apple.'
    },
    'hero.explore': {
      en: 'Explore Work',
      it: 'I Miei Lavori'
    },
    'hero.about': {
      en: 'About Me',
      it: 'Chi Sono'
    },
    'hero.contact': {
      en: 'Get in Touch',
      it: 'Contattami'
    },
    'hero.connect': {
      en: 'Connect:',
      it: 'Social & Contatti:'
    },

    // Portfolio Section
    'portfolio.eyebrow': {
      en: 'Portfolio',
      it: 'Portfolio'
    },
    'portfolio.title': {
      en: 'Selected Projects & Work',
      it: 'Progetti Selezionati & Lavori'
    },
    'portfolio.subtitle': {
      en: 'A collection of web applications, mobile user interfaces, and client projects built with modern technologies.',
      it: 'Una raccolta di applicazioni web, interfacce mobile e progetti sviluppati con tecnologie moderne.'
    },
    'portfolio.counter': {
      en: 'Projects',
      it: 'Progetti'
    },
    'portfolio.explore': {
      en: 'Explore Project',
      it: 'Esplora Progetto'
    },

    // About Header
    'about.breadcrumb.home': {
      en: 'Home',
      it: 'Home'
    },
    'about.breadcrumb.about': {
      en: 'About Me',
      it: 'Chi Sono'
    },
    'about.hero.tagline': {
      en: 'Front-End Developer, Flutter enthusiast & UI/UX designer focused on building fluid, accessible, and delightful digital interfaces.',
      it: 'Front-End Developer, appassionato di Flutter e UI/UX designer dedicato alla creazione di interfacce fluide, accessibili e curate nei dettagli.'
    },

    // About Main Content
    'about.badge.background': {
      en: 'Background',
      it: 'Percorso'
    },
    'about.title.whoiam': {
      en: 'Who I Am',
      it: 'Chi Sono'
    },
    'about.text.p1': {
      en: 'I am currently pursuing a bachelor\'s degree in <strong>"Gestione d\'Impresa"</strong> (L-18) to pursue my passion for economics and management.',
      it: 'Attualmente frequento il corso di laurea triennale in <strong>"Gestione d\'Impresa"</strong> (L-18) per approfondire la mia passione per economia e management.'
    },
    'about.text.p2': {
      en: 'Student at <strong>ITIS "C. Zuccante"</strong> in Mestre (Venice, Italy). Passionate about combining software engineering and elegant visual aesthetics to create intuitive, human-centered digital experiences.',
      it: 'Diplomato presso l\'<strong>ITIS "C. Zuccante"</strong> di Mestre (Venezia). Appassionato nel fondere ingegneria del software ed eleganza visiva per creare esperienze digitali intuitive e incentrate sulle persone.'
    },
    'about.text.p3': {
      en: 'Deeply focused on <strong>UI/UX design</strong>, modern front-end web development, and mobile app design with Flutter. Inspired by Apple\'s Human Interface Guidelines and modern glassmorphic interface paradigms.',
      it: 'Focalizzato su <strong>UI/UX design</strong>, sviluppo web front-end moderno e applicazioni mobile in Flutter. Ispirato alle Human Interface Guidelines di Apple e al design glassmorfico d\'avanguardia.'
    },
    'about.highlights.frontend': {
      en: 'Front-End Architecture',
      it: 'Architettura Front-End'
    },
    'about.highlights.liquid': {
      en: 'Apple Liquid Glass UI',
      it: 'Apple Liquid Glass UI'
    },
    'about.highlights.flutter': {
      en: 'Flutter & Mobile',
      it: 'Flutter & Mobile'
    },
    'about.highlights.responsive': {
      en: 'Responsive Systems',
      it: 'Sistemi Responsive'
    },

    // Skills Card
    'about.badge.skills': {
      en: 'Technical Arsenal',
      it: 'Competenze Tecniche'
    },
    'about.title.skills': {
      en: 'Skills & Technologies',
      it: 'Competenze & Tecnologie'
    },
    'about.skill.web': {
      en: 'Web & Front-End',
      it: 'Web & Front-End'
    },
    'about.skill.mobile': {
      en: 'Mobile Development',
      it: 'Sviluppo Mobile'
    },
    'about.skill.languages': {
      en: 'Languages & Systems',
      it: 'Linguaggi & Sistemi'
    },
    'about.skill.design': {
      en: 'UI / UX Design',
      it: 'Design UI / UX'
    },

    // Projects Card
    'about.badge.projects': {
      en: 'Open Source & Projects',
      it: 'Open Source & Progetti'
    },
    'about.title.projects': {
      en: 'Featured Highlights',
      it: 'Progetti in Evidenza'
    },
    'about.proj1.title': {
      en: 'Flutter Client for Classeviva',
      it: 'Client Flutter per Classeviva'
    },
    'about.proj1.desc': {
      en: 'Comprehensive mobile client for Italian electronic school register data management. UI/UX design and core screens.',
      it: 'Client mobile completo per la gestione dei dati del registro elettronico scolastico. UI/UX design e schermate principali.'
    },
    'about.proj2.title': {
      en: 'STEM Educational Website',
      it: 'Sito Web Didattico STEM'
    },
    'about.proj2.desc': {
      en: 'High school web project showcasing scientific and technological concepts through an interactive interface.',
      it: 'Progetto web scolastico per la divulgazione di concetti scientifici e tecnologici attraverso un\'interfaccia interattiva.'
    },
    'about.disclaimer': {
      en: 'Several commercial projects (including Residenza Ugolini, MyRoma, and Artivism) are private or proprietary third-party developments. See the <a href="/">case studies on the homepage</a> for visual previews and details.',
      it: 'Diversi progetti commerciali (tra cui Residenza Ugolini, MyRoma e Artivism) sono sviluppi proprietari per terze parti. Consulta i <a href="/">casi studio sulla homepage</a> per anteprime visive e dettagli.'
    },

    // About CTA Card
    'about.cta.badge': {
      en: 'Get in Touch',
      it: 'Contattami'
    },
    'about.cta.title': {
      en: 'Let’s collaborate on something great.',
      it: 'Collaboriamo a un grande progetto.'
    },
    'about.cta.text': {
      en: 'Have a project idea, front-end design challenge, or internship opportunity? Feel free to reach out anytime.',
      it: 'Hai un\'idea di progetto, una sfida di design front-end o un\'opportunità di collaborazione? Contattami quando vuoi.'
    },
    'about.cta.email': {
      en: 'Send an Email',
      it: 'Invia un\'Email'
    },
    'about.cta.github': {
      en: 'View GitHub',
      it: 'Vedi GitHub'
    },

    // Post Page
    'post.back': {
      en: 'Back to All Projects',
      it: 'Torna a Tutti i Progetti'
    },
    'post.discuss': {
      en: 'Discuss This Project',
      it: 'Discuti Questo Progetto'
    },

    // Footer
    'footer.desc': {
      en: 'Front-End Developer & UI/UX Designer. Crafting intuitive digital products with modern web technologies and Apple human interface design principles.',
      it: 'Front-End Developer & UI/UX Designer. Creo prodotti digitali intuitivi con tecnologie web moderne e principi di design Apple.'
    },
    'footer.nav_title': {
      en: 'Navigation',
      it: 'Navigazione'
    },
    'footer.featured_projects': {
      en: 'Featured Projects',
      it: 'Progetti in Evidenza'
    },
    'footer.about_me': {
      en: 'About Me',
      it: 'Chi Sono'
    },
    'footer.contact': {
      en: 'Contact',
      it: 'Contatti'
    },
    'footer.connect_title': {
      en: 'Connect',
      it: 'Social & Contatti'
    },
    'footer.rights': {
      en: 'All rights reserved.',
      it: 'Tutti i diritti riservati.'
    },
    'footer.back_to_top': {
      en: 'Back to Top',
      it: 'Torna su'
    },
    'footer.cookies': {
      en: 'Cookie Preferences',
      it: 'Preferenze Cookie'
    },

    // Cookie & Privacy Consent Banner
    'cookie.title': {
      en: 'Privacy & Cookies',
      it: 'Privacy & Cookie'
    },
    'cookie.desc': {
      en: 'This website uses anonymous analytics cookies (Google Analytics via GTM) to understand traffic patterns and improve performance. Functional preferences (theme and language) use local storage.',
      it: 'Questo sito utilizza cookie analitici anonimi (Google Analytics tramite GTM) per comprendere il traffico e migliorare l\'esperienza. Le preferenze funzionali (tema e lingua) utilizzano la memoria locale.'
    },
    'cookie.accept': {
      en: 'Accept All',
      it: 'Accetta Tutti'
    },
    'cookie.decline': {
      en: 'Essential Only',
      it: 'Solo Necessari'
    }
  };

  /* ==========================================================================
     2. Theme Management Engine
     ========================================================================== */
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  function setTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // Storage unavailable or blocked
    }

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'light' ? '#f5f5f7' : '#070913');
    }

    const themeTitle = theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.setAttribute('title', themeTitle);
      themeBtn.setAttribute('aria-label', themeTitle);
    }
    const mobileThemeBtn = document.getElementById('mobile-theme-toggle-btn');
    if (mobileThemeBtn) {
      mobileThemeBtn.setAttribute('title', themeTitle);
      mobileThemeBtn.setAttribute('aria-label', themeTitle);
    }
  }

  /* ==========================================================================
     3. Bilingual (EN / IT) Translation Engine
     ========================================================================== */
  function getLanguage() {
    return document.documentElement.lang || 'en';
  }

  function applyLanguage(lang) {
    const validLang = lang === 'it' ? 'it' : 'en';
    document.documentElement.lang = validLang;

    // Update all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const translation = TRANSLATIONS[key] && TRANSLATIONS[key][validLang];
      if (translation !== undefined) {
        if (el.getAttribute('data-i18n-html') === 'true' || translation.includes('<')) {
          el.innerHTML = translation;
        } else {
          el.textContent = translation;
        }
      }
    });

    // Update Language Toggle Button Flags (shows target language to switch to)
    const itFlags = document.querySelectorAll('.nav-flag-icon.flag-it');
    const enFlags = document.querySelectorAll('.nav-flag-icon.flag-en');

    if (validLang === 'en') {
      itFlags.forEach((el) => { el.style.display = 'inline-flex'; });
      enFlags.forEach((el) => { el.style.display = 'none'; });
    } else {
      itFlags.forEach((el) => { el.style.display = 'none'; });
      enFlags.forEach((el) => { el.style.display = 'inline-flex'; });
    }

    // Update Button Titles/Aria
    const titleText = validLang === 'en' ? 'Passa all\'italiano' : 'Switch to English';
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    if (langToggleBtn) {
      langToggleBtn.setAttribute('title', titleText);
      langToggleBtn.setAttribute('aria-label', titleText);
    }

    const mobileLangToggleBtn = document.getElementById('mobile-lang-toggle-btn');
    if (mobileLangToggleBtn) {
      mobileLangToggleBtn.setAttribute('title', titleText);
      mobileLangToggleBtn.setAttribute('aria-label', titleText);
    }

    try {
      localStorage.setItem('language', validLang);
    } catch (e) {
      // Storage unavailable or blocked
    }
  }

  function setLanguage(lang) {
    applyLanguage(lang);
  }

  /* ==========================================================================
     4. Navigation Scroll Elevation & Interactive Polish
     ========================================================================== */
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

  /* ==========================================================================
     5. Specular Light Sheen on Glass Cards
     ========================================================================== */
  const cards = document.querySelectorAll('.glass-card');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice && window.matchMedia && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
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

  /* ==========================================================================
     6. Smooth Back-to-Top Button
     ========================================================================== */
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

  /* ==========================================================================
     7. Smooth Anchor Link Navigation
     ========================================================================== */
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

  /* ==========================================================================
     8. Active Link Highlight on Mobile Tab Bar
     ========================================================================== */
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

  /* ==========================================================================
     9. Setup Event Listeners for Theme & Language Switches
     ========================================================================== */
  function initControls() {
    // Theme toggle button handlers
    const themeBtn = document.getElementById('theme-toggle-btn');
    const mobileThemeBtn = document.getElementById('mobile-theme-toggle-btn');

    const handleThemeToggle = (e) => {
      if (e) e.preventDefault();
      const current = getTheme();
      const nextTheme = current === 'light' ? 'dark' : 'light';
      setTheme(nextTheme);
    };

    if (themeBtn) themeBtn.addEventListener('click', handleThemeToggle);
    if (mobileThemeBtn) mobileThemeBtn.addEventListener('click', handleThemeToggle);

    // Language toggle button handlers
    const langBtn = document.getElementById('lang-toggle-btn');
    const mobileLangBtn = document.getElementById('mobile-lang-toggle-btn');

    const handleLangToggle = (e) => {
      if (e) e.preventDefault();
      const currentLang = getLanguage();
      const nextLang = currentLang === 'it' ? 'en' : 'it';
      setLanguage(nextLang);
    };

    if (langBtn) langBtn.addEventListener('click', handleLangToggle);
    if (mobileLangBtn) mobileLangBtn.addEventListener('click', handleLangToggle);

    // Initialize Language from localStorage
    let savedLang = 'en';
    try {
      savedLang = localStorage.getItem('language') || 'en';
    } catch (e) {}
    applyLanguage(savedLang);

    // Initialize Cookie Consent (GDPR / ePrivacy)
    initCookieConsent();
  }

  /* ==========================================================================
     10. Cookie Consent Management Engine (Google Consent Mode v2)
     ========================================================================== */
  function getCookieConsent() {
    try {
      return localStorage.getItem('cookie_consent');
    } catch (e) {
      return null;
    }
  }

  function setCookieConsent(status) {
    try {
      localStorage.setItem('cookie_consent', status);
    } catch (e) {}

    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': status === 'granted' ? 'granted' : 'denied'
      });
    }

    hideCookieBanner();
  }

  function showCookieBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.display = 'block';
      // Trigger reflow to run CSS transition
      void banner.offsetHeight;
      banner.classList.remove('cookie-banner-hidden');
    }
  }

  function hideCookieBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.classList.add('cookie-banner-hidden');
      setTimeout(() => {
        banner.style.display = 'none';
      }, 400);
    }
  }

  function initCookieConsent() {
    const consent = getCookieConsent();
    const banner = document.getElementById('cookie-consent-banner');

    // If no prior consent decision has been saved, prompt user with consent banner
    if (!consent && banner) {
      setTimeout(showCookieBanner, 600);
    }

    const acceptBtn = document.getElementById('cookie-accept-btn');
    const declineBtn = document.getElementById('cookie-decline-btn');
    const preferencesBtn = document.getElementById('open-cookie-banner-btn');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', (e) => {
        if (e) e.preventDefault();
        setCookieConsent('granted');
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', (e) => {
        if (e) e.preventDefault();
        setCookieConsent('denied');
      });
    }

    if (preferencesBtn) {
      preferencesBtn.addEventListener('click', (e) => {
        if (e) e.preventDefault();
        showCookieBanner();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initControls);
  } else {
    initControls();
  }

  // Expose global portfolio helpers for testing and external hooks
  window.__portfolio = {
    setTheme,
    getTheme,
    setLanguage,
    getLanguage,
    applyLanguage,
    getCookieConsent,
    setCookieConsent,
    showCookieBanner,
    hideCookieBanner,
    TRANSLATIONS
  };

})();
