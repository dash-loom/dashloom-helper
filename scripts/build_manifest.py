"""Rebuild data/manifest.json after changing platform JSON records."""
from pathlib import Path
import hashlib
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))
from dashloom_helper.validation import parse_record  # noqa: E402


def main():
    checksums = {}
    for name in ("windows", "linux", "mac"):
        path = f"data/platforms/{name}.json"
        raw = (ROOT / path).read_bytes()
        parse_record(raw, name)
        checksums[path] = hashlib.sha256(raw).hexdigest()
    manifest = {"schema_version": 1, "files": checksums}
    (ROOT / "data/manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print("Updated data/manifest.json")


if __name__ == "__main__":
    main()
