"""Module for authentication routes."""

import os
import pathlib
from dataclasses import dataclass
from datetime import datetime

import pytz
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
from quart_jwt_extended import create_access_token, get_jwt_identity, jwt_refresh_token_required, jwt_required
from quart_jwt_extended import get_raw_jwt as get_jwt

from crawjud.models.users import TokenBlocklist, Users

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
            resp.headers = {"Content-Type": "application/json"}
            return resp

        resp = jsonify({"message": "Usuário ou senha incorretos!"})
        resp.status_code = 401
        resp.headers = {"Content-Type": "application/json"}
        return resp

    except Exception as e:
        rich.print(e)
        return await make_response(jsonify({"message": "Erro ao efetuar login!"}))


@auth.route("/logout", methods=["POST"])
@jwt_required
async def logout() -> Response:
    """Log out the current user and clear session cookies.

    Returns:
        Response: Redirect response to the login page.

    """
    db: SQLAlchemy = current_app.extensions["sqlalchemy"]
    token = get_jwt()
    jti = token["jti"]
    ttype = token["type"]
    now = datetime.now(pytz.timezone("America/Manaus"))
    db.session.add(TokenBlocklist(jti=jti, type=ttype, created_at=now))
    db.session.commit()
    return await make_response(jsonify(msg=f"{ttype.capitalize()} token successfully revoked"))


# Rota para atualizar o token de acesso
@auth.route("/refresh", methods=["POST"])
@jwt_refresh_token_required
async def refresh() -> Response:
    """Refresh the access token."""
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return await make_response(jsonify(access_token=new_access_token), 200)
