# Lighthouse fixes to consider

Baseline from a Lighthouse CI run of the built SPA (`frontend/dist`) on 2026-08-25.

| Category | Score |
| --- | --- |
| Performance | 100 |
| Accessibility | 94 |
| Best Practices | 96 |
| SEO | 90 |

The nightly workflow (`.github/workflows/opencode-scheduled.yml`) uploads the HTML/JSON report as the `lighthouse-morning-report` artifact and writes `reports/lighthouse-latest.md`. OpenCode opens or updates a **Lighthouse morning report** issue. Use that issue for later runs; this file is the first action list.

The team reviews the morning report and decides which of these to apply.

## Do next

1. **Investigate and reduce main-thread work / Total Blocking Time.** Performance for the latest run can drop when long tasks block the main thread. Audit items to tie: "Minimize main-thread work", "Total Blocking Time", and "Max Potential First Input Delay". Typical fixes:
   - Identify large long tasks in the Performance trace and split/async them
   - Code-split and lazy-load non-critical routes and libraries
   - Defer or remove heavy initialization during page load
   - Optimize or remove third-party scripts

2. **Fix header link contrast.** Accessibility is 94 because the "Calls Calendar" header link uses the global `a` color (`--brand-500` / `#0ea5e9`) on `.app-header-strong` (`--brand-600` / `#0284c7`). Contrast is 1.47:1; Lighthouse requires 4.5:1. Make the header brand link white (or another color that meets 4.5:1 on the header).

3. **Add a favicon.** Best Practices drops because the browser requests `/favicon.ico` and gets 404, which Lighthouse records as a console error. Add `frontend/public/favicon.ico` (or an SVG/PNG linked from `frontend/index.html`) so the request succeeds.

4. **Add a meta description.** SEO is 90 solely because `frontend/index.html` has no `<meta name="description">`. A one-sentence summary of Calls Calendar is enough.

## Skip for now

- Render-blocking CSS on `/assets/index-*.css` (~4 KiB, ~160 ms). Performance is already 100.
- First Contentful Paint and Max Potential FID are 99/98. Not worth a change.
- Back/forward cache. Lighthouse marked the failure as not actionable (internal error on the CI static server).
