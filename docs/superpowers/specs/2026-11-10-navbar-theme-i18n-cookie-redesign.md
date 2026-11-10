# Design Specification: Navbar, Theme Toggle, Flag Language Switch & Floating Cookie Banner Redesign

**Author:** Filippo Veggo & Antigravity  
**Date:** 2026-11-10  
**Status:** Approved for Implementation  
**Topic:** Navbar Responsive Fit, Theme Toggle Fix, Single Flag i18n Switch, Floating Cookie Banner  

---

## 1. Intent & Context

Following the initial introduction of light theme, bilingual i18n support, and cookie consent banners, user testing identified critical usability and visual fit opportunities:
1. **Navbar Object Crowding:** On intermediate viewports (640px – 1024px, tablet and small laptop), the navbar elements (brand name, links, language button with text, theme button, duplicate email icon + Contact CTA) caused cramping, overflowing, and line-breaking.
2. **Theme Switch Not Working & Icon Mismatch:** The theme switch failed to apply visually because static `assets/css/style.css` on disk was not recompiled with the `:root[data-theme="light"]` variables, icons were inverted (showing sun during dark mode), and an unnecessary text label ("Theme") was present on mobile.
3. **Language Switch Redesign:** The previous globe icon + text label was visually noisy. The requirement is a clean, single-button switch with the two flags (🇮🇹 Italian and 🇬🇧 English) that swap on click without side-by-side clutter.
4. **Floating Cookie Banner:** The previous cookie consent container was anchored as a fixed bottom-right block card. It must be redesigned into a true floating liquid glass capsule centered above the viewport bottom with ambient elevation.

---

## 2. Goals, Non-Goals & Anti-Goals

### Goals
- **Perfect Navbar Fit:** Ensure all elements inside the floating navigation pill fit harmoniously without wrapping, clipping, or overlapping on any screen size from 320px mobile to 4K ultra-wide.
- **Flawless Theme Switch:**
  - Dark mode displays **Moon (`fa-moon`)**.
  - Light mode displays **Sun (`fa-sun`)**.
  - No text description on either desktop or mobile.
  - Immediate visual application by recompiling `assets/css/style.css` and keeping `_preview/` synchronized.
- **Single-Button Flag Switch:**
  - Single circular glass button matching the theme button (36×36px).
  - Displays crisp inline SVG flags for Italy (🇮🇹) and the United Kingdom (🇬🇧).
  - Swaps flags dynamically upon clicking with smooth rotation/fade transition and zero layout shift.
- **Floating Liquid Glass Cookie Banner:**
  - Centered horizontally (`bottom: 28px; left: 50%; transform: translateX(-50%)`).
  - Floating capsule island aesthetic with high-blur frosted glass, specular top edge, and ambient glow.
  - Streamlined horizontal layout on desktop, responsive card above mobile dock.
- **Zero Build Breakage & 100% Test Coverage:** Pass all existing and updated Node.js verification tests.

### Non-Goals
- Changing the site's underlying color palette or typography tokens.
- Introducing heavy third-party UI component libraries or CSS frameworks.

### Anti-Goals
- No layout shift or wrapping on small or medium screens.
- No Windows emoji flag fallback bugs (Segoi UI Emoji on Windows does not render flags; inline SVG badges must be used).
- No page reload on theme or language change.

---

## 3. Approaches Considered & Trade-offs

| Component | Alternative Considered | Chosen Approach | Trade-offs & Reason |
| :--- | :--- | :--- | :--- |
| **Language Switch** | Side-by-side flag segmented pill (`[ 🇬🇧 \| 🇮🇹 ]`) | Single 36×36px circular button that swaps flags on click (`[ 🇮🇹 ]` ↔ `[ 🇬🇧 ]`) | **Chosen:** Avoids consuming extra horizontal navbar space and maintains visual symmetry with the 36px theme and GitHub buttons. |
| **Flag Rendering** | Native Unicode flag emojis (`🇮🇹`, `🇬🇧`) | Crisp inline vector SVGs embedded inside the button | **Chosen:** Windows does not render flag emojis (renders `IT` and `GB` regional letters). Inline SVGs guarantee 100% consistent, crisp appearance on all operating systems. |
| **Theme Switch Icons** | "Action" icon (Sun shown in Dark mode to prompt "switch to light") | "Current state" icon (Moon shown in Dark mode, Sun shown in Light mode) | **Chosen:** User explicitly requested: "moon for dark and sun for light theme without description". Eliminates user confusion. |
| **Navbar Actions** | Keep separate Mail icon button AND "Contact" CTA pill | Remove duplicate Mail icon, retain unified "Contact" CTA pill + GitHub button | **Chosen:** Eliminates 44px of redundant horizontal width, providing room for controls to breathe. |
| **Cookie Banner Layout** | Fixed full-width bottom bar or corner toast | Centered floating capsule island (`max-width: 580px`) with blur backdrop and ambient float | **Chosen:** Complies with modern Apple VisionOS floating glass aesthetic while keeping the main content accessible. |

---

## 4. Detailed Component Specifications

### 4.1 Navbar Layout Architecture (`_includes/nav.html` & `_sass/_theme.scss`)
- **Structure:**
  ```html
  <nav class="liquid-nav-container">
    <div class="liquid-nav-pill">
      <!-- Brand -->
      <a href="/" class="nav-brand">
        <span class="nav-brand-avatar">FV</span>
        <span class="nav-brand-name">Filippo Veggo</span>
      </a>

      <!-- Navigation Links -->
      <div class="nav-links">
        <a href="/about" class="nav-link">About</a>
      </div>

      <!-- Actions & Controls -->
      <div class="nav-actions">
        <!-- Single Flag Language Button (36x36px) -->
        <button id="lang-toggle-btn" class="nav-icon-btn nav-flag-btn" aria-label="Switch language">
          <span class="nav-flag-icon flag-it">...SVG...</span>
          <span class="nav-flag-icon flag-en" style="display:none;">...SVG...</span>
        </button>

        <!-- Pure Icon Theme Button (36x36px) -->
        <button id="theme-toggle-btn" class="nav-icon-btn nav-theme-btn" aria-label="Toggle theme">
          <i class="fa-solid fa-moon icon-theme-moon"></i>
          <i class="fa-solid fa-sun icon-theme-sun"></i>
        </button>

        <!-- Social & CTA -->
        <a href="https://github.com/filippoveggo" class="nav-icon-btn" aria-label="GitHub Profile">
          <i class="fa-brands fa-github"></i>
        </a>
        <a href="mailto:filippoveggo@gmail.com" class="nav-cta-btn">
          <span data-i18n="nav.contact">Contact</span>
        </a>
      </div>
    </div>
  </nav>
  ```
- **Responsive Sizing:**
  - `.liquid-nav-pill`: `max-width: calc(100vw - 32px)`, `gap: clamp(8px, 1.4vw, 18px)`, `flex-wrap: nowrap`.
  - On screens `<= 820px`: `.nav-brand-name` collapses (`display: none`), leaving the polished `FV` avatar, allowing all buttons to fit smoothly without line-breaking.
  - On mobile (`<= 640px`): Desktop nav hides actions; mobile dock at bottom hosts Home, About, Language (single flag), Theme (pure icon without "Theme" label), and Contact.

### 4.2 Theme Toggle Logic & CSS Fix
- **Icons:**
  - Default (Dark theme): `.icon-theme-moon` has `display: inline-block;`, `.icon-theme-sun` has `display: none;`.
  - Light theme (`html[data-theme="light"]`): `.icon-theme-moon` has `display: none;`, `.icon-theme-sun` has `display: inline-block;`.
  - Mobile button has no `<span class="tab-label">Theme</span>` description.
- **CSS Compilation:**
  - Recompile `_sass/_theme.scss` into `assets/css/style.css` so that all `:root[data-theme="light"]` variables take effect immediately when `document.documentElement.setAttribute('data-theme', 'light')` executes.
  - Update `_preview/assets/css/style.css` and `_preview/assets/js/liquid-glass.js` to ensure the preview environment is fully functional.

### 4.3 Language Switch (Two Flags Swapping)
- The button `#lang-toggle-btn` (and `#mobile-lang-toggle-btn`) contains:
  - Italian flag SVG (`.flag-it`)
  - English / UK flag SVG (`.flag-en`)
- When the active language is English (`en`):
  - Target flag to switch to is **Italian 🇮🇹** (visible).
  - UK flag is hidden.
  - Button `aria-label` & `title`: "Passa all'italiano / Switch to Italian".
- When active language is Italian (`it`):
  - Target flag to switch to is **UK 🇬🇧** (visible).
  - Italian flag is hidden.
  - Button `aria-label` & `title`: "Switch to English / Passa all'inglese".
- Smooth crossfade/scale animation on flag change:
  ```css
  .nav-flag-icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-flex;
    transition: transform var(--transition-fast), opacity var(--transition-fast);
  }
  ```

### 4.4 Floating Cookie Banner Redesign
- **Positioning & Floating Styling:**
  ```css
  .cookie-banner-container {
    position: fixed;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    max-width: 580px;
    width: calc(100vw - 40px);
    z-index: 1200;
    pointer-events: auto;
    transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .cookie-banner-container.cookie-banner-hidden {
    opacity: 0;
    transform: translateX(-50%) translateY(28px) scale(0.96);
    pointer-events: none;
  }
  .cookie-banner-pill {
    padding: 12px 18px;
    border-radius: var(--radius-full);
    background: var(--glass-nav-scrolled);
    backdrop-filter: blur(32px) saturate(200%);
    -webkit-backdrop-filter: blur(32px) saturate(200%);
    border: 1px solid var(--glass-border-hover);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), var(--glass-specular-top);
  }
  ```
- **Horizontal Desktop Layout:**
  - Shield / Cookie icon badge (34×34px circular glass).
  - Short informative text: "We use anonymous analytics to refine your experience. Preferences are saved locally."
  - Action buttons: "Essential Only" (glass secondary) and "Accept All" (glass primary) grouped compactly on the right.
- **Mobile Responsive Layout:**
  - Anchored at `bottom: calc(84px + env(safe-area-inset-bottom, 16px))` so it never covers the mobile bottom dock.
  - Slightly more rounded rectangle on small phones (`border-radius: var(--radius-lg)`), full-width action buttons.

---

## 5. Implementation & Verification Plan

1. **Update `_includes/nav.html`:**
   - Streamline navbar actions: remove redundant mail icon button.
   - Replace globe + text language button with single flag button embedding crisp UK & Italian vector SVGs.
   - Update theme toggle button: Moon icon for dark mode, Sun icon for light mode.
   - Mobile tab bar: remove text description from theme button, use flag for language button.
2. **Update `_includes/cookie_banner.html`:**
   - Streamline markup into floating capsule pill structure.
3. **Update `_sass/_theme.scss`:**
   - Add navbar responsive fit rules (smooth brand collapse, flexible gap scaling).
   - Invert theme icon visibility (`.icon-theme-moon` visible by default, `.icon-theme-sun` visible in light theme).
   - Add flag button styling and smooth flag swap transitions.
   - Add centered floating cookie banner styles and mobile elevation offsets.
4. **Update `assets/js/liquid-glass.js`:**
   - Update `applyLanguage` to toggle flag visibility between Italian and UK SVGs.
   - Verify theme toggle switches `data-theme` attribute on `documentElement`.
5. **Compile & Sync Assets:**
   - Compile `_sass/_theme.scss` directly into `assets/css/style.css`.
   - Synchronize `_preview/assets/css/style.css`, `_preview/assets/js/liquid-glass.js`, and `_preview/index.html`.
6. **Testing & Verification:**
   - Update Node.js unit and integration tests in `tests/nav-controls.test.js`, `tests/cookie-consent.test.js`, and `tests/e2e-theme-i18n.test.js`.
   - Run all test suites and verify 100% pass rate.
