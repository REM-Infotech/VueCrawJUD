"""Module for configuration routes.

This module aggregates the blueprints for admin, supersu, and user configurations.
"""

from api.routes.config.admin import admin
from api.routes.config.superSu import supersu
from api.routes.config.user import usr

__all__ = [usr, admin, supersu]
