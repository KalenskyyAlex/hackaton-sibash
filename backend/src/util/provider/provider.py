from abc import ABC, abstractmethod
import requests

class Provider(ABC):

    @abstractmethod
    def list_by_query(self, query):
        pass

    @abstractmethod
    def get_by_key(self, key):
        pass

def download_file(url):
    response = requests.get(url)

    if response.status_code == 200:
        # Save the content to a file
        with open("cached.csv", "wb") as file:
            file.write(response.content)
        print("CSV file downloaded successfully.")
    else:
        print(f"Failed to download file. HTTP Status Code: {response.status_code}")