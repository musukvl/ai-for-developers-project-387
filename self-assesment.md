# Self-assessment: GitHub OpenCode agent

The GitHub agent is stable: it only starts on `/oc` or `/opencode`, it does not loop on its own replies, issue/PR/schedule paths all work, and runs live in the Actions tab.

## First pass

After CI was working, these tasks succeeded on the first `/oc` run:

- Explain-only comments on issues
- Issue #4 healthcheck fix → [PR #5](https://github.com/musukvl/ai-for-developers-project-387/pull/5)
- Healthcheck README guide → [PR #6](https://github.com/musukvl/ai-for-developers-project-387/pull/6)

## Needed several iterations

- First OpenCode setup: OIDC token exchange, git author identity, persist credentials, and allowing GitHub Actions to open PRs
- Conventional Commits / do-not-amend on [PR #3](https://github.com/musukvl/ai-for-developers-project-387/pull/3)
- Scheduled Lighthouse job after over-cutting `pull-requests: write`; the second dispatch succeeded

## Pattern

Later product tasks succeeded first time more often than early infra tasks. Spend iterations on the workflow once, then `/oc fix` is cheap.

Confirmed scenarios: issues [#1](https://github.com/musukvl/ai-for-developers-project-387/issues/1), [#2](https://github.com/musukvl/ai-for-developers-project-387/issues/2), [#4](https://github.com/musukvl/ai-for-developers-project-387/issues/4); PRs #3, #5, #6; scheduled run [32892072826](https://github.com/musukvl/ai-for-developers-project-387/actions/runs/32892072826) with issue [#9](https://github.com/musukvl/ai-for-developers-project-387/issues/9) and summary [PR #10](https://github.com/musukvl/ai-for-developers-project-387/pull/10).
