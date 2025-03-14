"""Module for authentication forms."""

from typing import Type

from quart_wtf import QuartForm
from wtforms import BooleanField, PasswordField, StringField, SubmitField
from wtforms.validators import DataRequired

from crawjud.types import AnyType, T


class LoginForm(QuartForm):
    """Form for user login with required credentials."""

    login = StringField("Usuário", validators=[DataRequired("Informe o usuário!")])
    password = PasswordField("Senha", validators=[DataRequired("Informe a Senha!")])
    remember_me = BooleanField("Manter sessão")
    submit = SubmitField("Entrar")

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
