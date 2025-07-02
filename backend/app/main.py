from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import logs

app = FastAPI(
    title="API de gestion des logs",
    description="API pour ingérer, stocker et rechercher des logs avec OpenSearch",
    version="1.0.0"
)

# CORS pour le frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Port par défaut de Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion du router
app.include_router(logs.router)