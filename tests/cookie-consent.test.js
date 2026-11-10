const fs = require('fs');
const assert = require('assert');

// 1. Verify Google Consent Mode v2 in _includes/head.html
const head = fs.readFileSync('_includes/head.html', 'utf8');
assert(head.includes('gtag(\'consent\', \'default\''), 'Missing default consent call in head.html');
assert(head.includes('\'analytics_storage\': consentState'), 'Missing analytics_storage default state logic in head.html');
assert(head.includes('\'ad_storage\': \'denied\''), 'Missing ad_storage denied in head.html');
assert(head.includes('form-action \'self\' mailto:;'), 'Missing form-action hardening in CSP');

// 2. Verify Consent Mode runs BEFORE Google Tag Manager script
const consentIndex = head.indexOf("gtag('consent', 'default'");
const gtmIndex = head.indexOf("https://www.googletagmanager.com/gtm.js?id=");
assert(consentIndex !== -1 && gtmIndex !== -1, 'Both Consent Mode and GTM must be present');
assert(consentIndex < gtmIndex, 'Consent Mode default configuration must run before GTM script loads');

// 3. Verify _includes/cookie_banner.html
const banner = fs.readFileSync('_includes/cookie_banner.html', 'utf8');
assert(banner.includes('id="cookie-consent-banner"'), 'Missing #cookie-consent-banner ID');
assert(banner.includes('id="cookie-accept-btn"'), 'Missing #cookie-accept-btn button');
assert(banner.includes('id="cookie-decline-btn"'), 'Missing #cookie-decline-btn button');
assert(banner.includes('role="region"'), 'Missing role="region" on banner');
assert(banner.includes('data-i18n="cookie.title"'), 'Missing data-i18n="cookie.title"');
assert(banner.includes('data-i18n="cookie.desc"'), 'Missing data-i18n="cookie.desc"');
assert(banner.includes('data-i18n="cookie.accept"'), 'Missing data-i18n="cookie.accept"');
assert(banner.includes('data-i18n="cookie.decline"'), 'Missing data-i18n="cookie.decline"');

// 4. Verify footer inclusion and preferences button
const footer = fs.readFileSync('_includes/footer.html', 'utf8');
assert(footer.includes('{%- include cookie_banner.html -%}'), 'footer.html must include cookie_banner.html');
assert(footer.includes('id="open-cookie-banner-btn"'), 'footer.html must have #open-cookie-banner-btn');
assert(footer.includes('data-i18n="footer.cookies"'), 'footer.html must have data-i18n="footer.cookies"');

// 5. Verify SCSS styling
const scss = fs.readFileSync('_sass/_theme.scss', 'utf8');
assert(scss.includes('.cookie-banner-container'), 'SCSS missing .cookie-banner-container');
assert(scss.includes('.cookie-banner-hidden'), 'SCSS missing .cookie-banner-hidden');
assert(scss.includes('.cookie-banner-pill'), 'SCSS missing .cookie-banner-pill');
assert(scss.includes('.footer-link-btn'), 'SCSS missing .footer-link-btn');

// 6. Verify liquid-glass.js functions
const js = fs.readFileSync('assets/js/liquid-glass.js', 'utf8');
assert(js.includes('function initCookieConsent()'), 'liquid-glass.js missing initCookieConsent');
assert(js.includes('function setCookieConsent('), 'liquid-glass.js missing setCookieConsent');
assert(js.includes('function getCookieConsent()'), 'liquid-glass.js missing getCookieConsent');
assert(js.includes('function showCookieBanner()'), 'liquid-glass.js missing showCookieBanner');
assert(js.includes('gtag(\'consent\', \'update\''), 'liquid-glass.js missing gtag consent update');

console.log('Cookie consent & security assertions passed!');
