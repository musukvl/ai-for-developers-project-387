# Lighthouse morning report

This issue summarizes the latest Lighthouse CI run and recommends concrete fixes for the team to consider. The team reviews these items in the morning and decides which to apply.

Workflow run: https://github.com/musukvl/ai-for-developers-project-387/actions/runs/34161619275

Hosted HTML report: https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1788814967022-43021.report.html

Repository summary report: reports/lighthouse-latest.md

## Scores

- Performance: **100**
- Accessibility: **94**
- Best Practices: **96**
- SEO: **90**

## Audits to review

- **Browser errors were logged to the console** (0): Failed to load resource: the server responded with a status of 404 (Not Found)
- **Background and foreground colors do not have a sufficient contrast ratio** (0): Low-contrast text is difficult or impossible for many users to read
- **Document does not have a meta description** (0): Meta descriptions may be included in search results to concisely summarize page content
- **Eliminate render-blocking resources** (50): HTTP request for `/assets/index-*.css`

## Recommended fixes (ordered by impact)

1. Fix header link contrast — tied to "Background and foreground colors do not have a sufficient contrast ratio"
   - Why: Improves accessibility for readers with low vision and ensures compliance with WCAG contrast requirements (Lighthouse flagged header link contrast as 1.47:1; target is >= 4.5:1).
   - Suggested change: Make the header brand link use a color with sufficient contrast on the header background (for example, white or a darker shade that meets 4.5:1).

2. Add a meta description — tied to "Document does not have a meta description"
   - Why: Improves SEO and search result snippets; Lighthouse lowered the SEO score because no `<meta name="description">` is present.
   - Suggested change: Add a concise one-sentence description of Calls Calendar to `frontend/index.html`.

3. Add a favicon (fix console 404) — tied to "Browser errors were logged to the console"
   - Why: The browser requests `/favicon.ico` and gets a 404 which Lighthouse logs as a console error and affects Best Practices score.
   - Suggested change: Add `frontend/public/favicon.ico` or include a linked favicon (SVG/PNG) in `frontend/index.html` so the request succeeds.

4. Consider addressing render-blocking CSS (low priority) — tied to "Eliminate render-blocking resources"
   - Why: Lighthouse flagged a CSS file served from `/assets/index-*.css` as render-blocking. Current Performance is 100, so this is low priority; the CSS is small (~4 KiB).
   - Suggested change: If desired, inline critical CSS or use preload for the stylesheet. Given the current perfect Performance score, postpone unless regression appears.

## Artifacts and details

- Full HTML/JSON reports are attached to the workflow run as the `lighthouse-morning-report` artifact (download from the run page above).
- The hosted HTML report is linked above for quick inspection.
- The file `reports/lighthouse-fixes.md` contains an aligned checklist and recommendations; see that file for the baseline action list in the repo.

---

If Lighthouse had not produced a report, this issue would include the step logs and error output. The latest run produced the reports listed above.
