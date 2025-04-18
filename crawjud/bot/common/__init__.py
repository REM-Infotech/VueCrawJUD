"""Common module initialization for CrawJUD-Bots, handling custom exceptions."""

from crawjud.bot.common.exceptions import ExecutionError, NotFoundError, StartError

__all__ = ["ExecutionError", "NotFoundError", "StartError"]
