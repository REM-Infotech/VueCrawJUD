"""Module for dashboard routes.

This module provides endpoints for rendering the dashboard and for serving
chart data for executions per month and most executed bots.
"""

import os
import pathlib
from traceback import format_exception

from deep_translator import GoogleTranslator
from quart import Blueprint, Response, abort, current_app, jsonify, make_response

from api import db
from api.models import Executions
from api.models.bots import BotsCrawJUD
from crawjud.utils import escurecer_cor, gerar_cor_base, rgb_to_hex

translator = GoogleTranslator(source="en", target="pt")

path_static = os.path.join(pathlib.Path(__file__).parent.resolve(), "static")
path_template = os.path.join(pathlib.Path(__file__).parent.resolve(), "templates")

dash = Blueprint("dash", __name__, template_folder=path_template, static_folder=path_static)


@dash.route("/linechart")
async def line_chart() -> Response:
    """Render the line chart page."""
    try:
        executions = db.session.query(Executions).all()

        labels = {
            "1": "Janeiro",
            "2": "Fevereiro",
            "3": "Março",
            "4": "Abril",
            "5": "Maio",
            "6": "Junho",
            "7": "Julho",
            "8": "Agosto",
            "9": "Setembro",
            "10": "Outubro",
            "11": "Novembro",
            "12": "Dezembro",
        }

        contagem_execucoes = []

        for system in ["PROJUDI", "PJE", "ESAJ", "ELAW", "CAIXA", "TJDF", "CAIXA"]:
            executions_mes = {
                "Janeiro": 0,
                "Fevereiro": 0,
                "Março": 0,
                "Abril": 0,
                "Maio": 0,
                "Junho": 0,
                "Julho": 0,
                "Agosto": 0,
                "Setembro": 0,
                "Outubro": 0,
                "Novembro": 0,
                "Dezembro": 0,
            }
            for item in executions:
                exec_bot: BotsCrawJUD = item.bot

                if exec_bot.system.upper() == system:
                    mes = labels[str(item.data_execucao.month)]
                    executions_mes[mes] += 1

            contagem_execucoes.append({system: executions_mes})

        data: dict[str, dict[str, str] | list[dict[str, str]]] = {
            "labels": list(labels.values()),
            "datasets": [],
        }

        for contagem in contagem_execucoes:
            try:
                it = contagem.items()

                for key, value in it:
                    numbers = list(value.values())

                    # Gerar cor base
                    r, g, b = gerar_cor_base()
                    background_color = rgb_to_hex(r, g, b)

                    # Gerar cor da borda mais escura
                    r_borda, g_borda, b_borda = escurecer_cor(r, g, b)
                    border_color = rgb_to_hex(r_borda, g_borda, b_borda)

                    setup_dataset = {
                        "label": key,
                        "data": numbers,
                        "borderColor": border_color,
                        "backgroundColor": background_color,
                        "yAxisID": "y",
                    }

                    data["datasets"].append(setup_dataset)
            except Exception as e:
                current_app.logger.error("\n".join(format_exception(e)))

        return await make_response(jsonify(dataset=data))
    except Exception as e:
        current_app.logger.error("\n".join(format_exception(e)))
        abort(500, "Erro ao gerar o gráfico de linha.")
