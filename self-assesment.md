# Self-assessment

This file records how the repository meets Hexlet’s GitHub-agent check and how well the OpenCode agent worked in practice.

Hexlet check status: [Actions → hexlet-check](https://github.com/musukvl/ai-for-developers-project-387/actions/workflows/hexlet-check.yml).

## Hexlet checklist

### 1. Launch contract (Dockerfile, Docker, PORT)

- `Dockerfile` is in the repo root. It builds the Vue SPA and runs the Flask app.
- The image uses `ENV PORT=5000`. Flask binds with `os.environ.get("PORT", "5000")` in `backend/src/app.py`.
- Latest `hexlet-check` runs on `main` are **success**.

### 2. Workflows and access

- [OpenCode GitHub App](https://github.com/apps/opencode-agent) is installed on this repository.
- Comment workflow: `.github/workflows/opencode.yml` (`issue_comment`, `pull_request_review_comment`).
- Scheduled workflow: `.github/workflows/opencode-scheduled.yml` (`schedule` at 00:00 UTC+3 plus `workflow_dispatch`).
- Permissions: `id-token: write` (GitHub App OIDC), plus `contents` / `issues` / `pull-requests` write so the agent can commit, comment, and open PRs. Scheduled job also has `actions: read` for artifact links.
- Secret: `OPENAI_API_KEY`. Jobs use `use_github_token: true` because the App OIDC token exchange was unreliable; `GITHUB_TOKEN` is the built-in Actions token.

### 3. GitHub integration scenarios

| Scenario | Evidence |
| --- | --- |
| Agent from an issue comment replies | [#1](https://github.com/musukvl/ai-for-developers-project-387/issues/1) `/oc` smoke test |
| Triage with a short analysis | [#2](https://github.com/musukvl/ai-for-developers-project-387/issues/2) `/oc explain`; [#4](https://github.com/musukvl/ai-for-developers-project-387/issues/4) `/oc explain` |
| Create or update a PR with fixes | [PR #3](https://github.com/musukvl/ai-for-developers-project-387/pull/3), [PR #5](https://github.com/musukvl/ai-for-developers-project-387/pull/5), [PR #6](https://github.com/musukvl/ai-for-developers-project-387/pull/6) |
| General PR comment leads to a follow-up commit | [PR #10](https://github.com/musukvl/ai-for-developers-project-387/pull/10#issuecomment-5416156293) → run [32894105455](https://github.com/musukvl/ai-for-developers-project-387/actions/runs/32894105455) (`docs: add review note`) |
| Inline (line) review comment leads to a follow-up commit | [discussion](https://github.com/musukvl/ai-for-developers-project-387/pull/10#discussion_r3856937595) → run [32894291964](https://github.com/musukvl/ai-for-developers-project-387/actions/runs/32894291964), commit `docs: reference issue #9` |
| Nightly / scheduled workflow publishes a result | [Scheduled OpenCode Task](https://github.com/musukvl/ai-for-developers-project-387/actions/workflows/opencode-scheduled.yml) run [32892072826](https://github.com/musukvl/ai-for-developers-project-387/actions/runs/32892072826), issue [#9](https://github.com/musukvl/ai-for-developers-project-387/issues/9), artifact `lighthouse-morning-report` |

Where to look: [all Actions runs](https://github.com/musukvl/ai-for-developers-project-387/actions), [opencode](https://github.com/musukvl/ai-for-developers-project-387/actions/workflows/opencode.yml), [Scheduled OpenCode Task](https://github.com/musukvl/ai-for-developers-project-387/actions/workflows/opencode-scheduled.yml).

### 4. Security practices (recorded in the repo)

Implemented in `.github/workflows/opencode.yml` and `.github/workflows/opencode-scheduled.yml`, and described in `README.md`:

- **Event filter:** the comment job runs only when the body contains `/oc` or `/opencode`. Ordinary comments do not start a run.
- **Loop protection:** skip `github.event.comment.user.type == 'Bot'` and `github.actor == 'github-actions[bot]'`. The scheduled prompt must not mention `/oc` or `/opencode`. GitHub also does not re-trigger workflows from `GITHUB_TOKEN` bot comments.
- **Cost control:** model `openai/gpt-5-mini`, one scheduled Lighthouse run per day, `timeout-minutes: 20`, artifacts retained 14 days.

## Agent effectiveness (first pass vs iterations)

### First pass

After CI was working, these `/oc` tasks succeeded on the first run:

- Explain-only comments (triage)
- Issue #4 healthcheck fix → PR #5
- Healthcheck README guide → PR #6
- General review comment on PR #10 → review note commit

### Needed several iterations

- First OpenCode setup: GitHub App grant, OIDC token exchange, git author, persist `GITHUB_TOKEN`, allow Actions to open PRs
- Conventional Commits / do-not-amend on PR #3
- Scheduled Lighthouse: first dispatch failed after `pull-requests: write` was removed; the Action still opens a summary PR when report files change. Restored that permission; second run succeeded
- Inline review on PR #10: first `pull_request_review_comment` raced the general-comment run and could not push; the second line comment succeeded (`docs: reference issue #9`)

### Pattern

Later product tasks succeeded first time more often than early infra tasks. Spend iterations on the workflow once, then `/oc` is cheap.
