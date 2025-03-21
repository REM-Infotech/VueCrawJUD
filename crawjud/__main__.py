"""Main entry point for the server application."""

import argparse
import sys

from crawjud.main import main_server

if __name__ == "__main__":
    argv = sys.argv[1:]
    if len(argv) > 0:
        parser = argparse.ArgumentParser(description="Run the server application.")
        parser.add_argument(
            "--server",
            "-s",
            help="Starts the specified services (Quart, Worker[Celery], Beat[Celery). Comma separated.",
        )
        sys.exit(main_server(**vars(parser.parse_args(argv))))

    sys.exit(main_server())
