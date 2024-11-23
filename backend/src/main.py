from fastapi import FastAPI
import sys
from pathlib import Path

from routers.dataset import dataset_router
sys.path.append(str(Path(__file__).resolve().parent.parent))

app = FastAPI()

# Include example routes
app.include_router(dataset_router, prefix="/api/dataset")

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI!"}
