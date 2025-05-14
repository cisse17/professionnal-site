from rest_framework import serializers
from .models import *

class ProjetSerializers(serializers.ModelSerializer):
    class Meta:
        model = Projet
        fields = "__all__"

class BlogSerializers(serializers.ModelSerializer):
    video = serializers.FileField(required=False, allow_null=True, allow_empty_file=True)
    image = serializers.ImageField(required=False, allow_null=True)
    class Meta:
        model =  Blog
        fields = "__all__"
