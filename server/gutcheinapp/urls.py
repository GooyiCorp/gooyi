from django.urls import path
from gutcheinapp.router import user


urlpatterns = [
    path('user/login/', user.login),
    path('user/register/', user.register),
    path('user/verification/', user.email_verification),
]

