"""Module for bot operation routes."""

import json  # noqa: F401
import os
import sys  # noqa: F401
import traceback
import warnings
from pathlib import Path

from flask_sqlalchemy import SQLAlchemy
from quart import (
    Blueprint,
    Response,
    abort,
    flash,
    jsonify,
    make_response,
    redirect,
    render_template,
    request,
    send_file,
    session,
    url_for,
)
from quart import current_app as app
from quart_jwt_extended import get_jwt_identity, jwt_required
from quart_wtf import QuartForm

from crawjud.forms import BotForm
from crawjud.models import BotsCrawJUD
from crawjud.models.bots import Credentials
from crawjud.models.users import LicensesUsers, Users
from crawjud.utils.gen_seed import generate_pid

from ...misc import MakeModels
from .botlaunch_methods import (
    get_bot_info,
    get_form_data,
    handle_form_errors,
    setup_task_worker,
)

path_template = os.path.join(Path(__file__).parent.resolve(), "templates")
bot = Blueprint("bot", __name__, template_folder=path_template)


@bot.route("/acquire_credentials", methods=["post"])
@jwt_required
async def acquire_credentials() -> Response:
    """Return a list credentials."""
    try:
        db: SQLAlchemy = app.extensions["sqlalchemy"]
        json_data: dict[str, str] = await request.json
        system = json_data["system"]
        usr = get_jwt_identity()
        form_cfg = json_data["form_cfg"]

        if form_cfg == "only_file":
            return jsonify({"value": "Opção não utilizada", "text": "Opção não utilizada", "disabled": True})

        license_token = db.session.query(Users).filter
        license_token = (
            db.session.query(LicensesUsers)
            .select_from(Users)
            .join(Users, LicensesUsers.user)
            .filter(Users.id == usr)
            .first()
            .license_token
        )

        creds = (
            db.session.query(Credentials)
            .select_from(LicensesUsers)
            .join(LicensesUsers, Credentials.license_usr)
            .filter(LicensesUsers.license_token == license_token)
            .all()
        )

        return jsonify([
            {"value": credential.nome_credencial, "text": credential.nome_credencial}
            for credential in creds
            if credential.system == system.upper()
        ])

    except Exception as e:
        app.logger.error("\n".join(traceback.format_exception(e)))
        return jsonify({"value": 123, "text": "teste"})


@bot.route("/acquire_systemclient", methods=["post"])
@jwt_required
async def acquire_systemclient() -> Response:
    """Return a list credentials."""
    try:
        db: SQLAlchemy = app.extensions["sqlalchemy"]
        json_data: dict[str, str] = await request.json
        system = json_data["system"]
        typebot = json_data["type"]

        client = json_data["client"]
        state = json_data["state"]

        # usr = get_jwt_identity()
        form_cfg = json_data["form_cfg"]

        if form_cfg == "only_file":
            return jsonify({"value": "Opção não utilizada", "text": "Opção não utilizada", "disabled": True})

        if client == "EVERYONE":
            opt = [{"value": None, "text": "Selecione um cliente", "disabled": True}]
            opt.extend([
                {"value": state.state, "text": state.state}
                for state in db.session.query(BotsCrawJUD)
                .filter(
                    BotsCrawJUD.type == typebot.upper(),
                    BotsCrawJUD.system == system.upper(),
                )
                .all()
            ])
            return jsonify()

        elif state == "EVERYONE":
            opt = [{"value": None, "text": "Selecione um Estado", "disabled": True}]
            opt.extend([
                {"value": client.client, "text": client.client}
                for client in db.session.query(BotsCrawJUD)
                .filter(
                    BotsCrawJUD.type == typebot.upper(),
                    BotsCrawJUD.system == system.upper(),
                )
                .all()
            ])
            jsonify(opt)

    except Exception as e:
        app.logger.error("\n".join(traceback.format_exception(e)))
        return jsonify({"value": 123, "text": "teste"})


@bot.route("/bots_list", methods=["get"])
@jwt_required
async def bots_list() -> Response:
    """Return a list bots."""
    try:
        bots_ = []

        db: SQLAlchemy = app.extensions["sqlalchemy"]
        # path_current_file = Path(__file__).parent.resolve()
        # path_json = path_current_file.joinpath("bots.json")
        # # with path_json.open("r", encoding="utf-8") as f:
        # #     # bots_ = json.loads(f.read())

        # # return jsonify(bots_)

        bots = db.session.query(BotsCrawJUD).all()

        for bot in bots:
            bots_.append({
                "id": bot.id,
                "display_name": bot.display_name,
                "system": bot.system.upper(),
                "state": bot.state.upper(),
                "client": bot.client.upper(),
                "type": bot.type.upper(),
                "form_cfg": bot.form_cfg.lower(),
                "classification": bot.classification.upper(),
                "text": bot.text,
            })

        return jsonify(bots_)

    except Exception as e:
        app.logger.error("\n".join(traceback.format_exception(e)))


@bot.route("/get_model/<id_>/<system>/<typebot>/<filename>", methods=["GET"])
async def get_model(id_: int, system: str, typebot: str, filename: str) -> Response:
    """Retrieve a model file for the specified bot.

    Args:
        id_ (int): Bot identifier.
        system (str): System being used.
        typebot (str): Type of bot.
        filename (str): Name of the file.

    Returns:
        Response: File download response.

    """
    try:
        async with app.app_context():
            path_arquivo, nome_arquivo = MakeModels(filename, filename).make_output()
            response = await make_response(await send_file(f"{path_arquivo}", as_attachment=True))
            response.headers["Content-Disposition"] = f"attachment; filename={nome_arquivo}"
        return response

    except Exception as e:
        app.logger.exception(traceback.format_exc())
        abort(500, description=f"Erro interno. {e!s}")


@bot.route("/bot/dashboard", methods=["GET"])
@jwt_required
async def dashboard() -> Response:
    """Render the bot dashboard page.

    Returns:
        Response: HTTP response with rendered template.

    """
    try:
        title = "Robôs"
        page = "botboard.html"
        bots = BotsCrawJUD.query.all()

        return await make_response(await render_template("index.html", page=page, bots=bots, title=title))

    except Exception as e:
        app.logger.exception(traceback.format_exc())
        abort(500, description=f"Erro interno. {e!s}")


@bot.route("/bot/<id_>/<system>/<typebot>", methods=["GET", "POST"])
@jwt_required
async def botlaunch(id_: int, system: str, typebot: str) -> Response:
    """Launch the specified bot process."""
    if not session.get("license_token"):
        await flash("Sessão expirada. Faça login novamente.", "error")
        return await make_response(redirect(url_for("auth.login")))

    try:
        db: SQLAlchemy = app.extensions["sqlalchemy"]
        bot_info = get_bot_info(db, id_)
        if not bot_info:
            await flash("Acesso negado!", "error")
            return await make_response(redirect(url_for("bot.dashboard")))

        display_name = bot_info.display_name
        title = display_name

        states, clients, credts, form_config = get_form_data(db, system, typebot, bot_info)

        form = await BotForm.setup_form(
            dynamic_fields=form_config,
            state=states,
            creds=credts,
            clients=clients,
            system=system,
        )
        with warnings.catch_warnings():
            warnings.simplefilter("ignore", RuntimeWarning)
            if await QuartForm.validate_on_submit(form):
                periodic_bot = False
                pid = generate_pid()

                return await setup_task_worker(
                    id_=id_,
                    pid=pid,
                    form=form,
                    system=system,
                    typebot=typebot,
                    periodic_bot=periodic_bot,
                    bot_info=bot_info,
                )

        await handle_form_errors(form)

        url = request.base_url.replace("http://", "https://")
        return await make_response(
            await render_template(
                "index.html",
                page="botform.html",
                url=url,
                model_name=f"{system}_{typebot}",
                display_name=display_name,
                form=form,
                title=title,
                id=id_,
                system=system,
                typebot=typebot,
            )
        )

    except Exception:
        app.logger.exception(traceback.format_exc())
        abort(500, description="Erro interno.")
