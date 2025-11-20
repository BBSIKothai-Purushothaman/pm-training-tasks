import sys
import json
import re
from collections import Counter
from pathlib import Path


def count_words_in_file(path: str) -> dict:
    """Read a text file and return word counts as a dictionary."""
    file_path = Path(path)

    if not file_path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    text = file_path.read_text(encoding="utf-8")

    # Normalize text to lowercase and extract "words" (alphanumeric)
    words = re.findall(r"\b\w+\b", text.lower())

    counts = Counter(words)

    return {
        "file": str(file_path),
        "total_words": sum(counts.values()),
        "unique_words": len(counts),
        "word_counts": dict(counts),
    }


def main() -> None:
    if len(sys.argv) != 2:
        print("Usage: python word_count.py <path-to-text-file>")
        sys.exit(1)

    try:
        result = count_words_in_file(sys.argv[1])
    except FileNotFoundError as exc:
        # Print a JSON error so it is still machine-readable
        print(json.dumps({"error": str(exc)}, ensure_ascii=False, indent=2))
        sys.exit(1)

    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
