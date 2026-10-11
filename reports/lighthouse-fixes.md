# Lighthouse fixes to consider

Baseline notes and a short action list aligned with the latest nightly Lighthouse run.

| Category | Score |
| --- | --- |
| Performance | 99 |
| Accessibility | 94 |
| Best Practices | 96 |
| SEO | 90 |

The nightly workflow uploads the HTML/JSON report as the `lighthouse-morning-report` artifact and writes `reports/lighthouse-latest.md`. The project maintains a single GitHub issue titled **Lighthouse morning report** that is opened or updated each run. Use that issue for triage and assignment; this file lists recommended fixes.

The team reviews the morning report and decides which of these to apply.

## Do next

1. **Add a favicon** (ties to: Browser console errors / Best Practices)
   - Why: The browser requests `/favicon.ico` and receives 404; Lighthouse records console errors which reduce Best Practices. Add `frontend/public/favicon.ico` or a linked SVG/PNG in the app head.
   - Effort: trivial. Risk: none.

2. **Fix header/brand link contrast** (ties to: Background/foreground color contrast / Accessibility)
   - Why: The header brand/link color fails WCAG contrast (Lighthouse flagged low contrast). Update the header brand/link color to meet at least 4.5:1 against the header background (e.g., make link white or a darker shade).
   - Effort: small. Risk: low. Files to check: frontend CSS variables and header styles.

3. **Add a meta description** (ties to: Document does not have a meta description / SEO)
   - Why: Adding `<meta name="description">` fixes the SEO audit and improves search result snippets.
   - Effort: trivial. Risk: none. File to edit: `frontend/index.html` or the app HTML template.

4. **Investigate render-blocking CSS** (ties to: Eliminate render-blocking resources / Performance)
   - Why: `assets/index-*.css` was flagged as render-blocking. Options: inline critical CSS, split/defer non-critical CSS, or `rel="preload"` the stylesheet. Performance is high (99) so this is lower priority.
   - Effort: small-to-medium. Risk: moderate if CSS is refactored.

5. **Review long tasks affecting FID** (ties to: Max Potential First Input Delay / Performance)
   - Why: Lighthouse flagged a potential for long tasks that could increase First Input Delay. Profile main-thread tasks and break up long work or defer non-essential scripts if you need to further harden responsiveness.
   - Effort: medium. Risk: medium depending on approach.

## Skip for now

- Back/forward cache. The CI static server had an internal error; Lighthouse marked this as not actionable for now.
