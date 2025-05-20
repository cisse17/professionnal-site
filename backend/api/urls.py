from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import ProjetViewSet, BlogViewSet, chat_view

router = DefaultRouter()

router.register("projet", ProjetViewSet, basename="projet")
router.register("blog", BlogViewSet, basename="blog")

# urlpatterns = router.urls

urlpatterns = [
    path("", include(router.urls)),  
    path("blog/<int:pk>/like/", views.like_blog, name="like-blog"), 
    path("chat/", chat_view, name="chat"),
 
]



