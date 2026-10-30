"""Normalize Python operating system names."""
import platform

SUPPORTED = frozenset({"windows", "linux", "mac"})


def detect_os(system: str | None = None) -> str:
    raw = (system if system is not None else platform.system()).lower()
    normalized = "mac" if raw in ("darwin", "macos") else raw
    if normalized not in SUPPORTED:
        raise ValueError(f"Unsupported OS: {raw}")
    return normalized
