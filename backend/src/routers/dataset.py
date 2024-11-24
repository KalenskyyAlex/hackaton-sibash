import csv

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

from fastapi import File, UploadFile, HTTPException

@dataset_router.get("/upload")
def upload():
    with open('hackaton_population.csv', newline='', encoding='utf-8') as csvfile:
        csv_reader = csv.DictReader(csvfile)
        columns = csv_reader.fieldnames  # Get column names from the CSV header


        # Create a table with column names from the CSV
        create_table_sql = f"CREATE TABLE data ({', '.join([f'c_{col.replace(' ', '_').replace('#', '').replace('/', '_')} TEXT' for col in columns])});"
        from src.main import conn
        conn.execute('''DROP TABLE IF EXISTS data;''')
        conn.execute(create_table_sql)

        # Insert data into the table
        for row in csv_reader:
            placeholders = ', '.join(['?' for _ in columns])  # Use placeholders for safe insertion
            insert_sql = f"INSERT INTO data ({', '.join([f'c_{col.replace(' ', '_').replace('#', '').replace('/', '_')}' for col in columns])}) VALUES ({placeholders})"
            conn.execute(insert_sql, [row[col] for col in columns])

        # Commit the transaction
        conn.commit()

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