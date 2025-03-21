"""Provides IP-based geolocation services and information retrieval capabilities.

This module interfaces with external IP geolocation services to fetch geographical data
for given IP addresses. It includes error handling and data validation.
"""

from os import environ

import FindMyIP as Ip
from dotenv_vault import load_dotenv
from httpx import Client as HTTPClient

TOKEN = environ.get("TOKEN_Ip2")
load_dotenv()


class GlobalExceptError(Exception):
    """Base custom exception class for global errors."""

    def __init__(self, message: str) -> None:
        """Initialize GlobalExceptError with an error message.

        Args:
            message (str): The error message.

        """
        super().__init__(message)
        self.message = message


class NetworkError(GlobalExceptError):
    """Exception raised when a network-related error occurs."""

    def __init__(self, message: str = "You are not connected to the internet!!") -> None:
        """Initialize NetworkError with a default or custom message.

        Args:
            message (str, optional): The error message. Defaults to a predefined message.

        """
        super().__init__(message)


class InfoGeoloc:
    """Manages IP-based geolocation data retrieval and storage.

    Fetches and stores comprehensive geolocation information for an IP address, providing
    easy access to details like country, city, coordinates, and network information.

    Attributes:
        data (dict): Storage for retrieved geolocation data with normalized keys.

    Raises:
        NetworkError: When unable to fetch external IP or connect to geolocation service.

    """

    data: dict[str, str, int | bool] = {}

    def __init__(self) -> None:
        """Initialize InfoGeoloc by fetching geolocation data."""
        ip_external = Ip.external()
        if not ip_external:
            raise NetworkError

        get_geoloc = self.ip2location(ip_external)
        for key, value in get_geoloc.items():
            self.data.update({f"_{key}": value})

    def __getattr__(self, name: str) -> str:
        """Retrieve attribute from geolocation data.

        Args:
            name (str): The name of the attribute to retrieve.

        Raises:
            AttributeError: If the attribute does not exist.

        Returns:
            str: The value of the requested attribute.

        """
        item = self.data.get(name, None)
        if not item:
            raise AttributeError(f"Atributo '{name}' não encontrado na classe '{self.__class__.__name__}'")

        return item

    def ip2location(self, ip: str) -> dict[str, str] | None:
        """Query the ip2location API for geolocation data of a specific IP address.

        Args:
            ip: The IP address to lookup.

        Returns:
            Dictionary containing geolocation data if successful, None otherwise.

        Raises:
            httpx.HTTPError: On API communication failures.

        """
        client = HTTPClient()
        url = f"https://api.ip2location.io/?key={TOKEN}&ip={ip}"
        data = client.get(url)
        return data.json()

    @property
    def ip(self) -> str:
        """str: The external Ip address."""
        return self._Ip

    @property
    def country_code(self) -> str:
        """str: The country code of the Ip address."""
        return self._country_code

    @property
    def country_name(self) -> str:
        """str: The country name of the Ip address."""
        return self._country_name

    @property
    def region_name(self) -> str:
        """str: The region name of the Ip address."""
        return self._region_name

    @property
    def city_name(self) -> str:
        """str: The city name of the Ip address."""
        return self._city_name

    @property
    def latitude(self) -> str:
        """str: The latitude of the Ip address location."""
        return self._latitude

    @property
    def longitude(self) -> str:
        """str: The longitude of the Ip address location."""
        return self._longitude

    @property
    def zip_code(self) -> str:
        """str: The ZIp code of the Ip address location."""
        return self._zIp_code

    @property
    def time_zone(self) -> str:
        """str: The time zone of the Ip address location."""
        return self._time_zone

    @property
    def asn(self) -> str:
        """str: The Autonomous System Number of the Ip address."""
        return self._asn

    @property
    def as_name(self) -> str:
        """str: The name of the Autonomous System."""
        return self._as_name

    @property
    def is_proxy(self) -> bool:
        """bool: Indicates if the Ip address is a proxy."""
        return self._is_proxy


class GeoLoc(InfoGeoloc):
    """Subclass of InfoGeoloc for extended geolocation functionalities."""

    def __init__(
        self,
        *args: str | int,
        **kwargs: str | int,
    ) -> None:
        """Initialize GeoLoc with optional arguments.

        Args:
            *args (tuple[str | int]): Variable length argument list.
            **kwargs (dict[str, str | int]): Arbitrary keyword arguments.

        """
        super().__init__(*args, **kwargs)
