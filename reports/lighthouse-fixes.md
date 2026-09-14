# Lighthouse fixes to consider

Baseline from a Lighthouse CI run of the built SPA (`frontend/dist`).

| Category | Score |
| --- | --- |
| Performance | 99 |
| Accessibility | 94 |
| Best Practices | 96 |
| SEO | 90 |

The nightly workflow (`.github/workflows/opencode-scheduled.yml`) uploads the HTML/JSON report as the `lighthouse-morning-report` artifact and writes `reports/lighthouse-latest.md`. OpenCode opens or updates a **Lighthouse morning report** issue. Use that issue for later runs; this file is the first action list.

The team reviews the morning report and decides which of these to apply.

## Do next

1. **Fix header link contrast** — Accessibility (contrast failure)
   - Why: The header brand link has insufficient contrast (reported as low-contrast text). Lighthouse requires a 4.5:1 contrast ratio for regular text.
   - Recommendation: Make the header brand link color meet 4.5:1 on its background (for example, use white or another accessible color).
2. **Add a favicon** — Best Practices (console error: 404)
   - Why: The browser requested `/favicon.ico` and got 404; Lighthouse logs this as a console error.
   - Recommendation: Add a favicon file (e.g. `frontend/public/favicon.ico`) or link a PNG/SVG favicon from `frontend/index.html` so the request succeeds.
3. **Add a meta description** — SEO (missing meta description)
   - Why: `index.html` has no `<meta name="description">`; search results may lack a concise summary.
   - Recommendation: Add a one-sentence description for Calls Calendar in `frontend/index.html`.
4. **Investigate Max Potential First Input Delay** — Performance (max-potential-fid)
   - Why: Lighthouse reported a high Max Potential FID (long main-thread tasks). This represents the longest task duration which could delay first input responsiveness.
   - Recommendation: Audit long tasks in the main bundle, split heavy work, defer nonessential JavaScript, or move work to web workers.
5. **Eliminate render-blocking CSS (low effort)** — Performance (render-blocking resources)
   - Why: Lighthouse flagged `/assets/index-*.css` as render-blocking (score 50 for that audit). The asset is small but blocks rendering.
   - Recommendation: Consider inlining critical CSS, using `preload` for the stylesheet, or deferring noncritical CSS to reduce render-blocking time.

## Skip for now

-- Back/forward cache. Lighthouse marked the failure as not actionable (internal error on the CI static server).

Notes:
- This file is intended as a short checklist the team can act on after the morning review. The nightly workflow uploads the HTML/JSON report as the `lighthouse-morning-report` artifact and writes `reports/lighthouse-latest.md`.
