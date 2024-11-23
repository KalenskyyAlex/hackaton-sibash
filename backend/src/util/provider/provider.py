from abc import ABC, abstractmethod

class Provider(ABC):

    @abstractmethod
    def list_by_query(self, query):
        pass

    @abstractmethod
    def get_by_key(self, key):
        pass