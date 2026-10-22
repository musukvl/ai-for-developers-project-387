# Lighthouse morning report

Workflow run: https://github.com/musukvl/ai-for-developers-project-387/actions/runs/39853937552
Workflow run artifacts (contains `lighthouse-morning-report`): https://github.com/musukvl/ai-for-developers-project-387/actions/runs/39853937552/artifacts

Summary

- No Lighthouse JSON reports were found in `.lighthouseci/` so the automated summary could not extract category scores or failing audits.
- The generated summary file is `reports/lighthouse-latest.md`; it contains the notice that no reports were found. See that file and the workflow logs for the Lighthouse CI step for error details.

Observed error/output

- `reports/lighthouse-latest.md` says: "No Lighthouse JSON reports were found in `.lighthouseci/`. Check the workflow logs for the Lighthouse CI step."
- The scheduled job runs `lhci autorun` with `continue-on-error: true`, so a failure during the LHCI step can leave no reports and still continue.

Concrete fixes to consider (ordered by impact)

1. Accessibility — Fix low-contrast header brand link
   - Audit: color-contrast (accessibility)
   - Problem: Header link uses a brand color with insufficient contrast (contrast ~1.47:1). Lighthouse will mark this as an accessibility failure.
   - Suggested fix: Use a color that meets 4.5:1 contrast on the header background (for example, make the header link white or adjust the header/link palette) and re-run Lighthouse.

2. SEO — Add a meta description
   - Audit: meta-description (seo)
   - Problem: `frontend/index.html` is missing a `<meta name="description">`. Lighthouse lowers SEO score for missing description.
   - Suggested fix: Add a short one-line description of the Calls Calendar app to `index.html`.

3. Best Practices — Provide a favicon to avoid 404 console error
   - Audit: (no-favicon / console error) reported in Best Practices
   - Problem: Browser requests `/favicon.ico` and receives 404; Lighthouse records this as a Best Practices issue.
   - Suggested fix: Add `frontend/public/favicon.ico` or link an icon in `index.html` so the request succeeds.

Notes

- Because the workflow did not produce JSON reports, we could not extract precise category scores (Performance, Accessibility, Best Practices, SEO) or list failing audits from the most recent run. When LHCI produces reports the morning summary will include the category scores and the top failing audits.
- The HTML/JSON reports (when present) are attached to the workflow run as the `lighthouse-morning-report` artifact. Use the workflow run artifacts page above to download the HTML report.
- `reports/lighthouse-fixes.md` already lists the three actionable items above (contrast, favicon, meta description) and is up to date with the recommended fixes from prior runs.

Next steps for the team in the morning

1. Inspect the workflow run logs (Lighthouse CI step) to determine why `lhci autorun` did not write `.lighthouseci/lhr-*.json` files.
2. Download the `lighthouse-morning-report` artifact from the run artifacts page if available (it may contain an HTML report even when JSON is missing).
3. Prioritize and implement the fixes above as the team decides; re-run the scheduled job or run Lighthouse locally to verify improvements.

(This is a draft issue file; the scheduled runner typically opens or updates the real GitHub issue titled "Lighthouse morning report" when run on GitHub.)
