# Lighthouse fixes to consider

Baseline from a Lighthouse CI run of the built SPA (`frontend/dist`) on 2026-09-19.

| Category | Score |
| --- | --- |
| Performance | 100 |
| Accessibility | 94 |
| Best Practices | 96 |
| SEO | 90 |

The nightly workflow (`.github/workflows/opencode-scheduled.yml`) uploads the HTML/JSON report as the `lighthouse-morning-report` artifact and writes `reports/lighthouse-latest.md`. OpenCode opens or updates a **Lighthouse morning report** issue. Use that issue for later runs; this file is the first action list.

The team reviews the morning report and decides which of these to apply.

## Do next

1. **Fix header link contrast.** Accessibility is 94 because the "Calls Calendar" header link uses the global `a` color (`--brand-500` / `#0ea5e9`) on `.app-header-strong` (`--brand-600` / `#0284c7`). Contrast is 1.47:1; Lighthouse requires 4.5:1. Make the header brand link white (or another color that meets 4.5:1 on the header). This ties to the audit: "Background and foreground colors do not have a sufficient contrast ratio"
2. **Add a meta description.** SEO is 90 because `frontend/index.html` has no `<meta name="description">`. A one-sentence summary of Calls Calendar is enough. This ties to the audit: "Document does not have a meta description"
3. **Add a favicon (fix console 404).** Best Practices recorded a console error: the browser requested `/favicon.ico` and got 404. Add `frontend/public/favicon.ico` (or an icon linked from `frontend/index.html`) so the request succeeds. This ties to the audit: "Browser errors were logged to the console"
4. **Consider eliminate render-blocking CSS** for `/assets/index-BDgfnwIW.css` reported by the run (Lighthouse flagged "Eliminate render-blocking resources" with an impact score of 50). Performance is already 100; the file is small (~4 KiB) so this can be deferred unless the team wants to inline critical CSS or defer the stylesheet.

## Skip for now

- Render-blocking CSS on `/assets/index-*.css` (~4 KiB, ~160 ms). Performance is already 100.
- First Contentful Paint and Max Potential FID are 99/98. Not worth a change.
- Back/forward cache. Lighthouse marked the failure as not actionable (internal error on the CI static server).
