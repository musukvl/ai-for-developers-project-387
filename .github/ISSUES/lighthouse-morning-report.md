# Lighthouse morning report

Workflow run: https://github.com/musukvl/ai-for-developers-project-387/actions/runs/33017272029

Hosted HTML report: https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1787781142914-65945.report.html

Summary

- Performance: 100
- Accessibility: 94
- Best Practices: 96
- SEO: 90

Failing or low-scoring audits

- Browser errors were logged to the console (0): 404 for `/favicon.ico`
- Background and foreground colors do not have a sufficient contrast ratio (0): header brand link contrast 1.47:1
- Document does not have a meta description (0)
- Eliminate render-blocking resources (50): `/assets/index-*.css` (small CSS ~4 KiB)

Recommended fixes (ordered by impact)

1. Add a favicon so the browser request succeeds — ties to: "Browser errors were logged to the console" (404). Reason: a missing `/favicon.ico` produces console errors and drops Best Practices. Add a favicon file to frontend/public or link an icon in `frontend/index.html` to stop the 404.

2. Fix header brand link contrast — ties to: "Background and foreground colors do not have a sufficient contrast ratio". Reason: header link color (`--brand-500` / #0ea5e9) on `.app-header-strong` (`--brand-600` / #0284c7) has contrast ~1.47:1. Make the header brand link white or another color meeting 4.5:1.

3. Add a meta description to `frontend/index.html` — ties to: "Document does not have a meta description". Reason: SEO score (90) is affected; add a concise one-sentence description of Calls Calendar.

4. Consider inlining or deferring the small critical CSS to eliminate render-blocking resources — ties to: "Eliminate render-blocking resources" (50) for `/assets/index-*.css`. Reason: the file is small (~4 KiB, ~160ms); performance is already 100 so this is low priority.

Notes

- Full HTML/JSON reports are attached to the workflow run as the `lighthouse-morning-report` artifact. Use the hosted HTML link above to download/view the report directly.
- `reports/lighthouse-latest.md` and `reports/lighthouse-fixes.md` in the repo reflect the latest run. No changes to `reports/lighthouse-fixes.md` were necessary.

The team can review these items in the morning and decide which fixes to apply.
