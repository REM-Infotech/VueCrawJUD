"""Switches for the project."""

from . import celery_beat, celery_worker

__all__ = [
    "celery_beat",
    "celery_worker",
]
