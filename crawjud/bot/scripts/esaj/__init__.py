"""Initialize and run the ESaj bot for CrawJUD-Bots.

This module configures and initializes the ESaj bot components including BuscaPags,
Capa, Emissao, Movimentacao, and Protocolo. It sets logging and error handling.
"""

import logging
from traceback import format_exception
from typing import Callable, Union

from crawjud.bot.common import StartError
from crawjud.bot.scripts.esaj.busca_pags import BuscaPags as Busca_pags
from crawjud.bot.scripts.esaj.capa import Capa
from crawjud.bot.scripts.esaj.emissao import Emissao
from crawjud.bot.scripts.esaj.movimentacao import Movimentacao
from crawjud.bot.scripts.esaj.protocolo import Protocolo

logger_ = logging.getLogger(__name__)

ClassBots = Union[Emissao, Busca_pags, Capa, Movimentacao, Protocolo]


class Esaj:
    """Initialize and execute the ESaj bot with proper configurations.

    This class dynamically retrieves the requested bot type and begins execution.
    It logs startup messages and handles initialization errors.
    """

    def __init__(self, *args: str | int, **kwargs: str | int) -> None:
        """Initialize the Esaj bot and start execution with given parameters.

        Args:
            *args (str|int): Positional parameters.
            **kwargs (str|int): Keyword arguments including path_args, display_name,
                                system, and typebot.

        Raises:
            StartError: If bot initialization fails.

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
        """Retrieve and return the bot instance based on the type specified.

        Returns:
            ClassBots: The initialized bot instance matching the requested type.

        Raises:
            AttributeError: If the specified bot type is not found.

        """
        bot_call: Callable[[], None] = globals().get(self.typebot_.capitalize())

        if not bot_call:
            raise AttributeError("Robô não encontrado!!")

        return bot_call
