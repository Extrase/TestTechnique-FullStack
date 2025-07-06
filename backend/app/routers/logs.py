from fastapi import APIRouter, FastAPI, HTTPException, Depends
from pydantic import BaseModel
from ..models.log_models import LogEntry, LogLevel
from ..services.opensearch_service import OpenSearchService

router = APIRouter(prefix="/logs", tags=["Logs"])

_opensearch_service = None

def get_opensearch_service():
    global _opensearch_service
    if _opensearch_service is None:
        _opensearch_service = OpenSearchService()
    return _opensearch_service

@router.post("")
def create_log(item: LogEntry, openSearch: OpenSearchService = Depends(get_opensearch_service)) -> dict:
    try:
        logs_dict = item.model_dump(mode="json", include={"timestamp", "level", "message", "service"}) #model dump transforme un model en dict
        log = openSearch.index_log(log_data=logs_dict)
        return log
    except Exception as e: # plus specifiaue 
        raise HTTPException(status_code=500, detail=f"OpenSearch error: {str(e)}") # code 500 pour erreur serveur
        
@router.get("/search")
def search_logs(q: str = None, level: LogLevel = None, service: str = None, limit: int = None, openSearch: OpenSearchService = Depends(get_opensearch_service)) -> list:
    try:
        level_str = level.value if level else None #permet de verifier que c'est bien dans l'Enum que j'ai fais
        searched = openSearch.search_logs(q, level_str, service, limit)
        return searched
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenSearch error: {str(e)}") #f-string permet de mettre des expressions