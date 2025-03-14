"""Module for main application routes.

This module defines global routes, context processors, and custom error handling.
"""

import os
import re
import traceback
from datetime import datetime, timedelta

import aiofiles
import aiohttp
import httpx  # noqa: F401
import pytz
import quart_flask_patch  # noqa: F401
from deep_translator import GoogleTranslator

# Quart Imports
from quart import (
    Response,
    abort,
    make_response,
    redirect,
    render_template,
    send_from_directory,
    url_for,
)
from quart import current_app as app
from quart_jwt_extended import (  # noqa: F401
    create_access_token,
    get_jwt_identity,
    jwt_refresh_token_required,
    jwt_required,
    set_access_cookies,
    unset_access_cookies,
)
from quart_jwt_extended import get_raw_jwt as get_jwt  # noqa: F401
from trio import Path
from werkzeug.exceptions import HTTPException


@app.after_request
def refresh_expiring_jwts(response: Response) -> Response:
    """Refresh the JWT if it is about to expire."""
    try:
        g_jwt = get_jwt()
        exp_timestamp = g_jwt["exp"]
        now = datetime.now(pytz.timezone("America/Manaus"))
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response


@app.route("/", methods=["GET"])
async def index() -> Response:
    """Redirect to the authentication login page.

    Returns:
        Response: A Quart redirect response to the login page.

    """
    return await make_response(redirect(url_for("auth.login")), 302)


@app.route("/favicon.png", methods=["GET"])
@jwt_required
async def serve_img() -> Response:
    """Serve the favicon image.

    Returns:
        Response: A Quart response serving the favicon.

    """
    try:
        path_icon = os.path.join(os.getcwd(), "static", "img")

        parent_path = await Path(os.getcwd())
        path_icon = parent_path.joinpath("web", "static", "img")
        path_icon = await path_icon.resolve()

        return await make_response(
            await send_from_directory(
                path_icon,
                "crawjud.png",
            ),
        )

    except Exception:
        err = traceback.format_exc()
        app.logger.exception(err)
        abort(500, description=f"Erro interno do servidor: {err}")


@app.route("/img/<user>.png", methods=["GET"])
@jwt_required
async def serve_profile(user: str) -> Response:
    """Serve the profile image for the specified user.

    Args:
        user (str): The user's login identifier.

    Returns:
        Response: A Quart response containing the profile image.

    """
    try:
        with app.app_context():
            from crawjud.models import Users

            user = Users.query.filter(Users.login == user).first()
            image_data = user.blob_doc
            filename = user.filename

            if not image_data:
                url_image = "https://cdn-icons-png.flaticon.com/512/3135/3135768.png"

                async with aiohttp.ClientSession() as sess:
                    async with sess.get(url_image) as resp:
                        reponse_img = resp

                filename = os.path.basename(url_image)
                image_data = reponse_img.content

            image_data = bytes(image_data)
            filename = "".join(re.sub(r'[<>:"/\\|?*]', "_", f"{datetime.datetime.now()}_{filename}"))

            original_path = os.path.join(app.config["IMAGE_TEMP_DIR"], filename)

            with aiofiles.open(original_path, "wb") as file:
                file.write(image_data)

            response = await make_response(await send_from_directory(app.config["IMAGE_TEMP_DIR"], filename))
            response.headers["Content-Type"] = "image/png"

            return response

    except Exception as e:
        abort(500, description=f"Erro interno do servidor: {e!s}")


@app.errorhandler(HTTPException)
async def handle_http_exception(error: HTTPException) -> Response:
    """Handle HTTP exceptions and render a custom error page.

    Args:
        error (HTTPException): The raised HTTP exception.

    Returns:
        tuple: A tuple containing the rendered error page and the HTTP status code.

    """
    tradutor = GoogleTranslator(source="en", target="pt")
    name = tradutor.translate(error.name)
    desc = tradutor.translate(error.description)

    return await make_response(
        await render_template("handler/index.html", name=name, desc=desc, code=error.code),
        error.code,
    )
