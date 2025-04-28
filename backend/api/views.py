from django.shortcuts import render
from django.http.response import HttpResponse

from rest_framework import viewsets, permissions, status
from .serializers import BlogSerializers, ProjetSerializers
from .models import Projet, Blog
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils.text import slugify
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


class BlogViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = BlogSerializers

    def list(self, request):
        queryset = Blog.objects.all()

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
        data = request.data.copy()

        if "slug" not in data or not data["slug"]:
            data["slug"] = slugify(data.get("titre", ""))

        base_slug = data["slug"]
        slug = base_slug
        i = 1
        while Blog.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{i}"
            i += 1
        data["slug"] = slug

        serializer = BlogSerializers(data=data)
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
  


        

