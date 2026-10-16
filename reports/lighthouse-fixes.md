# Lighthouse fixes to consider

Baseline from a Lighthouse CI run of the built SPA (`frontend/dist`). This file is the maintained action list the team reviews each morning.

| Category | Score |
| --- | --- |
| Performance | 91 |
| Accessibility | 94 |
| Best Practices | 96 |
| SEO | 90 |

The nightly workflow (`.github/workflows/opencode-scheduled.yml`) uploads the HTML/JSON report as the `lighthouse-morning-report` artifact and writes `reports/lighthouse-latest.md`. The CI also opens or updates a **Lighthouse morning report** issue. Use that issue for morning triage; this file lists the recommended fixes for engineers to consider.

The team reviews the morning report and decides which of these to apply.

## Do next

1. **Eliminate render-blocking CSS / preload critical CSS.** Audit: "Eliminate render-blocking resources" (50). The build serves `/assets/index-*.css` early in the page load. Options: inline critical CSS for the above-the-fold header, add a `<link rel="preload" as="style">` and swap to `rel="stylesheet"` with a small JS loader, or split CSS so critical rules are inline and the rest is loaded asynchronously. This will improve FCP and Performance score.
2. **Reduce main-thread work to lower Total Blocking Time and Max Potential FID.** Audits: "Total Blocking Time" (70) and "Max Potential First Input Delay" (30). Identify long tasks in the bundle (third-party libs or large sync initialization), code-split, defer non-essential JS, and consider offloading work to web workers. Reducing long tasks should raise Performance significantly.
3. **Fix console errors (favicon 404).** Audit: "Browser errors were logged to the console". The app currently 404s on `/favicon.ico`. Add a favicon file to `frontend/public/` or reference a favicon in `frontend/index.html` to stop the 404 and remove the console error (improves Best Practices and noise in logs).
4. **Fix header link contrast.** Audit: "Background and foreground colors do not have a sufficient contrast ratio." The brand header link uses a color combination that fails WCAG. Change the header link color (for example, white on the dark header) or adjust background to meet 4.5:1 contrast.
5. **Add a meta description.** Audit: "Document does not have a meta description". Add a concise `<meta name="description" content="...">` in `frontend/index.html` to help SEO and search result snippets.

## Skip for now

Notes:

- The current run shows Performance at 91; prioritise the performance items (render-blocking CSS and main-thread work) first as they offer the largest score improvements.
- The workflow uploads the HTML/JSON and the generated report file as the `lighthouse-morning-report` artifact. The latest run (see `reports/lighthouse-latest.md`) includes a hosted HTML report link if Lighthouse uploaded it.

Links:

- Workflow run: https://github.com/musukvl/ai-for-developers-project-387/actions/runs/38966504225
- Hosted HTML report (if available from this run): https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1792184565550-44829.report.html
