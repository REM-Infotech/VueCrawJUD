"""Server main entry point."""

from __future__ import annotations

import sys
from os import environ
from threading import Thread
from time import sleep

from termcolor import colored
from tqdm import tqdm

from crawjud import MasterApp
from crawjud.manager.menu import MenuManager
from crawjud.manager.runner import RunnerServices


def main_server(**kwargs: str) -> None:
    """Server main entry point."""
    application_instance = MasterApp(**kwargs)

    environ.update({
        "SERVER_MANAGEMENT": "True",
    })
    try:
        prompt = Thread(target=application_instance.prompt, daemon=True)
        prompt.start()
        prompt.join()

    except KeyboardInterrupt:
        tqdm.write("Stopping app")

    tqdm.write(colored("Server closed!", "green", attrs=["bold"]))
    sleep(2)
    sys.exit(0)


__all__ = [MenuManager, RunnerServices, main_server]
