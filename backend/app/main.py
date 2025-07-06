from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import logs
import logging

# Configuration du logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

app = FastAPI(
    title="API pour logs",
    description="API de gestion de logs pour le ministere des Armees !",
    version="0.1.0")

# CORS pour le frontend (permet d'autoriser ou interdire a un navigateur d'acceder depuis un domaine)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # ports dev et Docker
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion du router
app.include_router(logs.router)