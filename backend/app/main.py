from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import logs

app = FastAPI(
    title="API pour logs",
    description="API de gestion de logs pour le ministere des Armees !",
    version="0.1.0")

# CORS pour le frontend (permet d'autoriser ou interdire a un navigateur d'acceder depuis un domaine)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # port par défaut de Vite
    allow_credentials=True,
    allow_methods=["GET, POST"], # Méthodes autorisées (GET, POST, etc.), mettre "*" autorise tout
    allow_headers=["*"],
)

# Inclusion du router
app.include_router(logs.router)