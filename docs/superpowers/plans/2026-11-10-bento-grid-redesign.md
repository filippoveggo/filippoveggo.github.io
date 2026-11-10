# Apple Pro Bento Grid 2.0 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the homepage portfolio layout into an Apple Pro Bento Grid 2.0 with modular visual hierarchy, realistic Safari device framing, integrated bio/tech stack tiles, and a unified contact banner.

**Architecture:** Refactor Jekyll homepage templates (`_layouts/home.html`, `_includes/page_header.html`) and SCSS design system (`_sass/_theme.scss`) to use a responsive 4-column CSS Bento Grid. Posts map into marquee (2x2), horizontal (2x1), and standard (1x1) tiles via front matter flags, while vanilla JS powers category filtering and specular lighting.

**Tech Stack:** Jekyll, Liquid, SCSS, Vanilla JavaScript, HTML5.

**Spec:** `docs/superpowers/specs/2026-11-10-bento-grid-redesign.md`

## Global Constraints
- Must build cleanly via standard Jekyll without external runtime dependencies.
- Zero CTA duplication in the top 600px viewport.
- Mobile (<640px) must collapse cleanly to 1 column; tablet (641px-1024px) to 2 columns; desktop (>1024px) to 4 columns.
- Static identity and contact tiles must remain visible when category filters are selected.

## Review Focus
- Category filter hiding static identity tiles: filter buttons must only target cards with `data-type`, keeping bio, skills, metrics, and CTA visible.
- Jekyll Liquid post fallback: if no post has `bento_featured: true`, the marquee tile must safely fall back to `site.posts.first`.
- Specular sheen performance: event listener must use `passive` or throttled `requestAnimationFrame` and skip touch devices.
- High contrast WCAG AA/AAA compliance: text contrast on dark glass backgrounds must remain >= 4.5:1.
- Safari mockup overflow: device preview text must not break or clip card boundaries on small screens.

---

### Task 1: Update Post Front Matter Metadata for Bento Mapping

**Files:**
- Modify: `_posts/2026-01-11-CWBI-website.md`
- Modify: `_posts/2023-12-12-residenza-ugolini.markdown`
- Modify: `_posts/2020-08-16-artivism-PWA.markdown`
- Modify: `_posts/2019-12-01-registro-elettronico.markdown`

**Interfaces:**
- Produces: `bento_featured: true`, `bento_span: "2x1"`, `bento_type: "web"` | `"mobile"` metadata available in Liquid.

- [ ] **Step 1: Add `bento_featured: true` and `bento_type: "web"` to `2026-01-11-CWBI-website.md`**
- [ ] **Step 2: Add `bento_span: "2x1"` and `bento_type: "web"` to `2023-12-12-residenza-ugolini.markdown`**
- [ ] **Step 3: Add `bento_type: "mobile"` to `2020-08-16-artivism-PWA.markdown`**
- [ ] **Step 4: Add `bento_type: "mobile"` to `2019-12-01-registro-elettronico.markdown`**
- [ ] **Step 5: Verify YAML front matter validity across all 4 files**

---

### Task 2: Streamline Hero Header (`_includes/page_header.html`)

**Files:**
- Modify: `_includes/page_header.html`

**Interfaces:**
- Consumes: Site metadata from `_config.yml`
- Produces: Cleaner hero header with eyebrow badge, subtitle, and category filter pills (`all`, `web`, `mobile`).

- [ ] **Step 1: Remove redundant CTA buttons (Explore Work, About Me, Get in Touch) and the duplicate connect bar**
- [ ] **Step 2: Add category filter pill control (`.filter-bar` with buttons for All, Web Platforms, Mobile / Flutter)**
- [ ] **Step 3: Verify clean layout and no broken Liquid tags**

---

### Task 3: Refactor Home Layout to Bento Grid Architecture (`_layouts/home.html`)

**Files:**
- Modify: `_layouts/home.html`

**Interfaces:**
- Consumes: Post front matter (`bento_featured`, `bento_span`, `bento_type`) from Task 1
- Produces: Asymmetric modular Bento Grid container (`.bento-grid`) containing:
  - Tile 1 (2x2): Marquee Featured Case Study with Safari glass window preview.
  - Tile 2 (2x1): Bio & Profile Tile (monogram, L-18 degree, Venice location, green availability pulse).
  - Tile 3 (1x1): Technical Arsenal Tile (Flutter, SCSS, JS, Dart, Jekyll, Responsive).
  - Tile 4 (1x1): Performance Metric Tile (98+ Lighthouse Benchmark).
  - Tile 5 (2x1): Residenza Ugolini Horizontal Showcase with icon badge.
  - Tile 6 (1x1): Artivism PWA Mobile Card.
  - Tile 7 (1x1): Registro Elettronico Flutter Card.
  - Tile 8 (4 cols): Full-width Contact & Collaboration banner.

- [ ] **Step 1: Replace `.projects-section` and `.projects-grid` with `.bento-grid` structure**
- [ ] **Step 2: Implement dynamic marquee tile querying post with `bento_featured: true` (with fallback to `site.posts.first`)**
- [ ] **Step 3: Implement static identity tiles (Bio, Technical Arsenal, Performance Metric)**
- [ ] **Step 4: Implement secondary project tiles with `data-type` attributes for filtering**
- [ ] **Step 5: Implement full-width contact callout tile at the footer of the grid**

---

### Task 4: Implement Bento Grid Design System & Styling (`_sass/_theme.scss`)

**Files:**
- Modify: `_sass/_theme.scss`

**Interfaces:**
- Consumes: Bento Grid class markup from Task 2 and Task 3
- Produces: CSS Grid rules, glass tokens, realistic Safari frame styling, responsive breakpoints.

- [ ] **Step 1: Add Bento CSS custom properties (`--bg-card`, `--border-card`, `--radius-bento: 24px`, `--shadow-bento`)**
- [ ] **Step 2: Add `.bento-grid` CSS Grid rules: 4 columns on desktop, 2 on tablet, 1 on mobile**
- [ ] **Step 3: Add tile-specific span classes (`.tile-featured`, `.tile-bio`, `.tile-project-horiz`, `.tile-cta`)**
- [ ] **Step 4: Add realistic Safari device frame styles (`.device-safari-frame`, traffic light dots, URL bar, glass screen)**
- [ ] **Step 5: Add hover elevation, specular sheen overlay, and smooth transitions**

---

### Task 5: Implement Filter & Specular Sheen Interactions (`assets/js/liquid-glass.js`)

**Files:**
- Modify: `assets/js/liquid-glass.js`

**Interfaces:**
- Consumes: `.bento-card` and `.filter-pill` DOM elements
- Produces: Smooth cursor sheen tracking and instant category filtering.

- [ ] **Step 1: Add mouse tracking for `--mouse-x` and `--mouse-y` across all `.bento-card` elements**
- [ ] **Step 2: Implement category filter click handlers that toggle opacity/visibility on `.bento-card[data-type]` while keeping static tiles untouched**
- [ ] **Step 3: Guard with `prefers-reduced-motion` and touch-device detection**

---

### Task 6: Verification, Static Build & Deployment Confirmation

**Files:**
- Output check: `_preview/index.html` or Jekyll build output

- [ ] **Step 1: Compile or test Jekyll build for syntax errors**
- [ ] **Step 2: Verify responsive behavior at 375px (mobile), 768px (tablet), and 1280px (desktop)**
- [ ] **Step 3: Inspect browser preview and verify all links and buttons work**
- [ ] **Step 4: Present git diff and ask for confirmation before pushing to GitHub Pages**
