from src.util.provider.provider import Provider
import requests
import csv

from src.util.provider.provider import download_file

from src.main import conn


class WorldBank(Provider):
    def __init__(self):
        self.PATH = "https://datacatalogapi.worldbank.org/ddhxext/Search"

    def list_by_query(self, query):
        documents = requests.get('https://datacatalogapi.worldbank.org/ddhxext/Search?qname=dataset&qterm='+ query +'&$filter=(Resources/any(res:res/format+eq+%27CSV%27))', {})\
            .json()\
            .get("Response")\
            .get("value")

        documents_reduced = [{
            "display_title": document.get("name"),
            "provider": "WB",
            "ID": [
                resource["url"]
            for resource in document.get("Resources") if resource.get('format') == "CSV" and resource.get('url')]
        } for document in documents]

        return documents_reduced

    def get_by_key(self, key):
        download_file(key)

        with open('cached.csv', newline='', encoding='utf-8') as csvfile:
            csv_reader = csv.DictReader(csvfile)
            columns = csv_reader.fieldnames  # Get column names from the CSV header

            # Create a table with column names from the CSV
            create_table_sql = f"CREATE TABLE data ({', '.join([f'{col.replace(' ', '_').replace('#', '')} TEXT' for col in columns])});"
            conn.execute(create_table_sql)

            # Insert data into the table
            for row in csv_reader:
                placeholders = ', '.join(['?' for _ in columns])  # Use placeholders for safe insertion
                insert_sql = f"INSERT INTO data ({', '.join([f'{col.replace(' ', '_').replace('#', '')}' for col in columns])}) VALUES ({placeholders})"
                conn.execute(insert_sql, [row[col] for col in columns])

            # Commit the transaction
            conn.commit()

        return {
            "status": "suke"
        }