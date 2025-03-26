"""Module for Admin configuration routes."""

import os
import pathlib
from typing import Dict

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
    session,
    url_for,
)
from quart import current_app as app
from quart_jwt_extended import get_jwt_identity, jwt_required

# from crawjud.forms import UserForm, UserFormEdit
from api.models import LicensesUsers, SuperUser, Users

path_template = os.path.join(pathlib.Path(__file__).parent.resolve(), "templates")
admin = Blueprint("admin", __name__, template_folder=path_template)


def cadastro_user(form: dict) -> None:
    """User registration.

    Args:
        form (dict): user info.

    """
    db: SQLAlchemy = app.extensions["sqlalchemy"]
    db.session.add(form)


def update_user(form: dict) -> None:
    """Update user.

    Args:
        form (dict): user info.

    """
    db: SQLAlchemy = app.extensions["sqlalchemy"]

    password: str = form.pop("password")

    usr = db.session.query(Users).filter(Users.id == form["id"]).first()

    if password:
        usr.senhacrip = password

    db.session.commit()


action = {"INSERT": cadastro_user, "UPDATE": update_user}


@admin.route("/users", methods=["GET", "POST"])
@jwt_required
async def users() -> Response:
    """Render the users list template.

    Returns:
        Response: HTTP response with rendered template.

    """
    try:
        if request.method == "POST":
            form = await request.json or await request.data or await request.form

            action.get(form.pop("method_request"))(form)

            return await make_response(jsonify({"message": "Método POST"}, 200))

        db: SQLAlchemy = app.extensions["sqlalchemy"]

        data = []

        user_id: int = get_jwt_identity()

        users = db.session.query(Users)
        user = db.session.query(Users).filter(Users.id == user_id).first()

        if not user.supersu:
            users = users.join(LicensesUsers).filter_by(license_token=user.licenseusr.license_token)

        database = users.all()

        for item in database:
            item_data = {
                "id": item.id,
                "login": item.login,
                "nome_usuario": item.nome_usuario,
                "email": item.email,
            }

            data.append(item_data)

        return await make_response(jsonify(database=data))

    except Exception as e:
        abort(500, description=f"Erro interno do servidor: {e!s}")


@admin.route("/cadastro/usuario", methods=["GET", "POST"])
@jwt_required
async def cadastro_user() -> Response:
    """Handle user registration.

    Returns:
        Response: HTTP response redirecting or rendering the template.

    """
    try:
        db: SQLAlchemy = app.extensions["sqlalchemy"]
        if not session.get("license_token"):
            await flash("Sessão expirada. Faça login novamente.", "error")
            return await make_response(
                redirect(
                    url_for("auth.login"),
                ),
            )

        title = "Cadastro Usuário"
        form: UserForm = await UserForm.setup_form()  # type: ignore  # noqa: F821, PGH003
        page = "FormUsr.html"

        user = Users.query.filter(Users.login == session["login"]).first()
        user_id = user.id

        chksupersu = db.session.query(SuperUser).join(Users).filter(Users.id == user_id).first()

        if chksupersu:
            licenses = []
            licenses_result = LicensesUsers.query.all()

            for lcs in licenses_result:
                licenses.append((str(lcs.license_token), str(lcs.name_client)))

            form = await UserForm.setup_form(licenses_add=licenses_result)  # type: ignore  # noqa: F821, PGH003

        if await form.validate_on_submit():
            user = Users(
                login=form.login.data,
                nome_usuario=form.nome_usuario.data,
                email=form.email.data,
            )

            license_token = session["license_token"]
            tipo_user = form.tipo_user.data

            if chksupersu:
                if any(tipo_user == tipo for tipo in ["default_user", "admin"]):
                    license_token = form.licenses.data

                elif tipo_user == "supersu":
                    super_user = SuperUser()
                    super_user.users = user

            query_license = LicensesUsers.query.filter(LicensesUsers.license_token == license_token).first()

            user.licenseusr = query_license

            if tipo_user == "admin":
                query_license.admins.append(user)

            user.senhacrip = form.password.data

            db.session.add(user)
            db.session.commit()

            await flash("Usuário cadastrado!", "success")
            return make_response(
                redirect(
                    url_for("admin.users"),
                ),
            )

        form_items = list(form)
        for field in form_items:
            for error in field.errors:
                await flash(f"Erro: {error}. Campo: {field.label.text}", "error")

        return await make_response(
            await render_template(
                "index.html",
                page=page,
                form=form,
                title=title,
            ),
        )

    except Exception as e:
        abort(500, description=f"Erro interno do servidor: {e!s}")


@admin.route("/editar/usuario/<id_>", methods=["GET", "POST"])
@jwt_required
async def edit_usuario(id_: int) -> Response:
    """Handle editing a user with the given id.

    Args:
        id_ (int): The user's id.

    Returns:
        Response: HTTP response redirecting or rendering the template.

    """
    try:
        db: SQLAlchemy = app.extensions["sqlalchemy"]
        if not session.get("license_token"):
            await flash("Sessão expirada. Faça login novamente.", "error")
            return await make_response(
                redirect(
                    url_for("auth.login"),
                ),
            )

        title = "Editar Usuário"

        user = db.session.query(Users).filter(Users.id == id_).first()

        form = await UserFormEdit.setup_form(**user.dict_query)  # type: ignore  # noqa: F821, PGH003
        page = "FormUsr.html"

        chksupersu = db.session.query(SuperUser).join(Users).filter(Users.login == session["login"]).first()

        if chksupersu:
            licenses_result = db.session.query(LicensesUsers).all()

            form = await UserFormEdit.setup_form(  # noqa: F821, PGH003 # type: ignore
                licenses_add=licenses_result,
                **user.dict_query,
            )

        if await form.validate_on_submit():
            data: Dict[str, str | bool] = form.data

            [
                setattr(user, key, value)
                for key, value in {
                    key: value
                    for key, value in data.items()
                    if key
                    not in [
                        "show_password",
                        "csrf_token",
                        "submit",
                        "password",
                        "tipo_user",
                        "license",
                    ]
                }.items()
            ]

            license_token = data.get("licenses", session["license_token"])
            license_user = db.session.query(LicensesUsers).filter(LicensesUsers.license_token == license_token).first()

            password = data.get("password")

            if user.login != session["login"]:
                if chksupersu:
                    if data.get("tipo_user") == "supersu" and len(user.supersu) == 0:
                        if chksupersu:
                            super_user = SuperUser()
                            super_user.users = user

                            db.session.add(super_user)

                    elif data.get("tipo_user") != "supersu" and len(user.supersu) > 0:
                        supersu = db.session.query(SuperUser).filter(SuperUser.users_id == user.id).first()

                        db.session.delete(supersu)

                if data.get("tipo_user") == "admin" and len(user.admin) == 0:
                    license_user.admins.append(user)

                elif data.get("tipo_user") != "admin" and len(user.admin) > 0:
                    license_user.admins.remove(user)

            if password:
                if user.check_password(password) is not True:
                    user.senhacrip = password

            db.session.commit()

            await flash("Usuário editado com sucesso!", "message")
            return await make_response(redirect(url_for("admin.users")))

        return await make_response(
            await render_template(
                "index.html",
                page=page,
                form=form,
                title=title,
            ),
        )

    except Exception as e:
        abort(500, description=f"Erro interno do servidor: {e!s}")


@admin.route("/deletar/usuario/<id_>", methods=["GET", "POST"])
@jwt_required
async def delete_usuario(id_: int) -> Response:
    """Handle deletion of a user with the given id.

    Args:
        id_ (int): The user's id.

    Returns:
        Response: HTTP response with the delete confirmation.

    """
    try:
        message = "Usuário deletado com sucesso!"
        template = "include/show.html"
        return await make_response(
            await render_template(
                template,
                message=message,
            ),
        )

    except Exception as e:
        abort(500, description=f"Erro interno do servidor: {e!s}")
