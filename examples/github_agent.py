"""Remote demo: set GitHub owner and a reviewed commit SHA first."""
from dashloom_helper import DataClient

OWNER = "YOUR_USERNAME"
REF = "YOUR_COMMIT_SHA"

def main():
    data1, data2 = DataClient.github(OWNER, REF).get_pair()
    print(data1)
    print(data2)

if __name__ == "__main__":
    main()
