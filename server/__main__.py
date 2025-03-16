"""Main entry point for the server application."""

import argparse
import sys

from server.core.main import main_server

if __name__ == "__main__":
    if len(sys.argv) > 0:
        argv = sys.argv[1:]
        parser = argparse.ArgumentParser(description="Run the server application.")
        parser.add_argument(
            "--server",
            "-s",
            help="Starts the specified services (Quart, Worker[Celery], Beat[Celery). Comma separated.",
        )
        sys.exit(main_server(**vars(parser.parse_args(sys.argv[1:]))))

    sys.exit(main_server())
