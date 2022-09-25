from django.urls import path
from .views import index

urlpatterns = [
    path('join/1', index),
    path('', index),
    path('join', index),
    path('create', index),
    path('room/<str:roomCode>', index),
]