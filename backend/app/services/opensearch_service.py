from opensearchpy import OpenSearch
from datetime import datetime
from ..config import Settings
import logging

logger = logging.getLogger(__name__)

class OpenSearchService:
    def __init__(self):
        settings = Settings()
        host = settings.opensearch_host # recupere la variable d'environnement, tout en mettant une valeur par defaut en cas d'erreur
        port = settings.opensearch_port # identique
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
        try:
            logger.info(f"Indexing log data: {log_data}")
            timestamp = log_data["timestamp"] # a ce stade timestamp = "2025-07-01T14:30:00"
            index_name = self._get_index_name(timestamp) # index_name = "logs-2025.07.01"
            logger.info(f"Using index: {index_name}")
            
            self._index_mapping(index_name)
            logger.info(f"Index mapping created/verified for: {index_name}")
            
            response = self.client.index(
                index=index_name, # "logs-2025.07.01"
                body=log_data, # les données de log
                refresh = True # ]our voir le résultat immédiatement
            )
            logger.info(f"OpenSearch response: {response}")
            
            generated_id = response["_id"] # OpenSearch donne un ID dans la réponse
            final_log = log_data.copy() # pour ne opas modifier l'original
            final_log["id"] = generated_id
            logger.info(f"Successfully indexed log with ID: {generated_id}")
            return final_log
        except Exception as e:
            logger.error(f"Error indexing log: {str(e)}", exc_info=True)
            raise
        
    def search_logs(self, q: str = None, level: str = None, service: str = None, size: int = 100) -> list:
        """Recherche les logs avec filtres optionnels"""
        query = {
        "size": size,
        "sort": [{"timestamp": {"order": "desc"}}],
        "query": {
            "bool": {
                "must": [],    # conditions obligatoires
                "filter": []   # les filtres
            }
        }
    }
        # ajouter les conditions optionnelles selon les paramètres
        if q: 
            query["query"]["bool"]["must"].append({"match": {"message": q}}) # match cherche une string dans 
        if level:
            query["query"]["bool"]["filter"].append({"term": {"level": level}}) #term demande "est-ce que ce level est present ?"
        if service:
            query["query"]["bool"]["filter"].append({"term": {"service": service}})
        response = self.client.search(body=query, index="logs-*") # tout index commencqnt par "logs-")
        search_ids = []
        for hit in response["hits"]["hits"]: # on avance dans chque iteration de response.hits.hits
            tmp = hit["_source"].copy() # copier pour eviter de ;odifier le conteu originel
            tmp["id"] = hit["_id"] # j'qjoute l'id dans le resultat final
            search_ids.append(tmp)
        return search_ids # je return les logs dans l'ordre decroissant de la requete initiale
    
    def _index_mapping(self, index_name: str): # obligatoire pour que OpenSearch interprete comme il faut les valeurs
        """Crée l'index avec le bon mapping s'il n'existe pas"""
        try:
            if not self.client.indices.exists(index=index_name):
                logger.info(f"Creating index {index_name} with mapping")
                mapping = {
                    "mappings": {
                        "properties": {
                            "timestamp": {"type": "date", "format": "strict_date_optional_time||epoch_millis"}, # epoch_millis lrs timestamps en millisecondes pour le format iso8601
                            "level": {"type": "keyword"},
                            "message": {"type": "text"},
                            "service": {"type": "keyword"}
                        }
                    }
                } # primordial car sinon, ex: le level est considere comme un text et non un keyword !
                self.client.indices.create(index=index_name, body=mapping)
                logger.info(f"Index {index_name} created successfully")
            else:
                logger.info(f"Index {index_name} already exists")
        except Exception as e:
            logger.error(f"Error creating index mapping for {index_name}: {str(e)}", exc_info=True)
            raise