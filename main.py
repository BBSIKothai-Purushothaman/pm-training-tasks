from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import csv
from pathlib import Path
from typing import List

app = FastAPI(
    title="User CSV API",
    description="Reads users from a CSV file and exposes their names as JSON.",
    version="1.0.0",
)

CSV_PATH = Path(__file__).parent / "users.csv"


class UserName(BaseModel):
    name: str


class UserNamesResponse(BaseModel):
    names: List[UserName]


@app.get("/users/names", response_model=UserNamesResponse, summary="Get user names")
def get_user_names():
    """
    Read the CSV file and return all user names as JSON.

    - Returns: `{ "names": [ { "name": "Alice" }, ... ] }`
    """
    if not CSV_PATH.exists():
       raise HTTPException(status_code=500, detail="users.csv file not found")

    names: List[UserName] = []

    with CSV_PATH.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            # assume CSV has a 'name' column
            if "name" in row and row["name"]:
                names.append(UserName(name=row["name"]))

    return UserNamesResponse(names=list(names))
