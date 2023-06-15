from django.urls import path
from gutcheinapp.router import user


urlpatterns = [
    path('user/', user.user),
]

