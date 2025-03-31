"""Module for credentials routes.

This module defines endpoints for listing, creating, editing, and deleting credentials.
"""

import os
from collections import Counter
from dataclasses import dataclass
from traceback import format_exception

import aiofiles
from flask import abort
from flask_sqlalchemy import SQLAlchemy
from quart import (
    Blueprint,
    Response,
    current_app,
    jsonify,
    make_response,
    request,
)
from quart import current_app as app
from quart.datastructures import FileStorage
from quart_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.utils import secure_filename

from api import db
from api.models import BotsCrawJUD, Credentials, LicensesUsers, Users

cred = Blueprint("creds", __name__)


@dataclass
class CredentialsForm:
    """Classe para formulário de credenciais."""

    nome_cred: str
    system: str
    auth_method: str
    login: str
    password: str
    cert: FileStorage
    key: str


async def license_user(usr: int, db: SQLAlchemy) -> str:
    """Return license token."""
    license_token = (
        db.session.query(LicensesUsers)
        .select_from(Users)
        .join(Users, LicensesUsers.user)
        .filter(Users.id == usr)
        .first()
        .license_token
    )

    return license_token


@cred.get("/systems")
@jwt_required
async def systems() -> Response:
    """Return array list systems."""
    list_systems = [{"value": None, "text": "Escolha um sistema", "disabled": True}]

    list_systems.extend([
        {"value": pos, "text": system}
        for pos, system in enumerate(Counter([item.system for item in db.session.query(BotsCrawJUD).all()]).keys())
    ])
    return await make_response(
        jsonify(systems=list_systems),
        200,
    )


@cred.route("/credentials", methods=["GET", "POST"])
@jwt_required
async def credentials() -> Response:
    """Display a list of credentials."""
    try:
        current_user = get_jwt_identity()

        user = db.session.query(Users).filter(Users.id == current_user).first()
        database = db.session.query(Credentials).all()
        if not user.supersu:
            token = user.licenseusr.license_token
            database = db.session.query(Credentials).join(LicensesUsers).filter_by(license_token=token).all()

        cred_list = []
        for item in database:
            cred_list.append({
                "id": item.id,
                "credential": item.nome_credencial,
                "system": item.system,
                "login_method": item.system,
            })

        return await make_response(jsonify(database=cred_list), 200)

    except Exception as e:
        app.logger.error("\n".join(format_exception(e)))
        abort(500)


@cred.post("/cadastro_credencial")
@jwt_required
async def cadastro() -> Response:
    """Handle the creation of new credentials.

    Returns:
        Response: A Quart response after processing the credentials form.

    """
    try:
        request_data = await request.form or await request.data or await request.json

        form = CredentialsForm(**request_data)

        async def pw(form: CredentialsForm) -> None:  # noqa: ANN001
            passwd = Credentials(
                nome_credencial=form.nome_cred,
                system=form.system,
                login_method=form.auth_method,
                login=form.login,
                password=form.password,
            )
            licenseusr = LicensesUsers.query.filter(
                LicensesUsers.license_token == license_user(get_jwt_identity(), db)
            ).first()

            passwd.license_usr = licenseusr
            db.session.add(passwd)
            db.session.commit()

        async def cert(form: CredentialsForm) -> None:  # noqa: ANN001
            temporarypath = current_app.config["TEMP_DIR"]
            filecert = form.cert

            cer_path = os.path.join(temporarypath, secure_filename(filecert.filename))
            await filecert.save(cer_path)

            async with aiofiles.open(cer_path, "rb") as f:
                certficate_blob = f.read()

                passwd = Credentials(
                    nome_credencial=form.nome_cred,
                    system=form.system,
                    login_method=form.auth_method,
                    login=form.doc_cert,
                    key=form.key,
                    certficate=secure_filename(filecert.filename),
                    certficate_blob=await certficate_blob,
                )
                licenseusr = LicensesUsers.query.filter(
                    LicensesUsers.license_token == license_user(get_jwt_identity(), db)
                ).first()

                passwd.license_usr = licenseusr

                db.session.add(passwd)
                db.session.commit()

        callables = {"cert": cert, "pw": pw}

        await callables[request_data.get("form_type")](form)

        return await make_response(jsonify(message="Credencial salva com sucesso!"))

    except Exception as e:
        app.logger.exception(str(e))
        abort(500)
