# Lighthouse morning report

Workflow run: https://github.com/musukvl/ai-for-developers-project-387/actions/runs/44175411678

Hosted HTML report: https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1794949330321-31045.report.html

Artifact: `lighthouse-morning-report` (attached to the workflow run)

Summary of scores

- Performance: 100
- Accessibility: 94
- Best Practices: 96
- SEO: 90

Failing or low-scoring audits to review

- Browser errors were logged to the console (0): Failed to load resource: the server responded with a status of 404 (Not Found)
- Background and foreground colors do not have a sufficient contrast ratio (0): Low-contrast text
- Document does not have a meta description (0): Missing `<meta name="description">`
- Eliminate render-blocking resources (50): `/assets/index-*.css` is reported as render-blocking

Recommended fixes (ordered by impact)

1. Add a favicon (ties to "Browser errors were logged to the console")
   - Problem: The browser requested `/favicon.ico` and received 404; Lighthouse records that as a console error and it reduces Best Practices score.
   - Recommendation: Add `frontend/public/favicon.ico` or link an SVG/PNG favicon from `frontend/index.html` so the request succeeds.

2. Fix header brand link contrast (ties to "Background and foreground colors do not have a sufficient contrast ratio")
   - Problem: The header brand link uses a color that fails WCAG contrast (reported as low contrast by Lighthouse). Accessibility is 94.
   - Recommendation: Make the header brand link use a color that meets 4.5:1 contrast on the header background (for example white on the current header background), or adjust the header background and brand color pair to meet AA contrast.

3. Add a meta description (ties to "Document does not have a meta description")
   - Problem: `frontend/index.html` lacks a `<meta name="description">`. This affects SEO.
   - Recommendation: Add a concise one-sentence description of Calls Calendar to `frontend/index.html`.

4. Consider addressing render-blocking CSS (ties to "Eliminate render-blocking resources")
   - Problem: Lighthouse flagged `/assets/index-*.css` as render-blocking. The file is small (~4 KiB) and current Performance is 100, so this is low priority.
   - Recommendation: If you want to remove the audit, options include inlining the critical CSS, using `rel=preload` for the stylesheet with `as="style"` and `onload` swap, or deferring non-critical rules.

Notes

- Full HTML/JSON reports are attached to the workflow run as `lighthouse-morning-report`. Use the workflow run link above to download the artifact and view the HTML report.
- The team can review these recommended fixes in the morning and decide which to implement. I did not change any product code.
