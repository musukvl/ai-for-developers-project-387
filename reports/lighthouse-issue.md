# Lighthouse morning report

Workflow run: https://github.com/musukvl/ai-for-developers-project-387/actions/runs/36350190087

Artifact: `lighthouse-morning-report` (download from the run's Artifacts section)

Hosted HTML report: https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1790542965561-63830.report.html

Summary

- Performance: **99**
- Accessibility: **94**
- Best Practices: **96**
- SEO: **90**

Audits to review

- Browser errors were logged to the console: Failed to load resource: the server responded with a status of 404 (Not Found)
- Background and foreground colors do not have a sufficient contrast ratio (low contrast on header link)
- Document does not have a meta description
- Eliminate render-blocking resources (score ~50 for CSS file)
- Max Potential First Input Delay (score ~78)

Recommended fixes (ordered by impact)

1. Add a favicon so the browser request succeeds (ties to the console error / Best Practices). Lighthouse logged a 404 when requesting `/favicon.ico`; adding a favicon (or linking a manifest/favicons) will remove the console error and improve Best Practices.

2. Fix header brand link contrast (ties to Accessibility: low-contrast header link). Adjust the header link color so text meets 4.5:1 contrast with the header background (for example, use white or another accessible color on the header background).

3. Add a concise `<meta name="description">` to frontend/index.html (ties to SEO). One short sentence describing Calls Calendar will address the missing meta description finding and improve SEO.

4. Remove or defer render-blocking CSS (ties to Eliminate render-blocking resources). The audit flagged a local CSS asset (`/assets/index-*.css`) as render-blocking. Consider inlining critical CSS or deferring non-critical CSS, or using preload strategies for this small stylesheet.

5. Investigate long main-thread tasks (ties to Max Potential First Input Delay). Profile the app's largest tasks, split heavy initialization work, and defer non-essential work to reduce potential FID.

Notes

- Full HTML/JSON reports are attached to the workflow run as `lighthouse-morning-report`. Use the workflow run link above to download the artifact or open the hosted HTML report.
- The team should review and decide which fixes to apply in the morning; do not implement product fixes directly from this report.
