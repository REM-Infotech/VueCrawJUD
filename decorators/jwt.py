"""Decorators for JWT authentication in Quart-SocketIO."""

from functools import wraps
from typing import Any, Literal, TypeVar

import jwt
from quart import current_app
from socketio import AsyncServer

from api import app

T = TypeVar("T", bound=Any)


def jwt_required_socketio(func: T) -> T:
    """Require JWT authentication on a socketio event.

    Args:
        func (T): The function to decorate.

    Returns:
        T: The decorated function with JWT authentication.

    """

    @wraps(func)
    async def wrapper(*args: Any, **kwargs: Any) -> Any | Literal[False]:
        sid = args[0]  # normalmente o primeiro argumento é `sid`

        async with app.app_context():
            io: AsyncServer = current_app.extensions["socketio"]
            environ: str | None = io.environ.get(sid)

            SECRET_KEY = current_app.config["JWT_SECRET_KEY"]  # noqa: N806

            # Aqui depende de como você está passando o token
            token = None

            # Se o token estiver nos cookies (veja mais abaixo)
            if environ and "HTTP_COOKIE" in environ:
                cookies = environ["HTTP_COOKIE"]
                for cookie in cookies.split(";"):
                    name, value = cookie.strip().split("=", 1)
                    if name == "access_token":
                        token = value
                        break

            if not token:
                current_app.logger.error("Token ausente")
                return False

            try:
                payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
                kwargs["user"] = payload["user"]
                return await func(*args, **kwargs)
            except jwt.ExpiredSignatureError:
                current_app.logger.error("Token expirado.")
                return False
            except jwt.InvalidTokenError:
                current_app.logger.error("Token inválido.")
                return False

    return wrapper
