"""Entrypoint for the server application."""

import asyncio
from os import getcwd

import hypercorn
import hypercorn.asyncio
import hypercorn.run
from clear import clear
from trio import Path

from api import create_app

if __name__ == "__main__":
    clear()
    from api.config import DevelopmentConfig
    from api.logs import log_cfg

    app = asyncio.run(create_app(DevelopmentConfig))

    config = hypercorn.Config()
    config.bind = ["0.0.0.0:5000"]
    config.loglevel = "debug"
    config.use_reloader = True

    log_file = Path(getcwd()).joinpath("server", "logs", "hypercorn_api.log")
    cfg, _ = log_cfg(log_file=log_file)
    config.logconfig_dict = cfg

    asyncio.run(hypercorn.asyncio.serve(app, config, mode="asgi"))
    # uvicorn.run(app, host="0.0.0.0", port=5000)  # noqa: S104
