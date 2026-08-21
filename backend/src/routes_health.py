"""Minimal health endpoints: liveness and readiness.

This keeps the original `/api/health` response for compatibility but
adds `/api/health/live` (liveness, always 200) and
`/api/health/ready` (readiness, mirrors the previous `/api/health`).
"""

from __future__ import annotations

from flask import Blueprint, current_app, jsonify

health_bp = Blueprint("health", __name__)


@health_bp.get("/api/health/live")
def get_health_live():
    """Liveness probe: always return 200 so orchestrators know the process is alive."""
    return jsonify({"status": "ok"})


@health_bp.get("/api/health/ready")
def get_health_ready():
    """Readiness probe: return the configured seed file and signal ready.

    Minimal implementation: mirror the previous `/api/health` response so
    tests and existing integrations continue to see the seed file path.
    A fuller readiness check (ensuring storage contains seeded data) can
    be added later if desired.
    """
    return jsonify({"status": "ok", "seedFile": current_app.config["SEED_FILE"]})


@health_bp.get("/api/health")
def get_health():
    """Compatibility endpoint: same as readiness for now."""
    return get_health_ready()
