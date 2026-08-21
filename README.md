### Hexlet tests and linter status:
[![Actions Status](https://github.com/musukvl/ai-for-developers-project-387/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/musukvl/ai-for-developers-project-387/actions)

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
