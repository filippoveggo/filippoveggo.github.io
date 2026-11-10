# Navbar, Theme Toggle, Flag Language Switch & Floating Cookie Banner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the navigation bar for responsive fit across all viewports, fix the theme toggle with pure Moon/Sun icons, implement a single-button flag swapping language switcher, redesign the cookie consent banner into a floating liquid glass island, and compile/sync all static assets.

**Architecture:** Client-side static enhancement leveraging SCSS custom properties, inline vector SVGs for flags, vanilla JavaScript state persistence in `localStorage`, and CSS-driven floating glassmorphism.

**Tech Stack:** HTML5 / Liquid, SCSS (Dart Sass), Vanilla JS (ES6+), Font Awesome 6.

**Spec:** `docs/superpowers/specs/2026-11-10-navbar-theme-i18n-cookie-redesign.md`

## Global Constraints
- WCAG AA contrast compliance in both dark and light modes.
- Dark mode must display Moon icon (`fa-moon`), light mode must display Sun icon (`fa-sun`).
- No text description on theme toggle button.
- Language switcher must be a single button displaying one flag at a time, switching to the other flag on click.
- Crisp vector SVGs for flags to guarantee pixel-perfect rendering across Windows, iOS, and macOS.
- Floating cookie banner must be centered (`bottom: 28px; left: 50%; transform: translateX(-50%)`) with frosted backdrop-filter.
- Recompile `assets/css/style.css` and synchronize `_preview/` so changes are immediately visible.

## Review Focus
- **Intermediate Viewport Clamping (768px – 1024px):** Navbar must not overflow, wrap, or horizontally scroll.
- **Theme Icon State Matching:** In Dark mode, Moon icon is visible. In Light mode, Sun icon is visible.
- **Flag Switch Logic:** In English mode, Italian flag is displayed (with Italian switch action). In Italian mode, UK flag is displayed.
- **Mobile Floating Elevation:** Cookie banner must clear the bottom mobile dock without covering navigation tabs.
- **Asset Sync:** Compiled CSS must contain `:root[data-theme="light"]` rules.

---

### Task 1: Update Navigation Markup with Single Flag Switch, Moon/Sun Theme Toggle, and Compact Layout
**Files:**
- Modify: `_includes/nav.html`
- Test: `tests/nav-controls.test.js`

- [ ] **Step 1: Write updated test assertions in `tests/nav-controls.test.js`**
  - Check `#theme-toggle-btn` has `.icon-theme-moon` and `.icon-theme-sun` without text label.
  - Check `#lang-toggle-btn` has `.nav-flag-icon` elements for Italian and UK flags instead of `#lang-label` text.
  - Check redundant mail icon is removed and `#contact-nav-btn` / `.nav-cta-btn` remains.
  - Check mobile theme toggle has no text description.
- [ ] **Step 2: Run test to confirm failures**
  ```powershell
  node tests/nav-controls.test.js
  ```
- [ ] **Step 3: Update `_includes/nav.html`**
  - Brand: keep `FV` avatar and `nav-brand-name`.
  - Links: `About` link.
  - Language button: `#lang-toggle-btn` with embedded Italian and UK vector SVGs.
  - Theme button: `#theme-toggle-btn` with `fa-moon` and `fa-sun`.
  - Actions: GitHub link and Contact CTA button.
  - Mobile dock: update theme button to pure icon (remove "Theme" text), update language button to flag icon.
- [ ] **Step 4: Run test to verify it passes**
  ```powershell
  node tests/nav-controls.test.js
  ```
- [ ] **Step 5: Commit changes**
  ```bash
  git add _includes/nav.html tests/nav-controls.test.js
  git commit -m "feat(nav): redesign navbar markup with single flag switch and moon/sun theme toggle"
  ```

---

### Task 2: Redesign Floating Cookie Banner Markup
**Files:**
- Modify: `_includes/cookie_banner.html`
- Test: `tests/cookie-consent.test.js`

- [ ] **Step 1: Verify test assertions in `tests/cookie-consent.test.js`**
  - Check `#cookie-consent-banner`, `#cookie-accept-btn`, `#cookie-decline-btn` exist.
- [ ] **Step 2: Update `_includes/cookie_banner.html`**
  - Reorganize markup into a floating pill island container with inline flex layout, cookie icon badge, concise bilingual description, and grouped action buttons.
- [ ] **Step 3: Run cookie consent test**
  ```powershell
  node tests/cookie-consent.test.js
  ```
- [ ] **Step 4: Commit changes**
  ```bash
  git add _includes/cookie_banner.html tests/cookie-consent.test.js
  git commit -m "feat(cookie): redesign cookie consent banner into floating island pill markup"
  ```

---

### Task 3: Implement SCSS Theme Rules for Responsive Navbar Fit, Moon/Sun Toggle, Flag Transitions, and Floating Cookie Banner
**Files:**
- Modify: `_sass/_theme.scss`
- Test: `tests/theme-tokens.test.js`

- [ ] **Step 1: Update theme tokens test or CSS test if needed**
- [ ] **Step 2: Update `_sass/_theme.scss`**
  - Responsive Navbar Fit:
    - Set `.liquid-nav-pill` with `max-width: calc(100vw - 32px)`, `flex-wrap: nowrap`, `gap: clamp(8px, 1.3vw, 16px)`.
    - At `@media screen and (max-width: 860px)`, hide `.nav-brand-name` so the brand gracefully reduces to the `FV` monogram avatar.
  - Theme toggle icons:
    - Default (dark mode): `.icon-theme-moon { display: inline-block; }`, `.icon-theme-sun { display: none; }`.
    - Light mode (`html[data-theme="light"]`): `.icon-theme-moon { display: none; }`, `.icon-theme-sun { display: inline-block; }`.
  - Single flag toggle styling:
    - `.nav-flag-btn`: 36×36px circle glass button, `.nav-flag-icon` circular SVG 20×20px with smooth transition.
  - Floating Cookie Banner:
    - `.cookie-banner-container`: fixed at `bottom: 28px; left: 50%; transform: translateX(-50%); max-width: 620px; width: calc(100vw - 32px);`.
    - `.cookie-banner-pill`: frosted glass with `border-radius: var(--radius-full)`, backdrop blur, specular top reflection, shadow.
    - Responsive mobile placement: `bottom: calc(84px + env(safe-area-inset-bottom, 16px))`.
- [ ] **Step 3: Run node tests**
  ```powershell
  node tests/theme-tokens.test.js
  ```
- [ ] **Step 4: Commit changes**
  ```bash
  git add _sass/_theme.scss tests/theme-tokens.test.js
  git commit -m "style(theme): add responsive navbar fit, inverted moon/sun icons, flag styling, and floating banner CSS"
  ```

---

### Task 4: Update JavaScript for Flag Swapping and Verified Theme Switching
**Files:**
- Modify: `assets/js/liquid-glass.js`
- Test: `tests/i18n-engine.test.js`, `tests/e2e-theme-i18n.test.js`

- [ ] **Step 1: Update `applyLanguage` in `assets/js/liquid-glass.js`**
  - If language is `en`: show Italian flag (`.flag-it`), hide UK flag (`.flag-en`), set title/aria-label to "Passa all'italiano".
  - If language is `it`: show UK flag (`.flag-en`), hide Italian flag (`.flag-it`), set title/aria-label to "Switch to English".
- [ ] **Step 2: Verify `setTheme` and `getTheme` functions**
  - Ensure `document.documentElement.setAttribute('data-theme', theme)` triggers CSS updates.
- [ ] **Step 3: Run tests**
  ```powershell
  node tests/i18n-engine.test.js; node tests/e2e-theme-i18n.test.js
  ```
- [ ] **Step 4: Commit changes**
  ```bash
  git add assets/js/liquid-glass.js tests/i18n-engine.test.js tests/e2e-theme-i18n.test.js
  git commit -m "feat(i18n): update flag swapping logic in liquid-glass.js"
  ```

---

### Task 5: Recompile Sass to `assets/css/style.css` and Synchronize `_preview/` Environment
**Files:**
- Modify: `assets/css/style.css`
- Modify: `_preview/assets/css/style.css`
- Modify: `_preview/assets/js/liquid-glass.js`
- Modify: `_preview/index.html`

- [ ] **Step 1: Compile `_sass/_theme.scss` directly to `assets/css/style.css` using `npx sass`**
- [ ] **Step 2: Sync compiled CSS to `_preview/assets/css/style.css`**
- [ ] **Step 3: Copy `assets/js/liquid-glass.js` to `_preview/assets/js/liquid-glass.js`**
- [ ] **Step 4: Update navbar and cookie banner markup in `_preview/index.html`**
- [ ] **Step 5: Verify compiled CSS contains `:root[data-theme="light"]`**
- [ ] **Step 6: Commit changes**
  ```bash
  git add assets/css/style.css _preview/
  git commit -m "build(assets): recompile style.css with light theme rules and synchronize preview environment"
  ```

---

### Task 6: Final Verification Across All Test Suites
**Files:**
- Test: All files in `tests/`

- [ ] **Step 1: Execute all Node.js test scripts**
  ```powershell
  Get-ChildItem -Path tests/*.test.js | ForEach-Object { node $_.FullName }
  ```
- [ ] **Step 2: Confirm all tests pass with zero errors**
- [ ] **Step 3: Document completed changes and notify user**
