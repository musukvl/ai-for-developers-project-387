# Lighthouse morning report

This issue is the daily Lighthouse briefing for the Calls Calendar app. The team uses it to review audit failures and decide which fixes to apply during the morning review.

Workflow run: https://github.com/musukvl/ai-for-developers-project-387/actions/runs/36271522888

Hosted HTML report: https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1790456550027-95873.report.html

Artifact (attached to the workflow run): `lighthouse-morning-report` (download from the run's Artifacts panel)

Summary (generated from reports/lighthouse-latest.md):

- Performance: 100
- Accessibility: 94
- Best Practices: 96
- SEO: 90

Top audits to review (ordered roughly by impact):

1. Fix missing site icon (console errors / 404)
   - Audit: Browser errors were logged to the console — 404 for `/favicon.ico`
   - Why: The browser requested `/favicon.ico` and received 404. This shows up as a console error and lowers Best Practices.
   - Recommended action: Add a favicon to `frontend/public/favicon.ico` or include a link to a site icon (SVG/PNG) in `frontend/index.html`.

2. Fix header link contrast (Accessibility)
   - Audit: Background and foreground colors do not have a sufficient contrast ratio
   - Why: The header brand link uses the global brand color on a colored header background; the computed contrast is ~1.47:1 (Lighthouse requires >= 4.5:1 for normal text).
   - Recommended action: Make the header brand link white (or pick a color that meets 4.5:1 on the header background) or increase header background contrast.

3. Add a meta description (SEO)
   - Audit: Document does not have a meta description
   - Why: Missing `<meta name="description">` reduces SEO score and the search snippet quality.
   - Recommended action: Add a concise one-sentence meta description to `frontend/index.html`.

4. Review render-blocking CSS (Performance, but low impact)
   - Audit: Eliminate render-blocking resources — `/assets/index-BDgfnwIW.css` reported as render-blocking (score shows 50)
   - Why: The CSS is small (~4 KiB) and the overall Performance score is 100, so this is low priority.
   - Recommended action: If desired, inline critical CSS or mark non-critical CSS for async loading. Not required immediately.

5. Investigate long tasks (Max Potential FID)
   - Audit: Max Potential First Input Delay (score 87)
   - Why: A long main-thread task increases the theoretical worst-case input delay. The current Performance score remains perfect.
   - Recommended action: Audit long tasks in the app and split heavy work (web workers / break up tasks) if you see user-reported input lag.

Notes

- Full HTML/JSON reports are attached to the workflow run as `lighthouse-morning-report`. Use the run link above and download the artifact for the complete report.
- This morning's hosted HTML report is linked above for quick inspection.

The team should review these items in the morning and decide which to assign.
