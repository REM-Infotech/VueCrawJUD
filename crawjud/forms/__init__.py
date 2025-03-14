"""Module for form definitions used in the application.

Provides various QuartForm subclasses.
"""

from typing import Type

from flask_wtf.file import FileAllowed, FileField, FileRequired
from quart_wtf import QuartForm
from wtforms import SubmitField

from crawjud.types import AnyType, T

from .auth import LoginForm
from .bot import BotForm, SearchExec
from .config import BotLicenseAssociationForm, ClienteForm, UserForm, UserFormEdit
from .credentials import CredentialsForm

__all__ = [
    LoginForm,
    BotForm,
    SearchExec,
    CredentialsForm,
    UserForm,
    UserFormEdit,
    ClienteForm,
    BotLicenseAssociationForm,
]


permited_file = FileAllowed(["xlsx", "xls"], 'Apenas arquivos ".xlsx" são permitidos!')


class IMPORTForm(QuartForm):
    """Form for file importation.

    Attributes:
        arquivo: The file field accepting 'xlsx' or 'xls' files up to 50Mb.
        submit: The submission button for the form.

    """

    arquivo = FileField(
        label="Arquivo de importação. Máximo 50Mb",
        validators=[FileRequired(), permited_file],
    )
    submit = SubmitField(label="Importar")

    @classmethod
    async def setup_form(
        cls: Type[T],
        *args: AnyType,
        **kwargs: Type[AnyType],
    ) -> T:
        """Create a form instance."""
        return await cls.create_form(
            *args,
            **kwargs,
        )
