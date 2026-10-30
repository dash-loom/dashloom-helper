"""Safe cross-platform data retrieval for Dashloom integrations."""
from .client import DataClient
from .platforms import detect_os

__all__ = ["DataClient", "detect_os"]
