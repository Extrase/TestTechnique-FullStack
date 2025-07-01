import os
from opensearchpy import OpenSearch
from datetime import datetime, date

class OpenSearchService:
    def __init__(self):
        host = os.getenv('OPENSEARCH_HOST', "localhost") # recupere la variable d'environnement, tout en mettant une valeur par defaut en cas d'erreur
        port = int(os.getenv('OPENSEARCH_PORT', "9200")) # identique
        self.client = OpenSearch(
            hosts = [{'host': host, 'port': port}],
            http_compress = True, 
            use_ssl = False,
            verify_certs = False,
            ssl_assert_hostname = False,
            ssl_show_warn = False
        )
    def _get_index_name(self, timestamp: str) -> str:
        """Génère le nom d'index basé sur la date du timestamp"""
        try:
            dt = datetime.fromisoformat(timestamp) # parse le timestamp
            dt_iso = dt.date() # extrait juste la date
            log = dt_iso.strftime("%Y.%m.%d") # Format YYYY.MM.DD
            return f"logs-{log}" # préfixe "logs-"
        except ValueError:
            raise ValueError("Invalid timestamp format, it must be ISO 8601")
        
    def index_log(self, log_data: dict) -> dict:
        """Indexe un log dans OpenSearch et retourne l'ID généré"""
        timestamp = log_data["timestamp"] # a ce stade timestamp = "2025-07-01T14:30:00"
        index_name = self._get_index_name(timestamp) # index_name = "logs-2025.07.01"
        response = self.client.index(
            index=index_name, # "logs-2025.07.01"
            body=log_data, # les données de log
            refresh = True # ]our voir le résultat immédiatement
        )
        generated_id = response["_id"] # OpenSearch donne un ID dans la réponse
        final_log = log_data.copy() # pour ne opas modifier l'original
        final_log["id"] = generated_id
        return final_log
        
    def search_logs(self, q: str = None, level: str = None, service: str = None) -> list:
        """Recherche les logs avec filtres optionnels"""
        query = {
            'size': 100,
            'query': {
                'bool':{
                    'must': [
                        {
                        'match': {
                            'message': q
                            }
                        }
                    ],
                    'should': [
                        {
                            'term': {
                                'level': level
                            }
                        }
                    ],
                    'should': [
                        {
                            'term': {
                                'service': service
                            }
                        }
                    ]
                }
            },
            'sort': [{
                'timestamp':{
                    'order': 'desc'
                }
            }]
        }
        response = self.client(
            body=query,
            index="logs-*" # tout index commencqnt par "logs-"
        )
        # TODO: Retourner les résultats triés par timestamp décroissant
        pass