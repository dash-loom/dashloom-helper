import pytest
from dashloom_helper.platforms import detect_os

@pytest.mark.parametrize(("input_name", "expected"), [
    ("Windows", "windows"), ("Linux", "linux"), ("Darwin", "mac"),
    ("macOS", "mac"), ("MAC", "mac"),
])
def test_detection(input_name, expected):
    assert detect_os(input_name) == expected


def test_invalid_os():
    with pytest.raises(ValueError, match="Unsupported"):
        detect_os("freebsd")
