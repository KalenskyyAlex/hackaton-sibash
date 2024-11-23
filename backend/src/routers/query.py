from fastapi import APIRouter

query_router = APIRouter()

@query_router.get("/")
def test():
    return {"message": "ok"}