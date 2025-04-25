from django.shortcuts import render
from django.http.response import HttpResponse
from .serializers import BlogSerializers, ProjetSerializers

# Create your views here.
def api_view(request):
    return HttpResponse("test vue mon api ")