"""Module for initializing and orchestrating ELAW system automation bots.

This module serves as the main entry point for ELAW system automation, providing bot
initialization, management and execution capabilities for various ELAW tasks.

Classes:
    Elaw: Core class for managing ELAW automation bots

Attributes:
    logger_ (Logger): Module logger instance
    ClassBots (Union): Union type of available bot classes

"""

from __future__ import annotations

import logging
from traceback import format_exception
from typing import Callable, Union

from crawjud.bot.common import StartError
from crawjud.bot.scripts.elaw.andamentos import Andamentos
from crawjud.bot.scripts.elaw.cadastro import Cadastro
from crawjud.bot.scripts.elaw.complement import Complement
from crawjud.bot.scripts.elaw.download import Download
from crawjud.bot.scripts.elaw.prazos import Prazos
from crawjud.bot.scripts.elaw.provisao import Provisao
from crawjud.bot.scripts.elaw.sol_pags import SolPags as Sol_pags

logger_ = logging.getLogger(__name__)
ClassBots = Union[Andamentos, Cadastro, Complement, Download, Prazos, Provisao, Sol_pags]

__all__ = [Andamentos, Cadastro, Complement, Download, Prazos, Provisao, Sol_pags]


class Elaw:
    """The Elaw class manages the initialization and execution of elaw bots.

    Attributes:
        kwargs (dict): Keyword arguments for bot configuration.

    """

    def __init__(
        self,
        *args: str | int,
        **kwargs: str | int,
    ) -> None:
        """Initialize Bot instance.

        Sets up the bot and executes the bot module based on the system type.

        Args:
            *args (tuple[str | any]): Additional positional arguments.
            **kwargs (dict[str | any]): Additional keyword arguments.
            path_args (str): Path to the bot's arguments file.
            display_name (str): The display name for the bot.
            system (str): The system for the bot (e.g., projudi).
            typebot (str): The type of bot (e.g., capa).
            logger (logging.Logger, optional): The logger instance.

        """
        try:
            display_name = kwargs.get("display_name")
            system = kwargs.get("system")
            typebot = kwargs.get("typebot")
            logger = kwargs.get("logger", logger_)
            logger.info("Starting bot %s with system %s and type %s", display_name, system, typebot)

            self.typebot_ = typebot

            self.bot_call.initialize(*args, **kwargs).execution()

        except Exception as e:
            self.logger.error("\n".join(format_exception(e)))
            err = "\n".join(format_exception(e))
            logger.exception(err)
            raise StartError("\n".join(format_exception(e))) from e

    @property
    def bot_call(self) -> ClassBots:
        """Bot property.

        Dynamically imports and returns an instance of the specified bot type.

        Returns:
            any: An instance of the specified bot.

        Raises:
            AttributeError: If the specified bot type is not found.

        """
        bot_call: Callable[[], None] = globals().get(self.typebot_.capitalize())

        # rb = self.bots.get(self.typebot)
        if not bot_call:
            raise AttributeError("Robô não encontrado!!")

        return bot_call
