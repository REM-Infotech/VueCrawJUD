"""Configuration loader module for the application.

This module provides functionality to load configuration settings
into a Quart application instance from various sources.
"""

import os
import re
import subprocess

from celery.app.base import Celery
from quart import Quart
from quart_cors import cors
from socketio import ASGIApp
from uvicorn.middleware.proxy_headers import ProxyHeadersMiddleware  # noqa: F401

objects_config = {
    "development": "crawjud.core.config.DevelopmentConfig",
    "production": "crawjud.core.config.ProductionConfig",
    "testing": "crawjud.core.config.TestingConfig",
}


def get_hostname() -> str:
    """Get the hostname of the current machine."""
    return subprocess.run(
        [
            "powershell",
            "hostname",
        ],
        capture_output=True,
        text=True,
        check=False,
    ).stdout.strip()


async def app_configurator(app: Quart) -> tuple[Quart, ASGIApp, Celery]:
    """Load configuration settings into the Quart application.

    Args:
        app: The Quart application instance to configure

    Returns:
        None

    """
    env_ambient = os.getenv("AMBIENT_CONFIG")
    ambient = objects_config[env_ambient]
    app.config.from_object(ambient)

    async with app.app_context():
        from crawjud.utils import make_celery

        from .extensions import init_extensions
        from .routing import register_routes

        celery = None
        celery = await make_celery(app)
        celery.set_default()
        app.extensions["celery"] = celery
        # app.asgi_app = ProxyHeadersMiddleware(app.asgi_app)
        celery.autodiscover_tasks(["crawjud.bot", "crawjud.utils"])

        io = await init_extensions(app)

        await register_routes(app)

        asgi = ASGIApp(io, app)

    allowed_origins = [
        re.compile(r"http://127\.0\.0\.1:\d*"),
        re.compile(r"http://\d*\.\d*\.\d*:\d*"),
        re.compile(r"http://localhost:\d*"),
        re.compile(r"https://.*\.nicholas\.dev\.br"),
        re.compile(r"https://.*\.robotz\.dev"),
        re.compile(r"https://.*\.rhsolutions\.info"),
        re.compile(r"https://.*\.rhsolut\.com\.br"),
    ]

    return cors(app, allow_origin=allowed_origins, allow_credentials=True), asgi, celery
