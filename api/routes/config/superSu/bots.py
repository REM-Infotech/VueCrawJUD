"""Module for Super Su client route functionality."""

from quart import Response, abort, make_response, render_template
from quart_jwt_extended import jwt_required

from crawjud.decorators import check_privilegies

from . import supersu


@supersu.route("/cadastro/cliente", methods=["GET", "POST"])
@jwt_required
@check_privilegies
async def cadastro_bot() -> Response:
    """Render the client registration template.

    Returns:
        str: Rendered HTML template.

    """
    try:
        return await make_response(
            await render_template(
                "index.html",
            ),
        )

    except Exception as e:
        abort(500, description=f"Erro interno do servidor: {e!s}")


@supersu.route("/editar/cliente", methods=["GET", "POST"])
@jwt_required
@check_privilegies
async def licencas_associadas() -> Response:
    """Render the client edit template.

    Returns:
        str: Rendered HTML template.

    """
    try:
        return await make_response(
            await render_template(
                "index.html",
            ),
        )

    except Exception as e:
        abort(500, description=f"Erro interno do servidor: {e!s}")
