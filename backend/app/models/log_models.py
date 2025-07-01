from enum import Enum
from datetime import datetime
from pydantic import BaseModel, field_validator


class LogLevel(str, Enum):
    """Niveaux de log autorisés"""
    info = 'INFO'
    warning = 'WARNING'
    error = 'ERROR'
    debug = 'DEBUG'

class LogEntry(BaseModel):
    """Modèle d'entrée de log avec validation"""
    timestamp: str      # Format ISO 8601 (ex: 2025-07-01T14:30:00)
    level: LogLevel     # Niveau du log (INFO, WARNING, ERROR, DEBUG)
    message: str        # Message du log
    service: str        # Nom du service (format: word-word)

    @field_validator('service')
    def validate_service_format(cls, v) -> str:
        """Valide que le service suit le format 'word-word'"""
        parts = v.split('-')
        if len(parts) == 2 and all(part.isalpha() for part in parts):
            return v
        else:
            raise ValueError("Invalid service format, it must be in this format 'word-word' (ex: 'user-service')")
        
    @field_validator('timestamp')
    def validate_timestamp_format(cls, v) -> str:
        """Valide que le timestamp est au format ISO 8601"""
        try:
            datetime.fromisoformat(v)
            return v
        except ValueError:
            raise ValueError("Invalid timestamp format, it must be ISO 8601 (ex: '2025-07-01T14:30:00')")
        