"""Module for configuration routes.

This module aggregates the blueprints for admin, supersu, and user configurations.
"""

from server.routes.config.admin import admin
from server.routes.config.superSu import supersu
from server.routes.config.user import usr

__all__ = [usr, admin, supersu]
