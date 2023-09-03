from django.urls import path
from gutcheinapp.router import user, store


urlpatterns = [
    path('user/login/', user.login),
    path('user/register/', user.register),
    path('user/verification/', user.email_verification),
    path('user/forgot_password/', user.password_vergessen),
    
    path('store/', store.near_store),
]

