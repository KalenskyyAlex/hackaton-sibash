from fastapi import FastAPI
import sys
from pathlib import Path
from routers.dataset import dataset_router
import os

def load_env_file(file_path):
    with open(file_path, "r") as file:
        for line in file:
            if line.strip() and not line.startswith("#"):
                key, value = line.strip().split("=", 1)
                os.environ[key] = value

load_env_file("../public.env")
load_env_file("../private.env")

sys.path.append(str(Path(__file__).resolve().parent.parent))

app = FastAPI()

# Include example routes
app.include_router(dataset_router, prefix="/api/dataset")

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI!"}
