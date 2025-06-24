from django.shortcuts import get_object_or_404, render


from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import viewsets, permissions, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view

from .serializers import BlogSerializers, ProjetSerializers
from .models import Projet, Blog
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils.text import slugify

# import pour mo, chatbot
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.conf import settings
import json
import openai


# Create your views here.

class ProjetViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Projet.objects.all()
    serializer_class = ProjetSerializers

    def list(self, resquest):
        queryset = Projet.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            projet = Projet.objects.get(slug=pk)
            serializer = ProjetSerializers(projet)
            return Response(serializer.data)
        except Projet.DoesNotExist:
            return Response({'error': 'Projet non trouvé'}, status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        data = request.data.copy()
        if "slug" not in data or not data["slug"]:
            data["slug"] = slugify(data.get("titre", ""))

        # Slug unique
        base_slug = data["slug"]
        slug = base_slug
        i = 1
        while Projet.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{i}"
            i += 1
        data["slug"] = slug

        serializer = ProjetSerializers(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            projet = Projet.objects.get(slug=pk)
        except Projet.DoesNotExist:
            return Response({'error': 'Projet non trouvé'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProjetSerializers(projet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        try:
            projet = Projet.objects.get(slug=pk)
        except Projet.DoesNotExist:
            return Response({'error': 'Projet non trouvé'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProjetSerializers(projet, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            projet = Projet.objects.get(slug=pk)
            projet.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Projet.DoesNotExist:
            return Response({'error': 'Projet non trouvé'}, status=status.HTTP_404_NOT_FOUND)




class BlogPagination(PageNumberPagination):
    page_size = 6  # Nombre d'articles par page
    page_size_query_param = 'page_size'  # Paramètre de requête pour le nombre d'articles par page
    max_page_size = 100  # Nombre maximal d'articles par page


class BlogViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = BlogSerializers
    parser_classes = [MultiPartParser, FormParser]
    pagination_class = BlogPagination 
   

    def list(self, request):
        queryset = Blog.objects.all().order_by('-date')

        # Filtrage possible avec ?categorie= auteur "bassirou" ou exple  "dev"
        categorie = request.GET.get('categorie')
        auteur = request.GET.get('auteur')
        
        if categorie:
            queryset = queryset.filter(categorie__icontains=categorie)
        if auteur:
            queryset = queryset.filter(auteur__icontains=auteur)

        serializer = BlogSerializers(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            blog = Blog.objects.get(slug=pk)
            serializer = BlogSerializers(blog)
            return Response(serializer.data)
        except Blog.DoesNotExist:
            return Response({'error': 'Blog non trouvé'}, status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        # N'utilise PAS .copy() pour éviter l'erreur de BufferedRandom
        titre = request.data.get("titre", "")
        slug_base = slugify(titre)
        slug = slug_base
        i = 1
        while Blog.objects.filter(slug=slug).exists():
            slug = f"{slug_base}-{i}"
            i += 1

        # Crée un dictionnaire de données, en gardant les fichiers séparés
        data = {
            "titre": titre,
            "content": request.data.get("content", ""),
            "auteur": request.data.get("auteur", ""),
            "categorie": request.data.get("categorie", ""),
            "slug": slug,
        }

        files = {}
        if "image" in request.FILES:
            files["image"] = request.FILES["image"]
        if "video" in request.FILES:
            files["video"] = request.FILES["video"]

        serializer = BlogSerializers(data={**data, **files})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            blog = Blog.objects.get(slug=pk)
        except Blog.DoesNotExist:
            return Response({'error': 'Blog non trouvé'}, status=status.HTTP_404_NOT_FOUND)

        serializer = BlogSerializers(blog, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        try:
            blog = Blog.objects.get(slug=pk)
        except Blog.DoesNotExist:
            return Response({'error': 'Blog non trouvé'}, status=status.HTTP_404_NOT_FOUND)

        serializer = BlogSerializers(blog, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            blog = Blog.objects.get(slug=pk)
            blog.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Blog.DoesNotExist:
            return Response({'error': 'Blog non trouvé'}, status=status.HTTP_404_NOT_FOUND)
  


@api_view(["POST"])
def like_blog(request, pk):
    blog = get_object_or_404(Blog, pk=pk)
    cookie_key = f"liked_{pk}"

    if request.COOKIES.get(cookie_key):
        liked = True
    else:
        blog.likes += 1
        blog.save()
        liked = True

    response = Response({"likes": blog.likes, "liked": liked}, status=status.HTTP_200_OK)
    if not request.COOKIES.get(cookie_key):
        response.set_cookie(cookie_key, "true", max_age=60 * 60 * 24 * 365)  # 1 an
    return response


# @api_view(["GET"])
# def blog_detail_by_slug(request, slug):
#     blog = get_object_or_404(Blog, slug=slug)
#     serializer = BlogSerializer(blog)
#     return Response(serializer.data)


@api_view(["GET"])
def blog_detail_by_slug(request, slug):
    try:
        blog = get_object_or_404(Blog, slug=slug)
        serializer = BlogSerializers(blog, context={"request": request})
        return Response(serializer.data)
    except Exception as e:
        print(f"Erreur lors de la récupération du blog avec le slug '{slug}': {e}")
        return Response({"error": str(e)}, status=500)



# On va rendre le prompt dynamique en allant chercher mes projets (et autres infos) directement dans la base Django, puis les injecter dans le message system avant chaque appel OpenAI.
# Ainsi, quand j'ajoute ou modifie un projet dans l’admin, le bot connaît immédiatement la mise à jour.

from .utils import build_portfolio_context
#from .utils import build_projects_snippet  



# Initialise correctement le client
client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
# views pour assistant chatbot portfolio
@csrf_exempt
def chat_view(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Méthode non autorisée'}, status=405)

    try:
        data = json.loads(request.body)
        user_messages = data.get('messages', [])

        # ------- Contenu dynamique --------
        # projects_md = build_projects_snippet()

        info_portfolio = build_portfolio_context()
       

        system_message = {
            "role": "system",
            "content": """
Tu es l'assistant personnel de Bassirou Mbacké CISSE, un développeur web fullstack/llm spécialisé en React, Python/Django,RAG, LangChain, TailwindCSS, maitrise les notions de bases en DevOps, Node.js, API en Node.js, TypeScript et un peu UI/UX. Tu réponds de manière amicale, claire et professionnelle à toute question sur ses projets, compétences ou son portfolio, en français.  

Si l'utilisateur demande un lien demo ou repo, réponds‑lui avec celui disponible.


Voici ces Valeurs personnelles : 

1. tolérance et équité
2. autonomie
3. Curieux 

Voici ces valeurs professionnelles :

1. Ambiance et coopération au travail   
2. Engagement pour le bien commun
3. Grande curiosité intellectuelle
4. Capacité à rechercher des solutions
5. Collaboration et esprit d\n’équipe
6. Adaptabilité et flexibilité
7. Aptitude à communiquer et partager de connaissances


Compétences Comportementales :
Leadership :  => Résultat => on a fini le projet dans les délais.

Esprit d'Équipe : Ma capacité à travailler efficacement en équipe et à collaborer avec différents types de personnalités.

Gestion du temps : Ma capacité à gérer efficacement le temps et à prioriser les tâches.

N°Télephone : +33758252282

N'hésite pas à orienter les réponses vers ses réalisations réelles.
"""
        }

        # Ajouter info_portfolio comme message assistant pour ne pas alourdir la variable system message
        portfolio_message = {
            "role": "assistant",
            "content": info_portfolio
        }

        messages = [system_message, portfolio_message] + user_messages

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.7
        )

        assistant_reply = response.choices[0].message

        return JsonResponse({
            'reply': {
                "role": assistant_reply.role,
                "content": assistant_reply.content
            }
        })

    except Exception as e:
        print("Erreur OpenAI :", e)
        return JsonResponse({'error': str(e)}, status=500)



