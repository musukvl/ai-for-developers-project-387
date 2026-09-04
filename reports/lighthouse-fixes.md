# Lighthouse fixes to consider

Baseline from the latest Lighthouse CI run (see `reports/lighthouse-latest.md`).

| Category | Score |
| --- | --- |
| Performance | 99 |
| Accessibility | 94 |
| Best Practices | 96 |
| SEO | 90 |

The nightly workflow (`.github/workflows/opencode-scheduled.yml`) uploads the HTML/JSON report as the `lighthouse-morning-report` artifact and writes `reports/lighthouse-latest.md`. The team reviews the morning report and decides which of the items below to apply.

## Do next (ordered by impact)

1. **Add a favicon to stop console errors** — ties to **Browser errors were logged to the console**. The browser requests `/favicon.ico` and currently returns 404; Lighthouse records this as a console error and it impacts Best Practices. Add a `favicon.ico` (or link a PNG/SVG from `frontend/index.html`) so the request succeeds.
2. **Fix header brand link contrast** — ties to **Background and foreground colors do not have a sufficient contrast ratio**. The header brand link currently fails WCAG contrast (approx. 1.47:1). Make the brand link color meet 4.5:1 (for example, white on the header background) so Accessibility passes.
3. **Add a meta description** — ties to **Document does not have a meta description**. Add a concise `<meta name="description" content="...">` to `frontend/index.html` to improve SEO and search result snippets.
4. **Eliminate render-blocking CSS** — ties to **Eliminate render-blocking resources** (the reported resource: `assets/index-*.css`). Consider inlining critical CSS for the above-the-fold layout, or deferring/non-render-blocking load for the main stylesheet (preload + swap or splitting critical vs non-critical). This targets the Performance audit that scored low for this item.
5. **Investigate long tasks to reduce Max Potential FID** — ties to **Max Potential First Input Delay**. Review large JS tasks in the production bundle and split or defer work (code-splitting, reduce JS work on main thread) to lower potential FID.

## Notes / Skip for now

- Some small render-time metrics are already very good; prioritize the items above. Back/forward cache issues reported by CI were marked not actionable by Lighthouse.
