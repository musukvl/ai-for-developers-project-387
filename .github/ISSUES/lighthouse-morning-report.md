# Lighthouse morning report

Workflow run: https://github.com/musukvl/ai-for-developers-project-387/actions/runs/38637059546
Artifacts (download HTML/JSON): https://github.com/musukvl/ai-for-developers-project-387/actions/runs/38637059546/artifacts
Hosted HTML report: https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1792011791359-72115.report.html

Summary (scores)

- Performance: 100
- Accessibility: 94
- Best Practices: 96
- SEO: 90

Top audits to review (failing or low score)

1. Browser console errors (404 for /favicon.ico) — Lighthouse recorded console errors caused by the browser requesting resources that return 404. This appears as a Best Practices/Console error and is noisy for the CI.
2. Low contrast for header brand link — accessibility failure: header link color contrast is too low (approx 1.47:1) and does not meet 4.5:1.
3. Document missing meta description — SEO guidance: the page lacks a <meta name="description"> which reduces search snippet quality.
4. Eliminate render-blocking resources — CSS served from /assets/index-*.css is render-blocking (small file ~4 KiB).

Recommended fixes (ordered by impact)

1. Add a favicon so the browser request succeeds (ties to "Browser console errors").
   - Why: A missing favicon results in a 404 logged in the console, which Lighthouse counts as a Best Practices/console error and can be misleading in nightly results.
   - What to change: include a favicon file (favicon.ico or linked SVG/PNG) in the app's public assets or reference it from index.html so the request returns 200.

2. Fix header brand link contrast (ties to "Low contrast for header brand link").
   - Why: Accessibility score is 94 because the header brand link uses a blue-on-blue combination (~1.47:1). Lighthouse requires at least 4.5:1 for normal text.
   - What to change: change the header link color (for example, use white on the header background) or adjust CSS variables so the link meets 4.5:1 contrast.

3. Add a meta description (ties to "Document missing meta description").
   - Why: SEO score is reduced because index.html has no <meta name="description">; adding a concise one improves search snippets and satisfies Lighthouse.
   - What to change: add a one-sentence description of Calls Calendar in frontend/index.html's head.

4. Consider deferring or inlining the small render-blocking CSS (ties to "Eliminate render-blocking resources").
   - Why: Lighthouse flags /assets/index-*.css as render-blocking. The file is small (~4 KiB) and current Performance is already 100, so this is low priority.
   - What to change: either inline critical CSS into the HTML or use rel="preload" and load CSS asynchronously if the team wants to shave a few ms; otherwise skip if not worth the work.

Notes

- Full HTML/JSON reports are available as the `lighthouse-morning-report` artifact in the workflow run linked above. The hosted HTML report is linked at the top.
- The nightly script writes reports/lighthouse-latest.md with the same summary; refer to that file for the raw briefing.

The team will review these items in the morning and decide which to implement.
