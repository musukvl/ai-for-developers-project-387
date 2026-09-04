+# Lighthouse morning report
+
This is the morning Lighthouse summary for the Calls Calendar app. It mirrors the nightly briefing that the CI workflow writes to `reports/lighthouse-latest.md` and attaches as the `lighthouse-morning-report` artifact.
+
Workflow run: https://github.com/musukvl/ai-for-developers-project-387/actions/runs/33919147841

Artifact (HTML/JSON report): https://github.com/musukvl/ai-for-developers-project-387/actions/runs/33919147841/artifacts

Hosted HTML report (if available): https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1788555765980-82373.report.html

Summary of category scores

- Performance: **99**
- Accessibility: **94**
- Best Practices: **96**
- SEO: **90**

Audits to review (from the latest run)

- **Browser errors were logged to the console**: Failed to load resource: the server responded with a status of 404 (Not Found)
- **Background and foreground colors do not have a sufficient contrast ratio**: Low-contrast text is difficult or impossible for many users to read
- **Document does not have a meta description**: Meta descriptions may be included in search results to concisely summarize page content
- **Eliminate render-blocking resources**: `assets/index-*.css` reported as render-blocking
- **Max Potential First Input Delay**: Long main-thread tasks increasing potential FID

Recommended fixes (ordered by impact, tie to the audit)

1. Add a favicon to stop console errors — addresses **Browser errors were logged to the console**. Add `frontend/public/favicon.ico` or link a favicon from `frontend/index.html` so the browser request succeeds and the console error disappears.
2. Fix header brand link contrast — addresses **Background and foreground colors do not have a sufficient contrast ratio**. Update the header link color so it meets 4.5:1 (for example, use white on the header background).
3. Add a meta description — addresses **Document does not have a meta description**. Add a short `<meta name="description" content="Calls Calendar — lightweight calendar for scheduling calls">` (adjust text to match product copy).
4. Eliminate render-blocking CSS — addresses **Eliminate render-blocking resources**. Consider inlining critical CSS for the header/above-the-fold content or loading the stylesheet in a non-blocking way (preload + onload swap, split critical vs non-critical CSS).
5. Reduce long main-thread tasks — addresses **Max Potential First Input Delay**. Audit the production bundle for long tasks, split or defer heavy scripts, and prefer smaller chunks for initial load.

Notes

- Full HTML/JSON reports are attached to the workflow run as the `lighthouse-morning-report` artifact. Use the artifact link above to download the HTML report for details.
- If the team wants, we can triage and create individual issues/PRs for each recommended fix; this item is only the morning briefing.
