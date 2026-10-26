# Lighthouse fixes to consider

Baseline from a Lighthouse CI run of the built SPA (`frontend/dist`) on 2026-08-25.

| Category | Score |
| --- | --- |
| Performance | 100 |
| Accessibility | 94 |
| Best Practices | 96 |
| SEO | 90 |

The nightly workflow (`.github/workflows/opencode-scheduled.yml`) uploads the HTML/JSON report as the `lighthouse-morning-report` artifact and writes `reports/lighthouse-latest.md`. OpenCode opens or updates a **Lighthouse morning report** issue. Use that issue for later runs; this file is the first action list.

The team reviews the morning report and decides which of these to apply.

## Do next

1. **Fix header link contrast.** Accessibility is 94 because the "Calls Calendar" header link uses the global `a` color (`--brand-500` / `#0ea5e9`) on `.app-header-strong` (`--brand-600` / `#0284c7`). Contrast is ~1.47:1; Lighthouse requires 4.5:1. Make the header brand link white (or another color that meets 4.5:1 on the header).
2. **Reduce render-blocking CSS.** Lighthouse flagged `/assets/index-*.css` as render-blocking (audit score ~50). Consider inlining critical CSS, splitting critical vs non-critical CSS, or using `rel=preload`/`media=print` techniques to defer non-critical styles.
3. **Add a favicon.** Best Practices records a console error from a missing `/favicon.ico`. Add `frontend/public/favicon.ico` (or an icon linked from `frontend/index.html`) so the request succeeds.
4. **Add a meta description.** SEO is 90 because `frontend/index.html` has no `<meta name="description">`. Add a one-sentence page description.
5. **Investigate long main-thread tasks / FID.** Lighthouse notes Max Potential FID issues. If the team sees real user impact, consider code-splitting, web workers, or breaking up heavy tasks.

## Notes

- The list above reflects the latest run and is ordered by expected impact (accessibility and render-blocking CSS first). Small, low-risk items are favicon and meta description.
- If the team asks, open focused issues or draft PRs for any item listed above.
