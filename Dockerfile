### Étape 1 : Build frontend React/Vite ###
FROM node:18 AS build-frontend
WORKDIR /frontend
COPY ./frontend/ ./
RUN npm install && npm run build


### Étape 2 : Préparer backend Django ###
FROM python:3.11-slim AS build-backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Installer dépendances système
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /backend
COPY ./backend/ ./
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le build React vers le backend pour collectstatic (si besoin)
COPY --from=build-frontend /frontend/dist ../frontend

# Collecte des fichiers statiques
RUN python manage.py collectstatic --noinput


### Étape 3 : Image finale avec Gunicorn + Nginx + Supervisor ###
FROM python:3.11-slim AS final

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && \
    apt-get install -y gcc libpq-dev nginx supervisor python3-pip && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copier backend et frontend
COPY ./backend ./backend
COPY --from=build-frontend /frontend /frontend
COPY --from=build-backend /backend/staticfiles /static

# Installer les dépendances Python
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copier les configs
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./supervisord.conf /etc/supervisord.conf

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]






#****** Version qui marchait avant et dans la quelle j'avais pas mes articles de blogs et projets affichés aprés le deploiement


# Étape 1 : Build frontend avec Vite/React
# FROM node:18 AS frontend
# WORKDIR /frontend
# COPY ./frontend/ ./
# RUN npm install && npm run build

# # Étape 2 : Build backend Django + Gunicorn
# FROM python:3.11-slim AS backend
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1

# # Install dépendances système
# RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

# # Setup backend
# WORKDIR /app
# COPY ./backend/ ./backend/
# COPY backend/requirements.txt ./requirements.txt
# RUN pip install --no-cache-dir -r requirements.txt
# COPY --from=frontend /frontend/dist /frontend/

# # Collecte des fichiers statiques
# WORKDIR /app/backend
# RUN python manage.py collectstatic --noinput

# # Étape 3 : Final - Nginx pour servir frontend + static + reverse proxy vers Gunicorn
# FROM nginx:alpine

# # Copie fichiers statiques Django
# COPY --from=backend /app/backend/staticfiles /static/

# # Copie frontend build
# COPY --from=backend /frontend/ /frontend/

# # Copie config Nginx
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# # Expose port 80 pour le web
# EXPOSE 80


# # Lancer Nginx au démarrage et guni
# CMD sh -c "gunicorn backend.site_pro.wsgi:application --bind 0.0.0.0:8000 & nginx -g 'daemon off;'"



