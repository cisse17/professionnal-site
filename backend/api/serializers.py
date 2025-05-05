from rest_framework import serializers
from .models import *

class ProjetSerializers(serializers.ModelSerializer):
    class Meta:
        model = Projet
        fields = "__all__"

class BlogSerializers(serializers.ModelSerializer):
    class Meta:
        model =  Blog
        fields = "__all__"
