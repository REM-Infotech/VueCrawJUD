"""Entrypoint for the server application."""

import asyncio

import uvicorn

from server import create_app

if __name__ == "__main__":
    from crawjud.core.config import DevelopmentConfig

    app = asyncio.run(create_app(DevelopmentConfig))
    uvicorn.run(app, host="0.0.0.0", port=5000)  # noqa: S104
