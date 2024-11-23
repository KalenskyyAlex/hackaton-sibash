from src.util.provider.provider import Provider
import os
import requests

class OpenWeatherMapData(Provider):
    def __init__(self):
        self.PATH = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"

    def list_by_query(self, query):
        params = {
            "key": os.getenv("OWM_API_KEY")
        }

        try:
            documents = requests.get(self.PATH + query, params).json()

            return [{
                "display_title": "Weather Data for Location: " + documents.get("resolvedAddress"),
                "provider": "OWM",
                "id": documents.get("resolvedAddress")
            }]
        except:
            return []

    def get_by_key(self, key):
        pass