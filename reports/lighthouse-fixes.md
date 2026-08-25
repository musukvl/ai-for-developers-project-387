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

1. **Add a favicon** (Best Practices / Console errors)
   - Audit: "Browser errors were logged to the console" — the browser requested `/favicon.ico` and received 404
   - Why: Removes console noise, fixes the Best Practices console error, and prevents confusing 404s in logs
   - How: Add a `favicon.ico` to `frontend/public` or link a PNG/SVG favicon from `frontend/index.html`. See GitHub issue #9 (Lighthouse morning report) for the latest run and artifact

2. **Fix header brand link color contrast** (Accessibility / Color contrast)
   - Audit: "Background and foreground colors do not have a sufficient contrast ratio"
   - Why: Improves readability and accessibility for users with low vision; aim for a contrast ratio >= 4.5:1 for normal text
   - How: Make the header brand link color white (or another color that meets 4.5:1 against the header background) or adjust header background

3. **Add a meta description** (SEO / Meta description)
   - Audit: "Document does not have a meta description"
   - Why: Improves how the site appears in search results; quick and low-risk SEO improvement
   - How: Add a one-line `<meta name="description" content="Short summary of Calls Calendar">` in `frontend/index.html`

4. **Investigate Max Potential First Input Delay and render-blocking CSS** (Performance / FID & render-blocking)
   - Audits: "Max Potential First Input Delay" (reports long main-thread tasks) and "Eliminate render-blocking resources" (small `/assets/index-*.css`)
   - Why: Performance currently scores 100, so these are low-to-medium priority. Fixing them may slightly improve perceived load on slow devices or noisy CI runs, but are not urgent
   - How: For FID, profile long tasks in the production build and split or defer heavy initialization. For render-blocking CSS, consider inlining critical CSS (<4 KiB) or using `rel="preload"` with an `onload` swap for non-critical styles

## Skip for now

- Render-blocking CSS on `/assets/index-*.css` (~4 KiB). Performance is already 100; consider this low priority.
- Max Potential First Input Delay was flagged by Lighthouse (investigate any long main-thread tasks). This is currently low priority given overall Performance is 100.
- Back/forward cache. Lighthouse marked the failure as not actionable (internal error on the CI static server).

## Review note

These items remain optional until the team reviews the morning report and decides which to apply. Do not implement product or UI fixes without team approval. Open GitHub issue #9 (Lighthouse morning report) to view the latest run and download the HTML/JSON artifact.
