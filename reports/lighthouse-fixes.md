# Lighthouse fixes to consider

Baseline from the latest Lighthouse CI run of the built SPA (`frontend/dist`).

| Category | Score |
| --- | --- |
| Performance | 86 |
| Accessibility | 94 |
| Best Practices | 96 |
| SEO | 90 |

The nightly workflow (`.github/workflows/opencode-scheduled.yml`) uploads the HTML/JSON report as the `lighthouse-morning-report` artifact and writes `reports/lighthouse-latest.md`. OpenCode opens or updates a **Lighthouse morning report** issue. Use that issue for later runs; this file is the first action list.

The team reviews the morning report and decides which of these to apply.

## Do next

1. **Reduce main-thread work and Total Blocking Time (TBT).** The run shows
   audits like "Minimize main-thread work", "Total Blocking Time" and
   "Max Potential First Input Delay" as concerns. These indicate long
   tasks during load. Consider code-splitting, deferring non-critical
   JavaScript, and removing/blocking long-running third-party scripts.
   (Tied to: Minimize main-thread work; Total Blocking Time; Max
   Potential First Input Delay; Speed Index)
2. **Eliminate render-blocking CSS and optimize critical CSS.** Lighthouse
   reported `Eliminate render-blocking resources` for `/assets/index-*.css`.
   Options: inline critical CSS for above-the-fold content, preload the
   stylesheet, or split CSS so only small critical rules block initial
   render. (Tied to: Eliminate render-blocking resources; Speed Index)
3. **Add a favicon to remove console 404 errors.** Lighthouse recorded
   browser console errors (404) for missing `/favicon.ico`. Add a
   `frontend/public/favicon.ico` or link a favicon from `index.html` to
   remove the console error and improve Best Practices. (Tied to: Browser
   errors were logged to the console)
4. **Fix header brand link contrast.** The header brand link currently has
   insufficient contrast (Lighthouse flagged low-contrast text). Use a
   color that meets 4.5:1 contrast on the header background (white is a
   simple fix). (Tied to: Background and foreground colors do not have a
   sufficient contrast ratio)
5. **Add a meta description.** SEO dropped because `index.html` lacks a
   `<meta name="description">`. Add a concise one-sentence description of
   Calls Calendar. (Tied to: Document does not have a meta description)

## Skip for now

Skip for now

- Back/forward cache. Lighthouse marked the failure as not actionable (internal error on the CI static server).

Notes

- The latest run lowered Performance to 86 compared with the previous
  baseline. The highest-impact items are main-thread work / TBT and the
  render-blocking CSS. Start with those before smaller fixes like the
  favicon, contrast, and meta description.
