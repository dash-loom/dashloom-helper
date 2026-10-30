"""Local demo: automatically detects Windows/Linux/macOS."""
from pathlib import Path
from dashloom_helper import DataClient

root = Path(__file__).resolve().parents[1]
data1, data2 = DataClient.local(root).get_pair()
print(data1)
print(data2)
