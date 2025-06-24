from django.db import models

# Create your models here.
from django.db import models
from django.utils.text import slugify
from cloudinary.models import CloudinaryField

CATEGORIES = [
    ('Tech', 'Technologie'),
    ('Dev', 'Développement'),
    ('life', 'Vie personnelle'),
    ('Actu', 'Actualité'),
    ('Design', 'Design'),

]

class Blog(models.Model):
    titre = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    content = models.TextField()
    # image = models.ImageField(upload_to='blog_images/', null=True, blank=True)
    # video = models.FileField(upload_to='blog_videos/', null=True, blank=True)
    image = CloudinaryField('image', blank=True, null=True)
    video = CloudinaryField('video', resource_type='video', blank=True, null=True)
    categorie = models.CharField(max_length=50, choices=CATEGORIES)
    auteur = models.CharField(max_length=100)
    date = models.DateTimeField(blank=True, null=True)
    likes = models.PositiveIntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.titre)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.titre


class Projet(models.Model):
    titre = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    demolien = models.URLField(max_length=500)
    repolien = models.URLField(max_length=500)
    technologies = models.JSONField(default=list) 
    # image = models.ImageField(upload_to='projets_images/')
    image = CloudinaryField('image', blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.titre)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.titre



