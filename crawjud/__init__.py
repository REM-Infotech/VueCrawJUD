"""CrawJUD Robots Process Automation Application."""

import platform
import warnings
from os import environ, getenv
from pathlib import Path

import quart_flask_patch  # noqa: F401
from celery import Celery

from api import create_app
from crawjud.utils import make_celery

warnings.filterwarnings("ignore", category=RuntimeWarning, module="google_crc32c")
values = environ.get
is_init = Path("is_init.txt").resolve()

objects_config = {
    "development": "api.config.DevelopmentConfig",
    "production": "api.config.ProductionConfig",
    "testing": "api.config.TestingConfig",
}


async def create_celery_app() -> Celery:
    """Load configuration settings into the Quart application.

    Args:
        app: The Quart application instance to configure

    Returns:
        None

    """
    app = None

    if platform.system() == "Windows":
        env_ambient = getenv("AMBIENT_CONFIG")
        ambient = objects_config[env_ambient]
        await create_app(ambient)
        from api import app

    else:
        from api import app

    async with app.app_context():
        celery = None
        celery = await make_celery(app)
        celery.set_default()
        app.extensions["celery"] = celery
        celery.autodiscover_tasks(["crawjud.bot", "crawjud.utils"])

    return celery
