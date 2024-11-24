from fastapi import APIRouter, Response

dataset_router = APIRouter()

@dataset_router.get("/get")
def get_by_key(key: str = None, provider: str = None):
    from src.util.provider.impl.world_bank import WorldBank

    match provider:
        case "WB":
            WorldBank().get_by_key(key)
        case _:
            pass

    return {
        "status": "ok"
    }

@dataset_router.get("/list")
def list_by_query(response: Response, query: str = None):
    print(query)
    response.headers['Access-Control-Allow-Origin'] = '*'
    from src.util.provider.provider import Provider
    from src.util.provider.impl.world_bank import WorldBank
    # from src.util.provider.impl.un_data import UNData
    # from src.util.provider.impl.openweathermap import OpenWeatherMapData

    providers: list[Provider] = [
        WorldBank(),
        # UNData(),
        # OpenWeatherMapData()
    ]

    data = []

    for provider in providers:
        data += provider.list_by_query(query)

    return {
        "data": data
    }

@dataset_router.get("/")
def test():
    return {
        "message": "ok"
    }