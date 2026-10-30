"""Small, dependency-free validator for the published JSON format."""
import hashlib
import json

MAX_BYTES = 65536


def parse_record(raw: bytes, expected_platform: str) -> tuple[str, str]:
    if len(raw) > MAX_BYTES:
        raise ValueError("Platform JSON exceeds maximum size")
    record = json.loads(raw)
    if not isinstance(record, dict) or set(record) != {"schema_version", "platform", "data1", "data2"}:
        raise ValueError("Platform JSON has invalid fields")
    if type(record["schema_version"]) is not int or record["schema_version"] != 1:
        raise ValueError("Unsupported schema version")
    if record["platform"] != expected_platform:
        raise ValueError("Unexpected platform in data")
    for key in ("data1", "data2"):
        value = record[key]
        if not isinstance(value, str) or not (1 <= len(value) <= 4096):
            raise ValueError(f"Invalid {key}")
    return record["data1"], record["data2"]


def verify_sha256(raw: bytes, expected: str) -> None:
    if not isinstance(expected, str) or len(expected) != 64:
        raise ValueError("Invalid SHA-256 checksum")
    if hashlib.sha256(raw).hexdigest() != expected:
        raise ValueError("SHA-256 mismatch: downloaded data is not the manifest version")


def parse_manifest(raw: bytes) -> dict:
    if len(raw) > MAX_BYTES:
        raise ValueError("Manifest exceeds maximum size")
    manifest = json.loads(raw)
    if not isinstance(manifest, dict) or manifest.get("schema_version") != 1:
        raise ValueError("Unsupported manifest")
    files = manifest.get("files")
    paths = {f"data/platforms/{name}.json" for name in ("windows", "linux", "mac")}
    if not isinstance(files, dict) or set(files) != paths:
        raise ValueError("Manifest must contain all three platform files")
    for path, checksum in files.items():
        if not isinstance(checksum, str) or len(checksum) != 64 or any(c not in "0123456789abcdef" for c in checksum):
            raise ValueError(f"Bad checksum for {path}")
    return manifest
