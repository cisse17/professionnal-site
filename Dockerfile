# Étape 1 : Build frontend avec Vite/React
FROM node:18 AS frontend
WORKDIR /frontend
COPY ./frontend/ ./
RUN npm install && npm run build

# Étape 2 : Build backend Django + Gunicorn
FROM python:3.11-slim AS backend
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install dépendances système
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

# Setup backend
WORKDIR /app
COPY ./backend/ ./backend/
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY --from=frontend /frontend/dist /frontend/

# Collecte des fichiers statiques
WORKDIR /app/backend
RUN python manage.py collectstatic --noinput

# Étape 3 : Final - Nginx pour servir frontend + static + reverse proxy vers Gunicorn
FROM nginx:alpine

# Copie fichiers statiques Django
COPY --from=backend /app/backend/staticfiles /static/

# Copie frontend build
COPY --from=backend /frontend/ /frontend/

# Copie config Nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80 pour le web
EXPOSE 80

# Lancer Nginx au démarrage
CMD ["nginx", "-g", "daemon off;"]
