"""Initialize scripts package for CrawJUD-Bots: Projudi, Esaj, Elaw, PJe, Calc., Caixa v1.

This package provides script classes for distinct systems in the CrawJUD-Bots app.
It integrates functionality for Projudi, Esaj, Elaw, PJe, Calculadoras (Calc.), and Caixa.

Attributes:
    __all__ (list): Classes exported by this package.
    ClassesSystems (Union): Union type of all supported system classes.

"""

from typing import Union

from server.bot.scripts.caixa import Caixa
from server.bot.scripts.calculadoras import Calculadoras
from server.bot.scripts.elaw import Elaw
from server.bot.scripts.esaj import Esaj
from server.bot.scripts.pje import PJe
from server.bot.scripts.projudi import Projudi

__all__ = [Projudi, Esaj, Elaw, PJe, Calculadoras, Caixa]

ClassesSystems = Union[Caixa, Elaw, Esaj, Projudi, PJe, Calculadoras]
