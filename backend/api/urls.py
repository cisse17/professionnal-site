from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import ProjetViewSet, BlogViewSet

router = DefaultRouter()

router.register("projet", ProjetViewSet, basename="projet")
router.register("blog", BlogViewSet, basename="blog")

# urlpatterns = router.urls

urlpatterns = [
    path("", include(router.urls)),  
    path("blog/<int:pk>/like/", views.like_blog, name="like-blog"), 
    # path("blog/<int:pk>/dislike/", views.dislike_blog, name="dislike_blog"),
]


