import requests
from rapidfuzz import fuzz
from src.util.provider.provider import Provider

class UNData(Provider):
    def __init__(self):
        self.PATH = "http://data.un.org/ws/rest/dataflow"
        self.SIMILARITY = 85

    def list_by_query(self, query):
        headers = {
            "Accept": "text/json"
        }
        documents_broadcast = requests.get(self.PATH, {}, headers=headers).json().get("references")

        documents_reduced = [{
            "display_title": documents_broadcast[document].get("name"),
            "provider": "UN",
            "id": documents_broadcast[document].get("id"),
        } for document in documents_broadcast.keys()]

        documents_filtered = [document for document in documents_reduced if fuzz.partial_ratio(query, document["display_title"]) >= self.SIMILARITY]
        return documents_filtered

    def get_by_key(self, key):
        pass