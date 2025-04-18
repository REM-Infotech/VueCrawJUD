"""Create and manage ZIP archives for bot execution outputs with automatic cleanup of temp files."""

import os
import zipfile
from datetime import datetime
from os import path
from pathlib import Path
from shutil import rmtree

import pytz


def makezip(pid: str) -> tuple[str, Path]:
    """Create a ZIP archive for a given process ID.

    This function collects all relevant files associated with the provided PID,
    excludes certain files and directories, and packages them into a ZIP file
    for easier handling and transmission.

    Args:
        pid (str): The process ID for which to create the ZIP archive.

    Returns:
        str: The path to the created ZIP file.

    Raises:
        Exception: If an error occurs during the ZIP creation process.

    """
    file_paths = []
    exec_path = (
        Path(__file__)
        .cwd()
        .joinpath(
            "crawjud",
            "bot",
            "temp",
            f"{pid}",
        )
        .resolve()
    )

    exec_path.mkdir(exist_ok=True)
    for root, _, __ in exec_path.walk():
        if "chrome" in str(root) and Path(root).is_dir():
            rmtree(root, ignore_errors=True)
        elif ("chrome" in str(root) and Path(root).is_file()) or Path(root).suffix in {".json", ".flag"}:
            Path(root).unlink()

    files = [str(f) for f in exec_path.iterdir() if f.is_file() and pid in f.stem]
    files_subfolders = [
        path.join(f, file)
        for f in [str(f) for f in exec_path.iterdir() if f.is_dir() and pid in f.stem]
        for file in Path(f).iterdir()
        if Path(file).is_file() and pid in Path(file).stem
    ]
    file_paths.extend(files)
    file_paths.extend(files_subfolders)

    # Package the files into a ZIP archive to facilitate sending
    current_time = datetime.now(pytz.timezone("America/Manaus"))
    zip_filename = f"PID {pid} {current_time.strftime('%d-%m-%Y-%H.%M')}.zip"
    zip_file = (
        Path(__file__)
        .cwd()
        .joinpath(
            "crawjud",
            "bot",
            "Archives",
            f"{zip_filename}",
        )
        .resolve()
    )
    with zipfile.ZipFile(zip_file, "w", zipfile.ZIP_DEFLATED) as zipf:
        for file in file_paths:
            arcname = os.path.relpath(file, exec_path)
            zipf.write(file, arcname=arcname)

    return zip_filename, zip_file
