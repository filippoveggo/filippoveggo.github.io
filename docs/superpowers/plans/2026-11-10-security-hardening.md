# Security Hardening & Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remediate all 11 security, supply chain, and hygiene vulnerabilities identified during the defensive security audit of the personal website repository.

**Architecture:** Implement Subresource Integrity (SRI) on external CDNs, establish Content Security Policy (CSP) and Referrer Policy meta tags, pin GitHub Actions to immutable commit SHAs with least-privilege token permissions, localize hotlinked external assets, add iframe sandbox boundaries, escape unescaped template interpolations, make client-side DOM queries exception-safe, and purge dead theme assets.

**Tech Stack:** Jekyll 3.9+ (Ruby/Liquid), GitHub Actions (`deploy.yml`), Vanilla JavaScript (ES6+), Sass/SCSS, HTML5.

**Spec:** [`C:/Users/filip/audits/my-project`](file:///C:/Users/filip/audits/my-project)

## Global Constraints
- Target repository: `C:\Users\filip\Documents\Projects\PersonalWebsite\Redesign`
- Zero regression in static site build and Jekyll templating
- Zero disruption to visual design (Apple Liquid Glass design tokens and typography)
- All external dependencies loaded via `<link>` must enforce Subresource Integrity (SRI)
- Maintain least-privilege permissions in CI/CD pipelines (`contents: read` default; `pages: write` and `id-token: write` restricted strictly to `deploy`)

## Review Focus
1. **CSP directive completeness:** Ensure CSP allows all required fonts, scripts (GTM if retained), Google Analytics connect endpoints, and Figma prototype iframes without console errors.
2. **SRI hash mismatch:** Ensure Font Awesome SRI hash matches the exact byte sequence of `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.min.css`.
3. **Iframe sandbox usability:** Ensure Figma prototype iframes have sufficient capabilities (`allow-scripts allow-same-origin allow-popups`) to function interactively without granting unnecessary top-level navigation.
4. **Local image paths:** Verify all localized Imgur images are correctly referenced via Jekyll's `{{ "/images/..." | relative_url }}` filter with proper MIME types.
5. **Selector safety:** Confirm non-standard anchor links (e.g. `href="#"` or symbols) do not throw `DOMException` in `liquid-glass.js`.

---

### Task 1: Subresource Integrity (SRI) & Content Security Policy (SEC-01 & SEC-03)

**Files:**
- Modify: `_includes/head.html:1-40`
- Modify: `_sass/_theme.scss:1-30`

**Interfaces:**
- Consumes: Verified Font Awesome 7.3.1 SHA-384 hash (`sha384-qrALq7+6jBOZIQsNnT6xGkMDru64qD6uTlDra39xrt2SoXl4pO3FX6Roz/RpR/BS`)
- Produces: CSP meta tags and SRI-verified stylesheet preload/links

- [ ] **Step 1: Add SRI attributes to Font Awesome in `_includes/head.html`**
  Add `integrity="sha384-qrALq7+6jBOZIQsNnT6xGkMDru64qD6uTlDra39xrt2SoXl4pO3FX6Roz/RpR/BS"` and `crossorigin="anonymous"` to Font Awesome `link[rel=preload]`, `link[rel=stylesheet]`, and `<noscript>` elements.

- [ ] **Step 2: Add Content Security Policy and Referrer Policy meta tags in `_includes/head.html`**
  Insert `<meta http-equiv="Content-Security-Policy">` restricting `default-src 'self'`, `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com`, `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com`, `font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:`, `img-src 'self' https://www.googletagmanager.com data:`, `frame-src 'self' https://embed.figma.com`, `connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com`, `object-src 'none'`, and `base-uri 'self'`. Add `<meta name="referrer" content="strict-origin-when-cross-origin">`.

- [ ] **Step 3: Remove duplicate external CDN `@font-face` blocks from `_sass/_theme.scss`**
  Remove lines 5-27 from `_sass/_theme.scss` which pull unpinned webfonts from cdnjs without SRI (the Font Awesome CSS already manages icon font loading).

- [ ] **Step 4: Verify syntax and file references**
  Ensure HTML tags and SCSS structure remain valid.

---

### Task 2: Sandboxing Third-Party Embeds & Script Hardening (SEC-02)

**Files:**
- Modify: `_posts/2019-12-01-registro-elettronico.markdown:12-16`
- Modify: `_posts/2026-01-11-CWBI-website.md:14-27`
- Modify: `_layouts/post.html:45-62`

**Interfaces:**
- Consumes: Target post layouts and templates
- Produces: Sandboxed Figma iframes, static Instagram preview link, sanitized Disqus interpolation

- [ ] **Step 1: Remove unsanboxed Instagram embed script in `_posts/2019-12-01-registro-elettronico.markdown`**
  Remove `<script async src="//www.instagram.com/embed.js"></script>` and replace the heavy dynamic block with a clean static card/anchor link pointing to the post.

- [ ] **Step 2: Add sandbox attributes to Figma iframes in `_posts/2026-01-11-CWBI-website.md`**
  Add `sandbox="allow-scripts allow-same-origin allow-popups"` and `loading="lazy"` to both Figma desktop and mobile embedded iframes (lines 16 and 25).

- [ ] **Step 3: Harden Disqus Liquid interpolation in `_layouts/post.html`**
  Replace `'{{ page.url | absolute_url }}'` with `{{ page.url | absolute_url | jsonify }}` in both `this.page.url` and `this.page.identifier`.

---

### Task 3: CI/CD Supply Chain Hardening & Dependabot (SEC-04)

**Files:**
- Modify: `.github/workflows/deploy.yml`
- Create: `.github/dependabot.yml`

**Interfaces:**
- Consumes: Immutable 40-char commit SHAs for standard GitHub actions
- Produces: Hardened GitHub Actions deployment workflow with job-level least-privilege tokens and timeout limits

- [ ] **Step 1: Pin all actions to immutable commit SHAs in `.github/workflows/deploy.yml`**
  Pin `actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11` (# v4.1.1), `actions/configure-pages@983d7736d9b0ae728b81ab479565c72886d7745b` (# v5.0.0), `actions/jekyll-build-pages@0811904d9c614b184f4f346b0d91012674e2b101` (# v1.0.13), `actions/upload-pages-artifact@56afc609e74202658d3ffba0e8f6dda462b719fa` (# v3.0.1), and `actions/deploy-pages@d6db90164ac5ed86f2b6aed7e0febac5b3c0c03e` (# v4.0.5).

- [ ] **Step 2: Enforce least-privilege permissions and job timeouts in `.github/workflows/deploy.yml`**
  Set top-level `permissions: contents: read`. Add `timeout-minutes: 10` to both `build` and `deploy` jobs. Move `pages: write` and `id-token: write` exclusively to the `deploy` job.

- [ ] **Step 3: Create `.github/dependabot.yml`**
  Create configuration tracking weekly updates for both `github-actions` and `bundler`.

---

### Task 4: Dependency Tracking & `.gitignore` Hardening (SEC-05 & SEC-11)

**Files:**
- Modify: `.gitignore`

**Interfaces:**
- Consumes: Security ignore patterns
- Produces: Version control tracking for lockfiles while ignoring secrets and editor artifacts

- [ ] **Step 1: Remove `Gemfile.lock` from `.gitignore`**
  Delete line 8 (`Gemfile.lock`) in `.gitignore` so lockfiles can be tracked.

- [ ] **Step 2: Add secrets and editor patterns to `.gitignore`**
  Add `.env`, `.env.*`, `*.key`, `*.pem`, `*.cert`, `.vscode/`, `.idea/`.

---

### Task 5: Template Escaping & Client-Side Script Hardening (SEC-07 & SEC-09)

**Files:**
- Modify: `_layouts/home.html:50-56`
- Modify: `_includes/image.html:1-4`
- Modify: `assets/js/liquid-glass.js:72-85`

**Interfaces:**
- Consumes: Liquid templates and navigation script
- Produces: Context-escaped HTML outputs and exception-safe DOM selector queries

- [ ] **Step 1: Escape `post.description` in `_layouts/home.html`**
  Change `<p>{{ post.description }}</p>` to `<p>{{ post.description | escape }}</p>`.

- [ ] **Step 2: Escape `include.description` in `_includes/image.html`**
  Add `| escape` to `alt="{{ include.description | escape }}"` and `<figcaption>{{ include.description | escape }}</figcaption>`.

- [ ] **Step 3: Guard `document.querySelector` in `assets/js/liquid-glass.js`**
  Wrap `const targetElement = document.querySelector(targetId);` in a `try...catch` block to handle invalid selector strings gracefully without throwing a terminating `DOMException`.

---

### Task 6: Localize Hotlinked Imgur Media (SEC-08)

**Files:**
- Create: `images/stem/home.png`
- Create: `images/Artivism/home.png`
- Create: `images/Artivism/community.png`
- Create: `images/Artivism/profile.png`
- Modify: `_posts/2019-11-07-stem_project.markdown:11`
- Modify: `_posts/2020-08-16-artivism-PWA.markdown:15-28`

**Interfaces:**
- Consumes: External Imgur assets (`fyuKV43.png`, `PEn7ETs.png`, `7geKlBe.png`, `i7HPAm8.png`)
- Produces: Local, repository-hosted image files referenced via `relative_url`

- [ ] **Step 1: Download the 4 Imgur images into local directories**
  Download `fyuKV43.png` to `images/stem/home.png`, and `PEn7ETs.png`, `7geKlBe.png`, `i7HPAm8.png` to `images/Artivism/`.

- [ ] **Step 2: Update image links in `_posts/2019-11-07-stem_project.markdown`**
  Replace `https://i.imgur.com/fyuKV43.png` with `{{ "/images/stem/home.png" | relative_url }}`.

- [ ] **Step 3: Update image links in `_posts/2020-08-16-artivism-PWA.markdown`**
  Replace Imgur URLs with `{{ "/images/Artivism/home.png" | relative_url }}`, `{{ "/images/Artivism/community.png" | relative_url }}`, and `{{ "/images/Artivism/profile.png" | relative_url }}`.

---

### Task 7: Repository Hygiene, Dead Code Removal & Sitemap Cleanup (SEC-10 & SEC-11)

**Files:**
- Delete: `assets/js/picker.js`
- Delete: `assets/font/fontello.eot`, `fontello.svg`, `fontello.ttf`, `fontello.woff`, `fontello.woff2`
- Delete: `_sass/ext/_fonts.scss`
- Delete: `googlee9da88a3d95c80d9.html`
- Delete: `sitemap.xml`
- Modify: `_includes/head.html:35-40`

**Interfaces:**
- Consumes: Repository root and asset directories
- Produces: Clean codebase without orphaned files, conflicting tokens, or stale static sitemaps

- [ ] **Step 1: Delete dead legacy script `assets/js/picker.js`**
  Remove `assets/js/picker.js`.

- [ ] **Step 2: Delete orphaned fontello assets**
  Remove `assets/font/fontello.*` and `_sass/ext/_fonts.scss`.

- [ ] **Step 3: Remove duplicate Google verification artifacts**
  Delete root `googlee9da88a3d95c80d9.html`. Remove the duplicate `<meta name="google-site-verification" content="dxcQw1BfZDfHzuv-Y4BhDi0w2B4uPfsuMT7XNtIntuU" />` from `_includes/head.html` (the canonical token is in `_config.yml` which `jekyll-seo-tag` renders).

- [ ] **Step 4: Delete outdated static `sitemap.xml`**
  Remove the static 2021 `sitemap.xml` so that the `jekyll-sitemap` plugin generates a dynamic, comprehensive sitemap on every build.

---

### Task 8: Verification & Audit Report Status Update

**Files:**
- Modify: `C:/Users/filip/audits/my-project`

**Interfaces:**
- Consumes: Git status and file inspection
- Produces: Verified repository and updated audit documentation showing remediated status

- [ ] **Step 1: Verify git status and file integrity**
  Run `git status` to verify all modifications are clean, syntactically correct, and non-breaking.

- [ ] **Step 2: Update `C:/Users/filip/audits/my-project`**
  Update the audit report to reflect that all 11 security findings have been addressed with active remediations.
