# Lighthouse fixes to consider

Baseline from the nightly Lighthouse CI runs. Keep this file aligned with the latest `reports/lighthouse-latest.md` output.

| Category | Score |
| --- | --- |
| Performance | 85 |
| Accessibility | 94 |
| Best Practices | 96 |
| SEO | 90 |

The nightly workflow (`.github/workflows/opencode-scheduled.yml`) uploads the HTML/JSON report as the `lighthouse-morning-report` artifact and writes `reports/lighthouse-latest.md`. OpenCode opens or updates a **Lighthouse morning report** issue. Use that issue for later runs; this file is the first action list.

The team reviews the morning report and decides which of these to apply.

## Do next

1. **Eliminate render-blocking CSS and reduce blocking time.** Performance is 85. Lighthouse flagged `/assets/index-*.css` as render-blocking (audit: "Eliminate render-blocking resources") and reported elevated Total Blocking Time and Max Potential FID. Addressing long main-thread tasks and the small render-blocking stylesheet will give the largest performance gains.
   - Audit: Eliminate render-blocking resources (example: `/assets/index-BDgfnwIW.css`) and Total Blocking Time / Max Potential FID
   - How: Inline critical CSS (the file is small), mark non-critical CSS with `rel=preload`/`media` attributes, and defer non-essential scripts. Break up long JS tasks, lazy-load non-critical work, or move heavy work off the main thread.
2. **Add a favicon to stop console 404s.** Best Practices records browser console errors (404). This is low-effort and cleans noisy CI output.
   - Audit: Browser errors were logged to the console (404 for `/favicon.ico`)
   - How: Add `frontend/public/favicon.ico` or link an icon in `frontend/index.html`.
3. **Add a meta description.** SEO is 90 because `index.html` lacks a `<meta name="description">`.
   - Audit: Document does not have a meta description
   - How: Add a concise one-sentence summary of Calls Calendar to the page head.
4. **Improve header/brand link contrast.** Accessibility is 94 due to a low-contrast header link.
   - Audit: Background and foreground colors do not have a sufficient contrast ratio
   - How: Use a color that meets 4.5:1 contrast (for example, white on the header background) or adjust the background color.

## Skip for now

-- Back/forward cache. Lighthouse previously marked that as not actionable (internal error on the CI static server).
