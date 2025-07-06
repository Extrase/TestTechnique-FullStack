from pydantic import  Field
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    opensearch_host : str = Field(default="localhost", description="OpenSearch host") # Champ avec type, valeur par défaut et description
    opensearch_port : int = Field(default=9200, description="OpenSearch port")
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')