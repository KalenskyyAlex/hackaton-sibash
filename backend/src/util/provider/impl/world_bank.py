from src.util.provider.provider import Provider
import requests

class WorldBank(Provider):
    def __init__(self):
        self.PATH = "https://search.worldbank.org/api/v3/wds"

    def list_by_query(self, query):
        params = {
            "format": "json",
            "display_title": query
        }
        documents = requests.get(self.PATH, params)\
            .json()\
            .get("documents")

        documents_reduced = [{
            "display_title": documents[document].get("display_title"),
            "provider": "WB",
            "ID": document
        } for document in documents.keys() if document != "facets"]

        return documents_reduced

    def get_by_key(self, key):
        pass