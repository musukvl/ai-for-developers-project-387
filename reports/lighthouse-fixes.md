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

1. **Fix header link contrast (Accessibility).** Accessibility is 94 because the "Calls Calendar" header link uses the global `a` color (`--brand-500` / `#0ea5e9`) on `.app-header-strong` (`--brand-600` / `#0284c7`). Contrast is ~1.47:1; Lighthouse requires 4.5:1 for normal text. Update the header brand link color (for example: white or another color meeting 4.5:1 against the header background).
2. **Add a meta description (SEO).** SEO is 90 because `frontend/index.html` is missing a `<meta name="description">`. Add a concise one-sentence description of Calls Calendar to improve search snippets and SEO scoring.
3. **Add a favicon (Best Practices / Console error).** Lighthouse logged a console error due to a missing `/favicon.ico` (404). Add `frontend/public/favicon.ico` or an appropriately linked favicon to prevent the 404 and remove the console error.

## Skip for now

- Render-blocking CSS on `/assets/index-*.css` (~4 KiB, ~160 ms). Performance is already 100.
- First Contentful Paint and Max Potential FID are 99/98. Not worth a change.
- Back/forward cache. Lighthouse marked the failure as not actionable (internal error on the CI static server).
