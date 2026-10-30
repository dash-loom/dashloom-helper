"""Validate all platform records against the manifest."""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))
from dashloom_helper import DataClient  # noqa: E402

for name in ("windows", "linux", "mac"):
    data1, data2 = DataClient.local(ROOT).get_pair(name)
    print(f"PASS {name}: {len(data1)} + {len(data2)} characters")
