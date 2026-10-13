# Lighthouse morning report

Workflow run: https://github.com/musukvl/ai-for-developers-project-387/actions/runs/38467574759

Hosted HTML report: https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1791925397101-49260.report.html

Summary (generated: 2026-10-13T21:03:07.669Z)

- Performance: 100
- Accessibility: 94
- Best Practices: 96
- SEO: 90

Audits to review (from latest run)

- Browser errors were logged to the console (0): Failed to load resource: the server responded with a status of 404 (Not Found)
- Background and foreground colors do not have a sufficient contrast ratio (0): Low-contrast text is difficult or impossible for many users to read
- Document does not have a meta description (0): Meta descriptions may be included in search results to concisely summarize page content
- Eliminate render-blocking resources (50): http://localhost:41741/assets/index-BDgfnwIW.css

Recommended fixes (ordered by impact)

1. Fix header link contrast (Accessibility)
   - Audit: "Background and foreground colors do not have a sufficient contrast ratio"
   - Why: Contrast is currently ~1.47:1 for the header brand link; Lighthouse requires 4.5:1 for normal text. Low contrast prevents many users from reading the header link.
   - Suggested change: Update the header brand link to a color that meets 4.5:1 on the header background (white or a darker brand shade). Verify with Lighthouse.

2. Add a meta description (SEO)
   - Audit: "Document does not have a meta description"
   - Why: Search engines may use meta descriptions in results; adding a concise one improves search result presentation and can aid SEO score.
   - Suggested change: Add a <meta name="description" content="Calls Calendar — quick summary of app purpose"> to the app's index.html.

3. Add a favicon to eliminate console 404 (Best Practices)
   - Audit: "Browser errors were logged to the console"
   - Why: The browser requested /favicon.ico and received 404; Lighthouse records this as a console error. Fixing it removes the console error and improves Best Practices score.
   - Suggested change: Add a favicon at frontend/public/favicon.ico or link a favicon image in the <head> so the request succeeds.

4. Consider inlining or deferring small CSS to avoid render-blocking (Performance, low priority)
   - Audit: "Eliminate render-blocking resources"
   - Why: Lighthouse pointed to /assets/index-*.css (~4 KiB) as a render-blocking resource. Performance is currently 100; the CSS is small and the run marked it with a 50 score for that audit.
   - Suggested change: Evaluate critical CSS inlining for above-the-fold styles or use <link rel="preload"> where appropriate. This is lower priority since overall Performance is already optimal.

Notes

- Full HTML/JSON reports are attached to the workflow run as the artifact named `lighthouse-morning-report` (download from the workflow run artifacts).
- The hosted HTML report (above) is also available for quick viewing.
- reports/lighthouse-fixes.md already contains recommended actions that align with this morning's findings; no change was required to that file.

Next step for the team

- Review the items above in priority order at the morning meeting and decide which fixes to schedule. If you want, we can open separate issues or PRs for the selected fixes after triage.
