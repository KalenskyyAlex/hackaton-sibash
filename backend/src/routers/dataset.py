from fastapi import APIRouter

dataset_router = APIRouter()

@dataset_router.get("/get/{key}")
def get_by_key():
    return {
        "message": "test"
    }

@dataset_router.get("/list")
def list_by_query(query: str = None):
    from src.util.provider.provider import Provider
    from src.util.provider.impl.world_bank import WorldBank

    providers: list[Provider] = [
        WorldBank()
    ]

    data = []

    for provider in providers:
        data.append(provider.list_by_query(query))

    return {
        "data": data
    }

@dataset_router.get("/")
def test():
    return {
        "message": "ok"
    }