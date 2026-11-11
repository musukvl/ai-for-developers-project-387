# Lighthouse morning report

This is the morning issue for the latest Lighthouse CI run. The team should review these suggested fixes and decide which to apply during the morning review.

Workflow run: https://github.com/musukvl/ai-for-developers-project-387/actions/runs/43100654555
Download artifacts for this run: https://github.com/musukvl/ai-for-developers-project-387/actions/runs/43100654555/artifacts
Hosted HTML report (direct): https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1794431431093-75592.report.html

Generated: 2026-11-11T21:10:20.801Z
URL audited: http://localhost:42739/

## Scores

- Performance: **100**
- Accessibility: **94**
- Best Practices: **96**
- SEO: **90**

## Audits to review (and recommended fixes, ordered by impact)

1. Add a meta description (audit: "Document does not have a meta description") — SEO 90
   - Why: Search engines and rich results may use this to summarize the page. Adding a concise one-sentence description for Calls Calendar is low-effort and will resolve the audit.
   - Suggested action: Add `<meta name="description" content="One-sentence summary of Calls Calendar">` to `frontend/index.html`.

2. Fix header link color contrast (audit: "Background and foreground colors do not have a sufficient contrast ratio") — Accessibility 94
   - Why: Lighthouse reports the Calls Calendar header link has insufficient contrast (measured ~1.47:1). This prevents some users from reading the text.
   - Suggested action: Make the header brand link white (or another color meeting 4.5:1 contrast on the header background) so it meets WCAG AA.

3. Add a favicon to stop 404 console errors (audit: "Browser errors were logged to the console") — Best Practices 96
   - Why: The browser requests `/favicon.ico` and receives 404; Lighthouse records this as a console error. Fixing removes the console error and improves the Best Practices score.
   - Suggested action: Add `frontend/public/favicon.ico` or reference a favicon (SVG/PNG) from `frontend/index.html`.

4. Consider eliminating or deferring render-blocking CSS (audit: "Eliminate render-blocking resources") — Performance 100 (low priority)
   - Why: Lighthouse flagged `/assets/index-BDgfnwIW.css` as render-blocking (small: ~4 KiB). Performance is already 100, so this is low priority, but inlined critical CSS or using `<link rel="preload" as="style">` can reduce blocking time on very slow connections.
   - Suggested action: If you want to optimize further, extract critical CSS or preload the stylesheet.

5. Investigate long tasks that increase Max Potential FID (audit: "Max Potential First Input Delay" = 69)
   - Why: Lighthouse reports a Max Potential FID value indicating there are long tasks that could delay input responsiveness for some users. With current scores this is not urgent, but consider profiling if interactive responsiveness is important for the app.
   - Suggested action: Profile the app in Chrome DevTools (Long Tasks / Performance) and break up long tasks or defer nonessential work.

---

Notes
- Full HTML/JSON reports are attached to the workflow run as the `lighthouse-morning-report` artifact (see the run's Artifacts page above).
- The `reports/lighthouse-latest.md` and `reports/lighthouse-fixes.md` files in the repo are aligned with this issue and the suggested actions.

The team will decide which fixes to apply during the morning review.
