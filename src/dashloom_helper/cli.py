"""Command-line interface."""
import argparse
import json
from .client import DataClient


def main() -> None:
    parser = argparse.ArgumentParser(description="Display verified Dashloom platform data")
    parser.add_argument("action", choices=["show"])
    parser.add_argument("--source", choices=["local", "github"], default="local")
    parser.add_argument("--root", default=".")
    parser.add_argument("--owner", help="GitHub owner, required for --source github")
    parser.add_argument("--repo", default="dashloom-helper")
    parser.add_argument("--ref", default="main", help="Prefer a pinned commit SHA")
    parser.add_argument("--os", choices=["windows", "linux", "mac"])
    args = parser.parse_args()
    if args.source == "github" and not args.owner:
        parser.error("--owner is required for --source github")
    client = (DataClient.local(args.root) if args.source == "local"
              else DataClient.github(args.owner, args.ref, args.repo))
    try:
        data1, data2 = client.get_pair(args.os)
    except (ValueError, OSError, json.JSONDecodeError) as exc:
        parser.exit(1, f"Error: {exc}\n")
    print("Data 1:", data1)
    print("Data 2:", data2)
