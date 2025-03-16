"""Module for authentication routes."""

import os
import pathlib
import traceback
from dataclasses import dataclass

import rich
from flask_sqlalchemy import SQLAlchemy
from quart import (
    Blueprint,
    Response,
    current_app,
    jsonify,
    make_response,
    request,
)
from quart_jwt_extended import (  # noqa: F401
    create_access_token,
    get_jwt_identity,
    jwt_refresh_token_required,
    set_access_cookies,
    unset_jwt_cookies,
)

from server.models.users import TokenBlocklist as TokenBlocklist
from server.models.users import Users

path_template = os.path.join(pathlib.Path(__file__).parent.resolve(), "templates")
auth = Blueprint("auth", __name__, template_folder=path_template)

usr = None


@dataclass
class LoginForm:
    """Dataclass for the login form."""

    login: str
    password: str
    remember_me: bool


@auth.route("/auth", methods=["GET", "POST"])
async def login() -> Response:
    """Authenticate the user and start a session.

    Returns:
        Response: HTTP response redirecting on success or rendering the login template.

    """
    try:
        db: SQLAlchemy = current_app.extensions["sqlalchemy"]
        request_json: dict[str, str] = await request.json
        username = request_json.get("login")
        password = request_json.get("password")
        remember = request_json.get("remember_me")
        form = LoginForm(username, password, remember)

        usr = db.session.query(Users).filter(Users.login == form.login).first()
        if usr and usr.check_password(form.password):
            access_token = create_access_token(identity=usr)

            resp = jsonify({"token": access_token, "message": "Login efetuado com sucesso!"})
            resp.status_code = 200
            resp.headers.update({"Content-Type": "application/json"})
            access_token = set_access_cookies(resp, access_token)
            return resp

        resp = jsonify({"message": "Usuário ou senha incorretos!"})
        resp.status_code = 401
        resp.headers = {"Content-Type": "application/json"}
        return resp

    except Exception as e:
        rich.print(e)
        return await make_response(jsonify({"message": "Erro ao efetuar login!"}))


@auth.route("/logout", methods=["POST"])
async def logout() -> Response:
    """Log out the current user and clear session cookies.

    Returns:
        Response: Redirect response to the login page.

    """
    # db: SQLAlchemy = current_app.extensions["sqlalchemy"]
    # token = request.cookies.get("access_token_cookie")
    # if token:
    #     jti = token["jti"]
    #     ttype = token["type"]
    #     now = datetime.now(pytz.timezone("America/Manaus"))
    #     db.session.add(TokenBlocklist(jti=jti, type=ttype, created_at=now))
    #     db.session.commit()

    response = await make_response(jsonify(msg="Logout efetuado com sucesso!"))
    try:
        unset_jwt_cookies(response)

    except Exception as e:
        exc = traceback.format_exception(e)
        current_app.logger.exception("\n".join(exc))
    return response


# Rota para atualizar o token de acesso
@auth.route("/refresh", methods=["POST"])
@jwt_refresh_token_required
async def refresh() -> Response:
    """Refresh the access token."""
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return await make_response(jsonify(access_token=new_access_token), 200)
