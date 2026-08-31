# Lighthouse fixes to consider

Baseline from a Lighthouse CI run of the built SPA (`frontend/dist`) on 2026-08-25.

| Category | Score |
| --- | --- |
| Performance | 85 |
| Accessibility | 94 |
| Best Practices | 96 |
| SEO | 90 |

The nightly workflow (`.github/workflows/opencode-scheduled.yml`) uploads the HTML/JSON report as the `lighthouse-morning-report` artifact and writes `reports/lighthouse-latest.md`. The morning report issue is used by the team to decide which fixes to apply; this file is a concise, actionable checklist aligned to the latest run.

The team reviews the morning report and decides which of these to apply.

## Do next

1. **Add a meta description** (audit: "Document does not have a meta description")
   - Why: Quick SEO win; adds search-result summary and will raise the SEO score
   - Where: add a concise `<meta name="description" content="Calls Calendar — simple call scheduling and history">` to `frontend/index.html` or the HTML template

2. **Fix low-contrast header link** (audit: "Background and foreground colors do not have a sufficient contrast ratio")
   - Why: Accessibility issue (WCAG requires 4.5:1 for normal text); improves readability for many users
   - Where: change the header brand link color or background so the anchor meets contrast (make brand link white or pick a darker color)

3. **Add or link a favicon to stop the 404 console error** (audit: "Browser errors were logged to the console")
   - Why: Removes a noisy 404 and resolves the console error Lighthouse flags
   - Where: add `frontend/public/favicon.ico` or link to an existing icon from `frontend/index.html`

4. **Investigate and reduce Total Blocking Time / Max Potential FID** (audits: "Total Blocking Time", "Max Potential First Input Delay")
   - Why: These point to long main-thread tasks; reducing long tasks (code-splitting, defer noncritical JS, or splitting heavy work) improves interactivity and performance
   - Where: inspect built JS for long tasks; consider code-splitting, deferring non-critical initialization, and optimizing heavy synchronous work

5. **Eliminate render-blocking CSS for small stylesheet** (audit: "Eliminate render-blocking resources")
   - Why: Lighthouse flagged `assets/index-*.css` as render-blocking. Options: inline critical CSS, preload the stylesheet, or split critical vs non-critical styles
   - Where: `assets/index-*.css` in the built SPA; consider inlining critical rules or using `<link rel="preload" as="style" href="..." onload="this.rel='stylesheet'">`

## Skip for now

- Back/forward cache. Lighthouse marked the failure as not actionable (internal error on the CI static server).
