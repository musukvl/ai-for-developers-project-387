# Lighthouse fixes to consider

Baseline from the latest Lighthouse CI runs for the built SPA (`frontend/dist`).

| Category | Score |
| --- | --- |
| Performance | 86 |
| Accessibility | 94 |
| Best Practices | 96 |
| SEO | 90 |

The nightly workflow (`.github/workflows/opencode-scheduled.yml`) uploads the HTML/JSON report as the `lighthouse-morning-report` artifact and writes `reports/lighthouse-latest.md`. OpenCode opens or updates a **Lighthouse morning report** issue. Use that issue for later runs; this file is the first action list.

The team reviews the morning report and decides which of these to apply.

## Do next

1. **Reduce main-thread blocking and eliminate render-blocking resources** (ties to: "Eliminate render-blocking resources", "Total Blocking Time", "Max Potential First Input Delay")
   - Why: Performance fell to 86 due to a handful of long tasks and a render-blocking stylesheet (`/assets/index-*.css`). Reducing long tasks and removing critical-path CSS will lower Total Blocking Time and Max Potential FID.
   - What to try: Inline only the truly critical CSS for the initial viewport, defer or async-load the remaining stylesheet, and inspect the Lighthouse trace/Performance panel to find long tasks. Break up heavy work (web workers, code-splitting, requestIdleCallback/startTransition) and defer non-essential initialization.

2. **Fix header link contrast** (ties to: "Background and foreground colors do not have a sufficient contrast ratio")
   - Why: The header brand link currently fails contrast (Lighthouse requires 4.5:1). Accessibility is 94 and this is a high-impact, low-effort fix.
   - What to try: Make the header link color white (or choose a color that meets 4.5:1 against the header background), or adjust the header background color.

3. **Add a favicon to eliminate console 404s** (ties to: "Browser errors were logged to the console")
   - Why: A missing favicon triggers a console 404 which impacts Best Practices. Adding a favicon removes the noise and improves the score.
   - What to try: Add `frontend/public/favicon.ico` or link an SVG/PNG favicon from `frontend/index.html`.

4. **Add a meta description** (ties to: "Document does not have a meta description")
   - Why: SEO is 90 because the built `index.html` has no `<meta name="description">`. Adding one addresses the SEO audit.
   - What to try: Add a concise one-sentence description to the HTML template used for CI builds.

## Skip for now / notes

- Back/forward cache: Lighthouse marked the failure as not actionable on the CI static server. Leave this for later.
- Small render-blocking CSS (the file is small, ~4 KiB) — address as part of item 1 if you prioritise performance work.
