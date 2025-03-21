"""CrawJUD Robots Process Automation Application."""

import asyncio
import warnings
from os import environ
from pathlib import Path
from threading import Event
from time import sleep
from typing import Callable, Dict

import inquirer
import quart_flask_patch  # noqa: F401
from celery import Celery
from clear import clear
from rich import print as printf  # noqa: F401
from rich.live import Live
from rich.spinner import Spinner
from rich.text import Text  # noqa: F401
from socketio import AsyncServer
from termcolor import colored
from tqdm import tqdm

from api import app
from api.config import StoreService as StoreService
from api.config import running_servers
from crawjud.manager import HeadCrawjudManager
from crawjud.types import app_name
from crawjud.utils import make_celery  # noqa: F401

io = AsyncServer(
    async_mode="asgi",
    cors_allowed_origins="*",
    ping_interval=25,
    ping_timeout=10,
)


warnings.filterwarnings("ignore", category=RuntimeWarning, module="google_crc32c")


values = environ.get
is_init = Path("is_init.txt").resolve()


async def create_celery_app() -> Celery:
    """Load configuration settings into the Quart application.

    Args:
        app: The Quart application instance to configure

    Returns:
        None

    """
    async with app.app_context():
        celery = None
        celery = await make_celery(app)
        celery.set_default()
        app.extensions["celery"] = celery
        celery.autodiscover_tasks(["crawjud.bot", "crawjud.utils"])

    return celery


class MasterApp(HeadCrawjudManager):
    """Master application class."""

    loop_app = True

    def boot_app(self) -> None:
        """Boot Beat and the application."""
        clear()
        self.event_stop = Event()
        with Live(Spinner("dots", text="[bold yellow]Starting application server"), refresh_per_second=10) as live:
            live.update(Spinner("dots", text="[bold yellow]Starting application server"))
            self.app, self.asgi, self.celery = asyncio.run(create_celery_app())
            live.update(Text("✅ Application server started.", style="bold green"))

    def __init__(self, **kwargs: str) -> None:
        """Initialize the ASGI server."""
        self.boot_app()

        self.current_menu = self.main_menu
        self.current_menu_name = "Main Menu"

        if kwargs:
            self.start_specific(**kwargs)

    @property
    def functions(
        self,
    ) -> dict[
        str,
        Callable[[app_name], None],
    ]:
        """Return the functions for the server."""
        return {
            "status": self.status,
            "start": self.start,
            "stop": self.stop,
            "restart": self.restart,
        }

    def prompt(self) -> None:
        """Prompt the user for server options."""
        if self.current_menu_name == "Main Menu":
            if running_servers:
                tqdm.write("=============================================================")
                tqdm.write("Running servers:")
                for server in running_servers.keys():
                    tqdm.write(f" {colored('[ x ]', color='green')} {server}")
                tqdm.write("=============================================================")

        if self.returns_message:
            message = self.returns_message[0]
            type_message = self.returns_message[1].upper()
            colour = self.returns_message[2]
            tqdm.write(colored(f"[{type_message}] {message}", colour, attrs=["blink", "bold"]))
            sleep(5)
            self.returns_message_ = ""
            clear()

        menu = {
            "Quart Application": self.quart_application,
            "Celery Worker": self.worker_menu,
        }

        translated_args: dict[str, str] = {
            "Start Service": "start",
            "Restart Service": "restart",
            "Shutdown Service": "stop",
            "View Logs": "status",
        }

        options: dict[str, Callable[[], None]] = {
            "Clear Prompt": clear,
            "Start Services": self.start_all,
            "Get Executions Logs": self.get_log_bot,
            "Close Server": self.close_server,
            "Back": self.return_main_menu,
        }
        with self.answer_prompt(self.current_menu, menu) as server_answer:
            func = None
            choice = server_answer.get("server_options", "Back")
            translated_arg = translated_args.get(choice)
            if translated_arg:
                func = self.functions.get(translated_arg)

            if choice == "Show Prompt":
                clear()

            elif choice in options:
                call_obj = options.get(choice)
                call_obj()

            elif func:
                returns = func(self.current_app)

                if returns is not None and returns != "":
                    self.returns_message_ = returns

            choice = self.current_choice
            if self.loop_app:
                self.prompt()

    def close_server(self) -> bool:
        """Close the server."""
        config_exit = inquirer.prompt([inquirer.Confirm("exit", message="Do you want to exit?")])
        if config_exit.get("exit") is True:
            clear()
            self.loop_app = False

            running_servers_ = running_servers.items()
            running_servers_ = [running_servers_ for running_servers_ in running_servers_]  # noqa: C416
            running_servers_ = running_servers_[::-1]
            for application_name, application in running_servers_:
                with Live(
                    Spinner("dots", text=f"[bold yellow]Stopping {application_name} application"), refresh_per_second=10
                ) as live:
                    if application_name == "Quart":
                        self.event_stop.set()

                    sleep(5)
                    application.stop()
                    sleep(5)
                    live.update(
                        Text(
                            text=f"✅ {application_name} application stopped successfully!",
                            style="bold green",
                        )
                    )
                    sleep(2)

        self.return_main_menu()

    def return_main_menu(self) -> None:
        """Return to the main menu."""
        self.current_menu = self.main_menu
        self.current_menu_name = "Main Menu"
        self.current_choice = ""
        self.current_app = ""

    def get_log_bot(self) -> None:
        """Get the bot logs."""
        answer_logger: Dict[str, str | None] | None = inquirer.prompt([
            inquirer.Text("log", message="Enter the log file name")
        ])

        text_choice = answer_logger.get("log")

        if not text_choice:
            return

        file_path = (
            Path(__file__)
            .cwd()
            .resolve()
            .joinpath(
                "crawjud",
                "bot",
                "temp",
                text_choice,
                f"{text_choice}.log",
            )
        )
        tqdm.write(file_path.as_uri())
        if file_path.exists():
            from crawjud.utils.watch import monitor_log

            monitor_log(file_path=file_path)
            tqdm.write(colored("[INFO] Log file closed.", "yellow", attrs=["bold"]))
            sleep(2)
            clear()
            return

        tqdm.write(colored(f"[ERROR] File '{text_choice}' does not exist.", "red", attrs=["bold"]))
        sleep(2)
        clear()
