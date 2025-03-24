"""Module to handle sending messages via SocketIo.

Classes:
    SendMessage: Handle sending messages via SocketIo.

"""

import asyncio
from os import getenv
from time import sleep
from typing import Self

from dotenv_vault import load_dotenv
from socketio import AsyncSimpleClient

from crawjud.bot.core import CrawJUD

load_dotenv()


class SendMessage(CrawJUD):
    """Handle sending messages via SocketIo.

    Functions:
        setup_message: Set up the message to be sent by the bot.
        socket_message: Emit log message to the socket with termination checks.
        badnamespace: Handle bad namespace error when emitting an event.
        connectionerror: Handle connection error when emitting an event.
        connect_socket: Connect to the socket server using the specified URL and headers.

    """

    def __init__(self) -> None:
        """Initialize the SendMessage class."""

    def setup_message(self, status_bot: str = "Em Execução") -> None:
        """Set up the message to be sent by the bot."""
        data = {
            "message": self.prompt,
            "pid": self.pid,
            "type": self.type_log,
            "pos": self.row,
            "graphicMode": self.graphicMode,
            "total": self.total_rows,
            "status": status_bot,
            "schedule": self.schedule,
        }

        if status_bot != "Em Execução":
            asyncio.run(self.socket_message(data, "stop_bot"))

        asyncio.run(self.socket_message(data))

    async def socket_message(self: Self, data: dict, event: str = "log_message") -> None:
        """Emit log message to the socket with termination checks.

        Updates data with system info if termination patterns are detected and
        sends the message through the socket.

        Args:
            data (dict): Dictionary containing log details.
            event (str, optional): The event to emit. Defaults to "log_message".

        """
        url = getenv("URL_WEB")
        err = None  # noqa: F841

        async with AsyncSimpleClient() as sio:
            await sio.connect(url, namespace="/log")
            await sio.emit(event, data)

        # try:
        #     # Verifica se já está conectado antes de tentar se conectar
        #     if self.connected is False:
        #         self.connect_socket(url)
        #     sleep(0.5)
        #     self.sio.emit(event, data, namespace="/log")
        #     sleep(0.5)
        # except socketio.exceptions.BadNamespaceError as e:
        #     err = self.badnamespace(e, url, event, data)

        # except socketio.exceptions.ConnectionError as e:
        #     err = self.connectionerror(e, url, event, data)

        # except Exception as e:
        #     err = str(e)

        # if err:
        #     self.logger.error(err)

    def badnamespace(self, e: Exception, url: str, event: str, data: dict) -> str:
        """Handle bad namespace error when emitting an event."""
        self.connected = False
        err = str(e)
        try:
            self.connected = False
            self.connect_socket(url)
            sleep(0.5)
            self.sio.emit(event, data, namespace="/log")
            sleep(0.5)

        except Exception as e:
            if "Client is not in a disconnected state" in str(e):
                self.sio.disconnect()
                self.connected = False
                self.connect_socket(url)
                self.sio.emit(event, data, namespace="/log")
            err = str(e)

        return err

    def connectionerror(self, e: Exception, url: str, event: str, data: dict) -> str:
        """Handle connection error when emitting an event."""
        err = str(e)
        try:
            if "One or more namespaces failed to connect" in str(e):
                self.connected = False
                self.connect_socket(url)
                self.sio.emit(event, data, namespace="/log")
            elif "Already connected" in str(e):
                self.sio.emit(event, data, namespace="/log")
                self.connected = True
        except Exception as e:
            err = str(e)

        return err

    def connect_socket(self, url: str) -> None:
        """Connect to the socket server using the specified URL and headers.

        Includes the process id as a header for identification.

        Args:
            url (str): The server URL.

        """
        self.sio.connect("https://api.reminfotech.net.br", namespaces=["/log"], headers={"pid": self.pid})
