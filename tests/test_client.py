from pathlib import Path
from dashloom_helper import DataClient

ROOT = Path(__file__).resolve().parents[1]


def test_all_platforms():
    for name in ("windows", "linux", "mac"):
        data1, data2 = DataClient.local(ROOT).get_pair(name)
        assert data1.startswith("dashloom_")
        assert data2.endswith("_data_2")
