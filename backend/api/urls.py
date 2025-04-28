from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from .views import ProjetViewSet, BlogViewSet

router = DefaultRouter()

router.register("projet", ProjetViewSet, basename="projet")
router.register("blog", BlogViewSet, basename="blog")

urlpatterns = router.urls

