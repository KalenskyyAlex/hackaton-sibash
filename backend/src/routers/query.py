import json

from fastapi import APIRouter
from oauthlib.uri_validate import query
import sqlite3


query_router = APIRouter()

@query_router.get("/raw")
def get_raw():
    from src.main import conn

    cursor = conn.cursor()

    cursor.execute('''
        SELECT * FROM data
    ''')

    rows = cursor.fetchall()

    columns = [description[0] for description in cursor.description]

    results = [dict(zip(columns, row)) for row in rows]
    return {"data": results}

@query_router.get("/process")
def get_raw():
    return {"message": "ok"}

@query_router.get("/")
def test():
    return {"message": "ok"}