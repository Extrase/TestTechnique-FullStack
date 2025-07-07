FROM python:3.11-slim

WORKDIR /app

# copie les dépendances
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# copie le code source
COPY . .

# expose le port
EXPOSE 8000

# démarre l'application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]