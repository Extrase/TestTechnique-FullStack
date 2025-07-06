# Application de Gestion de Logs Full-Stack

Une application complète de gestion de logs construite avec FastAPI, OpenSearch, React + TypeScript, et Docker.

## 🎯 Fonctionnalités

- **Ingestion de logs** : Ajout de logs via API REST ou interface web
- **Stockage optimisé** : Utilisation d'OpenSearch pour le stockage et l'indexation
- **Recherche avancée** : Filtrage par niveau, service, message, et plage de dates
- **Interface moderne** : Frontend React avec TypeScript et Tailwind CSS
- **Containerisation** : Architecture complètement dockerisée

## 🏗️ Architecture

```
├── backend/          # API FastAPI
│   ├── app/
│   │   ├── models/   # Modèles Pydantic
│   │   ├── routers/  # Endpoints API
│   │   └── services/ # Services (OpenSearch)
│   └── Dockerfile
├── frontend/         # Application React
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── services/
│   └── Dockerfile
└── docker-compose.yml
```

## 🚀 Installation et Lancement

### Prérequis
- Docker et Docker Compose
- Ports 3000, 8000, et 9200 disponibles

### Lancement rapide
```bash
# Cloner le projet
git clone <repository-url>
cd TestTechnique-FullStack

# Construire et lancer tous les services
docker-compose up --build

# Ou en arrière-plan
docker-compose up -d --build
```

### Accès aux services
- **Frontend** : http://localhost:3000
- **API Backend** : http://localhost:8000
- **OpenSearch** : http://localhost:9200

## 📖 Utilisation

### Interface Web
1. Accédez à http://localhost:3000
2. Consultez la liste des logs existants
3. Utilisez les filtres pour rechercher des logs spécifiques
4. Cliquez sur "Créer un Log" pour ajouter un nouveau log

### API REST

#### Créer un log
```bash
curl -X POST "localhost:8000/logs" \
  -H "Content-Type: application/json" \
  -d '{
    "timestamp": "2025-07-07T10:00:00Z",
    "level": "INFO",
    "message": "Application démarrée",
    "service": "api-gateway"
  }'
```

#### Rechercher des logs
```bash
# Tous les logs
curl "localhost:8000/logs/search?size=10"

# Filtrer par niveau
curl "localhost:8000/logs/search?level=ERROR&size=5"

# Filtrer par service
curl "localhost:8000/logs/search?service=api-gateway&size=10"

# Recherche textuelle
curl "localhost:8000/logs/search?query=database&size=10"
```

## 🔧 Développement

### Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend (React + TypeScript)
```bash
cd frontend
npm install
npm run dev
```

### OpenSearch
```bash
# Vérifier l'état du cluster
curl localhost:9200/_cluster/health?pretty

# Lister les indices
curl localhost:9200/_cat/indices?v
```

## 🐛 Résolution de Problèmes

### Erreur "disk usage exceeded flood-stage watermark"
Cette erreur survient quand OpenSearch détecte un manque d'espace disque. Solutions :

1. **Redémarrer les containers** :
```bash
docker-compose down
docker-compose up -d
```

2. **Désactiver le monitoring disque** (développement uniquement) :
```bash
curl -X PUT "localhost:9200/_cluster/settings" \
  -H "Content-Type: application/json" \
  -d '{"persistent": {"cluster.routing.allocation.disk.threshold_enabled": false}}'
```

3. **Supprimer les anciens logs** :
```bash
curl -X DELETE "localhost:9200/logs-*"
```

### Erreurs CORS
Si vous rencontrez des erreurs CORS, vérifiez que :
- Le backend autorise les origines du frontend
- Les URLs dans `frontend/src/services/api.ts` sont correctes

## 🔍 Fonctionnalités Techniques

### Backend
- **FastAPI** : Framework web moderne et performant
- **Pydantic** : Validation et sérialisation des données
- **OpenSearch** : Moteur de recherche et d'analyse
- **CORS** : Configuration pour permettre les requêtes cross-origin

### Frontend
- **React 18** : Bibliothèque UI moderne
- **TypeScript** : Typage statique pour plus de robustesse
- **Tailwind CSS** : Framework CSS utilitaire
- **React Router** : Navigation côté client
- **Axios** : Client HTTP pour les appels API
- **Context API** : Gestion d'état globale

### DevOps
- **Docker** : Containerisation des applications
- **Docker Compose** : Orchestration multi-conteneurs
- **Nginx** : Serveur web pour le frontend
- **Multi-stage builds** : Optimisation des images Docker

## 📊 Données de Test

L'application inclut des données de test pour démontrer les fonctionnalités :
- Logs de différents niveaux (INFO, WARNING, ERROR, DEBUG)
- Plusieurs services (api-gateway, user-service, monitoring-service)
- Messages variés pour tester la recherche

## 🚧 Améliorations Futures

- [ ] Authentification et autorisation
- [ ] Pagination avancée
- [ ] Métriques et dashboards
- [ ] Alertes automatiques
- [ ] Export de logs (CSV, JSON)
- [ ] Configuration des rétentions
- [ ] Tests unitaires et d'intégration

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📝 License

MIT License