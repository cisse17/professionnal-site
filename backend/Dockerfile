# Utiliser une image Python
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Installe les dépendances système nécessaires (PostgreSQL client, etc)
RUN apt-get update && apt-get install -y \
    libpq-dev gcc \
    && rm -rf /var/lib/apt/lists/*

# Copier les fichiers requirements
COPY requirements.txt .

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Copier tout le backend
COPY . .

# Exposer le port Django (par défaut 8000)
EXPOSE 8000

# Commande pour lancer Django en mode dev (à adapter pour prod)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


