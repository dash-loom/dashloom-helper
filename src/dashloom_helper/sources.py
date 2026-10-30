"""Local and GitHub raw-text sources."""
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request, urlopen

MAX_DOWNLOAD = 65536


class LocalSource:
    def __init__(self, root: str | Path):
        self.root = Path(root).resolve()

    def read(self, path: str) -> bytes:
        # Callers use only fixed internal paths (not user-supplied filenames).
        return (self.root / path).read_bytes()


class GitHubSource:
    def __init__(self, owner: str, repository: str, ref: str, timeout: float = 10):
        for label, value in (("owner", owner), ("repository", repository), ("ref", ref)):
            if not value or value in (".", "..") or "/" in value or chr(92) in value:
                raise ValueError(f"Invalid {label}")
        self.owner, self.repository, self.ref, self.timeout = owner, repository, ref, timeout

    def read(self, path: str) -> bytes:
        url = ("https://raw.githubusercontent.com/"
               f"{quote(self.owner)}/{quote(self.repository)}/{quote(self.ref)}/{path}")
        request = Request(url, headers={"User-Agent": "dashloom-helper/0.1"})
        with urlopen(request, timeout=self.timeout) as response:
            raw = response.read(MAX_DOWNLOAD + 1)
        if len(raw) > MAX_DOWNLOAD:
            raise ValueError("Downloaded file is too large")
        return raw
