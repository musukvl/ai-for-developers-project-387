### Hexlet tests and linter status:
[![Actions Status](https://github.com/musukvl/ai-for-developers-project-387/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/musukvl/ai-for-developers-project-387/actions)

### GitHub agent (OpenCode)

The agent does **not** run on every comment. Comment `/oc` or `/opencode` on an issue or pull request. Bot replies are ignored, so the agent cannot start itself.

Look at runs in the Actions tab:

- [All workflow runs](https://github.com/musukvl/ai-for-developers-project-387/actions)
- [opencode](https://github.com/musukvl/ai-for-developers-project-387/actions/workflows/opencode.yml) — issue/PR commands
- [Scheduled OpenCode Task](https://github.com/musukvl/ai-for-developers-project-387/actions/workflows/opencode-scheduled.yml) — nightly Lighthouse at 00:00 UTC+3, also **Run workflow** by hand

The comment agent uses `openai/gpt-5-mini`. The scheduled job writes `reports/lighthouse-latest.md` and uploads the `lighthouse-morning-report` artifact.

### Healthcheck guide

The backend exposes health endpoints that can be used for liveness and readiness probes.

- Liveness probe
  - URL: `GET /api/health/live`
  - Purpose: indicates the app process is running. Should return HTTP 200 when the app is alive.

- Readiness probe
  - URL: `GET /api/health/ready`
  - Purpose: indicates the app is ready to serve traffic (for example, seed data loaded)
  - Behaviour: returns HTTP 200 when the service is ready, otherwise HTTP 503 when not ready.

Notes
- Older versions of the service expose a single endpoint: `GET /api/health` which returns JSON with a `status` field and the configured `seedFile` path.
- Use the liveness endpoint for container/runtime health checks and the readiness endpoint for load-balancer or orchestrator probes.

Examples
- Check liveness:

  curl -i http://localhost:5000/api/health/live

- Check readiness:

  curl -i http://localhost:5000/api/health/ready
