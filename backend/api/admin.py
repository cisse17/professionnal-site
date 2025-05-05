from django.contrib import admin
from .models import Projet, Blog
# Register your models here.

from django.contrib import admin
from .models import Blog, Projet

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('titre', 'date')
    search_fields = ('titre', 'content')
    list_filter = ('date',)


@admin.register(Projet)
class ProjetAdmin(admin.ModelAdmin):
    list_display = ('titre', 'technologies')
    search_fields = ('titre', 'description', 'technologies')
