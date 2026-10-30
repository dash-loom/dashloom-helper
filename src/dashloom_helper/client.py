"""Fetch exactly two platform-specific text values."""
from pathlib import Path
from .platforms import detect_os
from .sources import GitHubSource, LocalSource
from .validation import parse_manifest, parse_record, verify_sha256


class DataClient:
    def __init__(self, source):
        self.source = source

    @classmethod
    def local(cls, root: str | Path = ".") -> "DataClient":
        return cls(LocalSource(root))

    @classmethod
    def github(cls, owner: str, ref: str = "main", repository: str = "dashloom-helper") -> "DataClient":
        return cls(GitHubSource(owner, repository, ref))

    def get_pair(self, os_name: str | None = None) -> tuple[str, str]:
        name = detect_os(os_name)
        manifest = parse_manifest(self.source.read("data/manifest.json"))
        path = f"data/platforms/{name}.json"
        raw = self.source.read(path)
        verify_sha256(raw, manifest["files"][path])
        return parse_record(raw, name)
