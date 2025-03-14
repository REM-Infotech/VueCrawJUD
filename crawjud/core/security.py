"""Application security configuration module."""

from datetime import timedelta  # noqa: F401

from quart import Quart

from crawjud.core import tlsm  # noqa: F401


async def security_config(app: Quart) -> None:
    """Configure the application security settings."""
    # # Configure the Content Security Policy (CSP) for the application.
    # tlsm.init_app(
    #     app,
    #     content_security_policy=app.config["CSP"],
    #     session_cookie_http_only=True,
    #     session_cookie_samesite="Lax",
    #     strict_transport_security=True,
    #     strict_transport_security_max_age=timedelta(days=31).max.seconds,
    #     x_content_type_options=True,
    # )
