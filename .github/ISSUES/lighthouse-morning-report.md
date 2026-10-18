Title: Lighthouse morning report

This issue contains the automated Lighthouse morning briefing for the Calls Calendar app. The team should review the suggested fixes and decide which to prioritise during the morning review.

Workflow run: https://github.com/musukvl/ai-for-developers-project-387/actions/runs/39165982972
Download the attached HTML/JSON reports from the run's artifacts: https://github.com/musukvl/ai-for-developers-project-387/actions/runs/39165982972/artifacts (artifact name: `lighthouse-morning-report`)

Hosted HTML report (from the run): https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1792357358129-43939.report.html

Summary (scores)

- Performance: 100
- Accessibility: 94
- Best Practices: 96
- SEO: 90

Failing / low-scoring audits

- Browser errors were logged to the console (0): Failed to load resource: the server responded with a status of 404 (Not Found)
- Background and foreground colors do not have a sufficient contrast ratio (0): Low-contrast text
- Document does not have a meta description (0)
- Eliminate render-blocking resources (50): http://localhost:41305/assets/index-BDgfnwIW.css

Concrete fixes to consider (ordered by impact)

1. Add a favicon to remove the console error (ties to: "Browser errors were logged to the console")
   - Why: The browser requested `/favicon.ico` and received 404; Lighthouse records this as a console error and it affects Best Practices.
   - Suggested change: Add a favicon file in frontend/public (favicon.ico) or link an SVG/PNG favicon from `frontend/index.html` so the request succeeds.

2. Fix header link contrast (ties to: "Background and foreground colors do not have a sufficient contrast ratio")
   - Why: The header brand link uses a brand color that does not meet 4.5:1 contrast on the header background, causing the Accessibility score drop.
   - Suggested change: Make the header brand link white (or another color that meets 4.5:1 contrast on the header background), or adjust CSS variables so the computed colors meet the contrast requirement.

3. Add a meta description (ties to: "Document does not have a meta description")
   - Why: SEO score drops because `index.html` lacks a `<meta name="description">`.
   - Suggested change: Add a concise one-sentence description of Calls Calendar to `frontend/index.html`.

4. Evaluate render-blocking CSS (ties to: "Eliminate render-blocking resources")
   - Why: Lighthouse flagged a small stylesheet (`/assets/index-*.css`, ~4 KiB) as render-blocking. Performance remains 100, so this is low priority.
   - Suggested change: Consider inlining critical CSS or deferring non-critical CSS if you want to further optimise load time; this can be postponed while Performance is already excellent.

Notes

- `reports/lighthouse-latest.md` contains the short machine-generated briefing (committed by the CI run).
- `reports/lighthouse-fixes.md` already lists the same recommended fixes; it was reviewed and remains aligned with the current run.
- Do not implement fixes in this issue. After the team decides which items to apply, create separate issues or PRs that reference this issue.

Next steps for the team

- Review and prioritise the fixes above in the morning meeting.
- If agreed, create small focused PRs (one fix per PR where possible) and reference this issue.
