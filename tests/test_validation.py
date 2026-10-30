import hashlib
import json
import pytest
from dashloom_helper.validation import parse_record, verify_sha256, parse_manifest


def test_good_record():
    raw = b'{"schema_version":1,"platform":"linux","data1":"A","data2":"B"}'
    assert parse_record(raw, "linux") == ("A", "B")


def test_platform_mismatch():
    raw = b'{"schema_version":1,"platform":"linux","data1":"A","data2":"B"}'
    with pytest.raises(ValueError, match="platform"):
        parse_record(raw, "windows")


def test_hash_mismatch():
    with pytest.raises(ValueError, match="mismatch"):
        verify_sha256(b"hello", hashlib.sha256(b"other").hexdigest())


def test_extra_fields_rejected():
    raw = b'{"schema_version":1,"platform":"linux","data1":"A","data2":"B","extra":3}'
    with pytest.raises(ValueError, match="fields"):
        parse_record(raw, "linux")


def test_bad_manifest():
    with pytest.raises(ValueError):
        parse_manifest(json.dumps({"schema_version": 1, "files": {}}).encode())
