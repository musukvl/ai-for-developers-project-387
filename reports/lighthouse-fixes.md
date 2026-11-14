# Lighthouse fixes to consider

Baseline from the latest Lighthouse CI run (nightly) for the built SPA. Keep this file as the lightweight action list the team can consult when deciding morning priorities.

| Category | Score |
| --- | --- |
| Performance | 82 |
| Accessibility | 94 |
| Best Practices | 96 |
| SEO | 90 |

The nightly workflow uploads the HTML/JSON report as the `lighthouse-morning-report` artifact and writes `reports/lighthouse-latest.md`. A GitHub issue titled **Lighthouse morning report** is updated with a short summary each run.

The team reviews the morning report and decides which of these to apply.

## Do next (ordered by impact)

1. Reduce main-thread work / Total Blocking Time (ties to: "Minimize main-thread work", "Total Blocking Time", "Max Potential First Input Delay")
   - Why: Performance is 82 because long main-thread tasks and blocking time were observed. Improving this will most increase Performance and responsiveness.
   - Actions to consider: profile the Performance trace to find long tasks, split large tasks, code-split and lazy-load non-critical bundles, defer or async non-critical scripts, and remove/optimize heavy third-party scripts.

2. Eliminate render-blocking CSS (ties to: "Eliminate render-blocking resources")
   - Why: The stylesheet `/assets/index-*.css` was reported as render-blocking. Even small CSS can trigger a Lighthouse warning; inlining critical CSS or preloading can remove the flag.
   - Actions: inline critical above-the-fold CSS, use `rel="preload" as="style"` and then `rel="stylesheet"` fallback, or defer non-critical style loading.

3. Fix missing favicon / console errors (ties to: "Browser errors were logged to the console")
   - Why: A 404 for `/favicon.ico` appears in the console and is flagged by Best Practices. This is a low-effort fix that removes the console error.
   - Actions: add `frontend/public/favicon.ico` or a `<link rel="icon">` in `frontend/index.html` pointing to an existing asset.

4. Fix header link contrast (ties to: "Background and foreground colors do not have a sufficient contrast ratio")
   - Why: Accessibility is 94 because the header brand link contrast is low (~1.47:1). Changing the link color to meet 4.5:1 will raise Accessibility.
   - Actions: update the header brand link color (e.g., white or a darker color) or adjust background to meet contrast ratio.

5. Add a meta description (ties to: "Document does not have a meta description")
   - Why: SEO is 90 because `index.html` lacks a meta description. A short descriptive sentence improves search snippets.
   - Actions: add `<meta name="description" content="Calls Calendar — lightweight calendar for tracking calls and meetings">` to `frontend/index.html`.

## Notes / low-priority

- The full HTML/JSON report is attached to the workflow run as the artifact named `lighthouse-morning-report`. Download it from the run's Artifacts UI for traces and screenshots.
- Use the Performance trace in the HTML report to identify exact long tasks before making changes that affect bundling or runtime behavior.
