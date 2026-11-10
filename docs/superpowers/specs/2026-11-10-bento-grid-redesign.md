# Design Specification: Apple Pro Bento Grid 2.0 Redesign

**Date**: 2026-11-10  
**Project**: Filippo Veggo Personal Portfolio  
**Status**: Approved by User  

---

## 1. Intent & The "Why"
The current website utilizes an "Apple Liquid Glass" dark theme, but presents several UI/UX shortcomings:
* Project cards in `_layouts/home.html` are uniform text-only rectangles with no visual previews, mockups, or differentiation between marquee client work and side projects.
* The hero section and top navbar exhibit CTA and contact link redundancy (showing the same 3 links repeatedly in the first 600px).
* The 4 ambient background orbs with `blur(90px)` introduce continuous GPU overhead.

**Goal**: Transform the portfolio into an **Apple Pro Bento Grid 2.0** layout. This layout provides clear visual hierarchy, realistic device framing (Safari browser window mockup and card art badges), modular info tiles (bio, tech stack, performance metrics), and a streamlined, cohesive contact callout.

---

## 2. Goals, Non-Goals & Anti-Goals

### Goals
* **Modular Bento Grid**: Asymmetric 4-column CSS grid on desktop (responsive to 2 columns on tablet and 1 column on mobile).
* **Marquee Showcase**: Tile 1 (2 cols × 2 rows) dedicated to the featured case study (*CWBI Website*), featuring a realistic Apple Safari glass frame preview, Lighthouse badge, and direct case study link.
* **Integrated Identity & Tech Stack**:
  * Bio tile (2 cols × 1 row) with avatar, title, live availability pulse, and context tags.
  * Technical Arsenal tile (1 col × 1 row) with categorized skill pills.
  * Performance Benchmark tile (1 col × 1 row) highlighting 98+ Lighthouse score.
* **Secondary Projects**:
  * *Residenza Ugolini* in a horizontal card (2 cols × 1 row) with visual icon badge.
  * *Artivism PWA* and *Registro Elettronico (Flutter)* in compact 1 col × 1 row tiles.
* **Streamlined CTA**: A single high-impact full-width callout tile at the bottom of the grid, eliminating repetitive CTAs in the hero.
* **Dynamic Jekyll Integration**: Liquid tags correctly iterate through `site.posts` while mapping into the structured bento tiles.
* **Jekyll Build & Verification**: Validated static build with zero Liquid or SCSS compile errors.

### Non-Goals
* Overhauling individual post case study pages (`_layouts/post.html`) or the separate `/about` page content in this pass.
* Introducing heavy external JavaScript frameworks (retaining vanilla JS + SCSS).

### Anti-Goals
* No heavy 3D canvas libraries or high-power GPU animations that degrade battery life or mobile responsiveness.
* No hardcoded static cards that break Jekyll's dynamic blog post pipeline.

---

## 3. Approaches Considered & Selected

1. **Direction 1: Apple Pro "Bento Grid 2.0"** *(Selected)*:
   * *Pros*: Professional, clean visual hierarchy, modular storytelling (projects + skills + stats), proven high conversion and engagement, completely responsive.
   * *Cons*: Requires careful CSS grid mapping for different viewport widths.
2. **Direction 2: Linear / Raycast Minimalist Dark**:
   * *Trade-off*: Highly technical and developer-focused, but lacks the visual warmth and UI/UX product design emphasis requested.
3. **Direction 3: Editorial Spatial Magazine**:
   * *Trade-off*: Bold typography, but less structured for showcasing a developer/designer portfolio with varied case studies.
4. **Direction 4: Interactive VisionOS Spatial Canvas**:
   * *Trade-off*: Tested via live interactive prototype. Declined by user due to excessive experimental complexity and potential distraction from content.

---

## 4. Architectural & Implementation Details

### A. Template Changes
* `_includes/page_header.html`:
  * Remove redundant CTA buttons and duplicate social links.
  * Present a clean, focused hero headline, eyebrow tag, and subtitle with category filter pills (*All*, *Web Platforms*, *Mobile / Flutter*).
* `_layouts/home.html`:
  * Replace the uniform `.projects-grid` with the modular `.bento-grid`.
  * **Dynamic Jekyll Mapping (Resolved Call)**:
    * Marquee 2x2 tile targets post with `featured: true` (or falls back to `site.posts.first`).
    * Secondary horizontal 2x1 tile targets post with `bento_span: "2x1"` (or second post in collection).
    * Remaining posts populate compact 1x1 project tiles.
  * **Filter Behavior (Resolved Call)**:
    * Static identity tiles (Bio, Tech Stack, Performance Metric, Contact CTA) remain **permanently visible** during category filtering.
    * Filter buttons only toggle visibility on project cards (`.bento-card[data-type]`).
  * Full-width contact callout banner at the grid footer.

### B. Styling Changes (`_sass/_theme.scss`)
* Introduce Bento Grid tokens:
  * `--bg-card: rgba(255, 255, 255, 0.04)`
  * `--bg-card-hover: rgba(255, 255, 255, 0.07)`
  * `--border-card: rgba(255, 255, 255, 0.1)`
  * `--border-card-hover: rgba(255, 255, 255, 0.24)`
  * `--radius-bento: 24px`
* CSS Grid responsive breakpoints:
  * Desktop (>1024px): `repeat(4, 1fr)` with varied spans (`span 2`, `span 4`).
  * Tablet (641px - 1024px): `repeat(2, 1fr)`.
  * Mobile (<640px): `1fr`.
* Realistic Safari glass frame mockup and badge styling.

### C. Micro-interactions (`assets/js/liquid-glass.js`)
* Mouse tracking specular light sheen on `.bento-card` elements.
* Instant category filtering via `.filter-pill` buttons.

---

## 5. Verification & Deployment Plan
1. Compile site with `bundle exec jekyll build` (or verify static preview generation).
2. Verify responsive layout at 375px (mobile), 768px (tablet), and 1280px+ (desktop).
3. Test keyboard navigation and link targets.
4. Review git diff and present deployment prompt to the user before push.
