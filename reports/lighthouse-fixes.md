# Lighthouse fixes to consider

Baseline from a Lighthouse CI run of the built SPA. Latest automated run: 2026-09-08.

| Category | Score |
| --- | --- |
| Performance | 90 |
| Accessibility | 94 |
| Best Practices | 96 |
| SEO | 90 |

The nightly workflow (`.github/workflows/opencode-scheduled.yml`) uploads the HTML/JSON report as the `lighthouse-morning-report` artifact and writes `reports/lighthouse-latest.md`. OpenCode opens or updates a **Lighthouse morning report** issue. Use that issue for later runs; this file is the first action list.

The team reviews the morning report and decides which of these to apply.

## Do next

1. **Eliminate render-blocking CSS on the critical path.** Lighthouse reported `Eliminate render-blocking resources` for `/assets/index-*.css` (score ~50 for that audit). The CSS is small (~4 KiB) but blocks rendering; consider inlining critical CSS or using `rel="preload"`/`media` attributes to defer noncritical styles.
2. **Reduce Total Blocking Time / long tasks.** `Total Blocking Time` was flagged (67 ms). Audit suggests long tasks between FCP and TTI; investigate main-thread work in the SPA, defer non-critical JavaScript, and split large tasks.
3. **Address Max Potential First Input Delay.** This is tied to long tasks (Max Potential FID: 12 ms). Reducing blocking work will lower this metric.
4. **Fix header link contrast.** Accessibility is 94 because the "Calls Calendar" header link uses the brand color on a colored header background. Contrast fails (roughly 1.47:1). Make the header brand link a color that meets 4.5:1 (white is an option).
5. **Add a favicon to stop the 404 browser console error.** Lighthouse recorded a console error from a missing `/favicon.ico`. Add a favicon file or an explicit link tag in `index.html` so the request succeeds.
6. **Add a meta description.** SEO is 90 because `index.html` lacks a `<meta name="description">`. Add a concise one-line description for the Calls Calendar app.

## Skip for now

-- Back/forward cache. Lighthouse marked the failure as not actionable (internal error on the CI static server).
